"use client";

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Lightbulb } from "lucide-react";
import PersonalizedLearningContent from "./PersonalizedLearning";

interface PersonalizedLearningModalProps {
    setOpen: (open: boolean) => void;
}

export default function PersonalizedLearningModal({ setOpen }: PersonalizedLearningModalProps) {
  return (
    <DialogContent>
        <DialogHeader>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-full">
                    <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <DialogTitle className="font-headline text-xl text-primary">Your Personalized Next Step</DialogTitle>
                    <DialogDescription className="mt-1">Our AI has analyzed your progress to suggest what you should learn next.</DialogDescription>
                </div>
            </div>
        </DialogHeader>
        <PersonalizedLearningContent setOpen={setOpen} />
    </DialogContent>
  );
}
