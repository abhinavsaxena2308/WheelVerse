interface Section {
    id: number;
    start: number;
    end: number;
    title: string;
    desc: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const SECTIONS: Section[] = [
    {
        id: 1,
        start: 0.22,
        end: 0.42,
        title: 'Precision Aero',
        desc: 'Dual-plane active spoilers and underbody channels engineered for zero lift at high velocities.',
        position: 'top-right',
    },
    {
        id: 2,
        start: 0.48,
        end: 0.68,
        title: 'Monocoque Core',
        desc: 'High-tensile carbon fiber chassis providing unparalleled rigidity and occupant safety.',
        position: 'top-left',
    },
    {
        id: 3,
        start: 0.74,
        end: 0.94,
        title: 'Direct Drive',
        desc: 'Quad-motor architecture delivering 1,200hp with millisecond torque vectoring accuracy.',
        position: 'bottom-right',
    }
]

export default function TextOverlay({ progress }: { progress: number }) {
    return (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {SECTIONS.map((s) => {
                const mid = (s.start + s.end) / 2
                const windowSize = s.end - s.start

                const distance = Math.abs(progress - mid)
                const intensity = Math.max(0, 1 - (distance / (windowSize / 1.8)))

                const isActive = intensity > 0

                const posStyles = {
                    'top-left': 'top-[18%] left-[10%] items-start text-left',
                    'top-right': 'top-[18%] right-[10%] items-end text-right',
                    'bottom-left': 'bottom-[18%] left-[10%] items-start text-left',
                    'bottom-right': 'bottom-[18%] right-[10%] items-end text-right',
                }[s.position]

                return (
                    <div
                        key={s.id}
                        className={`absolute flex max-w-[420px] flex-col gap-3 transition-transform duration-500 ease-out ${posStyles}`}
                        style={{
                            opacity: intensity,
                            transform: `translateY(${(1 - intensity) * 30}px) scale(${0.98 + intensity * 0.02})`,
                            filter: `blur(${(1 - intensity) * 4}px)`,
                            visibility: isActive ? 'visible' : 'hidden'
                        }}
                    >
                        <div className={`h-px bg-white/30 transition-all duration-1000 ${isActive ? 'w-24' : 'w-0'}`} />
                        <h2 className="font-title text-[clamp(28px,4vw,48px)] uppercase leading-none tracking-widest text-white">
                            {s.title}
                        </h2>
                        <p className="font-light uppercase leading-relaxed tracking-[0.18em] text-white/45 text-[11px] md:text-[13px]">
                            {s.desc}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
