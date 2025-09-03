// app/page.jsx
import HeroSplit from "./Components/Hero";
import Navbar from "./Components/navbar"; 
import Footer from "./Components/footer";
import AboutMe from "./Components/AboutMe";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSplit />
      <AboutMe />  
      <Footer />
    </main>
  );
}
