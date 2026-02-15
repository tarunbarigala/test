import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const projects = [
  {
    title: "Event Registration & Management System",
    tech: "Python, MySQL",
    description: "Automated event creation, registration, and attendee tracking with role-based access. Designed normalized MySQL schema (6+ tables), reducing manual processing by 80%.",
    link: "https://github.com/tarunbarigala/Event-Registration-System/tree/master",
  },
  {
    title: "Global CO2 Emissions & Clean Energy Trends",
    tech: "Tableau",
    description: "Interactive dashboard analyzing global CO2 emissions, renewable share, EV adoption, and GDP trends across 20+ years of country-level data.",
  },
  {
    title: "Netflix Content Analysis & Trends Dashboard",
    tech: "Tableau",
    description: "Dashboard analyzing 8,000+ Netflix titles across genre, release year, country, and ratings. Identified 20+ year growth trends in genre popularity.",
  },
  {
    title: "VDI Usage Trends & User Behavior Analysis",
    tech: "R",
    description: "Analyzed VDI usage for 3,000+ users studying login frequency, session duration, and peak usage via time-series analysis.",
    link: "https://github.com/tarunbarigala/regional-sales-analysis-r",
  },
  {
    title: "Speaker Recognition Using MFCC-BPNN-HHO",
    tech: "Python, Neural Networks",
    description: "Speaker recognition system using MFCC features and Backpropagation Neural Network optimized with Harris Hawks Optimization. Achieved 98% accuracy.",
    link: "https://github.com/tarunbarigala/Speaker-Recognition-System/tree/master",
  },
  {
    title: "The 2-Degree Blueprint – Climate Policy Modeling",
    tech: "EN-ROADS, Time-Series",
    description: "Modeled global greenhouse gas emission scenarios through 2100 using EN-ROADS simulator with sensitivity analysis on renewables and carbon pricing.",
    link: "https://github.com/tarunbarigala/2-degree-blueprint",
  },
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="projects" className="py-24 px-6 bg-card">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Projects</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">Featured Work</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl border border-border bg-background hover:border-primary/40 hover:glow-border transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">{project.tech}</span>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                )}
              </div>
              <h4 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">{project.title}</h4>
              <p className="text-sm text-muted-foreground flex-1">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
