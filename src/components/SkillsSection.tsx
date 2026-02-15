import { useScrollReveal } from "@/hooks/useScrollReveal";

const skillCategories = [
  { title: "Programming & Analytics", skills: ["Python", "Pandas", "NumPy", "R", "SQL", "C"] },
  { title: "Data Analysis", skills: ["EDA", "Data Cleaning", "Data Wrangling", "Statistical Analysis", "KPI Reporting"] },
  { title: "Visualization", skills: ["Tableau", "Matplotlib", "Seaborn", "Interactive Dashboards", "Data Storytelling"] },
  { title: "Analytics Techniques", skills: ["Time-Series Forecasting", "Regression Analysis", "Sensitivity Analysis", "SMA", "Exponential Smoothing"] },
  { title: "Databases & Tools", skills: ["MySQL", "Data Modeling", "Excel", "Jupyter Notebook", "RStudio", "Git/GitHub"] },
];

const SkillsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="py-24 px-6 bg-card">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Skills</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">Technical Toolkit</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="p-6 rounded-xl border border-border bg-background hover:glow-border transition-shadow duration-300">
              <h4 className="font-semibold text-foreground mb-4">{cat.title}</h4>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs font-mono rounded-full bg-secondary text-secondary-foreground">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
