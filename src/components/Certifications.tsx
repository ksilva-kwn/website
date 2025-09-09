import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const Certifications = () => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const certifications = [
    {
      title: "AWS Certified Solutions Architect - Professional",
      issuer: "Amazon Web Services",
      date: "2023",
      level: "Professional",
      description: "Certificação avançada em arquitetura de soluções AWS, cobrindo design de sistemas complexos e otimização de custos.",
      logo: "🏗️",
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    },
    {
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      date: "2023",
      level: "Professional",
      description: "Certificação oficial em administração de clusters Kubernetes, incluindo troubleshooting e manutenção.",
      logo: "⚙️",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    {
      title: "HashiCorp Terraform Associate",
      issuer: "HashiCorp",
      date: "2022",
      level: "Associate",
      description: "Competência em Infrastructure as Code usando Terraform para provisionamento de recursos cloud.",
      logo: "🔧",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    {
      title: "AWS Certified DevOps Engineer - Professional",
      issuer: "Amazon Web Services",
      date: "2022",
      level: "Professional",
      description: "Expertise em práticas DevOps na AWS, incluindo CI/CD, monitoramento e automação.",
      logo: "⚡",
      color: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    {
      title: "Docker Certified Associate",
      issuer: "Docker Inc.",
      date: "2021",
      level: "Associate",
      description: "Certificação em containerização e orquestração usando Docker e Docker Swarm.",
      logo: "🐳",
      color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    },
    {
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      date: "2021",
      level: "Fundamental",
      description: "Conhecimentos fundamentais em serviços cloud da Microsoft Azure.",
      logo: "☁️",
      color: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-tech-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Certificações</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Validando conhecimentos através das principais certificações da indústria
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-6xl mx-auto">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {certifications.map((cert, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full">
                    <Card className="h-full hover-lift bg-card/50 backdrop-blur-sm border-primary/10 group transition-all duration-500 hover:border-primary/30">
                      <CardContent className="p-6 h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-4xl mb-2 group-hover:animate-bounce">
                            {cert.logo}
                          </div>
                          <Badge className={`${cert.color} border transition-all group-hover:scale-105`}>
                            {cert.level}
                          </Badge>
                        </div>

                        {/* Title and Issuer */}
                        <div className="mb-4 flex-grow">
                          <h3 className="font-semibold text-lg mb-2 leading-tight group-hover:text-primary transition-colors">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-muted-foreground font-medium mb-2">
                            {cert.issuer}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {cert.description}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {cert.date}
                          </div>
                          <button className="p-2 rounded-lg hover:bg-primary/10 transition-colors group/btn">
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="border-primary/20 hover:border-primary/50 hover:bg-primary/10" />
              <CarouselNext className="border-primary/20 hover:border-primary/50 hover:bg-primary/10" />
            </div>
          </Carousel>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { label: "Certificações", value: certifications.length.toString() },
            { label: "Fornecedores", value: "5" },
            { label: "Níveis Professional", value: "3" },
            { label: "Anos de Experiência", value: "5+" },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg glass hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;