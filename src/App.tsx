import Navbar from './components/Navbar'
import HeroScroll from './components/HeroScroll'
import SpecStrip from './components/SpecStrip'
import Features from './components/Features'
import Footer from './components/Footer'
import StarsCanvas from './components/StarsCanvas'

export default function App() {
    return (
        <div className="relative min-h-screen bg-black">
            {/* Background Star System */}
            <div className="absolute inset-0 z-0">
                <StarsCanvas />
            </div>

            <Navbar />
            <main className="relative z-10">
                <HeroScroll />
                <SpecStrip />
                <Features />
            </main>
            <Footer />
        </div>
    )
}
