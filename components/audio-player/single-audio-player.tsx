"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, Loader2, AudioWaveform as Waveform } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SingleAudioPlayerProps {
  src: string
  title: string
  subtitle?: string
  type: "Original" | "Filtered"
  accentColor?: string
  className?: string
}

export default function SingleAudioPlayer({
  src,
  title,
  subtitle,
  type,
  accentColor = "primary",
  className,
}: SingleAudioPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const initAudio = useCallback(() => {
    if (audioRef.current) return

    setIsLoading(true)
    const audio = new Audio()
    audio.src = src
    audio.crossOrigin = "anonymous"
    audioRef.current = audio

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration)
      setIsLoading(false)
      setIsLoaded(true)
      audio.play()
      setIsPlaying(true)
    })

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime)
    })

    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      setCurrentTime(0)
    })

    // Setup Web Audio API
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    const audioContext = new AudioContextClass()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaElementSource(audio)

    source.connect(analyser)
    analyser.connect(audioContext.destination)

    analyser.fftSize = 256

    audioContextRef.current = audioContext
    analyserRef.current = analyser
    sourceRef.current = source

    drawWaveform()
  }, [src])

  const drawWaveform = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const analyser = analyserRef.current
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height

        // Gradient based on accent color
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0)

        // Use computed styles to get the actual color since canvas doesn't support CSS variables directly
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
        const accentColorVal = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()

        if (accentColor === "primary") {
           gradient.addColorStop(0, `hsla(${accentColorVal}, 0.2)`)
           gradient.addColorStop(1, `hsla(${accentColorVal}, 0.8)`)
        } else {
           gradient.addColorStop(0, `hsla(${primaryColor}, 0.1)`)
           gradient.addColorStop(1, `hsla(${primaryColor}, 0.5)`)
        }

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
    }

    draw()
  }, [accentColor])

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const handlePlayPause = () => {
    if (!isLoaded) {
      initAudio()
      return
    }

    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
      if (audioContextRef.current?.state === "suspended") {
        audioContextRef.current.resume()
      }
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume === 0) setIsMuted(true)
    else setIsMuted(false)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      const newMute = !isMuted
      audioRef.current.muted = newMute
      setIsMuted(newMute)
    }
  }

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl",
      className
    )}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <Badge variant={type === "Original" ? "outline" : "default"} className="mb-2 uppercase tracking-widest text-[10px]">
            {type}
          </Badge>
          <h4 className="text-lg font-bold font-google-sans leading-tight">{title}</h4>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary">
          <Waveform className="h-5 w-5" />
        </div>
      </div>

      <div className="relative mb-6 h-16 w-full overflow-hidden rounded-lg bg-muted/20">
        {!isLoaded && !isLoading && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 opacity-40">
            <p className="text-[10px] font-black uppercase tracking-widest">Click Play to Load</p>
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={400}
          height={64}
          className="h-full w-full"
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 shrink-0 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={handlePlayPause}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-6 w-6 fill-current" />
            ) : (
              <Play className="h-6 w-6 fill-current ml-1" />
            )}
          </Button>

          <div className="flex-1 space-y-1">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] font-bold tabular-nums text-muted-foreground uppercase tracking-widest">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground" onClick={toggleMute}>
            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}
