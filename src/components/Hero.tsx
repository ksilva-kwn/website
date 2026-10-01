import { Button } from "@/components/ui/button";
import GlassIcon, { type GlassIconName } from "@/components/GlassIcon";
import Globe from "@/components/globe/Globe";
import RotatingText from "@/components/hero-widgets/RotatingText";
import TerminalCard from "@/components/hero-widgets/TerminalCard";
import { certifications } from "@/components/Certifications";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ROLES = ["Cloud Architect", "DevOps Engineer", "Multi-cloud Specialist", "Kubernetes & IaC"];

const STATS = [
  { value: String(certifications.length), label: "certificações", position: "top-[8%] right-[2%]" },
  { value: "3", label: "clouds: AWS · Azure · OCI", position: "top-[44%] -left-[4%]" },
  { value: "2+", label: "anos de experiência", position: "bottom-[16%] right-[0%]" },
];

const socials: { href: string; icon: GlassIconName; label: string; external: boolean }[] = [
  { href: "https://github.com/ksilva-kwn", icon: "github", label: "GitHub", external: true },
  { href: "https://linkedin.com/in/kawansilva29", icon: "linkedin", label: "LinkedIn", external: true },
  { href: "mailto:kwnsilva@hotmail.com", icon: "email", label: "Email", external: false },
];

const Hero = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToExperience = () => {
    const element = document.getElementById("experience");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-6 items-center max-w-7xl mx-auto">
          {/* Text */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <span className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 glass-control rounded-full text-sm font-medium text-white/90">
              <img
                src={`${import.meta.env.BASE_URL}kawan.jpg`}
                alt="Kawan Aureliano da Silva"
                className="h-7 w-7 rounded-full object-cover object-top"
              />
              Olá, eu sou
            </span>

            <h1 className="mt-6 text-5xl sm:text-6xl xl:text-7xl font-semibold tracking-tighter leading-[0.95] text-white">
              Kawan Aureliano
              <br />
              da Silva
            </h1>

            <p className="mt-5 text-2xl md:text-3xl font-medium tracking-tight">
              <RotatingText words={ROLES} wordClassName="text-gradient" />
            </p>

            <p className="mt-5 text-base md:text-lg text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Especialista em Cloud Computing, Kubernetes e automação de infraestrutura. Transformando ideias em
              soluções escaláveis e eficientes.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-white/90 font-medium text-base shadow-lg hover-lift"
                onClick={scrollToExperience}
              >
                Ver Experiência
                <GlassIcon name="down" className="invert" onColor />
              </Button>

              <Button variant="outline" size="lg" asChild className="text-base hover-lift">
                <Link to="/contact">
                  Entre em Contato
                  <GlassIcon name="email" />
                </Link>
              </Button>
            </div>

            {/* Socials */}
            <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start">
              {socials.map(({ href, icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="h-11 w-11 flex items-center justify-center rounded-full glass-control hover-lift group"
                >
                  <GlassIcon name={icon} className="h-6 w-6 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Globe with floating glass stats and the terminal */}
          <div className="relative mx-auto w-full max-w-[600px] animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Globe />

            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`hidden sm:flex absolute ${stat.position} items-baseline gap-2 glass-control rounded-2xl px-4 py-2.5 animate-float`}
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <span className="text-2xl font-semibold tracking-tight text-white">{stat.value}</span>
                <span className="text-xs text-white/70">{stat.label}</span>
              </div>
            ))}

            <TerminalCard className="mt-4 lg:mt-0 lg:absolute lg:-bottom-20 lg:-left-28 w-full lg:w-[320px] text-left" />
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 h-11 w-11"
          variant="outline"
          size="icon"
          aria-label="Voltar ao topo"
        >
          <GlassIcon name="up" />
        </Button>
      )}
    </section>
  );
};

export default Hero;
