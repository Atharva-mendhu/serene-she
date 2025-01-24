"use client"

import { motion } from "framer-motion"

interface PentagonGraphProps {
  scores: Record<string, number>
}

export function PentagonGraph({ scores }: PentagonGraphProps) {
  const size = 400
  const center = size / 2
  const radius = size * 0.4
  const angles = Object.keys(scores).map((_, i) => (2 * Math.PI * i) / 5 - Math.PI / 2)

  // Generate points for the background pentagon
  const backgroundPoints = angles
    .map(angle => `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`)
    .join(" ")

  // Generate points for the score pentagon
  const scorePoints = angles
    .map((angle, i) => {
      const score = Object.values(scores)[i] / 100
      return `${center + radius * score * Math.cos(angle)},${center + radius * score * Math.sin(angle)}`
    })
    .join(" ")

  // Calculate overall rating based on average score
  const averageScore = Object.values(scores).reduce((a, b) => a + b, 0) / 5
  const rating = averageScore >= 90 ? "Ss+" :
                averageScore >= 80 ? "S" :
                averageScore >= 70 ? "A" :
                averageScore >= 60 ? "B" :
                averageScore >= 50 ? "C" : "D"

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full"
      >
        {/* Background pentagon - made darker */}
        <motion.polygon
          points={backgroundPoints}
          className="fill-muted/40 stroke-muted"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Score pentagon with gradient fill - made more visible */}
        <motion.polygon
          points={scorePoints}
          className="fill-primary/40 stroke-primary"
          strokeWidth="3"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Draw lines from center to each point - made thicker */}
        {angles.map((angle, i) => (
          <motion.line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            className="stroke-muted/70"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        ))}

        {/* Add labels */}
        {angles.map((angle, i) => {
          const label = Object.keys(scores)[i]
          const score = Object.values(scores)[i].toFixed(1)
          const x = center + (radius + 30) * Math.cos(angle)
          const y = center + (radius + 30) * Math.sin(angle)

          return (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <text
                x={x}
                y={y}
                textAnchor="middle"
                className="fill-foreground text-[14px] font-semibold"
                transform={`rotate(${(angle * 180) / Math.PI + 90}, ${x}, ${y})`}
              >
                {label}
              </text>
              <text
                x={center + (radius * 0.8) * Math.cos(angle)}
                y={center + (radius * 0.8) * Math.sin(angle)}
                textAnchor="middle"
                className="fill-primary text-[14px] font-bold"
              >
                {score}
              </text>
            </motion.g>
          )
        })}
      </svg>

      {/* Rating text in the center */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{rating}</div>
          <div className="text-sm text-muted-foreground">Rating {averageScore.toFixed(1)}</div>
        </div>
      </motion.div>
    </div>
  )
} 