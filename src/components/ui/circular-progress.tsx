"use client"
import * as React from "react"

import { cn } from "@/lib/utils"

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export function CircularProgress({ className, value = 0, ...props }: CircularProgressProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative h-24 w-24 flex items-center justify-center", className)} {...props}>
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <circle
          className="text-muted/20"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="transition-all duration-500 ease-out"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span className="absolute text-2xl font-bold">{value}</span>
    </div>
  )
}
