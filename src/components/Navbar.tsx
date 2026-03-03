import { useEffect, useState } from 'react'

export default function Navbar() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(t)
    }, [])

    return (
        <nav className={`fixed top-4 right-6 left-6 z-[1000] h-[60px] 
      rounded-full border border-white/10 bg-[#121212]/70 backdrop-blur-xl 
      shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)]
      transition-all duration-700 ease-out 
      ${visible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}`} aria-label="Main navigation">

            <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-6 px-7">

                {/* Logo */}
                <a href="#" className="group flex shrink-0 items-center gap-2.5 no-underline" aria-label="WheelVerse Home">
                    <span className="animate-spin-slow block h-8.5 w-8.5 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <circle cx="22" cy="22" r="20" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
                            <circle cx="22" cy="22" r="3" fill="white" />
                            <line x1="22" y1="2" x2="22" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
                            <line x1="22" y1="34" x2="22" y2="42" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
                            <line x1="2" y1="22" x2="10" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
                            <line x1="34" y1="22" x2="42" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
                            <line x1="6.34" y1="6.34" x2="12" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
                            <line x1="32" y1="32" x2="37.66" y2="37.66" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
                            <line x1="37.66" y1="6.34" x2="32" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
                            <line x1="12" y1="32" x2="6.34" y2="37.66" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
                        </svg>
                    </span>
                    <span className="font-display text-[22px] font-bold leading-none tracking-wider">
                        <span className="text-white">Wheel</span><span className="text-[#666]">Verse</span>
                    </span>
                </a>

                {/* Links */}
                <ul className="ml-auto hidden items-center gap-9 list-none md:flex" role="list">
                    {['Models', 'Performance', 'Technology', 'Heritage'].map(link => (
                        <li key={link}>
                            <a href={`#${link.toLowerCase()}`}
                                className="relative text-xs font-normal uppercase tracking-widest text-[#cfcfcf] no-underline
                            transition-colors duration-300 hover:text-white
                            after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 
                            after:bg-white/60 after:transition-all after:duration-300 hover:after:w-full after:content-['']">
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a href="#configure"
                    className="bg-transparent px-5.5 py-2 shrink-0 rounded-sm border border-white/20
                    text-[11px] font-medium uppercase tracking-widest text-[#cfcfcf] no-underline
                    transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white">
                    Configure
                </a>
            </div>
        </nav>
    )
}
