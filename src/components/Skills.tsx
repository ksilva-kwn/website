import { Badge } from "@/components/ui/badge";
import { Cloud, Container, Terminal, Monitor, Server, Wrench } from "lucide-react";

const skillGroups = [
  {
    label: "Cloud",
    icon: Cloud,
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
    skills: ["Azure", "Oracle Cloud (OCI)", "AWS"],
  },
  {
    label: "Containers & Orquestração",
    icon: Container,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    skills: ["Docker", "Kubernetes", "Helm"],
  },
  {
    label: "IaC & Automação",
    icon: Wrench,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    skills: ["Terraform", "Ansible", "CI/CD"],
  },
  {
    label: "Monitoramento",
    icon: Monitor,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    skills: ["Zabbix", "Grafana", "Prometheus"],
  },
  {
    label: "Sistemas Operacionais",
    icon: Server,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    skills: ["Linux", "Windows Server"],
  },
  {
    label: "Scripting & Dev",
    icon: Terminal,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    skills: ["Bash", "PowerShell", "Shell Script", "Python"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-tech-purple/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills &{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Tecnologias
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ferramentas e tecnologias que uso no dia a dia para construir e operar infraestruturas modernas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl glass hover-lift border border-primary/10 hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${group.bg} border`}>
                    <Icon className={`h-5 w-5 ${group.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
