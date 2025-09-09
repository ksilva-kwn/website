import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Experience = () => {
  const { translations } = useLanguage();
  const experiences = [
    {
      title: translations.experience.job_title_1,
      company: translations.experience.company_1,
      location: translations.experience.location_1,
      period: translations.experience.period_1,
      description: translations.experience.description_1,
      technologies: ["Azure", "OCI", "Docker", "Kubernetes", "Terraform", "Monitoring", "Zabbix", "Bash", "PowerShell", "GLPI", "Linux", "Windows Server", "Shell Script"],
      current: true,
    },
    {
      title: translations.experience.job_title_2,
      company: translations.experience.company_2,
      location: translations.experience.location_2,
      period: translations.experience.period_2,
      description: translations.experience.description_2,
      technologies: ["Azure", "OCI", "Docker", "Terraform", "Monitoring", "Zabbix", "Bash", "PowerShell", "GLPI", "Linux", "Windows Server", "Shell Script"],
      current: false,
    },
    {
      title: translations.experience.job_title_3,
      company: translations.experience.company_3,
      location: translations.experience.location_3,
      period: translations.experience.period_3,
      description: translations.experience.description_3,
      technologies: ["Linux", "Windows Server", "GLPI", "Zabbix", "Shell Script", "PowerShell"],
      current: false,
    },
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {translations.experience.title_part1} <span className="bg-gradient-primary bg-clip-text text-transparent">{translations.experience.title_part2}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {translations.experience.subtitle}
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
                            {translations.experience.current_badge}
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