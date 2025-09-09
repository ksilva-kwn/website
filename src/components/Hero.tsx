import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-tech-bg.jpg";

const Hero = () => {
  const scrollToExperience = () => {
    const element = document.getElementById("experience");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Use import.meta.env.BASE_URL para construir o caminho absoluto
  const avatarPath = `${import.meta.env.BASE_URL}kawan.jpg`;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-dark opacity-80" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-tech-blue/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-tech-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-tech-cyan/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s", transform: 'translate(-50%, -50%)' }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Greeting */}
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
              👋 Olá, eu sou
            </span>
          </div>

          {/* Profile Photo */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20 shadow-2xl hover-lift">
              <AvatarImage src={avatarPath} alt="Kawan Aureliano da Silva" />
              <AvatarFallback className="bg-gradient-primary text-white text-3xl font-bold">
                KS
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name and Title */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Kawan Aureliano da Silva
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground/80 font-light">
              Solutions Architect | DevOps Enthusiast
            </h2>
          </div>

          {/* Description */}
          <div className="mb-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Especialista em Cloud Computing, Kubernetes e automação de infraestrutura. 
              Transformando ideias em soluções escaláveis e eficientes.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-white font-medium px-8 py-4 text-lg hover-lift"
              onClick={scrollToExperience}
            >
              Ver Experiência
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="border-primary/30 hover:border-primary/50 hover:bg-primary/10 px-8 py-4 text-lg hover-lift"
            >
              <Link to="/contact">
                Entre em Contato
                <Mail className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <a 
              href="https://github.com/ksilva-kwn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all hover-lift group"
            >
              <Github className="h-6 w-6 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://linkedin.com/in/kawansilva29" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all hover-lift group"
            >
              <Linkedin className="h-6 w-6 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="mailto:kwnsilva@hotmail.com"
              className="p-3 rounded-full border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all hover-lift group"
            >
              <Mail className="h-6 w-6 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;