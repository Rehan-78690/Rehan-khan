// app/page.jsx
import HeroSplit from "./Components/Hero";
import Navbar from "./Components/navbar"; 

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSplit />  
    </main>
  );
}
