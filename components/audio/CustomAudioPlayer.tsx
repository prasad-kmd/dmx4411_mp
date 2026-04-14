"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  RotateCcw,
  Loader2,
  AudioLines
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatTime } from "@/lib/utils";

interface CustomAudioPlayerProps {
  src: string;
  label: string;
  className?: string;
}

export function CustomAudioPlayer({ src, label, className }: CustomAudioPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const loadAudio = () => {
    setIsLoading(true);
    setIsLoaded(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      audioRef.current.muted = newMuteState;
    }
  };

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  return (
    <div className={cn(
      "p-4 rounded-xl border bg-card shadow-sm space-y-4",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AudioLines size={18} className="text-primary" />
          <span className="text-sm font-semibold">{label}</span>
        </div>
        {isLoaded && (
          <a
            href={src}
            download
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Download size={16} />
          </a>
        )}
      </div>

      {!isLoaded ? (
        <div className="h-24 flex flex-col items-center justify-center border-2 border-dashed rounded-lg bg-muted/20 gap-3">
          <p className="text-xs text-muted-foreground italic">Audio not loaded for performance</p>
          <Button size="sm" onClick={loadAudio}>
            Load Audio File
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <audio
            ref={audioRef}
            src={src}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <Loader2 className="animate-spin text-primary" size={24} />
            </div>
          ) : (
            <>
              {/* Progress and Time */}
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Main Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={resetAudio}
                  >
                    <RotateCcw size={16} />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  {/* Playback Speed */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 text-[11px] font-mono">
                        {playbackRate}x
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <DropdownMenuItem
                          key={rate}
                          onClick={() => changePlaybackRate(rate)}
                          className={cn(playbackRate === rate && "bg-accent")}
                        >
                          {rate}x
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Volume */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
                        {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-12 p-3" side="top">
                      <div className="h-24 flex justify-center">
                        <Slider
                          orientation="vertical"
                          value={[isMuted ? 0 : volume]}
                          max={1}
                          step={0.01}
                          onValueChange={handleVolumeChange}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
