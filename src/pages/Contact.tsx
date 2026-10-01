import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlassIcon, { type GlassIconName } from "@/components/GlassIcon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractiveMap from "@/components/InteractiveMap";
import React from "react";

const Contact = () => {
  const contactInfo: { icon: GlassIconName; title: string; info: string; link: string; description: string }[] = [
    {
      icon: "email",
      title: "Email",
      info: "kwnsilva@hotmail.com",
      link: "mailto:kwnsilva@hotmail.com",
      description: "Respondo em até 24h"
    },
    {
      icon: "phone",
      title: "Telefone",
      info: "+55 35 99749-6400",
      link: "tel:+5535997496400",
      description: "Segunda à Sexta, 9h-18h"
    },
    {
      icon: "clock",
      title: "Horário",
      info: "Seg - Sex: 8h às 18h",
      link: "#",
      description: "Timezone: GMT-3 (Brasília)"
    },
  ];

  const socialLinks: { icon: GlassIconName; name: string; url: string; username: string }[] = [
    {
      icon: "github",
      name: "GitHub",
      url: "https://github.com/ksilva-kwn",
      username: "@ksilva-kwn"
    },
    {
      icon: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com/in/kawansilva29",
      username: "/in/kawansilva29"
    },
    {
      icon: "email",
      name: "Email",
      url: "mailto:kwnsilva@hotmail.com",
      username: "kwnsilva@hotmail.com"
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">
              Vamos Trabalhar <span className="text-gradient">Juntos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Interessado em uma parceria? Tem um projeto em mente? 
              Entre em contato e vamos conversar sobre como posso ajudar.
            </p>
          </div>

          <div className="flex flex-col gap-12 max-w-6xl mx-auto">
            {/* Top Section: Contact Info & Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">Contatos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-start">
                          <div className="p-3 glass-control rounded-2xl mr-4">
                            <GlassIcon name={item.icon} className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-foreground mb-1">
                              {item.info}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">Redes Sociais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 rounded-2xl glass-control hover-lift group"
                        >
                          <GlassIcon name={social.icon} className="h-6 w-6 mr-4" />
                          <div>
                            <div className="font-medium group-hover:text-primary transition-colors">
                              {social.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {social.username}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Section: Interactive Map */}
            <div className="space-y-8">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <GlassIcon name="marker" className="h-6 w-6 mr-3" />
                    Localização
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <InteractiveMap />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;