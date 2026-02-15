type KnowledgeItem = {
  title: string;
  details: string;
  keywords: string[];
};

export type AgentMessage = {
  role: "user" | "assistant";
  content: string;
};

export type SectionTarget = {
  id: "about" | "skills" | "experience" | "projects" | "education" | "contact";
  label: string;
};

type AgentRequest = {
  question: string;
  history: AgentMessage[];
  apiKey?: string;
};

const CONTACT = {
  email: "tarunbarigala5@gmail.com",
  phone: "+1 (989) 527-2027",
  location: "Mount Pleasant, Michigan",
  linkedin: "https://www.linkedin.com/in/tarun-barigala-051a76240/",
  github: "https://github.com/tarunbarigala",
};

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    title: "Profile",
    details:
      "Tarun Barigala is a Data Analyst-focused graduate, currently pursuing an M.S. in Information Systems at Central Michigan University with a 3.88 GPA.",
    keywords: ["about", "profile", "summary", "who", "gpa", "masters", "information systems", "cmu"],
  },
  {
    title: "Skills",
    details:
      "Core skills include Python, Pandas, NumPy, R, SQL, Tableau, data cleaning, EDA, statistical analysis, KPI reporting, and data storytelling.",
    keywords: ["skills", "tech stack", "tools", "python", "sql", "r", "tableau", "pandas", "numpy"],
  },
  {
    title: "Experience",
    details:
      "Tarun worked as a Data Analyst Intern at BrainOvision Solutions (Jan 2024 to Apr 2024), performing EDA, cleaning 1,000+ records, and building predictive models.",
    keywords: ["experience", "intern", "brainovision", "work", "job", "employment"],
  },
  {
    title: "Education",
    details:
      "Tarun is pursuing an M.S. in Information Systems at Central Michigan University (expected May 2026), with coursework in Python, SQL, Tableau, SAP, Excel, R, and systems analysis.",
    keywords: ["education", "university", "cmu", "masters", "gpa", "coursework"],
  },
  {
    title: "Certifications",
    details:
      "Certifications include Google Data Analytics Professional Certificate (Feb 2026), Cloud Computing NPTEL (Nov 2023), and AWS Academy Cloud Foundations (Feb 2023).",
    keywords: ["certifications", "google data analytics", "aws", "nptel", "certificates"],
  },
  {
    title: "Project: Event Registration System",
    details:
      "Built a Python and MySQL event registration platform with role-based access and a normalized schema, reducing manual processing by 80 percent.",
    keywords: ["event", "registration", "mysql", "python", "automation"],
  },
  {
    title: "Project: Speaker Recognition",
    details:
      "Developed a speaker recognition model using MFCC, a backpropagation neural network, and Harris Hawks Optimization, reaching 98 percent accuracy.",
    keywords: ["speaker recognition", "mfcc", "neural network", "accuracy", "machine learning"],
  },
  {
    title: "Project: Climate Policy Modeling",
    details:
      "Modeled global emissions scenarios through 2100 using EN-ROADS with sensitivity analysis on renewables and carbon pricing.",
    keywords: ["climate", "en-roads", "emissions", "time-series", "policy"],
  },
  {
    title: "Career Focus",
    details:
      "Tarun is currently open to data analyst opportunities and interested in turning complex datasets into business-ready insights.",
    keywords: ["hiring", "open to work", "career", "opportunities", "roles"],
  },
];

const PORTFOLIO_CONTEXT = `
Name: Tarun Barigala
Role: Data Analyst
Location: Mount Pleasant, Michigan
Contact Email: tarunbarigala5@gmail.com
Contact Phone: +1 (989) 527-2027
LinkedIn: https://www.linkedin.com/in/tarun-barigala-051a76240/
GitHub: https://github.com/tarunbarigala

Summary:
- Data analyst-focused graduate skilled in Python, R, SQL, Tableau, and statistics.
- Currently pursuing M.S. in Information Systems at Central Michigan University.
- Current GPA: 3.88.

Experience:
- Data Analyst Intern, BrainOvision Solutions Pvt. Ltd. (Jan 2024 - Apr 2024):
  performed EDA, cleaned and transformed 1,000+ records, built predictive models, and created KPI reports.
- Python Intern, ByteXL India Pvt. Ltd. (Jun 2022):
  trained in data structures and OOP in Python, solved 50+ coding problems.

Key Skills:
- Python, Pandas, NumPy, R, SQL, C
- Tableau, Matplotlib, Seaborn
- Data cleaning, EDA, statistical analysis, data storytelling
- Time-series forecasting, regression analysis
- MySQL, Excel, Jupyter, RStudio, Git/GitHub

Education:
- M.S. Information Systems, Central Michigan University, expected May 2026.

Certifications:
- Google Data Analytics Professional Certificate (Feb 2026)
- Cloud Computing - NPTEL (Nov 2023)
- AWS Academy Graduate - Cloud Foundations (Feb 2023)

Portfolio Highlights:
- Event Registration & Management System (Python, MySQL)
- Global CO2 Emissions & Clean Energy Trends (Tableau)
- Netflix Content Analysis & Trends Dashboard (Tableau)
- VDI Usage Trends & User Behavior Analysis (R)
- Speaker Recognition Using MFCC-BPNN-HHO (Python)
- The 2-Degree Blueprint - Climate Policy Modeling
`.trim();

const SYSTEM_PROMPT = `
You are Tarun Barigala's portfolio assistant.
Answer questions only using the provided portfolio context.
If a detail is missing from context, clearly say you do not have that information.
Keep responses concise, factual, and recruiter-friendly.
When relevant, include contact details and concrete project/experience highlights.

Portfolio context:
${PORTFOLIO_CONTEXT}
`.trim();

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const scoreItem = (queryTokens: string[], item: KnowledgeItem) => {
  const keywordSet = new Set(item.keywords.flatMap((keyword) => tokenize(keyword)));
  return queryTokens.reduce((score, token) => score + (keywordSet.has(token) ? 1 : 0), 0);
};

const getFallbackReply = (question: string) => {
  const normalizedQuestion = question.trim();
  if (!normalizedQuestion) {
    return "Ask me anything about Tarun's skills, projects, experience, education, or contact details.";
  }

  const lowerQuestion = normalizedQuestion.toLowerCase();

  if (/(hello|hi|hey)\b/.test(lowerQuestion)) {
    return "Hi! I can help you explore Tarun's profile. Ask about skills, projects, experience, or how to get in touch.";
  }

  if (/(contact|email|phone|reach|linkedin|github)\b/.test(lowerQuestion)) {
    return `You can reach Tarun at ${CONTACT.email} or ${CONTACT.phone}. He is based in ${CONTACT.location}. LinkedIn: ${CONTACT.linkedin} and GitHub: ${CONTACT.github}.`;
  }

  if (/(resume|cv|download)\b/.test(lowerQuestion)) {
    return "Use the 'Download Resume' button in the hero section to get Tarun's full resume PDF.";
  }

  const tokens = tokenize(normalizedQuestion);
  const ranked = KNOWLEDGE_BASE.map((item) => ({ item, score: scoreItem(tokens, item) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) {
    return "I do not have a direct match for that yet. Try asking about skills, internship experience, projects, education, or contact details.";
  }

  const topMatches = ranked.slice(0, 2).map((entry) => `- ${entry.item.title}: ${entry.item.details}`);
  return [`Here is what I found:`, ...topMatches].join("\n");
};

export const suggestedQuestions = [
  "What are Tarun's strongest skills?",
  "Tell me about his latest internship.",
  "Which projects are most relevant for data analytics roles?",
  "What certifications does he have?",
  "How can I contact Tarun?",
];

const SECTION_RULES: Array<{ target: SectionTarget; keywords: string[] }> = [
  { target: { id: "about", label: "About" }, keywords: ["about", "summary", "who is", "profile", "background"] },
  { target: { id: "skills", label: "Skills" }, keywords: ["skill", "tech stack", "tools", "python", "sql", "tableau", "r"] },
  { target: { id: "experience", label: "Experience" }, keywords: ["experience", "internship", "work", "job", "brainovision", "bytexl"] },
  { target: { id: "projects", label: "Projects" }, keywords: ["project", "portfolio", "work samples", "case study", "github"] },
  { target: { id: "education", label: "Education" }, keywords: ["education", "degree", "university", "gpa", "certification", "coursework"] },
  { target: { id: "contact", label: "Contact" }, keywords: ["contact", "email", "phone", "reach", "linkedin", "hire"] },
];

export const inferRelevantSection = (text: string): SectionTarget | null => {
  const normalized = text.toLowerCase();

  let bestScore = 0;
  let bestTarget: SectionTarget | null = null;

  for (const rule of SECTION_RULES) {
    const score = rule.keywords.reduce(
      (acc, keyword) => (normalized.includes(keyword) ? acc + 1 : acc),
      0,
    );
    if (score > bestScore) {
      bestScore = score;
      bestTarget = rule.target;
    }
  }

  return bestScore > 0 ? bestTarget : null;
};

const extractOutputText = (response: unknown) => {
  if (!response || typeof response !== "object") {
    return "";
  }

  const withOutput = response as {
    output_text?: string;
    output?: Array<{
      type?: string;
      content?: Array<{
        type?: string;
        text?: string;
        refusal?: string;
      }>;
    }>;
  };
  if (typeof withOutput.output_text === "string") {
    return withOutput.output_text.trim();
  }

  if (Array.isArray(withOutput.output)) {
    const chunks: string[] = [];

    for (const item of withOutput.output) {
      if (!item || !Array.isArray(item.content)) {
        continue;
      }

      for (const block of item.content) {
        if (!block) {
          continue;
        }

        if (block.type === "output_text" && typeof block.text === "string") {
          chunks.push(block.text);
        }

        if (block.type === "refusal" && typeof block.refusal === "string") {
          chunks.push(`I cannot answer that request: ${block.refusal}`);
        }
      }
    }

    if (chunks.length > 0) {
      return chunks.join("\n").trim();
    }
  }

  return "";
};

export const chatWithResumeAgent = async ({ question, history, apiKey }: AgentRequest) => {
  const configuredApiKey = apiKey || import.meta.env.VITE_OPENAI_API_KEY;
  if (!configuredApiKey) {
    return getFallbackReply(question);
  }

  const trimmedHistory = history.slice(-8);
  const input = [
    ...trimmedHistory.map((message) => ({
      role: message.role,
      content: message.content,
    })),
    {
      role: "user",
      content: question,
    },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${configuredApiKey}`,
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini",
        instructions: SYSTEM_PROMPT,
        input,
        temperature: 0.2,
        max_output_tokens: 320,
      }),
    });

    if (!response.ok) {
      let apiMessage = "";
      try {
        const errorData = await response.json();
        apiMessage =
          (errorData as { error?: { message?: string } })?.error?.message?.trim() || "";
      } catch {
        apiMessage = "";
      }

      if (response.status === 401) {
        return "OpenAI authentication failed (401). Check `VITE_OPENAI_API_KEY` and restart `npm run dev`.";
      }

      if (response.status === 429) {
        return "OpenAI rate/quota limit reached (429). Check billing/quota for your project.";
      }

      if (response.status === 403) {
        return "OpenAI request blocked (403). Confirm project permissions and API key scope.";
      }

      return apiMessage
        ? `OpenAI request failed (${response.status}): ${apiMessage}`
        : `OpenAI request failed with status ${response.status}.`;
    }

    const data = await response.json();
    const text = extractOutputText(data);
    if (!text) {
      return "I could not generate a full answer this time. Please try asking again.";
    }

    return text;
  } catch {
    return "I could not reach the AI service. I can still answer basic portfolio questions with local knowledge.";
  }
};
