/**
 * Role-specific skill frameworks: the categories and skills each career is assessed on, plus an optional
 * knowledge check. Categories are listed in the order they're usually learned.
 *
 * Each skill has a required level for the role:
 *   mastery    → Mastered (the role's few essentials, used every day)
 *   core       → Comfortable (can use it independently on real work)
 *   supporting → Familiar (knows the basics, can learn more on the job)
 *
 * `requires` lists prerequisites, so roadmaps follow a real learning order.
 */

export type PhaseName = "Foundations" | "Core skills" | "Job-ready";
export type Importance = "core" | "supporting";

export type BaseSkill = {
  /** Unique within the role, e.g. "apis-rest". */
  id: string;
  name: string;
  description: string;
  importance: Importance;
};

/** Proficiency levels: 0 Not Started, 1 Familiar, 2 Comfortable, 3 Mastered. */
export type RequiredLevel = 1 | 2 | 3;

export type Skill = BaseSkill & {
  /** Skills that should be learned first (ids within the same role). */
  requires: string[];
  /** The level this role needs: Mastered for its essentials, Comfortable for core, Familiar for supporting. */
  required: RequiredLevel;
};

type BaseCategory = { id: string; name: string; phase: PhaseName; skills: BaseSkill[] };

export type SkillCategory = Omit<BaseCategory, "skills"> & { skills: Skill[] };

export type QuizQuestion = {
  id: string;
  /** The skill this question checks. */
  skillId: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type SkillFramework = { categories: SkillCategory[]; quiz: QuizQuestion[] };

type RawFramework = {
  categories: BaseCategory[];
  /** skill id → prerequisite skill ids */
  requires: Record<string, string[]>;
  /** Core skills this role needs at Mastered. */
  mastery: string[];
  quiz: QuizQuestion[];
};

type SkillTuple = [key: string, name: string, description: string, importance?: Importance];

function category(id: string, name: string, phase: PhaseName, skills: SkillTuple[]): BaseCategory {
  return {
    id,
    name,
    phase,
    skills: skills.map(([key, skillName, description, importance = "core"]) => ({
      id: `${id}-${key}`,
      name: skillName,
      description,
      importance,
    })),
  };
}

const F = "Foundations";
const C = "Core skills";
const J = "Job-ready";

const rawFrameworks: Record<string, RawFramework> = {
  "frontend-developer": {
    categories: [
      category("html", "HTML & Semantics", F, [
        ["semantic", "Semantic HTML", "Headings, landmarks, lists and the right element for the job"],
        ["forms", "Forms & validation", "Inputs, labels, native validation and form submission"],
      ]),
      category("css", "CSS & Layout", F, [
        ["layout", "Flexbox & Grid", "Building one- and two-dimensional layouts"],
        ["responsive", "Responsive design", "Media queries, fluid sizing and mobile-first layouts"],
        ["architecture", "CSS architecture", "Tailwind, CSS Modules or BEM, and design tokens", "supporting"],
      ]),
      category("js", "JavaScript", F, [
        ["core", "JavaScript fundamentals", "Types, scope, closures, arrays and objects"],
        ["dom", "DOM & events", "Selecting elements, handling events and updating the page"],
        ["async", "Async JavaScript", "Promises, async/await and fetching data"],
      ]),
      category("tooling", "Git & Tooling", F, [
        ["git", "Git essentials", "Commit, branch, merge and resolve conflicts"],
        ["build", "Package managers & build tools", "npm, Vite, linting and formatting", "supporting"],
      ]),
      category("ts", "TypeScript", C, [["basics", "TypeScript", "Types, interfaces, generics and typing components"]]),
      category("react", "React", C, [
        ["components", "Components & props", "Composing UIs from reusable components"],
        ["hooks", "State & hooks", "useState, useEffect and custom hooks"],
        ["data", "Routing & data fetching", "Client routing, loading and error states, frameworks like Next.js"],
        ["state", "App-wide state", "Context, Zustand or Redux, and server-state libraries", "supporting"],
      ]),
      category("quality", "Accessibility & Quality", J, [
        ["a11y", "Accessibility", "WCAG, keyboard navigation, ARIA and screen readers"],
        ["testing", "Testing", "Unit and component tests with Vitest or Jest and Testing Library", "supporting"],
        ["performance", "Web performance", "Core Web Vitals, lazy loading and bundle size", "supporting"],
      ]),
      category("shipping", "Shipping & Portfolio", J, [
        ["deploy", "Deployment", "Vercel or Netlify, environment variables and CI", "supporting"],
        ["portfolio", "Portfolio projects", "Two or three polished, deployed projects"],
      ]),
    ],
    requires: {
      "html-forms": ["html-semantic"],
      "css-layout": ["html-semantic"],
      "css-responsive": ["css-layout"],
      "css-architecture": ["css-responsive"],
      "js-dom": ["js-core", "html-semantic"],
      "js-async": ["js-core"],
      "tooling-build": ["tooling-git", "js-core"],
      "ts-basics": ["js-core"],
      "react-components": ["js-dom", "tooling-build"],
      "react-hooks": ["react-components", "js-async"],
      "react-data": ["react-hooks"],
      "react-state": ["react-data"],
      "quality-a11y": ["html-forms", "react-components"],
      "quality-testing": ["react-hooks"],
      "quality-performance": ["react-data", "css-responsive"],
      "shipping-deploy": ["tooling-build", "react-data"],
      "shipping-portfolio": ["shipping-deploy", "quality-a11y", "css-architecture", "ts-basics"],
    },
    mastery: ["js-core", "css-layout"],
    quiz: [
      {
        id: "fe-await",
        skillId: "js-async",
        question: "What does `await` do inside an async function?",
        options: [
          "Pauses that function until the promise settles, without blocking the page",
          "Blocks the whole page until the promise settles",
          "Turns a promise into a callback",
          "Runs the code in a web worker",
        ],
        answer: 0,
        explanation: "Only the async function pauses. The browser keeps handling other work while the promise settles.",
      },
      {
        id: "fe-grid",
        skillId: "css-layout",
        question: "Which CSS layout tool is designed for rows and columns at the same time?",
        options: ["Flexbox", "CSS Grid", "Floats", "position: absolute"],
        answer: 1,
        explanation: "Grid handles two-dimensional layouts. Flexbox lays items out along one axis at a time.",
      },
      {
        id: "fe-setstate",
        skillId: "react-hooks",
        question: "In React, what happens when you call a state setter such as setCount?",
        options: [
          "React schedules a re-render with the new state",
          "The DOM is updated directly and immediately",
          "The page reloads",
          "Nothing happens until you call render()",
        ],
        answer: 0,
        explanation: "Setting state queues a re-render. React then updates the DOM to match the new output.",
      },
      {
        id: "fe-button",
        skillId: "quality-a11y",
        question: "Which element is best for an on-page action, such as opening a menu?",
        options: ['<div onClick>', '<span role="link">', "<button>", '<a href="#">'],
        answer: 2,
        explanation: "A <button> is focusable, works with Enter and Space, and is announced correctly by screen readers.",
      },
    ],
  },

  "backend-developer": {
    categories: [
      category("programming", "Programming Fundamentals", F, [
        ["language", "A server-side language", "Python, Java, Go, C# or Node.js: syntax, types and control flow"],
        ["dsa", "Data structures & algorithms", "Lists, maps, sets, and time complexity basics"],
        ["design", "Code organization", "Modules, OOP or functional patterns, and error handling"],
      ]),
      category("git", "Git & Version Control", F, [
        ["basics", "Git essentials", "Commit, branch, merge and resolve conflicts"],
        ["collab", "Collaboration workflow", "Pull requests, code review, GitHub or GitLab", "supporting"],
      ]),
      category("apis", "APIs", C, [
        ["http", "HTTP fundamentals", "Methods, status codes, headers and cookies"],
        ["rest", "REST API design", "Resources, validation, pagination and error formats"],
        ["alt", "GraphQL or gRPC", "When and how to use alternatives to REST", "supporting"],
      ]),
      category("databases", "Databases", C, [
        ["sql", "SQL", "Queries, joins, aggregation and transactions"],
        ["modeling", "Data modeling", "Schemas, normalization, indexes and migrations"],
        ["nosql", "NoSQL databases", "Document and key-value stores like MongoDB or Redis", "supporting"],
      ]),
      category("auth", "Authentication & Security", C, [
        ["authn", "Authentication", "Sessions, tokens (JWT), OAuth 2.0 and password hashing"],
        ["authz", "Authorization", "Roles, permissions and access control"],
        ["security", "Web security basics", "OWASP Top 10: injection, XSS and CSRF"],
      ]),
      category("testing", "Testing", J, [
        ["unit", "Unit testing", "Testing functions and modules in isolation"],
        ["integration", "Integration & API testing", "Testing endpoints with a real database", "supporting"],
      ]),
      category("system", "System Design", J, [
        ["caching", "Caching", "Redis, HTTP caching and cache invalidation", "supporting"],
        ["queues", "Queues & background jobs", "Message queues, workers and retries", "supporting"],
        ["scale", "Scalability basics", "Load balancing, horizontal scaling and trade-offs", "supporting"],
      ]),
      category("deployment", "Deployment", J, [
        ["linux", "Linux & command line", "Navigating servers, processes, permissions and logs"],
        ["docker", "Docker", "Images, containers and Docker Compose"],
        ["cicd", "CI/CD & cloud hosting", "Automated builds and deploys to a cloud platform", "supporting"],
        ["monitoring", "Logging & monitoring", "Structured logs, metrics and alerts", "supporting"],
      ]),
    ],
    requires: {
      "programming-dsa": ["programming-language"],
      "programming-design": ["programming-language"],
      "git-collab": ["git-basics"],
      "apis-http": ["programming-language"],
      "apis-rest": ["apis-http", "programming-design"],
      "apis-alt": ["apis-rest"],
      "databases-sql": ["programming-language"],
      "databases-modeling": ["databases-sql"],
      "databases-nosql": ["databases-modeling"],
      "auth-authn": ["apis-rest", "databases-modeling"],
      "auth-authz": ["auth-authn"],
      "auth-security": ["auth-authn"],
      "testing-unit": ["programming-design"],
      "testing-integration": ["testing-unit", "apis-rest", "databases-sql"],
      "deployment-docker": ["deployment-linux", "apis-rest"],
      "deployment-cicd": ["deployment-docker", "git-collab", "testing-unit"],
      "deployment-monitoring": ["deployment-cicd"],
      "system-caching": ["databases-modeling", "apis-rest"],
      "system-queues": ["system-caching", "deployment-docker"],
      "system-scale": ["system-caching", "auth-authz", "deployment-docker"],
    },
    mastery: ["programming-language", "databases-sql"],
    quiz: [
      {
        id: "be-201",
        skillId: "apis-http",
        question: "Which status code best fits a successful POST that created a new resource?",
        options: ["200 OK", "201 Created", "204 No Content", "302 Found"],
        answer: 1,
        explanation: "201 signals that a resource was created, usually with a Location header pointing to it.",
      },
      {
        id: "be-having",
        skillId: "databases-sql",
        question: "Which SQL clause filters groups after aggregation?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        answer: 1,
        explanation: "WHERE filters rows before grouping. HAVING filters the grouped results, e.g. HAVING COUNT(*) > 5.",
      },
      {
        id: "be-passwords",
        skillId: "auth-authn",
        question: "How should user passwords be stored?",
        options: [
          "Encrypted with AES, so they can be recovered",
          "Hashed with a slow, salted algorithm such as bcrypt or Argon2",
          "Hashed once with SHA-256",
          "As plain text in a restricted table",
        ],
        answer: 1,
        explanation: "Slow, salted hashes make stolen password databases far harder to crack. Passwords should never be recoverable.",
      },
      {
        id: "be-index",
        skillId: "databases-modeling",
        question: "What does adding an index to a column mainly do?",
        options: [
          "Speeds up reads that filter or sort on it, at some cost to writes",
          "Encrypts the column",
          "Guarantees every value is unique",
          "Compresses the table",
        ],
        answer: 0,
        explanation: "Indexes speed up lookups, but each insert or update must also update the index. Uniqueness needs a unique index.",
      },
    ],
  },

  "full-stack-developer": {
    categories: [
      category("web", "Web Fundamentals", F, [
        ["htmlcss", "HTML & CSS", "Semantic markup, layout and responsive design"],
        ["js", "JavaScript", "Language fundamentals, async code and the DOM"],
        ["how", "How the web works", "HTTP, DNS, browsers, and client versus server"],
      ]),
      category("tooling", "Git & Command Line", F, [
        ["git", "Git essentials", "Commit, branch, merge and pull requests"],
        ["cli", "Command line", "Navigating, running scripts and managing packages", "supporting"],
      ]),
      category("frontend", "Frontend", C, [
        ["ts", "TypeScript", "Typing components, APIs and shared models"],
        ["react", "React", "Components, props, state and hooks"],
        ["state", "Forms, state & data fetching", "Handling user input and server data in the UI"],
      ]),
      category("backend", "Backend", C, [
        ["node", "Node.js", "The runtime, modules and asynchronous I/O"],
        ["api", "API design", "REST endpoints, validation and error handling"],
        ["framework", "Full-stack framework", "Next.js, Remix or Express for routing and rendering"],
      ]),
      category("data", "Databases", C, [
        ["sql", "SQL & relational data", "Tables, joins, constraints and transactions"],
        ["orm", "ORMs & migrations", "Prisma, Drizzle or Sequelize, and schema changes", "supporting"],
      ]),
      category("security", "Auth & Security", J, [
        ["auth", "Authentication", "Sessions, cookies, OAuth and protecting routes"],
        ["web", "Web security basics", "XSS, CSRF, injection and secure headers"],
      ]),
      category("testing", "Testing", J, [
        ["auto", "Automated testing", "Unit, integration and end-to-end tests", "supporting"],
      ]),
      category("shipping", "Deployment & Projects", J, [
        ["deploy", "Deployment & hosting", "Deploying apps and databases to the cloud"],
        ["cicd", "CI/CD", "Automated checks and deploys on every change", "supporting"],
        ["projects", "End-to-end projects", "Complete apps with auth, data and a polished UI"],
      ]),
    ],
    requires: {
      "web-js": ["web-htmlcss"],
      "frontend-ts": ["web-js"],
      "frontend-react": ["web-js"],
      "frontend-state": ["frontend-react", "web-how"],
      "backend-node": ["web-js", "tooling-cli"],
      "backend-api": ["backend-node", "web-how"],
      "backend-framework": ["backend-api", "frontend-react"],
      "data-orm": ["data-sql", "backend-node"],
      "security-auth": ["backend-api", "data-orm"],
      "security-web": ["security-auth", "frontend-state"],
      "testing-auto": ["frontend-state", "backend-api"],
      "shipping-deploy": ["backend-framework", "tooling-git"],
      "shipping-cicd": ["shipping-deploy", "testing-auto"],
      "shipping-projects": ["shipping-deploy", "security-web", "frontend-ts"],
    },
    mastery: ["web-js", "backend-api"],
    quiz: [
      {
        id: "fs-migration",
        skillId: "data-orm",
        question: "What is the main purpose of a database migration?",
        options: [
          "To make versioned, repeatable changes to the database schema",
          "To move data to another hosting provider",
          "To back up the database",
          "To speed up slow queries",
        ],
        answer: 0,
        explanation: "Migrations record schema changes in code, so every environment can be brought to the same structure.",
      },
      {
        id: "fs-400",
        skillId: "backend-api",
        question: "Your API receives invalid form input. Which response fits best?",
        options: [
          "400 Bad Request, with details of what's wrong",
          "500 Internal Server Error",
          "200 OK with an error message in the body",
          "404 Not Found",
        ],
        answer: 0,
        explanation: "4xx codes mean the client sent something wrong. 400 plus field-level details lets the UI show helpful errors.",
      },
      {
        id: "fs-httponly",
        skillId: "security-auth",
        question: "Why set a session cookie with the HttpOnly flag?",
        options: [
          "So JavaScript can't read it, which limits the damage from XSS",
          "So it only works over HTTP, not HTTPS",
          "So it expires when the tab closes",
          "So it can be shared across domains",
        ],
        answer: 0,
        explanation: "HttpOnly hides the cookie from scripts, so an injected script can't steal the session token.",
      },
      {
        id: "fs-effect",
        skillId: "frontend-react",
        question: "What commonly causes a React useEffect to run in an infinite loop?",
        options: [
          "It updates state that is also in its own dependency array",
          "It has an empty dependency array",
          "It returns a cleanup function",
          "It's declared inside a custom hook",
        ],
        answer: 0,
        explanation: "Updating a dependency triggers the effect again, which updates it again, and so on.",
      },
    ],
  },

  "data-scientist": {
    categories: [
      category("programming", "Programming", F, [
        ["python", "Python", "Core language, functions and working with libraries"],
        ["notebooks", "Jupyter & environments", "Notebooks, virtual environments and reproducibility", "supporting"],
      ]),
      category("stats", "Math & Statistics", F, [
        ["descriptive", "Descriptive statistics", "Mean, median, variance and distributions"],
        ["probability", "Probability", "Probability rules and common distributions"],
        ["inference", "Statistical inference", "Hypothesis tests, confidence intervals and p-values"],
        ["linalg", "Linear algebra basics", "Vectors, matrices and how models use them", "supporting"],
      ]),
      category("data", "Data Access", F, [
        ["sql", "SQL", "Querying, joining and aggregating data"],
        ["sources", "Data sources", "CSVs, APIs and data warehouses", "supporting"],
      ]),
      category("wrangling", "Data Wrangling", C, [
        ["pandas", "pandas", "DataFrames, grouping, merging and reshaping"],
        ["cleaning", "Data cleaning", "Missing values, outliers, types and duplicates"],
      ]),
      category("viz", "Visualization & EDA", C, [
        ["plotting", "Plotting libraries", "matplotlib, seaborn or Plotly"],
        ["eda", "Exploratory analysis", "Finding patterns, questions and data issues"],
        ["bi", "Dashboards & BI tools", "Tableau, Power BI or Streamlit", "supporting"],
      ]),
      category("ml", "Machine Learning", C, [
        ["supervised", "Supervised learning", "Regression, classification and tree models with scikit-learn"],
        ["evaluation", "Model evaluation", "Train/test splits, cross-validation and the right metrics"],
        ["features", "Feature engineering", "Creating and selecting useful inputs"],
        ["unsupervised", "Unsupervised learning", "Clustering and dimensionality reduction", "supporting"],
      ]),
      category("experiments", "Experimentation", J, [
        ["ab", "A/B testing", "Experiment design, sample size and interpreting results"],
      ]),
      category("communication", "Communication", J, [
        ["storytelling", "Data storytelling", "Turning analysis into clear recommendations"],
        ["portfolio", "Portfolio case studies", "End-to-end analyses on real datasets"],
      ]),
    ],
    requires: {
      "programming-notebooks": ["programming-python"],
      "stats-probability": ["stats-descriptive"],
      "stats-inference": ["stats-probability"],
      "data-sources": ["data-sql", "programming-python"],
      "wrangling-pandas": ["programming-python"],
      "wrangling-cleaning": ["wrangling-pandas", "stats-descriptive"],
      "viz-plotting": ["wrangling-pandas"],
      "viz-eda": ["viz-plotting", "wrangling-cleaning"],
      "viz-bi": ["viz-eda", "data-sql"],
      "ml-supervised": ["viz-eda", "stats-probability", "stats-linalg"],
      "ml-evaluation": ["ml-supervised"],
      "ml-features": ["ml-supervised", "wrangling-cleaning"],
      "ml-unsupervised": ["ml-supervised"],
      "experiments-ab": ["stats-inference"],
      "communication-storytelling": ["viz-eda"],
      "communication-portfolio": ["ml-evaluation", "communication-storytelling", "experiments-ab"],
    },
    mastery: ["programming-python", "wrangling-pandas"],
    quiz: [
      {
        id: "ds-pvalue",
        skillId: "stats-inference",
        question: "What does a p-value of 0.03 mean?",
        options: [
          "There's a 3% chance the null hypothesis is true",
          "If the null hypothesis were true, results at least this extreme would happen about 3% of the time",
          "The effect size is 3%",
          "The model is 97% accurate",
        ],
        answer: 1,
        explanation: "A p-value is calculated assuming the null hypothesis is true. It isn't the probability that the null is true.",
      },
      {
        id: "ds-overfit",
        skillId: "ml-supervised",
        question: "A model scores 99% on training data but 70% on test data. What's the most likely issue?",
        options: ["Overfitting", "Underfitting", "The test set is too large", "Too many evaluation metrics"],
        answer: 0,
        explanation: "The model has memorized the training data instead of learning patterns that generalize.",
      },
      {
        id: "ds-merge",
        skillId: "wrangling-pandas",
        question: "Which pandas method joins two DataFrames on a shared key column, like a SQL join?",
        options: ["concat", "merge", "append", "pivot"],
        answer: 1,
        explanation: "merge performs SQL-style joins (inner, left, right, outer) on one or more key columns.",
      },
      {
        id: "ds-imbalance",
        skillId: "ml-evaluation",
        question: "Only 1% of transactions are fraud. Why can accuracy be a misleading metric here?",
        options: [
          "A model that always predicts 'not fraud' scores 99% accuracy",
          "Accuracy can't be computed on imbalanced data",
          "Accuracy is always lower than precision",
          "Fraud data has no labels",
        ],
        answer: 0,
        explanation: "With imbalanced classes, use precision, recall, F1 or PR-AUC to see how well the rare class is caught.",
      },
    ],
  },

  "ai-ml-engineer": {
    categories: [
      category("programming", "Programming", F, [
        ["python", "Python", "Core language, NumPy and the scientific Python stack"],
        ["engineering", "Software engineering practices", "Git, testing, packaging and clean code"],
      ]),
      category("math", "Math Foundations", F, [
        ["linalg", "Linear algebra", "Vectors, matrices and matrix multiplication"],
        ["calculus", "Calculus & optimization", "Derivatives, gradients and gradient descent"],
        ["stats", "Probability & statistics", "Distributions, likelihood and sampling"],
      ]),
      category("ml", "Machine Learning", C, [
        ["classical", "Classical ML", "Regression, trees, ensembles and scikit-learn"],
        ["evaluation", "Evaluation & validation", "Metrics, cross-validation and error analysis"],
        ["data", "Data preparation", "Feature pipelines, train/test splits and avoiding leakage"],
      ]),
      category("dl", "Deep Learning", C, [
        ["nn", "Neural networks", "Layers, activations, loss functions and backpropagation"],
        ["pytorch", "PyTorch", "Tensors, training loops and data loaders"],
        ["architectures", "Modern architectures", "CNNs, transformers and attention"],
      ]),
      category("llm", "LLMs & Generative AI", C, [
        ["prompting", "Prompt engineering", "Structuring prompts, few-shot examples and tool use"],
        ["rag", "Retrieval-augmented generation", "Embeddings, vector search and chunking"],
        ["evals", "LLM evaluation", "Test sets, automated evals and guardrails"],
        ["finetune", "Fine-tuning", "LoRA, instruction tuning and when to fine-tune", "supporting"],
      ]),
      category("mlops", "MLOps", J, [
        ["serving", "Model serving", "APIs, batching, latency and cost"],
        ["tracking", "Experiment tracking", "MLflow or Weights & Biases, and model versioning", "supporting"],
        ["monitoring", "Monitoring & drift", "Watching model quality in production", "supporting"],
        ["cloud", "Cloud & GPUs", "Training and serving on cloud infrastructure", "supporting"],
      ]),
      category("projects", "Projects", J, [["applied", "Applied AI projects", "Deployed projects that solve a real problem"]]),
    ],
    requires: {
      "programming-engineering": ["programming-python"],
      "math-calculus": ["math-linalg"],
      "ml-data": ["programming-python", "math-stats"],
      "ml-classical": ["ml-data", "math-linalg"],
      "ml-evaluation": ["ml-classical"],
      "dl-nn": ["ml-classical", "math-calculus"],
      "dl-pytorch": ["dl-nn", "programming-engineering"],
      "dl-architectures": ["dl-pytorch"],
      "llm-prompting": ["programming-python"],
      "llm-rag": ["llm-prompting", "dl-architectures"],
      "llm-evals": ["llm-prompting", "ml-evaluation"],
      "llm-finetune": ["dl-architectures", "llm-evals"],
      "mlops-tracking": ["ml-evaluation", "programming-engineering"],
      "mlops-serving": ["dl-pytorch", "programming-engineering"],
      "mlops-cloud": ["mlops-serving"],
      "mlops-monitoring": ["mlops-serving", "llm-evals"],
      "projects-applied": ["llm-rag", "mlops-serving", "llm-evals"],
    },
    mastery: ["programming-python", "dl-pytorch"],
    quiz: [
      {
        id: "ai-backprop",
        skillId: "dl-nn",
        question: "What does backpropagation compute?",
        options: [
          "The gradients of the loss with respect to the model's parameters",
          "The model's predictions on new data",
          "The best learning rate",
          "Labels for unlabelled data",
        ],
        answer: 0,
        explanation: "Backpropagation applies the chain rule to find how each parameter affects the loss. An optimizer then uses those gradients.",
      },
      {
        id: "ai-embeddings",
        skillId: "llm-rag",
        question: "In retrieval-augmented generation (RAG), what are embeddings mainly used for?",
        options: [
          "Finding text chunks that are semantically similar to the query",
          "Compressing the model's weights",
          "Encrypting the prompt",
          "Counting tokens",
        ],
        answer: 0,
        explanation: "Queries and documents are embedded as vectors, and the nearest vectors are retrieved as context for the model.",
      },
      {
        id: "ai-leakage",
        skillId: "ml-data",
        question: "Which of these is an example of data leakage?",
        options: [
          "Scaling features with statistics computed on the full dataset before splitting",
          "Keeping a separate validation set",
          "Shuffling the training data",
          "Using dropout during training",
        ],
        answer: 0,
        explanation: "Test-set information leaks into training. Fit any preprocessing on the training split only.",
      },
      {
        id: "ai-lr",
        skillId: "math-calculus",
        question: "In gradient descent, what happens if the learning rate is far too high?",
        options: [
          "Training can oscillate or diverge instead of converging",
          "Training always converges faster",
          "The model gets smaller",
          "Nothing changes",
        ],
        answer: 0,
        explanation: "Overly large steps overshoot the minimum, so the loss bounces around or blows up.",
      },
    ],
  },

  "devops-engineer": {
    categories: [
      category("linux", "Linux & Networking", F, [
        ["admin", "Linux administration", "Processes, services, permissions and package management"],
        ["networking", "Networking fundamentals", "TCP/IP, DNS, HTTP, ports and firewalls"],
      ]),
      category("scripting", "Scripting & Git", F, [
        ["bash", "Bash scripting", "Automating tasks in the shell"],
        ["git", "Git workflows", "Branching strategies, pull requests and tags"],
        ["python", "Python for automation", "Scripts and tools that talk to APIs", "supporting"],
      ]),
      category("cicd", "CI/CD", C, [
        ["pipelines", "Pipeline design", "Build, test and deploy stages in GitHub Actions, GitLab CI or Jenkins"],
        ["release", "Release strategies", "Blue-green, canary and rollbacks", "supporting"],
      ]),
      category("containers", "Containers & Orchestration", C, [
        ["docker", "Docker", "Writing Dockerfiles, images and multi-stage builds"],
        ["k8s", "Kubernetes", "Pods, deployments, services and ingress"],
        ["helm", "Helm & packaging", "Templating and releasing Kubernetes apps", "supporting"],
      ]),
      category("iac", "Cloud & Infrastructure as Code", C, [
        ["cloud", "Cloud fundamentals", "Compute, storage and networking on AWS, Azure or GCP"],
        ["terraform", "Terraform", "Modules, state and plan/apply workflows"],
        ["config", "Configuration management", "Ansible or similar tools", "supporting"],
      ]),
      category("observability", "Observability", J, [
        ["metrics", "Metrics & dashboards", "Prometheus, Grafana and useful alerts"],
        ["logging", "Logging & tracing", "Centralized logs and distributed tracing", "supporting"],
        ["incidents", "Incident response", "On-call, runbooks and postmortems", "supporting"],
      ]),
      category("security", "Security", J, [
        ["secrets", "Secrets management", "Vault or cloud secret stores, never secrets in code"],
        ["devsecops", "Pipeline security", "Image scanning, dependency checks and least privilege", "supporting"],
      ]),
    ],
    requires: {
      "linux-networking": ["linux-admin"],
      "scripting-bash": ["linux-admin"],
      "scripting-python": ["scripting-bash"],
      "cicd-pipelines": ["scripting-git", "scripting-bash"],
      "cicd-release": ["cicd-pipelines", "containers-k8s"],
      "containers-docker": ["linux-admin", "linux-networking"],
      "containers-k8s": ["containers-docker"],
      "containers-helm": ["containers-k8s"],
      "iac-cloud": ["linux-networking"],
      "iac-terraform": ["iac-cloud", "scripting-git"],
      "iac-config": ["scripting-python", "iac-cloud"],
      "observability-metrics": ["containers-k8s"],
      "observability-logging": ["observability-metrics"],
      "observability-incidents": ["observability-logging"],
      "security-secrets": ["cicd-pipelines", "iac-cloud"],
      "security-devsecops": ["security-secrets", "containers-docker"],
    },
    mastery: ["linux-admin", "containers-docker"],
    quiz: [
      {
        id: "do-image",
        skillId: "containers-docker",
        question: "What's the difference between a Docker image and a container?",
        options: [
          "An image is a read-only template; a container is a running instance of it",
          "They're the same thing",
          "A container is used to build images",
          "An image is a running process",
        ],
        answer: 0,
        explanation: "You build an image once, then start as many containers from it as you need.",
      },
      {
        id: "do-failing",
        skillId: "cicd-pipelines",
        question: "What should normally happen when tests fail in a CI pipeline?",
        options: [
          "The pipeline stops and the change isn't deployed",
          "It deploys anyway and the team fixes it later",
          "It reruns the tests until they pass",
          "It skips straight to the deploy stage",
        ],
        answer: 0,
        explanation: "Failing fast keeps broken changes out of production. That is the main point of CI.",
      },
      {
        id: "do-plan",
        skillId: "iac-terraform",
        question: "What does `terraform plan` do?",
        options: [
          "Shows the changes Terraform would make, without applying them",
          "Applies the infrastructure changes",
          "Destroys all managed resources",
          "Formats the configuration files",
        ],
        answer: 0,
        explanation: "plan previews the difference between your code and real infrastructure. apply makes the changes.",
      },
      {
        id: "do-deployment",
        skillId: "containers-k8s",
        question: "Which Kubernetes object keeps a set number of pod replicas running and handles rolling updates?",
        options: ["Deployment", "Service", "ConfigMap", "Namespace"],
        answer: 0,
        explanation: "A Deployment manages ReplicaSets to keep the desired pod count running and roll out new versions.",
      },
    ],
  },

  "cybersecurity-analyst": {
    categories: [
      category("networking", "Networking", F, [
        ["tcpip", "TCP/IP & the OSI model", "How data moves across networks"],
        ["protocols", "Core protocols", "DNS, HTTP/S, TLS and DHCP"],
        ["traffic", "Traffic analysis", "Reading packet captures with Wireshark"],
      ]),
      category("os", "Operating Systems", F, [
        ["linux", "Linux", "Command line, permissions, processes and logs"],
        ["windows", "Windows & Active Directory", "Users, groups, policies and event logs"],
      ]),
      category("fundamentals", "Security Fundamentals", F, [
        ["principles", "Security principles", "CIA triad, least privilege and defense in depth"],
        ["threats", "Threats & attacks", "Malware, phishing and common attack techniques"],
        ["crypto", "Cryptography basics", "Hashing, encryption and certificates", "supporting"],
      ]),
      category("scripting", "Scripting & Tools", F, [
        ["python", "Python scripting", "Automating log parsing and simple checks", "supporting"],
        ["cli", "Command-line tools", "grep, awk and PowerShell for investigations", "supporting"],
      ]),
      category("detection", "Detection & Monitoring", C, [
        ["siem", "SIEM", "Searches, dashboards and alerts in Splunk, Elastic or Sentinel"],
        ["logs", "Log analysis", "Spotting suspicious activity across sources"],
        ["edr", "IDS/IPS & EDR", "Network and endpoint detection tools", "supporting"],
      ]),
      category("vulns", "Vulnerability Management", C, [
        ["scanning", "Vulnerability scanning", "Nessus or OpenVAS, and prioritizing CVEs"],
        ["web", "Web application vulnerabilities", "The OWASP Top 10", "supporting"],
      ]),
      category("ir", "Incident Response", J, [
        ["process", "Incident response process", "Preparation, containment, eradication and recovery"],
        ["frameworks", "Frameworks", "MITRE ATT&CK and the NIST Cybersecurity Framework"],
        ["forensics", "Digital forensics basics", "Preserving and examining evidence", "supporting"],
      ]),
      category("cloud", "Cloud & Identity", J, [
        ["iam", "Identity & access management", "MFA, SSO and reviewing access"],
        ["cloudsec", "Cloud security basics", "Shared responsibility and common misconfigurations", "supporting"],
      ]),
    ],
    requires: {
      "networking-protocols": ["networking-tcpip"],
      "networking-traffic": ["networking-protocols"],
      "fundamentals-threats": ["fundamentals-principles"],
      "fundamentals-crypto": ["fundamentals-principles"],
      "scripting-cli": ["os-linux"],
      "scripting-python": ["scripting-cli"],
      "detection-logs": ["os-linux", "os-windows", "networking-protocols"],
      "detection-siem": ["detection-logs", "fundamentals-threats"],
      "detection-edr": ["detection-siem", "networking-traffic"],
      "vulns-scanning": ["networking-protocols", "fundamentals-threats"],
      "vulns-web": ["vulns-scanning"],
      "ir-frameworks": ["fundamentals-threats"],
      "ir-process": ["detection-siem", "ir-frameworks"],
      "ir-forensics": ["ir-process", "os-windows"],
      "cloud-iam": ["fundamentals-principles", "os-windows"],
      "cloud-cloudsec": ["cloud-iam", "vulns-scanning"],
    },
    mastery: ["networking-tcpip", "detection-logs"],
    quiz: [
      {
        id: "cy-least",
        skillId: "fundamentals-principles",
        question: "Which principle means giving users only the access they need to do their job?",
        options: ["Least privilege", "Defense in depth", "Separation of duties", "Zero trust networking"],
        answer: 0,
        explanation: "Least privilege limits what an attacker can do with any single compromised account.",
      },
      {
        id: "cy-443",
        skillId: "networking-protocols",
        question: "Which port does HTTPS use by default?",
        options: ["21", "22", "80", "443"],
        answer: 3,
        explanation: "HTTPS uses 443. Port 80 is plain HTTP, 22 is SSH and 21 is FTP.",
      },
      {
        id: "cy-phishing",
        skillId: "fundamentals-threats",
        question: "An email urges you to 'verify your account' via a link to a lookalike domain. What is this?",
        options: ["Phishing", "A DDoS attack", "SQL injection", "A brute-force attack"],
        answer: 0,
        explanation: "Phishing tricks people into handing over credentials, often through urgent messages and spoofed domains.",
      },
      {
        id: "cy-contain",
        skillId: "ir-process",
        question: "After confirming an active incident, what usually comes next?",
        options: [
          "Containment, to limit the damage",
          "Writing the final report",
          "Immediately restoring every system from backup",
          "Wiping all affected machines",
        ],
        answer: 0,
        explanation: "Contain first so the attacker can't spread, while preserving evidence. Then eradicate and recover.",
      },
    ],
  },

  "cloud-engineer": {
    categories: [
      category("foundations", "Linux & Scripting", F, [
        ["linux", "Linux", "Command line, services, permissions and SSH"],
        ["scripting", "Scripting", "Bash or Python for automation"],
      ]),
      category("networking", "Networking", F, [
        ["vpc", "Virtual networks", "VPCs, subnets, routing and security groups"],
        ["dns", "DNS & load balancing", "Domain routing, certificates and load balancers"],
        ["hybrid", "Hybrid connectivity", "VPNs, peering and private links", "supporting"],
      ]),
      category("platform", "Cloud Platform", C, [
        ["compute", "Compute", "Virtual machines, autoscaling and serverless functions"],
        ["storage", "Storage", "Object, block and file storage"],
        ["databases", "Managed databases", "Relational and NoSQL database services"],
      ]),
      category("identity", "Identity & Security", C, [
        ["iam", "IAM", "Users, roles, policies and least privilege"],
        ["encryption", "Encryption & key management", "KMS and encryption at rest and in transit", "supporting"],
        ["posture", "Security posture", "Audit logging, guardrails and compliance basics", "supporting"],
      ]),
      category("iac", "Infrastructure as Code", C, [
        ["terraform", "Terraform", "Modules, state and reusable environments"],
        ["git", "Git & code review", "Managing infrastructure changes through pull requests"],
      ]),
      category("containers", "Containers", J, [
        ["docker", "Docker", "Building and running container images"],
        ["k8s", "Managed Kubernetes", "EKS, AKS or GKE basics", "supporting"],
      ]),
      category("operations", "Operations", J, [
        ["monitoring", "Monitoring & logging", "CloudWatch, Azure Monitor or Cloud Logging, and alerts"],
        ["ha", "High availability & recovery", "Multi-zone design, backups and disaster recovery", "supporting"],
        ["cost", "Cost optimization", "Right-sizing, reservations and budgets", "supporting"],
      ]),
      category("certification", "Certification", J, [
        ["associate", "Associate-level certification", "AWS SAA, Azure AZ-104 or Google ACE", "supporting"],
      ]),
    ],
    requires: {
      "foundations-scripting": ["foundations-linux"],
      "networking-vpc": ["foundations-linux"],
      "networking-dns": ["networking-vpc"],
      "networking-hybrid": ["networking-vpc"],
      "platform-compute": ["networking-vpc"],
      "platform-storage": ["identity-iam"],
      "platform-databases": ["networking-vpc", "identity-iam"],
      "identity-encryption": ["identity-iam", "platform-storage"],
      "identity-posture": ["identity-encryption"],
      "iac-terraform": ["iac-git", "platform-compute", "foundations-scripting"],
      "containers-docker": ["foundations-linux"],
      "containers-k8s": ["containers-docker", "platform-compute", "networking-dns"],
      "operations-monitoring": ["platform-compute"],
      "operations-ha": ["platform-databases", "networking-dns", "operations-monitoring"],
      "operations-cost": ["platform-compute", "platform-storage"],
      "certification-associate": ["operations-ha", "iac-terraform", "identity-posture"],
    },
    mastery: ["identity-iam", "networking-vpc"],
    quiz: [
      {
        id: "cl-role",
        skillId: "identity-iam",
        question: "What's the recommended way to give an app on a cloud VM access to object storage?",
        options: [
          "Attach a role with only the permissions it needs",
          "Hard-code an admin access key in the app",
          "Make the storage bucket public",
          "Use the account's root credentials",
        ],
        answer: 0,
        explanation: "Roles provide short-lived, automatically rotated credentials scoped to exactly what the app needs.",
      },
      {
        id: "cl-public",
        skillId: "networking-vpc",
        question: "What makes a subnet 'public' in AWS?",
        options: [
          "Its route table has a route to an internet gateway",
          "It has more IP addresses",
          "It's in a different region",
          "It only uses IPv6",
        ],
        answer: 0,
        explanation: "A subnet is public when it routes 0.0.0.0/0 to an internet gateway.",
      },
      {
        id: "cl-object",
        skillId: "platform-storage",
        question: "Which storage suits millions of user-uploaded images?",
        options: [
          "Object storage such as S3, Azure Blob or Cloud Storage",
          "A block volume attached to one VM",
          "The VM's local disk",
          "A column in a relational database",
        ],
        answer: 0,
        explanation: "Object storage scales almost without limit, is cheap per GB, and serves files over HTTP.",
      },
      {
        id: "cl-az",
        skillId: "operations-ha",
        question: "Running instances across several availability zones mainly protects against:",
        options: ["Failure of a single data center", "High cloud costs", "Slow DNS resolution", "Bugs in your code"],
        answer: 0,
        explanation: "Availability zones are isolated data centers. Spreading across them survives the loss of one.",
      },
    ],
  },
};

function finalize(raw: RawFramework): SkillFramework {
  return {
    quiz: raw.quiz,
    categories: raw.categories.map((c) => ({
      ...c,
      skills: c.skills.map((skill) => ({
        ...skill,
        requires: raw.requires[skill.id] ?? [],
        required: raw.mastery.includes(skill.id) ? 3 : skill.importance === "core" ? 2 : 1,
      })),
    })),
  };
}

export const frameworks: Record<string, SkillFramework> = Object.fromEntries(
  Object.entries(rawFrameworks).map(([slug, raw]) => [slug, finalize(raw)]),
);
