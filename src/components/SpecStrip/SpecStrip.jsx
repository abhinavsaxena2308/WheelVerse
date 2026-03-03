import { useEffect, useRef } from 'react'
import styles from './SpecStrip.module.css'

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
                    e.target.classList.add(styles.itemVisible)
                    obs.unobserve(e.target)
                }
            })
        }, { threshold: 0.4 })
        itemsRef.current.forEach(el => el && obs.observe(el))
        return () => obs.disconnect()
    }, [])

    return (
        <section className={styles.strip} id="performance" aria-label="Vehicle specifications">
            <div className={styles.inner}>
                {specs.map((s, i) => (
                    <>
                        <div
                            key={s.label}
                            ref={el => itemsRef.current[i] = el}
                            className={styles.item}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <span className={styles.value}>
                                {s.value}
                                {s.unit && <small>{s.unit}</small>}
                            </span>
                            <span className={styles.label}>{s.label}</span>
                        </div>
                        {i < specs.length - 1 && (
                            <div key={`div-${i}`} className={styles.divider} aria-hidden="true" />
                        )}
                    </>
                ))}
            </div>
        </section>
    )
}
