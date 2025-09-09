import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Github, Linkedin, Clock, MapPin } from "lucide-react";
import Header from "@/components/Header";
import InteractiveMap from "@/components/InteractiveMap";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { translations } = useLanguage();
  const contactInfo = [
    {
      icon: Mail,
      title: translations.contact.email_title,
      info: translations.contact.email_info,
      link: `mailto:${translations.contact.email_info}`,
      description: translations.contact.email_description
    },
    {
      icon: Phone,
      title: translations.contact.phone_title,
      info: translations.contact.phone_info,
      link: `tel:${translations.contact.phone_info.replace(/[\s-]/g, "")}`,
      description: translations.contact.phone_description
    },
    {
      icon: Clock,
      title: translations.contact.time_title,
      info: translations.contact.time_info,
      link: "#",
      description: translations.contact.time_description
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/ksilva-kwn",
      username: "@ksilva-kwn"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/in/kawansilva29",
      username: "/in/kawansilva29"
    },
    {
      icon: Mail,
      name: translations.contact.email_title,
      url: `mailto:${translations.contact.email_info}`,
      username: translations.contact.email_info
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {translations.contact.title_part1} <span className="bg-gradient-primary bg-clip-text text-transparent">{translations.contact.title_part2}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {translations.contact.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-12 max-w-6xl mx-auto">
            {/* Top Section: Contact Info & Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-xl">{translations.contact.contact_info_title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-start">
                          <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                            <item.icon className="h-6 w-6 text-primary" />
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
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-xl">{translations.contact.social_links_title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all hover-lift group"
                        >
                          <social.icon className="h-5 w-5 text-primary mr-4" />
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
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <MapPin className="h-6 w-6 mr-3 text-primary" />
                    {translations.contact.location_title}
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
    </div>
  );
};

export default Contact;