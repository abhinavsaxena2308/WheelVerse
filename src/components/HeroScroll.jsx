import { useEffect, useRef, useState, useCallback } from 'react'

const TOTAL_FRAMES = 190
const FRAME_PREFIX = '/frames/ezgif-frame-'
const FRAME_EXT = '.png'

function padNum(n, digits) {
    return String(n).padStart(digits, '0')
}

// Linear interpolation for smoothing
const lerp = (start, end, factor) => start + (end - start) * factor

export default function HeroScroll() {
    const canvasRef = useRef(null)
    const framesRef = useRef([])
    const rafRef = useRef(null)
    const sectionRef = useRef(null)

    // Animation state refs for lerping
    const scrollProgress = useRef(0)
    const smoothProgress = useRef(0)
    const lastFrameDrawn = useRef(-1)

    const [loadedCount, setLoadedCount] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [textVisible, setTextVisible] = useState(false)
    const [glowActive, setGlowActive] = useState(false)
    const [heroOpacity, setHeroOpacity] = useState(1)
    const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(false)

    // ── Draw a single frame with COVER fit ──
    const drawFrame = useCallback((idx) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const img = framesRef.current[idx]
        if (!img || !img.naturalWidth) return

        const ctx = canvas.getContext('2d', { alpha: false })
        const cw = canvas.width
        const ch = canvas.height
        const iw = img.naturalWidth
        const ih = img.naturalHeight

        const scale = Math.max(cw / iw, ch / ih)
        const drawW = iw * scale
        const drawH = ih * scale
        const drawX = (cw - drawW) / 2
        const drawY = (ch - drawH) / 2

        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, cw, ch)
        ctx.drawImage(img, drawX, drawY, drawW, drawH)
    }, [])

    // ── Resize canvas ──
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        if (framesRef.current[lastFrameDrawn.current]) {
            drawFrame(lastFrameDrawn.current)
        }
    }, [drawFrame])

    useEffect(() => {
        window.addEventListener('resize', resizeCanvas, { passive: true })
        resizeCanvas()
        return () => window.removeEventListener('resize', resizeCanvas)
    }, [resizeCanvas])

    // ── Load frames ──
    useEffect(() => {
        let mounted = true
        let loaded = 0
        framesRef.current = new Array(TOTAL_FRAMES).fill(null)

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image()
            img.decoding = 'async'
            const idx = i

            img.onload = () => {
                if (!mounted) return
                framesRef.current[idx] = img
                loaded++
                setLoadedCount(loaded)

                if (idx === 0 && lastFrameDrawn.current === -1) {
                    lastFrameDrawn.current = 0
                    drawFrame(0)
                }

                if (loaded === TOTAL_FRAMES) {
                    setIsReady(true)
                }
            }

            img.onerror = () => {
                if (!mounted) return
                loaded++
                setLoadedCount(loaded)
                if (loaded === TOTAL_FRAMES) setIsReady(true)
            }

            img.src = FRAME_PREFIX + padNum(i + 1, 3) + FRAME_EXT
        }

        return () => { mounted = false }
    }, [drawFrame])

    // ── Post-load animations ──
    useEffect(() => {
        if (!isReady) return
        setTimeout(() => setGlowActive(true), 400)
        setTimeout(() => setTextVisible(true), 200)
        setTimeout(() => setScrollIndicatorVisible(true), 1600)
    }, [isReady])

    // ── Main Render Loop with LERP ──
    useEffect(() => {
        if (!isReady) return

        const tick = () => {
            const section = sectionRef.current
            if (!section) return

            // Update actual scroll progress
            const scrollTop = window.scrollY
            const sectionTop = section.offsetTop
            const scrollable = section.offsetHeight - window.innerHeight
            const rawProgress = (scrollTop - sectionTop) / scrollable
            scrollProgress.current = Math.max(0, Math.min(1, rawProgress))

            // Smooth progress using lerp (0.1 for nice inertia)
            smoothProgress.current = lerp(smoothProgress.current, scrollProgress.current, 0.1)

            // Only draw if index changed substantially
            const targetIdx = Math.min(
                Math.floor(smoothProgress.current * (TOTAL_FRAMES - 1)),
                TOTAL_FRAMES - 1
            )

            if (targetIdx !== lastFrameDrawn.current) {
                lastFrameDrawn.current = targetIdx
                drawFrame(targetIdx)
            }

            // Sync text opacity with smooth progress
            const fadeStart = 0.05
            const fadeEnd = 0.20
            const newOpacity =
                smoothProgress.current < fadeStart ? 1
                    : smoothProgress.current > fadeEnd ? 0
                        : 1 - (smoothProgress.current - fadeStart) / (fadeEnd - fadeStart)
            setHeroOpacity(newOpacity)

            rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [isReady, drawFrame])

    const loadPct = Math.floor((loadedCount / TOTAL_FRAMES) * 100)

    return (
        <section ref={sectionRef} className="h-[400vh] relative " id="hero">
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className={`absolute inset-0 w-full h-full block transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
                    aria-label="Rotating car animation"
                    role="img"
                />

                {/* Bottom Vignette */}
                <div className="absolute inset-0 z-[2] pointer-events-none 
          bg-gradient-to-b from-black/30 via-transparent via-[12%] via-[82%] to-black/75" />

                {/* Headlight Glow */}
                <div className={`absolute left-1/4 bottom-[18%] w-[500px] h-[180px] blur-[24px] pointer-events-none z-[1] 
          bg-radial-at-center from-[#3c6eff1a] to-transparent
          transition-opacity duration-[1.8s] ${glowActive ? 'opacity-100' : 'opacity-0'}`} />

                {/* Hero Content */}
                <div
                    className="absolute top-0 left-0 right-0 pt-24 px-10 md:px-16 z-10 pointer-events-none transition-opacity duration-[0.12s]"
                    style={{ opacity: isReady ? heroOpacity : 0 }}
                >
                    <div className={`inline-flex items-center gap-2 px-3.5 py-1.25 border border-white/15 rounded-full 
            text-[10px] font-medium tracking-widest uppercase text-white/45 mb-4.5
            transition-all duration-700 delay-100 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'}`}>
                        <span className="w-1.25 h-1.25 rounded-full bg-white/50 animate-pulse" />
                        <span>2025 Edition · Black Series</span>
                    </div>

                    <h1 className="font-title text-[clamp(54px,7vw,104px)] leading-[0.9] tracking-wider text-white mb-4.5">
                        <span className={`block transition-all duration-750 delay-[0.3s] ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            THE ART OF
                        </span>
                        <span className={`block bg-gradient-to-r from-white to-[#777] bg-clip-text text-transparent
              transition-all duration-750 delay-[0.5s] ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            MOTION
                        </span>
                    </h1>

                    <p className={`text-[12px] font-light tracking-[0.22em] uppercase text-white/30 mb-7.5
            transition-all duration-750 delay-[0.7s] ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'}`}>
                        Precision-engineered. Beautifully relentless.
                    </p>

                    <div className={`flex items-center gap-4 pointer-events-auto 
            transition-all duration-750 delay-[0.9s] ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'}`}>
                        <a href="#performance" className="inline-flex items-center px-7 py-2.75 bg-white text-black no-underline text-[11px] font-semibold 
              tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#e0e0e0] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(255,255,255,0.12)]">
                            Explore Model
                        </a>
                        <a href="#technology" className="inline-flex items-center gap-2 px-5.5 py-2.75 border border-white/18 text-white/55 no-underline 
              text-[11px] font-medium tracking-widest uppercase rounded-sm bg-transparent transition-all duration-300 
              hover:border-white/40 hover:text-white/85 hover:bg-white/5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                                <circle cx="12" cy="12" r="10" /><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
                            </svg>
                            Watch Film
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div
                    className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 
            transition-opacity duration-800 ${scrollIndicatorVisible && isReady ? 'opacity-100' : 'opacity-0'}`}
                    style={{ opacity: heroOpacity > 0.1 ? heroOpacity : 0 }}
                >
                    <div className="w-px h-[50px] bg-gradient-to-b from-white/60 to-transparent origin-top animate-[scrollPulse_2s_ease_infinite]" />
                    <span className="text-[8px] font-medium tracking-[0.28em] text-white/28 uppercase">SCROLL</span>
                </div>

                {/* Loading Overlay */}
                {!isReady && (
                    <div className="absolute inset-0 bg-black z-[100] flex items-center justify-center">
                        <div className="flex flex-col items-center gap-7">
                            <div className="font-display text-[38px] font-bold tracking-wider">
                                <span className="text-white">Wheel</span><span className="text-[#555]">Verse</span>
                            </div>
                            <div className="w-[240px] h-px bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#333] to-white transition-all duration-150" style={{ width: `${loadPct}%` }} />
                            </div>
                            <p className="text-[10px] font-light tracking-widest text-white/28 uppercase font-sans">Loading {loadPct}%</p>
                        </div>
                    </div>
                )}

            </div>

            <style>{`
        @keyframes scrollPulse {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        .bg-radial-at-center {
          background: radial-gradient(ellipse at center, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
        </section>
    )
}
