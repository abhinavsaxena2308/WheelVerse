import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './HeroScroll.module.css'

const TOTAL_FRAMES = 190
const FRAME_PREFIX = '/frames/ezgif-frame-'
const FRAME_EXT = '.png'

function padNum(n, digits) {
    return String(n).padStart(digits, '0')
}

export default function HeroScroll() {
    const canvasRef = useRef(null)
    const framesRef = useRef([])
    const rafRef = useRef(null)
    const lastFrameRef = useRef(-1)
    const sectionRef = useRef(null)

    const [loadedCount, setLoadedCount] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [textVisible, setTextVisible] = useState(false)
    const [glowActive, setGlowActive] = useState(false)
    const [heroOpacity, setHeroOpacity] = useState(1)
    const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(false)

    // ── Draw a single frame with COVER fit (fills 100vw × 100vh) ──
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

        // COVER: scale to fill entire viewport — no black bars, may crop edges
        const scale = Math.max(cw / iw, ch / ih)
        const drawW = iw * scale
        const drawH = ih * scale
        const drawX = (cw - drawW) / 2
        const drawY = (ch - drawH) / 2

        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, cw, ch)
        ctx.drawImage(img, drawX, drawY, drawW, drawH)
    }, [])

    // ── Resize canvas to exactly match viewport ──
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        if (framesRef.current[lastFrameRef.current]) {
            drawFrame(lastFrameRef.current)
        }
    }, [drawFrame])

    useEffect(() => {
        window.addEventListener('resize', resizeCanvas, { passive: true })
        resizeCanvas()
        return () => window.removeEventListener('resize', resizeCanvas)
    }, [resizeCanvas])

    // ── Load all frames in parallel ──
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

                // Draw frame 0 immediately so canvas isn't black during load
                if (idx === 0 && lastFrameRef.current === -1) {
                    lastFrameRef.current = 0
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

    // ── Post-load reveal sequence ──
    useEffect(() => {
        if (!isReady) return
        const t1 = setTimeout(() => setGlowActive(true), 400)
        const t2 = setTimeout(() => setTextVisible(true), 200)
        const t3 = setTimeout(() => setScrollIndicatorVisible(true), 1600)
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }, [isReady])

    // ── RAF scroll-to-frame loop ──
    useEffect(() => {
        if (!isReady) return

        function tick() {
            rafRef.current = requestAnimationFrame(tick)

            const section = sectionRef.current
            if (!section) return

            const scrollTop = window.scrollY
            const sectionTop = section.offsetTop
            const scrollable = section.offsetHeight - window.innerHeight
            const rawProgress = (scrollTop - sectionTop) / scrollable
            const progress = Math.max(0, Math.min(1, rawProgress))

            // Linear frame mapping
            const targetIdx = Math.min(
                Math.floor(progress * TOTAL_FRAMES),
                TOTAL_FRAMES - 1
            )

            if (targetIdx !== lastFrameRef.current) {
                lastFrameRef.current = targetIdx
                drawFrame(targetIdx)
            }

            // Fade hero text: starts at 5% scroll, gone by 20%
            const fadeStart = 0.05
            const fadeEnd = 0.20
            const newOpacity =
                progress < fadeStart ? 1
                    : progress > fadeEnd ? 0
                        : 1 - (progress - fadeStart) / (fadeEnd - fadeStart)
            setHeroOpacity(newOpacity)
        }

        rafRef.current = requestAnimationFrame(tick)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [isReady, drawFrame])

    const loadPct = Math.floor((loadedCount / TOTAL_FRAMES) * 100)

    return (
        <section ref={sectionRef} className={styles.section} id="hero">
            <div className={styles.sticky}>

                {/* Canvas — full viewport, black background, cover-fit */}
                <canvas
                    ref={canvasRef}
                    className={`${styles.canvas} ${isReady ? styles.canvasReady : ''}`}
                    aria-label="Rotating car animation"
                    role="img"
                />

                {/* Very subtle bottom vignette only — NOT on car body */}
                <div className={styles.vignette} aria-hidden="true" />

                {/* Headlight glow (behind canvas, subtle) */}
                <div className={`${styles.glow} ${glowActive ? styles.glowActive : ''}`} aria-hidden="true" />

                {/* ── HERO TEXT — top-left safe zone ── */}
                <div
                    className={styles.heroContent}
                    style={{ opacity: isReady ? heroOpacity : 0 }}
                    aria-label="Hero content"
                >
                    <div className={`${styles.badge} ${textVisible ? styles.badgeVisible : ''}`}>
                        <span className={styles.badgeDot} />
                        <span>2025 Edition · Black Series</span>
                    </div>

                    <h1 className={styles.title}>
                        <span className={`${styles.titleLine} ${textVisible ? styles.titleLineVisible : ''}`}
                            style={{ transitionDelay: '0.3s' }}>THE ART OF</span>
                        <span className={`${styles.titleLine} ${styles.titleLineAccent} ${textVisible ? styles.titleLineVisible : ''}`}
                            style={{ transitionDelay: '0.5s' }}>MOTION</span>
                    </h1>

                    <p className={`${styles.subtitle} ${textVisible ? styles.subtitleVisible : ''}`}>
                        Precision-engineered. Beautifully relentless.
                    </p>

                    <div className={`${styles.ctaGroup} ${textVisible ? styles.ctaGroupVisible : ''}`}>
                        <a href="#performance" className={styles.btnPrimary}>Explore Model</a>
                        <a href="#technology" className={styles.btnGhost}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
                            </svg>
                            Watch Film
                        </a>
                    </div>
                </div>

                {/* Scroll indicator — bottom-center */}
                <div className={`${styles.scrollIndicator} ${scrollIndicatorVisible && isReady ? styles.scrollIndicatorVisible : ''}`}
                    aria-label="Scroll to explore" style={{ opacity: heroOpacity > 0.1 ? heroOpacity : 0 }}>
                    <div className={styles.scrollLine} />
                    <span className={styles.scrollLabel}>SCROLL</span>
                </div>

                {/* Loading Overlay */}
                {!isReady && (
                    <div className={styles.loading} role="status" aria-live="polite">
                        <div className={styles.loadingInner}>
                            <div className={styles.loadingLogo}>
                                <span className={styles.loadingWheel}>Wheel</span>
                                <span className={styles.loadingVerse}>Verse</span>
                            </div>
                            <div className={styles.loadingTrack}>
                                <div className={styles.loadingFill} style={{ width: `${loadPct}%` }} />
                            </div>
                            <p className={styles.loadingPct}>Loading {loadPct}%</p>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}
