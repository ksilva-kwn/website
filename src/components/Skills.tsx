import GlassIcon, { type GlassIconName } from "@/components/GlassIcon";
import Reveal from "@/components/effects/Reveal";
import Tilt from "@/components/effects/Tilt";
import { cn } from "@/lib/utils";

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// Exported so the logo marquee can reuse the same list
export const skillGroups: {
  label: string;
  icon: GlassIconName;
  bg: string;
  description: string;
  // Bento layout: how many columns/rows the tile spans on large screens
  span: string;
  skills: { name: string; logo: string }[];
}[] = [
  {
    label: "Cloud",
    icon: "cloud",
    bg: "bg-sky-500/10 border-sky-500/20",
    description: "Arquiteturas multi-cloud resilientes e de alta disponibilidade, com governança e FinOps.",
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    skills: [
      { name: "Azure",        logo: `${DI}/azure/azure-original.svg` },
      { name: "Oracle Cloud", logo: `${DI}/oracle/oracle-original.svg` },
      { name: "AWS",          logo: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
    ],
  },
  {
    label: "Containers & Orquestração",
    icon: "box",
    bg: "bg-blue-500/10 border-blue-500/20",
    description: "Workloads containerizados e orquestrados em clusters Kubernetes.",
    span: "sm:col-span-2 lg:col-span-2",
    skills: [
      { name: "Docker",     logo: `${DI}/docker/docker-original.svg` },
      { name: "Kubernetes", logo: `${DI}/kubernetes/kubernetes-original.svg` },
      { name: "Helm",       logo: `${DI}/helm/helm-original.svg` },
    ],
  },
  {
    label: "IaC & Automação",
    icon: "support",
    bg: "bg-purple-500/10 border-purple-500/20",
    description: "Infraestrutura como código e pipelines CI/CD.",
    span: "",
    skills: [
      { name: "Terraform",      logo: `${DI}/terraform/terraform-original.svg` },
      { name: "Ansible",        logo: `${DI}/ansible/ansible-original.svg` },
      { name: "GitHub Actions", logo: `${DI}/githubactions/githubactions-original.svg` },
    ],
  },
  {
    label: "Monitoramento",
    icon: "monitor",
    bg: "bg-green-500/10 border-green-500/20",
    description: "Monitoramento proativo e observabilidade.",
    span: "",
    skills: [
      { name: "Grafana",    logo: `${DI}/grafana/grafana-original.svg` },
      { name: "Prometheus", logo: `${DI}/prometheus/prometheus-original.svg` },
      { name: "Zabbix",     logo: `${import.meta.env.BASE_URL}logos/zabbix.svg` },
    ],
  },
  {
    label: "Sistemas Operacionais",
    icon: "server",
    bg: "bg-orange-500/10 border-orange-500/20",
    description: "Administração de servidores Linux e Windows.",
    span: "sm:col-span-1 lg:col-span-2",
    skills: [
      { name: "Linux",          logo: `${DI}/linux/linux-original.svg` },
      { name: "Windows Server", logo: `${DI}/windows11/windows11-original.svg` },
    ],
  },
  {
    label: "Scripting & Dev",
    icon: "console",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    description: "Automação com scripts e ferramentas internas.",
    span: "sm:col-span-1 lg:col-span-2",
    skills: [
      { name: "Bash",       logo: `${DI}/bash/bash-original.svg` },
      { name: "PowerShell", logo: `${DI}/powershell/powershell-original.svg` },
      { name: "Python",     logo: `${DI}/python/python-original.svg` },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Skills & <span className="text-gradient">Tecnologias</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ferramentas e tecnologias que uso no dia a dia para construir e operar infraestruturas modernas
          </p>
        </div>

        {/* Bento grid: Cloud is the large 2x2 tile, the rest fill around it */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {skillGroups.map((group, index) => {
            const featured = index === 0;
            return (
              <Reveal key={group.label} delay={index * 0.08} className={cn("rounded-3xl", group.span)}>
                <Tilt className="h-full rounded-3xl">
                  <div
                    className={cn(
                      "glass h-full rounded-3xl p-6 flex flex-col",
                      featured && "lg:p-8 justify-between",
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-xl border", group.bg)}>
                          <GlassIcon name={group.icon} className={featured ? "h-7 w-7" : undefined} />
                        </div>
                        <h3 className={cn("font-semibold text-white", featured && "text-2xl tracking-tight")}>
                          {group.label}
                        </h3>
                      </div>
                      <p className={cn("mt-3 text-sm text-white/60 leading-relaxed", featured && "lg:text-base max-w-sm")}>
                        {group.description}
                      </p>
                    </div>

                    <div className={cn("mt-6 flex flex-wrap gap-4", featured && "lg:gap-6")}>
                      {group.skills.map((skill) => (
                        <div key={skill.name} className="flex flex-col items-center gap-1.5 group/skill">
                          <div
                            className={cn(
                              "flex items-center justify-center rounded-2xl bg-white/90 shadow-md ring-1 ring-white/60 group-hover/skill:scale-110 transition-transform duration-300",
                              featured ? "w-12 h-12 p-2.5 lg:w-20 lg:h-20 lg:p-4 lg:rounded-3xl" : "w-12 h-12 p-2.5",
                            )}
                          >
                            <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" loading="lazy" />
                          </div>
                          <span className="text-xs text-white/60 group-hover/skill:text-white transition-colors text-center leading-tight">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
