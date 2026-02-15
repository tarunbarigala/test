import { GraduationCap, Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const EducationSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="education" className="py-24 px-6">
      <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Education & Certifications</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">Credentials</h3>

        <div className="mb-12 p-6 rounded-xl border border-border bg-card">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <GraduationCap size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-semibold">Central Michigan University</h4>
              <p className="text-muted-foreground">M.S. Information Systems</p>
              <div className="flex items-center gap-4 mt-1">
                <span className="font-mono text-xs text-primary">May 2026</span>
                <span className="font-mono text-xs text-foreground">GPA: 3.88</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Coursework: Information Systems, Python, SQL, Systems Analysis, Project Management, Tableau, SAP, Excel, R, Capstone Project
              </p>
            </div>
          </div>
        </div>

        <h4 className="text-lg font-semibold mb-6">Certifications</h4>
        <div className="space-y-4">
          {[
            { name: "Google Data Analytics Professional Certificate", date: "Feb 2026", link: "https://www.coursera.org/account/accomplishments/professional-cert/18T7F0Q5TFUY" },
            { name: "Cloud Computing — NPTEL", date: "Nov 2023", link: null },
            { name: "AWS Academy Graduate — Cloud Foundations", date: "Feb 2023", link: "https://www.credly.com/badges/49de7912-15b8-4414-8245-c914c600b87b/print" },
          ].map((cert, i) => (
            <a
              key={i}
              href={cert.link || undefined}
              target={cert.link ? "_blank" : undefined}
              rel={cert.link ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors ${cert.link ? "cursor-pointer" : ""}`}
            >
              <Award size={18} className="text-primary shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">{cert.name}</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{cert.date}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
