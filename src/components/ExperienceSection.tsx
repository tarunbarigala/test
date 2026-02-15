import { Briefcase } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const experiences = [
  {
    title: "Data Analyst Intern",
    company: "BrainOvision Solutions Pvt. Ltd.",
    period: "Jan 2024 – Apr 2024",
    bullets: [
      "Performed EDA on structured datasets using Python (Pandas, NumPy) to identify trends and patterns.",
      "Cleaned and transformed raw datasets (1,000+ records), improving data quality and reducing inconsistencies by 25%.",
      "Built regression and classification models to evaluate predictive accuracy.",
      "Developed visualizations using Matplotlib and Seaborn to communicate findings.",
      "Generated analytical reports summarizing key KPIs for data-driven decision making.",
    ],
  },
  {
    title: "Python Intern",
    company: "ByteXL India Pvt. Ltd., Hyderabad",
    period: "Jun 2022",
    bullets: [
      "Completed intensive training on Data Structures using Python — arrays, linked lists, stacks, queues, trees.",
      "Solved 50+ coding problems to strengthen algorithmic thinking and time complexity optimization.",
      "Improved problem-solving efficiency, reducing execution time by up to 30%.",
      "Developed modular Python programs following OOP principles.",
    ],
  },
];

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="py-24 px-6">
      <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Experience</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">Where I've Worked</h3>
        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <div key={i} className="relative pl-8 border-l-2 border-border">
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Briefcase size={12} className="text-primary-foreground" />
              </div>
              <div className="mb-2">
                <h4 className="text-xl font-semibold">{exp.title}</h4>
                <p className="text-muted-foreground">{exp.company}</p>
                <span className="font-mono text-xs text-primary">{exp.period}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-muted-foreground text-sm flex gap-2">
                    <span className="text-primary mt-1.5 shrink-0">▹</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
