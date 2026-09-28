import Navbar from "./components/Navbar";
import AIAssistant from "./components/AIAssistant";
import {
  Hero,
  TrustBar,
  About,
  Specialties,
  MenuSection,
  Gallery,
  Testimonials,
  Reservation,
  Location,
  Footer,
} from "./components/Sections";

export default function App() {
  return (
    <div className="min-h-screen bg-cream font-sans text-espresso">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Specialties />
        <MenuSection />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Location />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
