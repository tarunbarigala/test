import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="py-24 px-6 bg-card">
      <div ref={ref} className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Contact</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h3>
        <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
          I'm currently looking for data analyst opportunities. Feel free to reach out!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <a href="mailto:tarunbarigala5@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Mail size={18} />
            <span className="text-sm">tarunbarigala5@gmail.com</span>
          </a>
          <a href="tel:+19895272027" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Phone size={18} />
            <span className="text-sm">+1 (989) 527-2027</span>
          </a>
          <span className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={18} />
            <span className="text-sm">Mount Pleasant, Michigan</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
