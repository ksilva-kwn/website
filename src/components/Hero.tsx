import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GlassIcon, { type GlassIconName } from "@/components/GlassIcon";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

  const socials: { href: string; icon: GlassIconName; label: string; external: boolean }[] = [
    { href: "https://github.com/ksilva-kwn", icon: "github", label: "GitHub", external: true },
    { href: "https://linkedin.com/in/kawansilva29", icon: "linkedin", label: "LinkedIn", external: true },
    { href: "mailto:kwnsilva@hotmail.com", icon: "email", label: "Email", external: false },
  ];

  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 relative">
      <div className="container mx-auto px-4">
        <div className="glass rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-14 max-w-6xl mx-auto animate-fade-in-up">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14 items-center">
            {/* Text */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <span className="inline-block px-4 py-1.5 glass-control rounded-full text-sm font-medium text-foreground/90">
                👋 Olá, eu sou
              </span>

              <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.95]">
                Kawan Aureliano
                <br />
                <span className="text-gradient">da Silva</span>
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                <h2 className="text-xl md:text-2xl font-light text-foreground/90">
                  Cloud Architect
                </h2>
                <span className="glass-control rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/90">
                  DevOps Enthusiast
                </span>
              </div>

              <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Especialista em Cloud Computing, Kubernetes e automação de infraestrutura.
                Transformando ideias em soluções escaláveis e eficientes.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 text-white font-medium text-base shadow-lg hover-lift"
                  onClick={scrollToExperience}
                >
                  Ver Experiência
                  <GlassIcon name="down" onColor />
                </Button>

                <Button variant="outline" size="lg" asChild className="text-base hover-lift">
                  <Link to="/contact">
                    Entre em Contato
                    <GlassIcon name="email" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="glass rounded-full p-2.5">
                <Avatar className="w-44 h-44 md:w-64 md:h-64">
                  <AvatarImage
                    src={`${import.meta.env.BASE_URL}kawan.jpg`}
                    alt="Kawan Aureliano da Silva"
                    className="object-cover object-top"
                  />
                  <AvatarFallback className="bg-gradient-primary text-white text-3xl font-bold">
                    KS
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Footer row */}
          <div className="mt-12 pt-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
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
            <div className="text-center sm:text-right text-xs text-muted-foreground leading-relaxed">
              <a href="mailto:kwnsilva@hotmail.com" className="hover:text-foreground transition-colors">
                kwnsilva@hotmail.com
              </a>
              <div>© Kawan Silva {new Date().getFullYear()}</div>
              <a
                href="https://icons8.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Ícones por Icons8
              </a>
            </div>
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
