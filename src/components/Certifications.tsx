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
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Caminhos corrigidos para as imagens na pasta 'public'
const oracleCloudLogo = "/OCI.png";
const microsoftLogo = "/Microsoft.png";

const Certifications = () => {
  const { translations } = useLanguage();
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const certifications = [
    {
      title: translations.certifications.cert_1_title,
      issuer: translations.certifications.cert_1_issuer,
      date: translations.certifications.cert_1_date,
      level: translations.certifications.cert_1_level,
      description: translations.certifications.cert_1_description,
      logo: oracleCloudLogo,
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4EA02DCF1CC47FA3B393963C02BD5B7D06D6424403858E05A925B5DB57DA7894",
    },
    {
      title: translations.certifications.cert_2_title,
      issuer: translations.certifications.cert_2_issuer,
      date: translations.certifications.cert_2_date,
      level: translations.certifications.cert_2_level,
      description: translations.certifications.cert_2_description,
      logo: oracleCloudLogo,
      color: "bg-sky-500/10 text-sky-500 border-sky-500/20",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=560AB4D57AF389893841564B704A0EDA2BDF31ED3AC82E65468A79D5E929968D",
    },
    {
      title: translations.certifications.cert_3_title,
      issuer: translations.certifications.cert_3_issuer,
      date: translations.certifications.cert_3_date,
      level: translations.certifications.cert_3_level,
      description: translations.certifications.cert_3_description,
      logo: oracleCloudLogo,
      color: "bg-sky-500/10 text-sky-500 border-sky-500/20",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=792EC926D0D49D60EBDCC15C7944097C535BB78965DB5779C3D5B1C05C90B9B5",
    },
    {
      title: translations.certifications.cert_4_title,
      issuer: translations.certifications.cert_4_issuer,
      date: translations.certifications.cert_4_date,
      level: translations.certifications.cert_4_level,
      description: translations.certifications.cert_4_description,
      logo: microsoftLogo,
      color: "bg-sky-500/10 text-sky-500 border-sky-500/20",
      link: "https://www.credly.com/earner/earned/share/ad151c3d-cc81-45ee-afc3-7b8eda77add9",
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
              <span className="bg-gradient-primary bg-clip-text text-transparent">{translations.certifications.title}</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {translations.certifications.subtitle}
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
                          <div className="h-10 w-10 overflow-hidden flex items-center justify-center">
                            <img src={cert.logo} alt={`${cert.issuer} logo`} className="h-full w-auto" />
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
                          {cert.link && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
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
              <CarouselPrevious className="border-primary/20 hover:border-primary/50 hover:bg-primary/10" />
              <CarouselNext className="border-primary/20 hover:border-primary/50 hover:bg-primary/10" />
            </div>
          </Carousel>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { label: translations.certifications.stat_certifications, value: certifications.length.toString() },
            { label: translations.certifications.stat_years_experience, value: "2+" },
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