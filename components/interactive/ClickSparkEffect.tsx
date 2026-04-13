'use client'

import { useEffect, useCallback } from 'react'
import { useThemeStore } from '@/lib/theme-store'
import type { SparkParticle } from '@/lib/types'

export function ClickSparkEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<SparkParticle[]>([])
  const animationFrameRef = useRef<number>()
  const { accent } = useThemeStore()

  const getAccentColor = useCallback(() => {
    const colors: Record<string, string> = {
      blue: '#3b82f6',
      purple: '#a855f7',
      green: '#22c55e',
      orange: '#f97316',
      pink: '#ec4899',
      cyan: '#06b6d4',
      red: '#ef4444',
    }
    return colors[accent] || colors.blue
  }, [accent])

  const createParticles = useCallback((x: number, y: number) => {
    const color = getAccentColor()
    const particleCount = Math.floor(Math.random() * 4) + 8 // 8-12 particles
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount
      const velocity = Math.random() * 3 + 2
      const life = Math.random() * 300 + 200
      
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life,
        maxLife: life,
        color: color,
        size: Math.random() * 3 + 1,
      })
    }
  }, [getAccentColor])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.life -= 16 // ~60fps
      
      if (particle.life <= 0) return false

      // Apply gravity
      particle.vy += 0.15

      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Calculate opacity based on life
      const opacity = particle.life / particle.maxLife

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba')
      ctx.fill()

      return true
    })

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const handleClick = (e: MouseEvent) => {
      // Ignore clicks on interactive elements
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, select, textarea')) return
      
      createParticles(e.clientX, e.clientY)
    }

    window.addEventListener('click', handleClick)
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('click', handleClick)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [createParticles, animate])

  return (
    <canvas
      ref={canvasRef}
      id="spark-canvas"
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  )
}
