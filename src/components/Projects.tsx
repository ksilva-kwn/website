import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FolderGit2 } from "lucide-react";

const projects = [
  {
    name: "NFSNinja",
    url: "https://nfsninja.com.br/",
    description:
      "SaaS de gerenciamento centralizado de compartilhamentos NFS. Oferece uma interface web para visualizar, organizar e administrar volumes de rede em ambientes corporativos, sem a necessidade de acesso direto ao servidor.",
    tags: ["NFS", "SaaS", "Infraestrutura", "DevOps"],
    accent: "from-sky-500/20 to-blue-600/20",
    border: "border-sky-500/30",
  },
  {
    name: "CostNinja",
    url: "https://app.kwnsilva.com.br/",
    description:
      "Dashboard de análise e otimização de custos em ambientes cloud. Consolida gastos de múltiplos provedores em uma visão unificada, identifica desperdícios e gera recomendações de economia para times de FinOps.",
    tags: ["FinOps", "Cloud", "Azure", "OCI", "Dashboard"],
    accent: "from-purple-500/20 to-indigo-600/20",
    border: "border-purple-500/30",
  },
  {
    name: "BarberStack",
    url: "https://barberstack.kwnsilva.com.br/",
    description:
      "Sistema completo de gestão para barbearias e salões. Controle de agendamentos, clientes, serviços e fluxo de caixa em uma plataforma web responsiva, pensada para o dia a dia do negócio.",
    tags: ["SaaS", "Agendamento", "React", "Full Stack"],
    accent: "from-orange-500/20 to-amber-600/20",
    border: "border-orange-500/30",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <FolderGit2 className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Projetos</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Produtos que construí — da infraestrutura ao produto final
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`hover-lift bg-card/50 backdrop-blur-sm border-primary/10 hover:${project.border} transition-all duration-300 animate-fade-in-up overflow-hidden group`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Preview */}
              <div className={`relative h-44 bg-gradient-to-br ${project.accent} overflow-hidden`}>
                <img
                  src={`https://api.microlink.io/?url=${encodeURIComponent(project.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                  alt={`Preview ${project.name}`}
                  className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-xl font-bold text-white drop-shadow">{project.name}</span>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col gap-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/20 hover:border-primary/50 hover:bg-primary/10 mt-auto"
                  asChild
                >
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Projeto
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
