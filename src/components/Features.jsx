import { useEffect, useRef } from 'react'

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
                    e.target.classList.add('opacity-100', 'translate-y-0')
                    e.target.classList.remove('opacity-0', 'translate-y-7')
                    obs.unobserve(e.target)
                }
            })
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
        cardsRef.current.forEach(el => el && obs.observe(el))
        return () => obs.disconnect()
    }, [])

    return (
        <section className="py-[120px] px-8 bg-black" id="technology" aria-label="Key features">
            <div className="max-w-[1200px] mx-auto">
                <p className="text-[10px] font-medium tracking-ultra uppercase text-white/28 mb-3.5">Engineering Excellence</p>
                <h2 className="font-title text-[clamp(40px,5vw,72px)] font-normal tracking-wider text-white mb-[60px] leading-none">Built Without Compromise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/7">
                    {cards.map((c, i) => (
                        <div
                            key={c.id}
                            ref={el => cardsRef.current[i] = el}
                            className="bg-black p-10 flex flex-col gap-3.5 opacity-0 translate-y-7 transition-all duration-700 
                         group relative overflow-hidden hover:bg-white/[0.025]"
                            style={{ transitionDelay: `${i * 0.12}s` }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent scale-x-0 transition-transform duration-400 group-hover:scale-x-100" />
                            <div className="w-11 h-11 opacity-85 group-hover:opacity-100 transition-opacity">
                                {c.icon}
                            </div>
                            <h3 className="font-display text-[17px] font-semibold tracking-wider text-white mt-2">{c.title}</h3>
                            <p className="text-[13px] font-light leading-[1.75] text-white/38">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
