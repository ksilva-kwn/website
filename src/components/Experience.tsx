import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior DevOps Engineer",
      company: "Tech Solutions Inc.",
      location: "São Paulo, SP",
      period: "Jan 2023 - Atual",
      description: "Liderança na implementação de pipelines CI/CD, gerenciamento de infraestrutura Kubernetes e automação de deployments em ambientes AWS.",
      technologies: ["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins", "Python"],
      current: true,
    },
    {
      title: "Cloud Engineer",
      company: "Digital Innovations Ltd.",
      location: "Remote",
      period: "Mar 2021 - Dez 2022",
      description: "Desenvolvimento e manutenção de infraestrutura cloud escalável, otimização de custos e implementação de práticas DevOps.",
      technologies: ["Azure", "Docker", "Ansible", "GitLab CI", "Monitoring", "IaC"],
      current: false,
    },
    {
      title: "Systems Administrator",
      company: "StartUp Ventures",
      location: "Rio de Janeiro, RJ",
      period: "Jun 2019 - Fev 2021",
      description: "Administração de sistemas Linux/Windows, implementação de soluções de backup e monitoramento de infraestrutura.",
      technologies: ["Linux", "Windows Server", "VMware", "Nagios", "Shell Script", "PowerShell"],
      current: false,
    },
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experiência <span className="bg-gradient-primary bg-clip-text text-transparent">Profissional</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma jornada através das tecnologias mais modernas e desafiadoras do mercado
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
                } md:w-1/2 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot */}
                <div className={`absolute top-6 w-4 h-4 bg-primary rounded-full border-4 border-background ${
                  index % 2 === 0 
                    ? 'left-0 md:-left-2' 
                    : 'left-0 md:-right-2'
                }`}>
                  {exp.current && (
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping" />
                  )}
                </div>

                {/* Experience Card */}
                <Card className="ml-8 md:ml-0 hover-lift bg-card/50 backdrop-blur-sm border-primary/10">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        {exp.current && (
                          <Badge className="bg-gradient-primary text-white border-0">
                            Atual
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center text-primary font-medium">
                        <Building2 className="h-4 w-4 mr-2" />
                        {exp.company}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;