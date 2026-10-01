"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

type LngLat = [number, number]

// Network hubs (lng, lat) and the links drawn between them.
const HUBS: LngLat[] = [
  [55.27, 25.2], // Dubai
  [67.0, 24.86], // Karachi
  [-0.12, 51.5], // London
  [-74.0, 40.7], // New York
  [103.8, 1.35], // Singapore
  [151.2, -33.9], // Sydney
  [18.4, -33.9], // Cape Town
  [-46.6, -23.5], // Sao Paulo
  [139.7, 35.7], // Tokyo
  [37.6, 55.7], // Moscow
]
const LINKS: [number, number][] = [
  [0, 1], [0, 2], [0, 4], [0, 3], [2, 3], [0, 8], [4, 5], [0, 6], [3, 7], [2, 9], [4, 8],
]

export default function RotatingEarth({ width = 720, height = 560, className = "" }: RotatingEarthProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!wrap || !canvas || !ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const projection = d3.geoOrthographic().clipAngle(90).precision(0.4)
    const path = d3.geoPath(projection, ctx)
    const rotation: [number, number] = [-48, -18] // faces the Gulf / South Asia first

    let w = width
    let h = height
    let land: any = null
    let dots: LngLat[] = []
    let visible = true
    let raf = 0
    let last = performance.now()
    let disposed = false

    const resize = () => {
      const boxW = wrap.getBoundingClientRect().width || width
      w = Math.min(width, Math.max(260, boxW))
      h = Math.min(height, Math.max(280, w * 0.82))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      projection.translate([w / 2, h / 2]).scale(Math.min(w, h) * 0.42)
    }

    const draw = (time: number) => {
      const cx = w / 2
      const cy = h / 2
      const r = projection.scale()
      const center: LngLat = [-rotation[0], -rotation[1]]
      projection.rotate(rotation)
      ctx.clearRect(0, 0, w, h)

      // Atmosphere glow
      const glow = ctx.createRadialGradient(cx, cy, r * 0.96, cx, cy, r * 1.32)
      glow.addColorStop(0, "rgba(255,23,103,0.28)")
      glow.addColorStop(0.45, "rgba(60,150,220,0.10)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.32, 0, Math.PI * 2)
      ctx.fill()

      // Ocean sphere
      const sea = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r)
      sea.addColorStop(0, "#0d3150")
      sea.addColorStop(1, "#06182a")
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = sea
      ctx.fill()

      if (land) {
        // Land tint + coastline
        ctx.beginPath()
        path(land)
        ctx.fillStyle = "rgba(70,170,210,0.10)"
        ctx.fill()
        ctx.strokeStyle = "rgba(150,225,245,0.35)"
        ctx.lineWidth = 0.8
        ctx.stroke()

        // Halftone dots, brighter toward the centre of the disc
        for (const d of dots) {
          const dist = d3.geoDistance(d, center)
          if (dist > Math.PI / 2) continue
          const p = projection(d)
          if (!p) continue
          ctx.globalAlpha = 0.2 + 0.7 * Math.cos(dist)
          ctx.fillStyle = "#9fd8ee"
          ctx.beginPath()
          ctx.arc(p[0], p[1], 0.95, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }

      // Network arcs with travelling pulses
      LINKS.forEach(([a, b], i) => {
        const line = { type: "LineString", coordinates: [HUBS[a], HUBS[b]] } as any
        ctx.beginPath()
        path(line)
        ctx.strokeStyle = "rgba(255,61,127,0.45)"
        ctx.lineWidth = 1.1
        ctx.stroke()

        const t = (((time / 3800 + i * 0.173) % 1) + 1) % 1
        const pt = d3.geoInterpolate(HUBS[a], HUBS[b])(t) as LngLat
        if (d3.geoDistance(pt, center) < Math.PI / 2) {
          const p = projection(pt)
          if (p) {
            ctx.beginPath()
            ctx.arc(p[0], p[1], 2.1, 0, Math.PI * 2)
            ctx.fillStyle = "#ffffff"
            ctx.shadowColor = "#ff1767"
            ctx.shadowBlur = 10
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      })

      // Hub markers with pulsing rings
      HUBS.forEach((hub, i) => {
        if (d3.geoDistance(hub, center) > Math.PI / 2) return
        const p = projection(hub)
        if (!p) return
        const pulse = (((time / 1800 + i * 0.21) % 1) + 1) % 1
        ctx.beginPath()
        ctx.arc(p[0], p[1], 3 + pulse * 11, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,23,103,${(1 - pulse) * 0.7})`
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(p[0], p[1], 3, 0, Math.PI * 2)
        ctx.fillStyle = "#ff1767"
        ctx.fill()
      })

      // Light sheen + rim
      const sheen = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.45, 0, cx - r * 0.4, cy - r * 0.45, r * 1.1)
      sheen.addColorStop(0, "rgba(255,255,255,0.12)")
      sheen.addColorStop(1, "rgba(255,255,255,0)")
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = sheen
      ctx.fill()
      ctx.strokeStyle = "rgba(255,255,255,0.22)"
      ctx.lineWidth = 1.2
      ctx.stroke()
    }

    const frame = (now: number) => {
      const dt = Math.min(64, now - last)
      last = now
      if (visible) {
        if (!reduceMotion) rotation[0] += dt * 0.0075
        draw(reduceMotion ? 0 : now)
      }
      raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(wrap)

    resize()
    raf = requestAnimationFrame(frame)

    // Land outline + pre-computed halftone dots are served from /public, so the globe never
    // depends on a third party and no heavy geometry work happens in the browser.
    Promise.all([
      fetch("/data/land-110m.json").then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
      fetch("/data/land-dots.json").then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
    ])
      .then(([landJson, dotsJson]) => {
        if (disposed) return
        land = landJson
        dots = dotsJson
      })
      .catch(() => {
        // Globe still renders (ocean + network) without land.
      })

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [width, height])

  return (
    <div ref={wrapRef} className={`earth-orbit relative select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none mx-auto block max-w-full"
        aria-hidden="true"
      />
    </div>
  )
}
