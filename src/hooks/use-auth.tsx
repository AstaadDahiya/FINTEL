
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { auth, storage } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserDisplayName: (name: string) => Promise<void>;
  updateUserEmail: (email: string) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
  updateUserProfilePicture: (file: File) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  }

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    if(userCredential.user) {
        await updateProfile(userCredential.user, {
            displayName: name
        });
        // Manually trigger a state update for the user
        setUser({...userCredential.user, displayName: name});
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  
  const updateUserProfile = async (updates: { displayName?: string; photoURL?: string }) => {
    if (!auth.currentUser) throw new Error("User not logged in");
    await updateProfile(auth.currentUser, updates);
    setUser(auth.currentUser);
  };
  
  const updateUserDisplayName = async (name: string) => {
    await updateUserProfile({ displayName: name });
  };
  
  const updateUserEmail = async (email: string) => {
    if (!auth.currentUser) throw new Error("User not logged in");
    await updateEmail(auth.currentUser, email);
    setUser(auth.currentUser);
  };

  const updateUserPassword = async (password: string) => {
    if (!auth.currentUser) throw new Error("User not logged in");
    await updatePassword(auth.currentUser, password);
  };

  const updateUserProfilePicture = async (file: File) => {
    if (!auth.currentUser) throw new Error("User not logged in");
    const storageRef = ref(storage, `profile-pictures/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    await updateUserProfile({ photoURL });
    return photoURL;
  };


  return (
    <AuthContext.Provider value={{ 
        user, 
        loading, 
        signInWithGoogle, 
        signInWithEmail, 
        signUpWithEmail, 
        logout,
        updateUserDisplayName,
        updateUserEmail,
        updateUserPassword,
        updateUserProfilePicture
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
