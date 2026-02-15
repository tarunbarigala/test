import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, Sparkles, User, X } from "lucide-react";
import {
  AgentMessage,
  chatWithResumeAgent,
  inferRelevantSection,
  SectionTarget,
  suggestedQuestions,
} from "@/lib/resumeAgent";

const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      role: "assistant",
      content:
        "I am Tarun's AI guide. Ask about skills, projects, experience, education, or contact, and I will take you there.",
    },
  ]);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const navigateToSection = (target: SectionTarget) => {
    document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sendMessage = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) {
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsLoading(true);

    const reply = await chatWithResumeAgent({
      question: trimmed,
      history: messages,
    });

    const target = inferRelevantSection(`${trimmed} ${reply}`);

    setMessages((prev) => {
      const next = [...prev, { role: "assistant", content: reply }];
      if (target) {
        next.push({
          role: "assistant",
          content: `Navigating you to the ${target.label} section.`,
        });
      }
      return next;
    });

    if (target) {
      navigateToSection(target);
    }

    setInput("");
    setIsLoading(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await sendMessage(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {isOpen && (
        <div className="w-[min(92vw,380px)] h-[min(72vh,560px)] mb-3 rounded-2xl border border-border bg-card shadow-2xl p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">AI Portfolio Guide</p>
                <p className="text-[11px] text-muted-foreground mt-1">Live from page start</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-md border border-border bg-background inline-flex items-center justify-center hover:border-primary/40"
              aria-label="Close assistant"
            >
              <X size={14} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-xs whitespace-pre-line ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border text-foreground"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-secondary text-foreground flex items-center justify-center shrink-0">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="rounded-xl px-3 py-2 text-xs bg-background border border-border text-foreground inline-flex items-center gap-2">
                  <Loader2 size={13} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          <div className="mt-3">
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-2 inline-flex items-center gap-1.5">
              <Sparkles size={11} />
              Quick Ask
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestedQuestions.slice(0, 3).map((question) => (
                <button
                  key={question}
                  onClick={() => void sendMessage(question)}
                  disabled={isLoading}
                  className="text-[11px] px-2.5 py-1.5 rounded-full border border-border bg-background hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask and navigate..."
                disabled={isLoading}
                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-xs"
              >
                {isLoading ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                Ask
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
      >
        <MessageCircle size={18} />
        <span className="text-sm font-medium pr-1">Ask AI</span>
      </button>
    </div>
  );
};

export default FloatingAIAssistant;

