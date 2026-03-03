import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer} id="configure" role="contentinfo">
            <div className={styles.inner}>
                <div className={styles.logo}>
                    <span className={styles.logoWheel}>Wheel</span>
                    <span className={styles.logoVerse}>Verse</span>
                </div>
                <p className={styles.tagline}>Engineered for those who dare to move differently.</p>
                <nav className={styles.links} aria-label="Footer navigation">
                    {['Privacy', 'Terms', 'Dealers', 'Contact'].map(l => (
                        <a key={l} href="#" className={styles.link}>{l}</a>
                    ))}
                </nav>
                <p className={styles.copy}>© 2025 WheelVerse Automotive GmbH. All rights reserved.</p>
            </div>
        </footer>
    )
}
