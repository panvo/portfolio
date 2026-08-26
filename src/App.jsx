import { Background } from './components/Background'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { About } from './components/About'
import { Flagship } from './components/Flagship'
import { Modules } from './components/Modules'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Flagship />
        <Modules />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
