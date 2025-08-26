
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function SettingsPage() {
    const { user } = useAuth();
    const personalizedLearningKey = user ? `showPersonalizedLearning_${user.uid}` : 'showPersonalizedLearning';
    const [showPersonalizedLearning, setShowPersonalizedLearning] = useLocalStorage(personalizedLearningKey, true);
    const { setTheme } = useTheme();
    
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline">Settings</h1>
                <p className="text-muted-foreground">Manage your application preferences.</p>
            </div>

            <div className="grid gap-8">
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
