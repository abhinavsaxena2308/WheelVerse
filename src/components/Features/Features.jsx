import { useEffect, useRef } from 'react'
import styles from './Features.module.css'

const cards = [
    {
        id: 'feat-1',
        icon: (
            <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <path d="M16 24l6 6 10-12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Adaptive Air Suspension',
        desc: 'Real-time terrain scanning adjusts ride height in milliseconds for perfect road contact.',
    },
    {
        id: 'feat-2',
        icon: (
            <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <path d="M24 14v10l6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="24" cy="24" r="3" fill="white" />
            </svg>
        ),
        title: 'Neural Drive Mode',
        desc: 'AI-powered driving dynamics that learn your style and adapt torque distribution on the fly.',
    },
    {
        id: 'feat-3',
        icon: (
            <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <path d="M18 30c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M24 18v2M16.5 20.5l1.4 1.4M31.5 20.5l-1.4 1.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
        title: 'LED Matrix Headlights',
        desc: '84-pixel adaptive matrix cuts through any condition with zero glare for oncoming traffic.',
    },
    {
        id: 'feat-4',
        icon: (
            <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <rect x="14" y="18" width="20" height="12" rx="2" stroke="white" strokeWidth="1.5" />
                <path d="M20 18v-2a4 4 0 018 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: 'Vault-Grade Security',
        desc: 'Biometric ignition, encrypted LTE module, and real-time tracking via the WheelVerse app.',
    },
]

export default function Features() {
    const cardsRef = useRef([])

    useEffect(() => {
        if (!('IntersectionObserver' in window)) return
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add(styles.cardVisible)
                    obs.unobserve(e.target)
                }
            })
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
        cardsRef.current.forEach(el => el && obs.observe(el))
        return () => obs.disconnect()
    }, [])

    return (
        <section className={styles.section} id="technology" aria-label="Key features">
            <div className={styles.inner}>
                <p className={styles.eyebrow}>Engineering Excellence</p>
                <h2 className={styles.title}>Built Without Compromise</h2>
                <div className={styles.grid}>
                    {cards.map((c, i) => (
                        <div
                            key={c.id}
                            ref={el => cardsRef.current[i] = el}
                            className={styles.card}
                            style={{ transitionDelay: `${i * 0.12}s` }}
                        >
                            <div className={styles.icon}>{c.icon}</div>
                            <h3 className={styles.cardTitle}>{c.title}</h3>
                            <p className={styles.cardDesc}>{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
