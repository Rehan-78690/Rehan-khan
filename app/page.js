// app/page.jsx
import HeroSplit from "./Components/Hero";
import Navbar from "./Components/navbar"; 
import Footer from "./Components/footer";
import AboutMe from "./Components/AboutMe";
import TechMarquee from "./Components/TechStack";
import CertsShowcase from "./Components/Acheivements";
import FAQSection from "./Components/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSplit />
      <TechMarquee />
      <AboutMe />  
      <CertsShowcase showThumbnails={false} />
      <FAQSection />
      <Footer />
    </main>
  );
}
