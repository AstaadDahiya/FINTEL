
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Camera } from "lucide-react";

export default function SettingsPage() {
    const { user, updateUserDisplayName, updateUserEmail, updateUserPassword, updateUserProfilePicture } = useAuth();
    const { toast } = useToast();
    
    const personalizedLearningKey = user ? `showPersonalizedLearning_${user.uid}` : 'showPersonalizedLearning';
    const [showPersonalizedLearning, setShowPersonalizedLearning] = useLocalStorage(personalizedLearningKey, true);
    const { setTheme } = useTheme();

    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleNameUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateUserDisplayName(displayName);
            toast({ title: "Success", description: "Your name has been updated." });
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Error", description: "Could not update your name." });
        }
        setIsSubmitting(false);
    };
    
    const handleEmailUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateUserEmail(email);
            toast({ title: "Success", description: "Your email has been updated. Please verify your new email." });
        } catch (error) {
             console.error(error);
            toast({ variant: "destructive", title: "Error", description: "Could not update your email. You may need to log in again." });
        }
        setIsSubmitting(false);
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({ variant: "destructive", title: "Error", description: "Passwords do not match." });
            return;
        }
        if (password.length < 6) {
             toast({ variant: "destructive", title: "Error", description: "Password must be at least 6 characters." });
            return;
        }
        setIsSubmitting(true);
        try {
            await updateUserPassword(password);
            toast({ title: "Success", description: "Your password has been updated." });
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Error", description: "Could not update your password. You may need to log in again." });
        }
        setIsSubmitting(false);
    };

    const handlePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsSubmitting(true);
        try {
            await updateUserProfilePicture(file);
            toast({ title: "Success", description: "Profile picture updated." });
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Error", description: "Could not update profile picture." });
        }
        setIsSubmitting(false);
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline">Profile & Settings</h1>
                <p className="text-muted-foreground">Manage your account and application preferences.</p>
            </div>

            <div className="grid gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Profile Settings</CardTitle>
                        <CardDescription>Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={user?.photoURL ?? ''} />
                                    <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
                                </Avatar>
                                <Button
                                    size="icon"
                                    className="absolute bottom-0 right-0 rounded-full h-7 w-7"
                                    onClick={() => fileInputRef.current?.click()}
                                    aria-label="Change profile picture"
                                >
                                    <Camera className="h-4 w-4" />
                                </Button>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden"
                                    accept="image/png, image/jpeg"
                                    onChange={handlePictureUpload}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <form onSubmit={handleNameUpdate} className="flex-grow space-y-2">
                                <Label htmlFor="displayName">Name</Label>
                                <div className="flex gap-2">
                                    <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} disabled={isSubmitting} />
                                    <Button type="submit" disabled={isSubmitting || displayName === user?.displayName}>Save</Button>
                                </div>
                            </form>
                        </div>
                        
                        <form onSubmit={handleEmailUpdate} className="space-y-2">
                             <Label htmlFor="email">Email</Label>
                             <div className="flex gap-2">
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />
                                <Button type="submit" disabled={isSubmitting || email === user?.email}>Save</Button>
                            </div>
                        </form>

                        <form onSubmit={handlePasswordUpdate} className="space-y-2">
                             <Label htmlFor="password">New Password</Label>
                             <div className="flex gap-2">
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" disabled={isSubmitting} />
                                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" disabled={isSubmitting} />
                                <Button type="submit" disabled={isSubmitting || !password}>Save</Button>
                            </div>
                        </form>

                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Display Settings</CardTitle>
                        <CardDescription>Configure what is shown in the application interface.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                            <Label htmlFor="personalized-learning-switch" className="flex flex-col space-y-1">
                                <span>Personalized Next Step</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Show the AI-powered learning recommendation in the sidebar.
                                </span>
                            </Label>
                            <Switch
                                id="personalized-learning-switch"
                                checked={showPersonalizedLearning}
                                onCheckedChange={setShowPersonalizedLearning}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Theme</CardTitle>
                        <CardDescription>Select the application color scheme.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                            <Button variant="outline" onClick={() => setTheme("light")}>
                                Light
                            </Button>
                            <Button variant="outline" onClick={() => setTheme("dark")}>
                                Dark
                            </Button>
                            <Button variant="outline" onClick={() => setTheme("system")}>
                                System
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
