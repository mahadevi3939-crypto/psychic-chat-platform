"use client"

import { useEffect, useState, memo } from "react"

type Props = {
  value: number
  duration?: number
}

function AnimatedNumberComponent({
  value,
  duration = 400,
}: Props) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    let start = displayValue
    let startTime: number | null = null

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      const current = Math.floor(
        start + (value - start) * percentage
      )

      setDisplayValue(current)

      if (percentage < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  return <>{displayValue}</>
}

export const AnimatedNumber = memo(AnimatedNumberComponent)
