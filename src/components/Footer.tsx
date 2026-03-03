export default function Footer() {
    return (
        <footer className="bg-transparent border-white/7 border-t px-8 py-[60px] text-center" id="configure" role="contentinfo">
            <div className="mx-auto flex max-w-[560px] flex-col items-center gap-4.5">
                <div className="font-display text-[28px] font-bold tracking-wider">
                    <span className="text-white">Wheel</span><span className="text-[#555]">Verse</span>
                </div>
                <p className="mt-1 text-[12px] font-light tracking-widest text-white/28">Engineered for those who dare to move differently.</p>
                <nav className="mt-3 flex flex-wrap justify-center gap-7" aria-label="Footer navigation">
                    {['Privacy', 'Terms', 'Dealers', 'Contact'].map(l => (
                        <a key={l} href="#" className="text-[11px] uppercase tracking-widest text-white/28 no-underline transition-colors hover:text-white/65">{l}</a>
                    ))}
                </nav>
                <p className="mt-4 text-[10px] tracking-widest text-white/12">© 2025 WheelVerse Automotive GmbH. All rights reserved.</p>
            </div>
        </footer>
    )
}
