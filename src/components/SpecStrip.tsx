import { useEffect, useRef } from 'react'

interface Spec {
    value: string;
    unit: string;
    label: string;
}

const specs: Spec[] = [
    { value: '2.9', unit: 's', label: '0–100 km/h' },
    { value: '340', unit: 'hp', label: 'Peak Power' },
    { value: '290', unit: 'km/h', label: 'Top Speed' },
    { value: 'AWD', unit: '', label: 'Drive System' },
]

export default function SpecStrip() {
    const itemsRef = useRef<(HTMLDivElement | null)[]>([])

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
        <section className="bg-transparent border-y border-white/7 py-[52px]" id="performance" aria-label="Vehicle specifications">
            <div className="mx-auto flex max-w-[860px] flex-wrap items-center justify-center gap-12 px-8">
                {specs.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-12">
                        <div
                            ref={(el) => { itemsRef.current[i] = el; }}
                            className="flex translate-y-[18px] flex-col items-center gap-1.5 opacity-0 text-center transition-all duration-[0.6s]"
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <span className="font-title leading-none text-[56px] font-normal tracking-wide text-white">
                                {s.value}
                                {s.unit && <small className="text-white/35 ml-0.5 text-2xl">{s.unit}</small>}
                            </span>
                            <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-[#6a6a6a]">{s.label}</span>
                        </div>
                        {i < specs.length - 1 && (
                            <div className="bg-white/7 hidden h-12 w-px sm:block" aria-hidden="true" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
