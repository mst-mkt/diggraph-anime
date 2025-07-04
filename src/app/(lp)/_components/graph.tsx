'use client'

import { VisGraph, VisSingleContainer } from '@unovis/react'
import { GraphLayoutType } from '@unovis/ts'
import { useEffect, useState } from 'react'

const getRandomLink = () => {
  return [...Array(100)].map((_, i) => ({
    source: i.toString(),
    target: Math.floor(Math.random() * 100).toString(),
  }))
}

export const Graph = () => {
  const [randomNode] = useState(
    [...Array(100)].map((_, i) => ({
      id: i.toString(),
    })),
  )
  const [randomLink, setRandomLink] = useState(getRandomLink())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomLink(getRandomLink())
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <VisSingleContainer
      data={{ nodes: randomNode, links: randomLink }}
      className="absolute top-0 left-0 h-svh w-svw overflow-hidden"
    >
      <VisGraph
        layoutType={GraphLayoutType.Force}
        forceLayoutSettings={{
          forceXStrength: 0.2,
          forceYStrength: 0.2,
          charge: -7000,
        }}
        nodeShape="square"
        nodeSize={64}
        nodeFill="var(--color-background)"
        nodeStroke="var(--color-border)"
        linkStroke="var(--color-border)"
      />
    </VisSingleContainer>
  )
}
