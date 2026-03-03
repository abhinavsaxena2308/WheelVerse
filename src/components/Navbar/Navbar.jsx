import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(t)
    }, [])

    return (
        <nav className={`${styles.navbar} ${visible ? styles.visible : ''}`} aria-label="Main navigation">
            <div className={styles.inner}>

                {/* Logo */}
                <a href="#" className={styles.logo} aria-label="WheelVerse Home">
                    <span className={styles.logoIcon}>
                        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <circle cx="22" cy="22" r="20" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
                            <circle cx="22" cy="22" r="3" fill="white" />
                            {/* 8 spokes */}
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
                    <span className={styles.logoText}>
                        <span className={styles.logoWheel}>Wheel</span><span className={styles.logoVerse}>Verse</span>
                    </span>
                </a>

                {/* Links */}
                <ul className={styles.links} role="list">
                    {['Models', 'Performance', 'Technology', 'Heritage'].map(link => (
                        <li key={link}>
                            <a href={`#${link.toLowerCase()}`} className={styles.link}>{link}</a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a href="#configure" className={styles.cta}>Configure</a>
            </div>
        </nav>
    )
}
