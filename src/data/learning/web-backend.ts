import type { RawLessons } from "./types";

export const webBackendLessons: RawLessons = {
  "how-the-web-works": {
    overview:
      "Understanding what happens between typing a URL and seeing a page (DNS, HTTP, servers and the browser's rendering) lets you debug problems anywhere in the stack instead of guessing.",
    topics: [
      ["Clients and servers", "Requests, responses and where your code runs"],
      ["DNS", "How a domain name becomes an IP address, and common record types"],
      ["HTTP and HTTPS", "Methods, status codes, headers and TLS encryption"],
      ["How browsers render", "Parsing HTML and CSS, building the render tree, layout and paint"],
      ["Rendering strategies", "Client-side, server-side and static rendering, and their trade-offs"],
    ],
    resources: [
      ["How the web works", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works", "MDN Web Docs", "Guide"],
      ["What is DNS?", "https://www.cloudflare.com/learning/dns/what-is-dns/", "Cloudflare Learning Center", "Guide"],
      ["An overview of HTTP", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", "MDN Web Docs", "Guide"],
    ],
    projects: [
      ["Trace a page load", "Beginner", 3, "Use browser dev tools and dig or nslookup to document every step of loading a real site, from DNS lookup to first paint."],
      ["Tiny HTTP server", "Intermediate", 5, "Write a minimal HTTP server with Node's http module that serves HTML, JSON and a 404, and inspect the raw responses with curl."],
    ],
    quiz: [
      ["What does DNS do?", ["Encrypts traffic", "Translates domain names into IP addresses", "Renders HTML", "Stores cookies"], 1, "DNS resolves human-readable names like example.com to the addresses computers connect to."],
      ["What does the S in HTTPS add?", ["Speed", "Encryption and server authentication via TLS", "Server-side rendering", "Sessions"], 1, "TLS encrypts traffic and proves the server's identity with a certificate."],
      ["What is a benefit of server-side rendering?", ["No server needed", "Content arrives as HTML, which helps first load and SEO", "Less JavaScript knowledge needed", "No caching"], 1, "The browser can display server-rendered HTML before JavaScript loads."],
    ],
  },

  http: {
    overview:
      "HTTP is the protocol every web API speaks. Backend developers need to know methods, status codes, headers, caching and CORS well enough to design APIs and debug clients quickly.",
    topics: [
      ["Requests and responses", "Request line, headers, body, and how to inspect them with curl"],
      ["Methods and idempotency", "GET, POST, PUT, PATCH and DELETE, and which are safe or idempotent"],
      ["Status codes", "2xx, 3xx, 4xx and 5xx, and choosing the right one"],
      ["Headers", "Content-Type, Authorization, cookies and custom headers"],
      ["Caching", "Cache-Control, ETags and conditional requests"],
      ["CORS", "Why browsers block cross-origin requests and how servers allow them"],
    ],
    resources: [
      ["An overview of HTTP", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", "MDN Web Docs", "Guide"],
      ["HTTP response status codes", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", "MDN Web Docs", "Reference"],
      ["HTTP caching", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching", "MDN Web Docs", "Guide"],
      ["Cross-Origin Resource Sharing (CORS)", "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS", "MDN Web Docs", "Guide"],
    ],
    projects: [
      ["curl field guide", "Beginner", 3, "Use curl against a public API to send each method, set headers, follow redirects and trigger different status codes, documenting what you see."],
      ["Caching-aware endpoint", "Intermediate", 5, "Build an endpoint that returns ETags and honors If-None-Match with 304 responses, then verify it in the browser's network panel."],
    ],
    quiz: [
      ["Which method is idempotent?", ["POST", "PUT", "Neither", "Both"], 1, "Repeating the same PUT leaves the resource in the same state. Repeating a POST may create duplicates."],
      ["Which status means the client isn't authenticated?", ["401", "403", "404", "500"], 0, "401 means credentials are missing or invalid. 403 means authenticated but not allowed."],
      ["Who enforces CORS?", ["The server", "The browser", "DNS", "The database"], 1, "Browsers enforce CORS using headers the server sends. Non-browser clients aren't restricted by it."],
    ],
  },

  nodejs: {
    overview:
      "Node.js runs JavaScript on the server, so a team can use one language across the whole stack. Its event-driven, non-blocking model suits APIs and real-time apps that handle many connections at once.",
    topics: [
      ["The event loop", "How Node handles many connections on one thread, and what blocks it"],
      ["Asynchronous programming", "Callbacks, promises and async/await, and handling rejections"],
      ["Modules and npm", "ES modules versus CommonJS, packages and scripts"],
      ["Streams", "Processing large files and responses in chunks with backpressure"],
      ["Express", "Routing, middleware, request parsing and structuring an app"],
      ["Error handling and testing", "Central error middleware, process-level errors and node:test or Vitest"],
    ],
    resources: [
      ["Introduction to Node.js", "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", "Node.js", "Docs"],
      ["The Node.js event loop", "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick", "Node.js", "Guide"],
      ["Stream API", "https://nodejs.org/api/stream.html", "Node.js", "Reference"],
      ["Express error handling", "https://expressjs.com/en/guide/error-handling.html", "Express", "Docs"],
      ["Node.js test runner", "https://nodejs.org/api/test.html", "Node.js", "Reference"],
    ],
    projects: [
      ["Notes API with Express", "Beginner", 6, "Build a REST API for notes with routing, validation, central error handling and tests using node:test."],
      ["CSV import service", "Intermediate", 8, "Stream a large CSV upload, validate rows as they arrive and write them to a database without loading the whole file into memory."],
    ],
    quiz: [
      ["What happens if you run a long synchronous loop in a Node request handler?", ["Only that request slows down", "The event loop is blocked and all requests stall", "Node starts a new thread", "Nothing"], 1, "Node runs JavaScript on one main thread, so CPU-heavy sync work blocks every connection."],
      ["Why use streams for large files?", ["They're required for files", "They process data in chunks, keeping memory use low", "They encrypt data", "They're faster to write"], 1, "Streams avoid loading the whole file into memory and handle backpressure."],
      ["How does Express recognize error-handling middleware?", ["Its name", "It takes four arguments (err, req, res, next)", "It's registered first", "It returns an error"], 1, "Express treats middleware with four parameters as an error handler."],
    ],
  },

  "rest-api-design": {
    overview:
      "A well-designed API is predictable, consistent and hard to misuse. REST API design covers resource naming, status codes, validation, pagination, versioning and documentation that other developers can rely on.",
    topics: [
      ["Resources and URLs", "Nouns for resources, nesting, and consistent naming"],
      ["Methods and status codes", "Mapping operations to HTTP and returning accurate statuses"],
      ["Validation and errors", "Validating input and returning structured error responses (RFC 9457)"],
      ["Pagination, filtering and sorting", "Cursor versus offset pagination, and query parameters"],
      ["Versioning and compatibility", "Evolving an API without breaking clients"],
      ["Documentation", "Describing APIs with OpenAPI"],
    ],
    resources: [
      ["Web API design best practices", "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design", "Microsoft Learn", "Guide"],
      ["OpenAPI Specification", "https://spec.openapis.org/oas/latest.html", "OpenAPI Initiative", "Reference"],
      ["RFC 9457: Problem Details for HTTP APIs", "https://www.rfc-editor.org/rfc/rfc9457", "IETF", "Reference"],
    ],
    projects: [
      ["Bookstore API", "Intermediate", 10, "Design and build a bookstore API with nested resources, validation, cursor pagination, consistent errors and an OpenAPI document."],
      ["API design review", "Intermediate", 3, "Review a public API's documentation against good practice and write up five concrete improvements."],
    ],
    quiz: [
      ["Which URL best follows REST conventions for a user's orders?", ["/getUserOrders?id=4", "/users/4/orders", "/orders/getByUser/4", "/user-orders-4"], 1, "Resources are nouns, nested to express relationships, with HTTP methods expressing the action."],
      ["Why is cursor pagination often preferred for large, changing datasets?", ["It's simpler", "It stays stable when rows are inserted or deleted", "It allows jumping to any page", "It needs no index"], 1, "Offsets shift as data changes. A cursor continues from a known position."],
      ["What should a validation failure return?", ["200 with an error flag", "400 or 422 with details of each invalid field", "500", "302 redirect"], 1, "A 4xx status with field-level details lets clients show useful errors."],
    ],
  },

  "graphql-grpc": {
    overview:
      "REST isn't the only option. GraphQL lets clients ask for exactly the data they need; gRPC offers fast, strongly typed service-to-service calls. Knowing when each fits is a mark of a well-rounded backend developer.",
    topics: [
      ["GraphQL schemas and queries", "Types, queries, mutations and resolvers"],
      ["GraphQL trade-offs", "Over- and under-fetching, N+1 queries and caching challenges"],
      ["Protocol Buffers", "Defining messages and services in .proto files"],
      ["gRPC communication", "Unary and streaming calls over HTTP/2"],
      ["Choosing an API style", "REST, GraphQL or gRPC for public, frontend-facing and internal APIs"],
    ],
    resources: [
      ["Learn GraphQL", "https://graphql.org/learn/", "GraphQL Foundation", "Docs"],
      ["Introduction to gRPC", "https://grpc.io/docs/what-is-grpc/introduction/", "gRPC", "Docs"],
      ["Protocol Buffers overview", "https://protobuf.dev/overview/", "Google", "Docs"],
    ],
    projects: [
      ["GraphQL wrapper", "Intermediate", 8, "Put a GraphQL API in front of an existing REST API, using a DataLoader-style batch to avoid N+1 requests."],
      ["gRPC microservice pair", "Advanced", 10, "Build two services that talk over gRPC with a shared .proto contract, including one server-streaming call."],
    ],
    quiz: [
      ["What problem does GraphQL address?", ["Encryption", "Clients over-fetching or making many round trips for data", "Database indexing", "Server deployment"], 1, "Clients request exactly the fields they need in one query."],
      ["What does gRPC use to define services and messages?", ["JSON Schema", "Protocol Buffers", "XML", "YAML"], 1, ".proto files define strongly typed messages and service methods."],
      ["What is the N+1 problem in GraphQL resolvers?", ["Too many types", "One query triggers a separate database call for each item in a list", "Missing authentication", "Slow schema parsing"], 1, "Batching (e.g. DataLoader) groups those calls into one."],
    ],
  },

  "fullstack-framework": {
    overview:
      "Full-stack frameworks like Next.js combine routing, rendering, data fetching and server code in one project. They're how many teams now ship products quickly, and they're common in full-stack job descriptions.",
    topics: [
      ["File-based routing", "Pages, layouts, dynamic segments and nested routes"],
      ["Server and client components", "What runs where, and passing data between them"],
      ["Data fetching and caching", "Fetching on the server, revalidation and streaming"],
      ["Server actions and route handlers", "Handling forms and building API endpoints in the same codebase"],
      ["Rendering modes", "Static, dynamic and incremental rendering choices"],
    ],
    resources: [
      ["Next.js documentation", "https://nextjs.org/docs", "Vercel (Next.js)", "Docs"],
      ["Learn Next.js", "https://nextjs.org/learn", "Vercel (Next.js)", "Course"],
      ["React Router framework mode", "https://reactrouter.com/start/framework/installation", "React Router", "Docs"],
    ],
    projects: [
      ["Blog with an admin area", "Intermediate", 12, "Build a blog with static public pages, a protected admin area, server actions for editing and a database behind it."],
      ["Job board", "Advanced", 20, "Build a job board with search, filters, authentication, server-side pagination and email notifications."],
    ],
    quiz: [
      ["What is a key benefit of server components?", ["They run in the browser", "They can fetch data on the server and send less JavaScript to the client", "They replace CSS", "They don't need React"], 1, "Server components render on the server and don't ship their code to the browser."],
      ["What does file-based routing mean?", ["Routes are defined in a database", "The folder structure defines the app's URLs", "Routes are generated at runtime only", "Each file is a separate app"], 1, "A file like app/blog/[slug]/page.tsx maps directly to /blog/:slug."],
      ["When is static rendering a good fit?", ["Pages that change per user on every request", "Content that is the same for everyone and changes rarely", "Real-time dashboards", "Checkout pages"], 1, "Static pages can be pre-built and served from a CDN."],
    ],
  },

  "orm-migrations": {
    overview:
      "ORMs let you work with a database through typed code, and migrations keep the schema in version control. Together they make database changes reviewable, repeatable and safe across environments.",
    topics: [
      ["What an ORM does", "Mapping tables to models, and the trade-offs versus raw SQL"],
      ["Defining schemas", "Models, relations and constraints in Prisma or Drizzle"],
      ["Querying", "Filtering, relations, transactions and avoiding N+1 queries"],
      ["Migrations", "Generating, reviewing and applying schema changes"],
      ["Safe changes in production", "Backwards-compatible migrations and seeding data"],
    ],
    resources: [
      ["Prisma ORM documentation", "https://www.prisma.io/docs/orm", "Prisma", "Docs"],
      ["Prisma Migrate", "https://www.prisma.io/docs/orm/prisma-migrate", "Prisma", "Docs"],
      ["Drizzle ORM overview", "https://orm.drizzle.team/docs/overview", "Drizzle", "Docs"],
    ],
    projects: [
      ["Library database", "Beginner", 5, "Model books, authors and loans with relations and constraints, write seed data and query it through an ORM."],
      ["Zero-downtime column rename", "Intermediate", 4, "Rename a column in a live app using a multi-step expand-and-contract migration so old and new code both keep working."],
    ],
    quiz: [
      ["What is a database migration?", ["A backup", "A versioned, repeatable change to the schema", "Moving to a new host", "A query optimization"], 1, "Migrations bring every environment's schema to the same state in a controlled way."],
      ["Why review generated migrations before applying them?", ["They're always wrong", "Some changes, like dropping columns, can destroy data", "To make them faster", "Reviews are required by SQL"], 1, "A destructive change can't be undone in production without a backup."],
      ["What's a common ORM performance pitfall?", ["Using transactions", "N+1 queries when loading related records in a loop", "Using indexes", "Typed results"], 1, "Load relations in one query (include/join) instead of one query per row."],
    ],
  },

  authentication: {
    overview:
      "Authentication proves who a user is. Getting it wrong leads straight to account takeovers, so developers need to know how sessions, tokens, password storage and OAuth work, and when to use a proven provider.",
    topics: [
      ["Password storage", "Slow, salted hashing with bcrypt, scrypt or Argon2"],
      ["Sessions and cookies", "Server-side sessions, HttpOnly, Secure and SameSite flags"],
      ["Tokens", "JWTs, their structure and their pitfalls (expiry and revocation)"],
      ["OAuth 2.0 and OpenID Connect", "Signing in with Google or GitHub, and the authorization code flow"],
      ["Multi-factor authentication", "TOTP, passkeys and recovery flows"],
      ["Using auth providers", "When to use Auth.js, Clerk, Auth0 or similar instead of building it yourself"],
    ],
    resources: [
      ["Authentication Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html", "OWASP", "Guide"],
      ["Password Storage Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html", "OWASP", "Guide"],
      ["OAuth 2.0", "https://oauth.net/2/", "oauth.net", "Reference"],
      ["Introduction to JSON Web Tokens", "https://jwt.io/introduction", "jwt.io (Auth0)", "Guide"],
    ],
    projects: [
      ["Email and password auth", "Intermediate", 8, "Implement sign-up, login and logout with hashed passwords, secure session cookies, rate limiting and a password reset flow."],
      ["Social sign-in", "Intermediate", 5, "Add 'Sign in with GitHub' using OAuth 2.0 and link it to existing accounts by verified email."],
    ],
    quiz: [
      ["How should passwords be stored?", ["Encrypted so they can be recovered", "With a slow, salted hash such as Argon2 or bcrypt", "As plain SHA-256 hashes", "In plain text"], 1, "Slow salted hashes make stolen databases far harder to crack."],
      ["What does the HttpOnly cookie flag do?", ["Requires HTTPS", "Stops JavaScript from reading the cookie", "Expires the cookie on close", "Shares it across domains"], 1, "HttpOnly limits the damage an XSS attack can do by hiding the session cookie from scripts."],
      ["What's a known drawback of long-lived JWTs?", ["They're too large to send", "They're hard to revoke before they expire", "They can't hold claims", "They require cookies"], 1, "A stateless token stays valid until expiry unless you add a denylist or short lifetimes with refresh tokens."],
    ],
  },

  authorization: {
    overview:
      "Authorization decides what an authenticated user is allowed to do. Broken access control is the top web application risk on the OWASP Top 10, so it must be designed deliberately, not bolted on.",
    topics: [
      ["Authentication versus authorization", "Who you are versus what you can do"],
      ["Role-based access control", "Roles and permissions, and keeping checks central"],
      ["Attribute and ownership checks", "Resource ownership, tenancy and attribute-based rules"],
      ["Enforcing on the server", "Never trusting the client, and checking every request"],
      ["Common failures", "Insecure direct object references and missing function-level checks"],
    ],
    resources: [
      ["Authorization Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html", "OWASP", "Guide"],
      ["A01:2021 Broken Access Control", "https://owasp.org/Top10/A01_2021-Broken_Access_Control/", "OWASP", "Reference"],
      ["Access control vulnerabilities", "https://portswigger.net/web-security/access-control", "PortSwigger Web Security Academy", "Interactive"],
    ],
    projects: [
      ["Team workspace permissions", "Intermediate", 8, "Add owner, admin and member roles to a multi-user app, with ownership checks on every resource and tests for each rule."],
      ["Break and fix access control", "Intermediate", 4, "Complete PortSwigger's access-control labs, then audit your own API for the same flaws and fix them."],
    ],
    quiz: [
      ["What is an insecure direct object reference (IDOR)?", ["A slow query", "Accessing another user's data by changing an ID in a request", "A broken link", "A missing index"], 1, "The server must check that the requester is allowed to access that specific record."],
      ["Where must authorization checks be enforced?", ["Only in the UI", "On the server for every request", "In the database only", "In CSS"], 1, "Hiding a button doesn't stop someone calling the API directly."],
      ["In RBAC, what are permissions granted to?", ["Individual requests", "Roles, which are then assigned to users", "IP addresses", "Database tables"], 1, "Role-based access control groups permissions into roles to keep rules manageable."],
    ],
  },

  "web-security": {
    overview:
      "Web applications are attacked constantly. Knowing the OWASP Top 10, and how injection, XSS and CSRF actually work, lets you prevent the most common and damaging vulnerabilities in the code you write.",
    topics: [
      ["The OWASP Top 10", "The most critical web application risks and why they occur"],
      ["Injection", "SQL and command injection, and parameterized queries"],
      ["Cross-site scripting (XSS)", "Output encoding, framework escaping and Content Security Policy"],
      ["Cross-site request forgery (CSRF)", "SameSite cookies and anti-CSRF tokens"],
      ["Security headers and HTTPS", "HSTS, CSP, X-Content-Type-Options and secure defaults"],
      ["Dependencies and secrets", "Vulnerable packages, secret scanning and least privilege"],
    ],
    resources: [
      ["OWASP Top Ten", "https://owasp.org/www-project-top-ten/", "OWASP", "Reference"],
      ["Web Security Academy", "https://portswigger.net/web-security", "PortSwigger", "Interactive"],
      ["OWASP Cheat Sheet Series", "https://cheatsheetseries.owasp.org/", "OWASP", "Reference"],
      ["Web security", "https://developer.mozilla.org/en-US/docs/Web/Security", "MDN Web Docs", "Guide"],
    ],
    projects: [
      ["Security hardening pass", "Intermediate", 6, "Audit one of your apps against the OWASP Top 10, add security headers and CSP, and fix every finding with a short write-up."],
      ["Vulnerable app lab", "Intermediate", 8, "Work through PortSwigger's SQL injection, XSS and CSRF labs and summarize how each would be prevented in your stack."],
    ],
    quiz: [
      ["What reliably prevents SQL injection?", ["Escaping quotes manually", "Parameterized queries or prepared statements", "Hiding error messages", "Using POST instead of GET"], 1, "Parameters keep data separate from the SQL command, so input can't change the query."],
      ["What does a Content Security Policy help prevent?", ["SQL injection", "Cross-site scripting by restricting which scripts can run", "DDoS attacks", "Weak passwords"], 1, "CSP limits script sources, so injected scripts are blocked even if they reach the page."],
      ["How do SameSite cookies help against CSRF?", ["They encrypt cookies", "They stop browsers sending cookies on most cross-site requests", "They expire faster", "They require MFA"], 1, "Without the cookie, a forged cross-site request isn't authenticated."],
    ],
  },

  "fullstack-projects": {
    overview:
      "Employers hire full-stack developers to ship features end to end. Complete projects, with auth, a database, a deployed frontend and tests, are the clearest proof you can do that.",
    topics: [
      ["Scoping a project", "Picking a real problem and a realistic first version"],
      ["Architecture", "Choosing a stack, structuring code and modeling data"],
      ["Building end to end", "Auth, CRUD, validation, error handling and a polished UI"],
      ["Quality", "Tests, accessibility and performance basics"],
      ["Shipping and documenting", "Deployment, a clear README and a short demo video"],
    ],
    resources: [
      ["Full Stack open", "https://fullstackopen.com/en/", "University of Helsinki", "Course"],
      ["Full Stack JavaScript path", "https://www.theodinproject.com/paths/full-stack-javascript", "The Odin Project", "Course"],
      ["Project Based Learning", "https://github.com/practical-tutorials/project-based-learning", "GitHub community", "Reference"],
    ],
    projects: [
      ["Habit tracker", "Intermediate", 20, "Build a habit tracker with accounts, streaks, reminders, charts and a deployed frontend and API."],
      ["Marketplace MVP", "Advanced", 40, "Build a small marketplace with listings, search, image uploads, messaging between users and admin moderation."],
    ],
    quiz: [
      ["What's the best first step for a portfolio project?", ["Choose the newest framework", "Define the problem and a small first version", "Design the logo", "Set up microservices"], 1, "A clear, small scope means you'll actually finish and polish it."],
      ["Which detail most improves a project for reviewers?", ["More dependencies", "A live link and a README explaining decisions", "A longer codebase", "Custom fonts"], 1, "Reviewers want to try it quickly and understand your reasoning."],
      ["Why add tests to a portfolio project?", ["To inflate line count", "They show you can build maintainable software", "They're required to deploy", "They replace documentation"], 1, "Tests signal professional habits that hiring teams look for."],
    ],
  },

  "automated-testing": {
    overview:
      "Automated tests catch regressions before users do. Full-stack developers need a balanced suite of unit, integration and end-to-end tests that runs on every change and stays fast and reliable.",
    topics: [
      ["The test pyramid", "Many fast unit tests, fewer integration tests, a few end-to-end tests"],
      ["Unit tests", "Testing pure logic in isolation with Vitest or Jest"],
      ["Integration tests", "Testing API routes against a real test database"],
      ["End-to-end tests", "Driving critical journeys in a browser with Playwright"],
      ["Test data and CI", "Factories, isolated databases and running tests on every pull request"],
    ],
    resources: [
      ["The Practical Test Pyramid", "https://martinfowler.com/articles/practical-test-pyramid.html", "martinfowler.com", "Guide"],
      ["Vitest guide", "https://vitest.dev/guide/", "Vitest", "Docs"],
      ["Playwright: getting started", "https://playwright.dev/docs/intro", "Playwright (Microsoft)", "Docs"],
    ],
    projects: [
      ["Test an existing app", "Intermediate", 8, "Add unit, integration and end-to-end tests to one of your apps, aiming for its most important flows rather than a coverage number."],
      ["CI test pipeline", "Intermediate", 4, "Run your full test suite in GitHub Actions with a disposable database service and required checks on pull requests."],
    ],
    quiz: [
      ["Why have more unit tests than end-to-end tests?", ["Unit tests are more important", "They're faster and more precise, while E2E tests are slower and broader", "E2E tests can't fail", "Unit tests need no code"], 1, "The pyramid balances speed and confidence."],
      ["What should integration tests for an API use?", ["Production data", "A separate test database, reset between tests", "Only mocks", "No database"], 1, "A real but isolated database catches query and schema issues without risking real data."],
      ["What's the main purpose of running tests in CI?", ["To slow down merges", "To catch regressions automatically before code is merged", "To deploy faster", "To format code"], 1, "Every change gets checked the same way, regardless of who wrote it."],
    ],
  },

  "app-deployment": {
    overview:
      "Getting an app and its database running reliably in the cloud is part of full-stack work. That means environment configuration, managed databases, logs and a repeatable deployment process.",
    topics: [
      ["Twelve-factor apps", "Config in the environment, stateless processes and disposability"],
      ["Hosting options", "Platforms like Vercel, Render or Fly.io versus containers on a cloud provider"],
      ["Managed databases", "Provisioning, connection limits, backups and migrations on deploy"],
      ["Environments", "Preview, staging and production, and keeping them consistent"],
      ["Observability basics", "Logs, error tracking and uptime monitoring"],
    ],
    resources: [
      ["The Twelve-Factor App", "https://12factor.net/", "12factor.net", "Guide"],
      ["Vercel documentation", "https://vercel.com/docs", "Vercel", "Docs"],
      ["Render documentation", "https://render.com/docs", "Render", "Docs"],
      ["Fly.io documentation", "https://fly.io/docs/", "Fly.io", "Docs"],
    ],
    projects: [
      ["Deploy a full-stack app", "Intermediate", 5, "Deploy a frontend, API and managed Postgres database with environment-based config and migrations that run on deploy."],
      ["Staging environment", "Intermediate", 4, "Add a staging environment that mirrors production, with seeded data and a promotion step to production."],
    ],
    quiz: [
      ["Under the twelve-factor approach, where should configuration live?", ["Hard-coded in the source", "In environment variables", "In the database", "In a README"], 1, "Environment config lets the same build run in every environment."],
      ["Why should app servers be stateless?", ["To save memory", "So instances can be added, replaced or restarted freely", "Because databases require it", "To avoid logging"], 1, "State belongs in databases or caches, which makes scaling and recovery simple."],
      ["What should happen to database migrations during a deploy?", ["Run manually some days later", "Run automatically and safely as part of the release", "Never run in production", "Run before every request"], 1, "Automating migrations keeps schema and code in step."],
    ],
  },
};
