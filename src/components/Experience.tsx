import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GlassIcon from "@/components/GlassIcon";
import Reveal from "@/components/effects/Reveal";
import Tilt from "@/components/effects/Tilt";
import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;

// 0..1: how much of the timeline has scrolled past the middle of the screen
const useScrollProgress = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const passed = window.innerHeight * 0.6 - rect.top;
      setProgress(Math.min(1, Math.max(0, passed / rect.height)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
};

const Experience = () => {
  const timeline = useScrollProgress();
  const experiences = [
    {
      title: "Cloud Architect",
      company: "KXC Tecnologia",
      logo: `${BASE}kxc.png`,
      location: "Rio de Janeiro, Brasil (Remote)",
      period: "Jun 2026 - Current",
      description: "Working as a Cloud Architect at KXC Tecnologia, focusing on the design, implementation, and maintenance of highly scalable, secure, and optimized multi-cloud ecosystems. My main mission is to align infrastructure best practices, DevOps culture, and financial governance (FinOps) to drive business results.\n\nKey Responsibilities and Impact:\n\nMulti-Cloud Architecture: Planning and building resilient, high-availability solutions, orchestrating complex environments with a strong focus on AWS, Oracle Cloud Infrastructure (OCI) and Microsoft Azure.\n\nAutomation & DevOps Culture: Implementing Infrastructure as Code (IaC) using Terraform and creating robust CI/CD pipelines with GitHub Actions and Azure DevOps, reducing lead time and minimizing manual interventions.\n\nGovernance & FinOps: Cost management, continuous monitoring of cloud consumption, and application of resource optimization strategies to ensure maximum operational ROI.\n\nInfrastructure Modernization: Managing modern workloads focused on containerization and orchestration (Kubernetes and Docker), as well as integrating virtualization technologies across different cloud providers.",
      technologies: ["AWS", "Azure", "OCI", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Azure DevOps", "FinOps", "Linux"],
      current: true,
    },
    {
      title: "Cloud Specialist",
      company: "Statum Tecnologia",
      logo: `${BASE}logo-statum.svg`,
      location: "Ribeirão Preto, SP (Remote)",
      period: "Out 2024 - Ago 2025",
      description: "At Statum, I provided technical support and cloud infrastructure services for corporate environments, with a strong focus on Linux servers and cloud automation. I specialized in Oracle Cloud Infrastructure (OCI) and Microsoft Azure, managing virtual machines, storage solutions, and network configurations.",
      technologies: ["Azure", "OCI", "Docker", "Terraform", "Monitoring", "Zabbix", "Bash", "PowerShell", "GLPI", "Linux", "Windows Server", "Shell Script"],
      current: false,
    },
    {
      title: "Cloud Support Intern",
      company: "Statum Tecnologia",
      logo: `${BASE}logo-statum.svg`,
      location: "Ribeirão Preto, SP (Remote)",
      period: "Jan 2024 - Set 2024",
      description: "During my internship, I provided technical support for cloud environments, with a focus on Oracle Cloud Infrastructure (OCI) and Microsoft Azure. My responsibilities included incident handling and follow-up, as well as proactive monitoring using Zabbix to ensure stability and operational efficiency.",
      technologies: ["Linux", "Windows Server", "GLPI", "Zabbix", "Shell Script", "PowerShell"],
      current: false,
    },
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Experiência <span className="text-gradient">Profissional</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma jornada através das tecnologias mais modernas e desafiadoras do mercado
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          <div ref={timeline.ref} className="relative">
            {/* Timeline track, and the glowing fill that grows as you scroll */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
            <div
              className="absolute left-4 md:left-1/2 top-0 w-[2px] -translate-x-[0.5px] md:-translate-x-1/2 rounded-full bg-gradient-to-b from-sky-300 via-blue-500 to-violet-500 shadow-[0_0_12px_hsl(217_91%_60%/0.8)]"
              style={{ height: `${timeline.progress * 100}%` }}
            />

            {experiences.map((exp, index) => (
              <Reveal
                key={index}
                delay={0.1}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
                } md:w-1/2`}
              >
                {/* Timeline Dot */}
                <div className={`absolute top-6 w-4 h-4 bg-gradient-primary rounded-full ring-4 ring-white/40 ${
                  index % 2 === 0 
                    ? 'left-0 md:-left-2' 
                    : 'left-0 md:-right-2'
                }`}>
                  {exp.current && (
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping" />
                  )}
                </div>

                {/* Experience Card */}
                <Tilt max={3} className="ml-8 md:ml-0 rounded-3xl">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex flex-col space-y-2">
                      {exp.logo && (
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="h-7 w-auto object-contain object-left"
                        />
                      )}
                      <div className="flex items-start justify-between">
                        <h3 className="text-base font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        {exp.current && (
                          <Badge className="bg-gradient-primary text-white border-0">
                            Atual
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <GlassIcon name="calendar" className="h-4 w-4 mr-1.5" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <GlassIcon name="marker" className="h-4 w-4 mr-1.5" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="outline"
                          className="glass-control text-foreground/90 font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;