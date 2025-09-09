import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Clock } from "lucide-react";
import Header from "@/components/Header";
import InteractiveMap from "@/components/InteractiveMap";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simula o envio do email para um endpoint de API
    // Você precisa criar e configurar este endpoint no seu backend
    try {
      // Aqui você enviaria os dados do formulário para o seu backend
      // const response = await fetch("/api/send-email", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      //
      // if (response.ok) {
        toast({
          title: "Mensagem enviada!",
          description: "Obrigado pelo contato. Responderei em breve!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      // } else {
      //   throw new Error("Falha ao enviar a mensagem.");
      // }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro no envio",
        description: "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "kwnsilva@hotmail.com",
      link: "mailto:kwnsilva@hotmail.com",
      description: "Respondo em até 24h"
    },
    {
      icon: Phone,
      title: "Telefone",
      info: "+55 35 99749-6400",
      link: "tel:+5535997496400",
      description: "Segunda à Sexta, 9h-18h"
    },
    {
      icon: MapPin,
      title: "Localização",
      info: "Passos, MG",
      link: "#",
      description: "Trabalho remoto e presencial"
    },
    {
      icon: Clock,
      title: "Horário",
      info: "Seg - Sex: 9h às 18h",
      link: "#",
      description: "Timezone: GMT-3 (Brasília)"
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
      name: "Email",
      url: "mailto:kwnsilva@hotmail.com",
      username: "kwnsilva@hotmail.com"
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
              Vamos Trabalhar <span className="bg-gradient-primary bg-clip-text text-transparent">Juntos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Interessado em uma parceria? Tem um projeto em mente? 
              Entre em contato e vamos conversar sobre como posso ajudar.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="space-y-8">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover-lift">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Send className="h-6 w-6 mr-3 text-primary" />
                    Envie uma Mensagem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          name="name"
                          placeholder="Seu Nome"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-background/50 border-primary/20 focus:border-primary/50"
                        />
                      </div>
                      <div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Seu Email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-background/50 border-primary/20 focus:border-primary/50"
                        />
                      </div>
                    </div>
                    
                    <Input
                      name="subject"
                      placeholder="Assunto"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-background/50 border-primary/20 focus:border-primary/50"
                    />
                    
                    <Textarea
                      name="message"
                      placeholder="Sua mensagem..."
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-background/50 border-primary/20 focus:border-primary/50 resize-none"
                    />
                    
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
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

            {/* Contact Info & Map */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="grid gap-4">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/10 hover-lift group">
                    <CardContent className="p-6">
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
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Interactive Map */}
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <MapPin className="h-6 w-6 mr-3 text-primary" />
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
    </div>
  );
};

export default Contact;