import Navbar from './components/Navbar/Navbar'
import HeroScroll from './components/HeroScroll/HeroScroll'
import SpecStrip from './components/SpecStrip/SpecStrip'
import Features from './components/Features/Features'
import Footer from './components/Footer/Footer'

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
