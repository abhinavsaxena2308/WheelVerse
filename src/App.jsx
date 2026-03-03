import Navbar from './components/Navbar'
import HeroScroll from './components/HeroScroll'
import SpecStrip from './components/SpecStrip'
import Features from './components/Features'
import Footer from './components/Footer'

export default function App() {
    return (
        <>
            <Navbar />
            <main>
                <HeroScroll />
                <SpecStrip />
                <Features />
            </main>
            <Footer />
        </>
    )
}
