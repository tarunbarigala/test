import { Linkedin, Github } from "lucide-react";

const Navbar = () => {
  const links = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-primary font-semibold text-lg tracking-tight">TB</span>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="https://www.linkedin.com/in/tarun-barigala-051a76240/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="https://github.com/tarunbarigala" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
