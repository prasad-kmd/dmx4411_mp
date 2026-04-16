"use client"

import React from "react"
import { Play, Music } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SingleAudioPlayer from "./single-audio-player"
import { Button } from "@/components/ui/button"

interface CompactAudioPlayerProps {
  src: string
  title: string
  subtitle: string
  type: "Original" | "Filtered"
  triggerLabel?: string
}

export default function CompactAudioPlayer({
  src,
  title,
  subtitle,
  type,
  triggerLabel = "Listen",
}: CompactAudioPlayerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-muted py-4 text-sm font-bold uppercase tracking-widest transition-all hover:bg-primary hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
          <Play className="h-4 w-4" />
          {triggerLabel}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-google-sans text-xl flex items-center gap-3">
             <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Music size={20} />
             </div>
             Audio Player
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <SingleAudioPlayer
            src={src}
            title={title}
            subtitle={subtitle}
            type={type}
          />
        </div>
        <div className="flex justify-end italic text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
           DMX4411 Research Asset
        </div>
      </DialogContent>
    </Dialog>
  )
}
