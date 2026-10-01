import { skillGroups } from "@/components/Skills";

const TECHS = skillGroups.flatMap((group) => group.skills);

const FADE_EDGES = "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";

// Endless strip of technology logos on glass. The list is rendered twice and the
// track slides by half its width, so the loop is seamless.
const TechMarquee = () => (
  <section aria-label="Tecnologias" className="container mx-auto px-4 py-6">
    <div className="glass rounded-full max-w-6xl mx-auto py-3 overflow-hidden">
      {/* The fade mask sits on the track, not the glass: a mask on the glass would
          stop it from seeing the background */}
      <div className="overflow-hidden" style={{ maskImage: FADE_EDGES, WebkitMaskImage: FADE_EDGES }}>
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-10 pr-10">
              {TECHS.map((tech) => (
                <li key={tech.name} className="flex items-center gap-3 whitespace-nowrap">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 p-1.5 shadow">
                    <img src={tech.logo} alt="" className="h-full w-full object-contain" loading="lazy" />
                  </span>
                  <span className="text-sm font-medium text-white/75">{tech.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TechMarquee;
