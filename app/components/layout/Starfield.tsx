"use client"

import { useEffect, useRef } from "react"

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const lastFrame = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    const STAR_COUNT = 50

    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2,
      opacity: Math.random(),
      speed: Math.random() * 0.2 + 0.05,
    }))

    const FPS = 30
    const FRAME_INTERVAL = 1000 / FPS

    function animate(timestamp: number) {
      if (!ctx) return

      if (timestamp - lastFrame.current < FRAME_INTERVAL) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastFrame.current = timestamp

      ctx.clearRect(0, 0, width, height)

      stars.forEach((star) => {
        star.y += star.speed

        if (star.y > height) {
          star.y = 0
          star.x = Math.random() * width
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124, 58, 237, ${star.opacity * 0.35})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    function handleVisibility() {
      if (document.hidden) {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
      } else {
        lastFrame.current = 0
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    function handleResize() {
      const canvasEl = canvasRef.current
      if (!canvasEl) return

      width = window.innerWidth
      height = window.innerHeight
      canvasEl.width = width
      canvasEl.height = height
    }

    document.addEventListener("visibilitychange", handleVisibility)
    window.addEventListener("resize", handleResize)

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
      document.removeEventListener("visibilitychange", handleVisibility)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.22,
      }}
    />
  )
}
