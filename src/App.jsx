import { useTheme } from './lib/theme'
import { useSmoothScroll } from './lib/useSmoothScroll'
import { Background } from './components/Background'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Flagship } from './components/Flagship'
import { Modules } from './components/Modules'
import { Tour } from './components/Tour'
import { Experience } from './components/Experience'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  const { theme, toggle } = useTheme()
  useSmoothScroll()
  return (
    <div className="relative min-h-screen">
      <Background />
      <Nav theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Flagship />
        <Modules />
        <Tour />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
