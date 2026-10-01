import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GlassIcon from "@/components/GlassIcon";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import React from 'react';
import { Button } from "@/components/ui/button";

const oracleCloudLogo = `${import.meta.env.BASE_URL}OCI.png`;
const microsoftLogo = `${import.meta.env.BASE_URL}Microsoft.png`;
const awsCloudLogo = `${import.meta.env.BASE_URL}AWS.png`;

// Exported so the Hero can show the certification count
export const certifications = [
    {
      title: "AWS Cloud Practitioner - CLF-C02",
      issuer: "Amazon Web Services",
      date: "2026",
      level: "Practitioner",
      description: "Conhecimentos fundamentais em serviços de nuvem da Amazon Web Services (AWS), segurança, arquitetura e modelos de faturamento.",
      logo: awsCloudLogo,
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      link: "https://www.credly.com/badges/66b21975-385b-40db-8c27-174f6316c179",
    },
    {
      title: "Oracle Cloud Infrastructure 2025 Migration Architect Professional",
      issuer: "Oracle Cloud",
      date: "2025",
      level: "Professional",
      description: "Certificação avançada para arquitetos de migração que demonstra habilidades em planejar, projetar e gerenciar migrações complexas para a Oracle Cloud.",
      logo: oracleCloudLogo,
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=044D89EF92227DA06D434541413CFD60B661C06C91FD919B6D82A6E48670B853",
    },
    {
      title: "Oracle Cloud Infrastructure 2025 Developer Professional",
      issuer: "Oracle Cloud",
      date: "2025",
      level: "Professional",
      description: "Certificação avançada para desenvolvedores que demonstra habilidades em desenvolvimento, implantação e gerenciamento de aplicações na Oracle Cloud.",
      logo: oracleCloudLogo,
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4B3A77AFD619ACBA2403771CA37DF43591E97C44D20C55B8F84526784E815174",
    },
    {
      title: "Oracle Cloud Infrastructure 2025 Certified Architect Associate",
      issuer: "Oracle Cloud",
      date: "2025",
      level: "Associate",
      description: "Certificação avançada em arquitetura de soluções de nuvem da Oracle, cobrindo design de arquitetura em nuvem complexos e otimização de custos.",
      logo: oracleCloudLogo,
      color: "bg-white/10 text-white-500 border-white-500/20",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4EA02DCF1CC47FA3B393963C02BD5B7D06D6424403858E05A925B5DB57DA7894",
    },
    {
      title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
      issuer: "Oracle Cloud",
      date: "2025",
      level: "Foundation",
      description: "Conhecimentos fundamentais em serviços cloud da Oracle.",
      logo: oracleCloudLogo,
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=560AB4D57AF389893841564B704A0EDA2BDF31ED3AC82E65468A79D5E929968D",
    },
    {
      title: "Oracle Cloud Infrastructure 2024 Certified Foundations Associate",
      issuer: "Oracle Cloud",
      date: "2024",
      level: "Foundation",
      description: "Conhecimentos fundamentais em serviços cloud da Oracle.",
      logo: oracleCloudLogo,
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=792EC926D0D49D60EBDCC15C7944097C535BB78965DB5779C3D5B1C05C90B9B5",
    },
    {
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      date: "2022",
      level: "Fundamental",
      description: "Conhecimentos fundamentais em serviços cloud da Microsoft Azure.",
      logo: microsoftLogo,
      color: "bg-sky-500/10 text-sky-500 border-sky-500/20",
      link: "https://www.credly.com/earner/earned/share/ad151c3d-cc81-45ee-afc3-7b8eda77add9",
    },
    {
      title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      issuer: "Oracle",
      date: "2025",
      level: "Foundation",
      description: "Introduz os fundamentos de Inteligência Artificial e Machine Learning com foco na aplicação prática dessas tecnologias dentro da Oracle Cloud Infrastructure.",
      logo: oracleCloudLogo,
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      link: "",
      expiration: "Jun 2028",
    },
    {
      title: "Oracle AI Database Certified Foundations Associate",
      issuer: "Oracle",
      date: "2025",
      level: "Foundation",
      description: "Valida conhecimentos fundamentais do Oracle AI Database 26ai e Oracle Autonomous AI Database, incluindo JSON, Graph, AI Vector Search, Select AI e Oracle APEX.",
      logo: oracleCloudLogo,
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      link: "",
    },
  ];

const Certifications = () => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <GlassIcon name="medal" className="h-10 w-10 mr-3" />
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              <span className="text-gradient">Certificações</span>
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
                    <Card className="h-full hover-lift group">
                      <CardContent className="p-6 h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="h-10 max-w-[120px] flex items-center justify-start shrink-0">
                            <img 
                              src={cert.logo} 
                              alt={`${cert.issuer} logo`} 
                              className="h-full w-auto object-contain" 
                            />
                          </div>
                          <Badge className={`${cert.color} border transition-all group-hover:scale-105 shrink-0 ml-2`}>
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
                        <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <GlassIcon name="calendar" className="h-4 w-4 mr-1.5" />
                            {cert.date}
                          </div>
                          {cert.link && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                <GlassIcon name="external-link" className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="h-10 w-10" />
              <CarouselNext className="h-10 w-10" />
            </div>
          </Carousel>
        </div>

      </div>
    </section>
  );
};

export default Certifications;