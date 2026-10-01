import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import TechMarquee from "@/components/TechMarquee";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <TechMarquee />
      <Skills />
      <Experience />
      <Certifications />
      <Footer />
    </div>
  );
};

export default Index;
