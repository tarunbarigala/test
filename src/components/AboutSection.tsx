import { useScrollReveal } from "@/hooks/useScrollReveal";
import profileImg from "@/assets/tarun-profile.jpeg";

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-24 px-6">
      <div ref={ref} className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-3">About</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-8">Turning Data into Decisions</h3>
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden glow-border ring-2 ring-primary/20">
              <img src={profileImg} alt="Tarun Barigala" className="w-full h-full object-cover object-top" />
            </div>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Data Analyst–focused graduate with hands-on experience in Python, R, SQL, and Tableau.
            Skilled in exploratory data analysis, data cleaning, visualization, and regression techniques
            to generate actionable insights. Google Data Analytics certified and experienced in building
            data-driven dashboards and analytical solutions. Currently pursuing an M.S. in Information Systems
            at Central Michigan University with a 3.88 GPA.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
