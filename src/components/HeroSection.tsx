import heroBg from "@/assets/hero-bg.jpg";
import { ArrowDown, Download } from "lucide-react";

const HeroSection = () => {
  const resumeUrl = `${import.meta.env.BASE_URL}Tarun_Barigala_Resume.pdf`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="font-mono text-primary text-sm tracking-widest uppercase mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Data Analyst
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Tarun <span className="text-gradient">Barigala</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          Transforming raw data into actionable insights through Python, SQL, Tableau, and statistical analysis.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <a
            href="mailto:tarunbarigala5@gmail.com"
            className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </a>
          <a
            href={resumeUrl}
            download
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors inline-flex items-center gap-2"
          >
            <Download size={18} />
            Download Resume
          </a>
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
          >
            View Work
          </button>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
};

export default HeroSection;
