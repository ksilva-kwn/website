import { Cloud, Container, Terminal, Monitor, Server, Wrench } from "lucide-react";

const BASE = "https://cdn.simpleicons.org";

const skillGroups = [
  {
    label: "Cloud",
    icon: Cloud,
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
    skills: [
      { name: "Azure",        logo: `${BASE}/microsoftazure/60a5ea` },
      { name: "Oracle Cloud", logo: `${BASE}/oracle/f80000` },
      { name: "AWS",          logo: `${BASE}/amazonaws/ff9900` },
    ],
  },
  {
    label: "Containers & Orquestração",
    icon: Container,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    skills: [
      { name: "Docker",     logo: `${BASE}/docker/2496ed` },
      { name: "Kubernetes", logo: `${BASE}/kubernetes/326ce5` },
      { name: "Helm",       logo: `${BASE}/helm/0f1689` },
    ],
  },
  {
    label: "IaC & Automação",
    icon: Wrench,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    skills: [
      { name: "Terraform",      logo: `${BASE}/terraform/7b42bc` },
      { name: "Ansible",        logo: `${BASE}/ansible/ee0000` },
      { name: "GitHub Actions", logo: `${BASE}/githubactions/2088ff` },
    ],
  },
  {
    label: "Monitoramento",
    icon: Monitor,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    skills: [
      { name: "Zabbix",     logo: `${BASE}/zabbix/d40000` },
      { name: "Grafana",    logo: `${BASE}/grafana/f46800` },
      { name: "Prometheus", logo: `${BASE}/prometheus/e6522c` },
    ],
  },
  {
    label: "Sistemas Operacionais",
    icon: Server,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    skills: [
      { name: "Linux",          logo: `${BASE}/linux/ffffff` },
      { name: "Windows Server", logo: `${BASE}/windows/00adef` },
    ],
  },
  {
    label: "Scripting & Dev",
    icon: Terminal,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    skills: [
      { name: "Bash",       logo: `${BASE}/gnubash/4eaa25` },
      { name: "PowerShell", logo: `${BASE}/powershell/5391fe` },
      { name: "Python",     logo: `${BASE}/python/3776ab` },
    ],
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
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2 rounded-lg ${group.bg} border`}>
                    <Icon className={`h-5 w-5 ${group.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground">{group.label}</h3>
                </div>

                <div className="flex flex-wrap gap-4">
                  {group.skills.map((skill, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 group/skill">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/5 border border-primary/10 group-hover/skill:border-primary/30 group-hover/skill:bg-primary/10 transition-all duration-200 p-2">
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground group-hover/skill:text-foreground transition-colors text-center leading-tight">
                        {skill.name}
                      </span>
                    </div>
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
