import { useEffect, useRef } from 'react'

const specs = [
    { value: '2.9', unit: 's', label: '0–100 km/h' },
    { value: '340', unit: 'hp', label: 'Peak Power' },
    { value: '290', unit: 'km/h', label: 'Top Speed' },
    { value: 'AWD', unit: '', label: 'Drive System' },
]

export default function SpecStrip() {
    const itemsRef = useRef([])

    useEffect(() => {
        if (!('IntersectionObserver' in window)) return
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('opacity-100', 'translate-y-0')
                    e.target.classList.remove('opacity-0', 'translate-y-[18px]')
                    obs.unobserve(e.target)
                }
            })
        }, { threshold: 0.4 })
        itemsRef.current.forEach(el => el && obs.observe(el))
        return () => obs.disconnect()
    }, [])

    return (
        <section className="bg-surface border-y border-white/7 py-[52px]" id="performance" aria-label="Vehicle specifications">
            <div className="max-w-[860px] mx-auto px-8 flex items-center justify-center flex-wrap gap-12">
                {specs.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-12">
                        <div
                            ref={el => itemsRef.current[i] = el}
                            className="flex flex-col items-center gap-1.5 text-center opacity-0 translate-y-[18px] transition-all duration-[0.6s]"
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <span className="font-title text-[56px] font-normal tracking-wide text-white leading-none">
                                {s.value}
                                {s.unit && <small className="text-2xl text-white/35 ml-0.5">{s.unit}</small>}
                            </span>
                            <span className="text-[10px] font-normal tracking-[0.22em] uppercase text-[#6a6a6a]">{s.label}</span>
                        </div>
                        {i < specs.length - 1 && (
                            <div className="hidden sm:block w-px h-12 bg-white/7" aria-hidden="true" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
