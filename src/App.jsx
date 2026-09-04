import { useTheme } from './lib/theme'
import { useSmoothScroll } from './lib/useSmoothScroll'
import { Background } from './components/Background'
import { CursorGlow } from './components/CursorGlow'
import { SideNav } from './components/SideNav'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { About } from './components/About'
import { Recognition } from './components/Recognition'
import { Skills } from './components/Skills'
import { Flagship } from './components/Flagship'
import { CaseStudy } from './components/CaseStudy'
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
      <a href="#top" className="skip-link">Skip to content</a>
      <Background />
      <CursorGlow />
      <SideNav />
      <Nav theme={theme} toggle={toggle} />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Recognition />
        <Skills />
        <Flagship />
        <CaseStudy />
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
