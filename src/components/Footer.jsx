export default function Footer() {
    return (
        <footer className="bg-surface border-t border-white/7 py-[60px] px-8 text-center" id="configure" role="contentinfo">
            <div className="max-w-[560px] mx-auto flex flex-col items-center gap-4.5">
                <div className="font-display text-[28px] font-bold tracking-wider">
                    <span className="text-white">Wheel</span><span className="text-[#555]">Verse</span>
                </div>
                <p className="text-[12px] font-light text-white/28 tracking-widest mt-1">Engineered for those who dare to move differently.</p>
                <nav className="flex gap-7 flex-wrap justify-center mt-3" aria-label="Footer navigation">
                    {['Privacy', 'Terms', 'Dealers', 'Contact'].map(l => (
                        <a key={l} href="#" className="text-white/28 no-underline text-[11px] tracking-widest uppercase transition-colors hover:text-white/65">{l}</a>
                    ))}
                </nav>
                <p className="text-[10px] text-white/12 tracking-widest mt-4">© 2025 WheelVerse Automotive GmbH. All rights reserved.</p>
            </div>
        </footer>
    )
}
