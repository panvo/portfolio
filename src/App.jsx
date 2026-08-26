import { useTheme } from './lib/theme'
import { Background } from './components/Background'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Work } from './components/Work'
import { Flagship } from './components/Flagship'
import { Modules } from './components/Modules'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <div className="relative min-h-screen">
      <Background />
      <Nav theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Flagship />
        <Modules />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
