import type { RawLessons } from "./types";

export const engineeringLessons: RawLessons = {
  "server-language": {
    overview:
      "Every backend is written in a language like Python, Java, Go, C# or JavaScript (Node.js). Pick one and learn it deeply: syntax, types, the standard library and its ecosystem. The concepts transfer to the others.",
    topics: [
      ["Choosing a language", "What Python, Java, Go, C# and Node.js are each known for, and checking local job listings"],
      ["Syntax and types", "Variables, control flow, functions and the type system"],
      ["Collections and the standard library", "Lists, maps, sets, strings, files and dates"],
      ["Packages and tooling", "Package managers, virtual environments or modules, and running scripts"],
      ["Errors and debugging", "Exceptions or error values, logging and using a debugger"],
      ["Idiomatic code", "Writing code the way that language's community expects"],
    ],
    resources: [
      ["The Python Tutorial", "https://docs.python.org/3/tutorial/", "Python Software Foundation", "Docs"],
      ["A Tour of Go", "https://go.dev/tour/", "The Go Project", "Interactive"],
      ["Learn Java", "https://dev.java/learn/", "Oracle (dev.java)", "Docs"],
      ["C# documentation", "https://learn.microsoft.com/en-us/dotnet/csharp/", "Microsoft Learn", "Docs"],
    ],
    projects: [
      ["Command-line task manager", "Beginner", 6, "Build a CLI that adds, lists, completes and saves tasks to a JSON file, with clear error messages and tests."],
      ["Log analyzer", "Intermediate", 8, "Parse a large web server log, report the top endpoints, status code counts and slowest requests, and keep memory use low."],
    ],
    quiz: [
      ["What matters most when picking your first backend language?", ["Which is newest", "Learning one deeply, ideally one used in jobs you're targeting", "Learning three at once", "Which has the shortest syntax"], 1, "Depth in one language transfers. Checking job listings keeps it practical."],
      ["What is a package manager for?", ["Formatting code", "Installing and versioning third-party libraries", "Running the database", "Deploying servers"], 1, "pip, Maven, Go modules, NuGet and npm manage dependencies and their versions."],
      ["Why learn to use a debugger?", ["Print statements don't work", "You can pause execution and inspect state, which finds bugs faster", "Compilers require it", "It formats code"], 1, "Stepping through code shows exactly where values go wrong."],
    ],
  },

  dsa: {
    overview:
      "Data structures and algorithms help you choose the right tool for a problem and reason about performance. They also feature heavily in technical interviews for engineering roles.",
    topics: [
      ["Big-O complexity", "Describing time and space cost as input grows"],
      ["Arrays, lists and hash maps", "Lookup, insertion and when each is the right choice"],
      ["Stacks, queues and sets", "Ordering guarantees and typical uses"],
      ["Trees and graphs", "Binary search trees, traversal, BFS and DFS"],
      ["Sorting and searching", "Binary search and common sorting approaches"],
      ["Problem-solving patterns", "Two pointers, sliding window and recursion"],
    ],
    resources: [
      ["Algorithms", "https://www.khanacademy.org/computing/computer-science/algorithms", "Khan Academy", "Course"],
      ["VisuAlgo", "https://visualgo.net/en", "VisuAlgo (NUS)", "Interactive"],
      ["Open Data Structures", "https://opendatastructures.org/", "Pat Morin", "Book"],
    ],
    projects: [
      ["Implement core structures", "Beginner", 6, "Implement a stack, queue, linked list and hash map from scratch with tests, and note each operation's complexity."],
      ["Route finder", "Intermediate", 8, "Model a small city map as a graph and find shortest routes with BFS and Dijkstra's algorithm."],
    ],
    quiz: [
      ["What is the average lookup time in a hash map?", ["O(n)", "O(1)", "O(log n)", "O(n²)"], 1, "Hashing jumps almost directly to the right bucket on average."],
      ["Binary search requires the data to be…", ["Unique", "Sorted", "Numeric", "In a linked list"], 1, "Each step discards half the remaining range, which only works on sorted data."],
      ["Which structure gives last-in, first-out ordering?", ["Queue", "Stack", "Set", "Heap"], 1, "A stack pops the most recently pushed item first."],
    ],
  },

  "code-organization": {
    overview:
      "Code is read far more often than it's written. Organizing code into clear modules, handling errors consistently and refactoring safely keeps a backend maintainable as a team and product grow.",
    topics: [
      ["Functions and modules", "Single responsibility, cohesion and clear interfaces"],
      ["Layering an application", "Separating routes, business logic and data access"],
      ["Error handling", "Consistent error types, failing loudly and not swallowing exceptions"],
      ["Design patterns", "A handful of useful patterns, such as strategy, adapter and dependency injection"],
      ["Refactoring", "Spotting code smells and improving code in small, tested steps"],
    ],
    resources: [
      ["Refactoring", "https://refactoring.guru/refactoring", "Refactoring.Guru", "Guide"],
      ["Design Patterns", "https://refactoring.guru/design-patterns", "Refactoring.Guru", "Guide"],
      ["Google style guides", "https://google.github.io/styleguide/", "Google", "Reference"],
    ],
    projects: [
      ["Refactor a script into an app", "Intermediate", 6, "Take a 300-line script and refactor it into modules with clear layers, tests and consistent error handling."],
      ["Pluggable notifications", "Intermediate", 5, "Build a notification service where email, SMS and Slack senders are swappable strategies behind one interface."],
    ],
    quiz: [
      ["What does the single responsibility principle suggest?", ["One file per project", "A module should have one reason to change", "Functions should have one line", "Use one class only"], 1, "Focused modules are easier to understand, test and change."],
      ["Why separate business logic from HTTP route handlers?", ["It's required by HTTP", "Logic can be tested and reused without the web layer", "It makes requests faster", "To use fewer files"], 1, "Thin handlers that call a service layer keep logic portable and testable."],
      ["What should you have in place before a large refactor?", ["A new framework", "Tests that confirm current behavior", "A rewrite plan", "Nothing"], 1, "Tests tell you whether the refactor changed behavior."],
    ],
  },

  git: {
    overview:
      "Git tracks every change to a codebase and lets many people work on it at once. It's used by virtually every software team, and daily use of it is assumed from day one in any tech role.",
    topics: [
      ["Repositories and commits", "init, clone, add, commit and writing useful commit messages"],
      ["Branching and merging", "Creating branches, merging and resolving conflicts"],
      ["Remotes", "push, pull, fetch and working with GitHub or GitLab"],
      ["Inspecting history", "log, diff, blame and finding when a bug was introduced"],
      ["Undoing things", "restore, revert, reset and recovering work with reflog"],
    ],
    resources: [
      ["Pro Git", "https://git-scm.com/book/en/v2", "git-scm.com", "Book"],
      ["Learn Git Branching", "https://learngitbranching.js.org/", "Learn Git Branching", "Interactive"],
      ["Hello World", "https://docs.github.com/en/get-started/start-your-journey/hello-world", "GitHub Docs", "Guide"],
    ],
    projects: [
      ["Version a personal project", "Beginner", 2, "Put an existing project under Git, make small focused commits and push it to GitHub with a README."],
      ["Conflict resolution drill", "Beginner", 2, "Create two branches that edit the same lines, merge them, resolve the conflict and use git log --graph to explain what happened."],
    ],
    quiz: [
      ["What does git commit do?", ["Uploads code to GitHub", "Saves a snapshot of staged changes to local history", "Creates a branch", "Deletes changes"], 1, "Commits are local. git push sends them to a remote."],
      ["What is a merge conflict?", ["A failed upload", "Two branches changed the same lines differently, so Git needs you to choose", "A broken repository", "A missing commit"], 1, "Git can't decide which change to keep, so it asks you."],
      ["Which command safely undoes a commit that's already been pushed and shared?", ["git reset --hard", "git revert", "git rm", "git checkout"], 1, "revert adds a new commit that reverses the old one without rewriting shared history."],
    ],
  },

  "git-workflows": {
    overview:
      "Teams collaborate through pull requests, code review and agreed branching strategies. Working smoothly in that process, and reviewing others' code well, is expected in any engineering role.",
    topics: [
      ["Branching strategies", "Trunk-based development, GitHub flow and when release branches help"],
      ["Pull requests", "Small, focused changes with clear descriptions"],
      ["Code review", "Giving and receiving useful, kind feedback"],
      ["Commit conventions", "Conventional Commits, rebasing and keeping history readable"],
      ["Protecting main", "Required reviews, status checks and tags for releases"],
    ],
    resources: [
      ["About pull requests", "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests", "GitHub Docs", "Docs"],
      ["Comparing Git workflows", "https://www.atlassian.com/git/tutorials/comparing-workflows", "Atlassian", "Guide"],
      ["Google engineering practices: code review", "https://google.github.io/eng-practices/review/", "Google", "Guide"],
      ["Conventional Commits", "https://www.conventionalcommits.org/en/v1.0.0/", "conventionalcommits.org", "Reference"],
    ],
    projects: [
      ["Contribute to open source", "Intermediate", 6, "Find a 'good first issue' in an open-source project, open a pull request that follows its guidelines and respond to review."],
      ["Set up team rules", "Beginner", 2, "Configure branch protection, required checks, a PR template and CODEOWNERS on a repository."],
    ],
    quiz: [
      ["Why keep pull requests small?", ["GitHub limits size", "They're easier to review well and less risky to merge", "They deploy faster", "They need fewer tests"], 1, "Reviewers catch more problems in small, focused changes."],
      ["What does trunk-based development emphasise?", ["Long-lived feature branches", "Integrating small changes into main frequently", "No code review", "Monthly releases only"], 1, "Short-lived branches merged often reduce painful merge conflicts."],
      ["What does a required status check on main do?", ["Formats code", "Blocks merging until checks like tests pass", "Deletes old branches", "Notifies users"], 1, "It stops broken changes from reaching the main branch."],
    ],
  },

  "command-line": {
    overview:
      "The command line is the fastest way to navigate systems, run tools and automate repetitive work. Developers, DevOps engineers and security analysts all rely on it daily.",
    topics: [
      ["Navigating and managing files", "cd, ls, cp, mv, rm, and paths"],
      ["Pipes and redirection", "Combining commands with | and writing output to files"],
      ["Searching and filtering", "grep, find, sort, uniq and awk for slicing text and logs"],
      ["Processes and environment", "Running, stopping and inspecting processes, and environment variables"],
      ["PowerShell basics", "The equivalent commands on Windows and object pipelines"],
    ],
    resources: [
      ["The Missing Semester of Your CS Education", "https://missing.csail.mit.edu/", "MIT", "Course"],
      ["The Linux Command Line", "https://linuxcommand.org/tlcl.php", "William Shotts", "Book"],
      ["PowerShell overview", "https://learn.microsoft.com/en-us/powershell/scripting/overview", "Microsoft Learn", "Docs"],
    ],
    projects: [
      ["Log investigation one-liners", "Beginner", 3, "Use grep, awk, sort and uniq on a sample access log to find the top IPs, most requested paths and error spikes."],
      ["Dotfiles and aliases", "Beginner", 2, "Create a shell configuration with useful aliases and functions, version it in Git and document each one."],
    ],
    quiz: [
      ["What does the pipe | do?", ["Runs commands in parallel", "Sends one command's output into the next command's input", "Saves output to a file", "Comments a line"], 1, "Pipes chain small tools into powerful one-liners."],
      ["Which command searches file contents for a pattern?", ["find", "grep", "ls", "cat"], 1, "grep matches text patterns. find searches by file name and attributes."],
      ["What does > do after a command?", ["Appends output to a file", "Overwrites a file with the command's output", "Reads input from a file", "Runs as admin"], 1, "> overwrites; >> appends."],
    ],
  },

  sql: {
    overview:
      "SQL is how almost every application stores and queries structured data. Writing correct, efficient queries (joins, aggregation, transactions) is a core skill for backend, full-stack and data roles alike.",
    topics: [
      ["Selecting and filtering", "SELECT, WHERE, ORDER BY and LIMIT"],
      ["Joins", "Inner, left and self joins, and how rows combine"],
      ["Aggregation", "GROUP BY, HAVING and aggregate functions"],
      ["Changing data", "INSERT, UPDATE, DELETE and transactions"],
      ["Subqueries and CTEs", "Breaking complex queries into readable steps, and window functions"],
      ["Indexes and query plans", "How indexes speed up reads and reading EXPLAIN output"],
    ],
    resources: [
      ["SQLBolt interactive lessons", "https://sqlbolt.com/", "SQLBolt", "Interactive"],
      ["PostgreSQL tutorial", "https://www.postgresql.org/docs/current/tutorial.html", "PostgreSQL", "Docs"],
      ["Select Star SQL", "https://selectstarsql.com/", "Select Star SQL", "Interactive"],
      ["Use The Index, Luke", "https://use-the-index-luke.com/", "Markus Winand", "Book"],
    ],
    projects: [
      ["Analyze a public dataset", "Beginner", 5, "Load a public dataset into PostgreSQL or SQLite and answer ten business questions with joins, aggregation and CTEs."],
      ["Speed up slow queries", "Intermediate", 5, "Generate a large table, find slow queries with EXPLAIN ANALYZE, add the right indexes and document the improvement."],
    ],
    quiz: [
      ["Which join keeps every row from the left table, even without a match?", ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"], 1, "LEFT JOIN fills unmatched right-side columns with NULL."],
      ["Which clause filters groups after aggregation?", ["WHERE", "HAVING", "ORDER BY", "LIMIT"], 1, "WHERE filters rows before grouping; HAVING filters the grouped results."],
      ["What do transactions guarantee?", ["Faster queries", "A group of changes succeeds or fails as a whole", "Automatic backups", "Unique values"], 1, "Atomicity means partial updates are never left behind."],
    ],
  },

  "data-modeling": {
    overview:
      "A good data model makes features easy to build and data hard to corrupt. Designing schemas with the right relationships, constraints and indexes is one of the most lasting decisions a backend developer makes.",
    topics: [
      ["Entities and relationships", "One-to-many and many-to-many, and join tables"],
      ["Normalization", "Removing duplication, and when to denormalize deliberately"],
      ["Constraints", "Primary and foreign keys, unique, not-null and check constraints"],
      ["Indexes", "Choosing indexes for real query patterns and understanding their cost"],
      ["Evolving schemas", "Migrations and backwards-compatible changes"],
    ],
    resources: [
      ["Constraints", "https://www.postgresql.org/docs/current/ddl-constraints.html", "PostgreSQL", "Docs"],
      ["Use The Index, Luke", "https://use-the-index-luke.com/", "Markus Winand", "Book"],
      ["Database normalization", "https://en.wikipedia.org/wiki/Database_normalization", "Wikipedia", "Reference"],
    ],
    projects: [
      ["E-commerce schema", "Intermediate", 6, "Design a schema for products, variants, carts, orders and payments with constraints, then justify each index."],
      ["Schema review", "Intermediate", 3, "Review an open-source project's schema, identify duplication or missing constraints and propose migrations."],
    ],
    quiz: [
      ["How is a many-to-many relationship usually modeled?", ["A comma-separated column", "A join table with foreign keys to both tables", "Duplicate rows", "A JSON blob"], 1, "A join table such as student_courses links the two sides cleanly."],
      ["What does a foreign key constraint protect?", ["Query speed", "Referential integrity, so references point to real rows", "Encryption", "Column order"], 1, "It prevents orphaned references such as orders for deleted customers."],
      ["What's the cost of adding many indexes?", ["None", "Slower writes and more storage", "Slower reads", "Data loss"], 1, "Each insert or update must also update every index."],
    ],
  },

  nosql: {
    overview:
      "NoSQL databases like MongoDB and Redis trade some relational guarantees for flexibility or speed. Knowing their strengths, and when a relational database is still the better choice, helps you pick the right store.",
    topics: [
      ["Types of NoSQL", "Document, key-value, wide-column and graph databases"],
      ["Document modeling", "Embedding versus referencing in MongoDB"],
      ["Key-value stores", "Redis data types, expiry and typical uses"],
      ["Consistency trade-offs", "CAP, eventual consistency and what they mean in practice"],
      ["Choosing a database", "Matching the store to access patterns, not trends"],
    ],
    resources: [
      ["MongoDB manual", "https://www.mongodb.com/docs/manual/", "MongoDB", "Docs"],
      ["Data modeling in MongoDB", "https://www.mongodb.com/docs/manual/data-modeling/", "MongoDB", "Docs"],
      ["Redis documentation", "https://redis.io/docs/latest/", "Redis", "Docs"],
    ],
    projects: [
      ["Activity feed in MongoDB", "Intermediate", 6, "Model a social activity feed in MongoDB, choosing what to embed versus reference based on how it's read."],
      ["Rate limiter with Redis", "Intermediate", 4, "Build an API rate limiter using Redis counters with expiry, and test it under concurrent requests."],
    ],
    quiz: [
      ["When does embedding data in a MongoDB document make sense?", ["When it's read together and doesn't grow without bound", "Always", "Never", "When it's shared by many documents"], 0, "Embedding suits data accessed together. Unbounded or shared data is usually referenced."],
      ["What is Redis commonly used for?", ["Long-term analytics", "Caching, sessions, rate limits and queues", "Storing large files", "Full-text search only"], 1, "Its in-memory speed suits short-lived, frequently accessed data."],
      ["What does eventual consistency mean?", ["Data is never consistent", "Replicas may briefly disagree but converge over time", "Writes are rejected", "All reads are slow"], 1, "Systems accept temporary inconsistency for availability and speed."],
    ],
  },

  "unit-testing": {
    overview:
      "Unit tests check small pieces of logic in isolation. They run in milliseconds, catch regressions early and make refactoring safe, which is why teams expect them on every change.",
    topics: [
      ["What makes a good unit test", "Fast, isolated, deterministic and testing behavior, not implementation"],
      ["Arrange, act, assert", "Structuring tests so they're easy to read"],
      ["Test frameworks", "pytest, JUnit, Go's testing package or Vitest"],
      ["Mocks and fakes", "Isolating dependencies, and the risks of over-mocking"],
      ["Test-driven development", "Writing a failing test first, then the code"],
    ],
    resources: [
      ["Get started with pytest", "https://docs.pytest.org/en/stable/getting-started.html", "pytest", "Docs"],
      ["JUnit user guide", "https://docs.junit.org/current/user-guide/", "JUnit", "Docs"],
      ["Unit Test", "https://martinfowler.com/bliki/UnitTest.html", "martinfowler.com", "Guide"],
    ],
    projects: [
      ["Test a pricing module", "Beginner", 4, "Write unit tests for a pricing function with discounts, taxes and edge cases, reaching every branch."],
      ["TDD kata", "Intermediate", 4, "Build a string calculator or bowling score kata strictly test-first, committing after each red-green-refactor cycle."],
    ],
    quiz: [
      ["What should a unit test avoid?", ["Assertions", "Real network calls and shared external state", "Descriptive names", "Edge cases"], 1, "External dependencies make tests slow and flaky."],
      ["What is the 'red' step in TDD?", ["Deploying", "Writing a test that fails", "Refactoring", "Code review"], 1, "You first prove the test can fail, then write code to make it pass."],
      ["What's a risk of mocking everything?", ["Tests run too fast", "Tests pass while the real integration is broken", "Coverage goes down", "Nothing"], 1, "Over-mocked tests verify your mocks, not real behavior."],
    ],
  },

  "integration-testing": {
    overview:
      "Integration tests check that your code works with real dependencies such as the database, external APIs and the HTTP layer. They catch the bugs unit tests can't, like a wrong query or a broken migration.",
    topics: [
      ["What to integration-test", "API endpoints, database queries and service boundaries"],
      ["Test databases", "Disposable databases, transactions and resetting state between tests"],
      ["Testcontainers and Docker", "Spinning up real dependencies for tests"],
      ["Testing HTTP APIs", "Requests, status codes, response bodies and auth"],
      ["Contract testing", "Making sure services agree on request and response shapes"],
    ],
    resources: [
      ["The Practical Test Pyramid", "https://martinfowler.com/articles/practical-test-pyramid.html", "martinfowler.com", "Guide"],
      ["Testcontainers: getting started", "https://testcontainers.com/getting-started/", "Testcontainers", "Docs"],
      ["Docker Compose", "https://docs.docker.com/compose/", "Docker Docs", "Docs"],
    ],
    projects: [
      ["API integration suite", "Intermediate", 6, "Write integration tests for every endpoint of an API against a real Postgres started with Testcontainers or Compose."],
      ["Third-party API boundary", "Intermediate", 4, "Wrap an external API behind an interface and test it with recorded responses, plus one live smoke test."],
    ],
    quiz: [
      ["What do integration tests catch that unit tests often miss?", ["Typos in comments", "Problems where components meet, like wrong SQL or misconfigured services", "Formatting issues", "Slow CPUs"], 1, "They exercise real interactions between parts of the system."],
      ["Why reset the test database between tests?", ["To save disk space", "So tests don't depend on each other's leftover data", "Databases require it", "To speed up queries"], 1, "Independent tests can run in any order and give consistent results."],
      ["What does Testcontainers provide?", ["Mock objects", "Real dependencies like databases in throwaway containers for tests", "A CI service", "Load testing"], 1, "Tests run against the same kind of database as production."],
    ],
  },

  caching: {
    overview:
      "Caching keeps frequently used data close and fast, cutting response times and database load. It's one of the first tools for scaling a backend, and one of the easiest to get subtly wrong.",
    topics: [
      ["Where caching happens", "Browser, CDN, application and database caches"],
      ["Cache-aside and write-through", "Common patterns and their trade-offs"],
      ["Expiry and invalidation", "TTLs, explicit invalidation and stale data"],
      ["Redis as a cache", "Keys, data types, expiry and eviction policies"],
      ["Pitfalls", "Cache stampedes, inconsistent data and caching per-user responses safely"],
    ],
    resources: [
      ["Database caching strategies using Redis", "https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/welcome.html", "AWS Whitepapers", "Guide"],
      ["Redis documentation", "https://redis.io/docs/latest/", "Redis", "Docs"],
      ["HTTP caching", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching", "MDN Web Docs", "Guide"],
    ],
    projects: [
      ["Cache a slow endpoint", "Intermediate", 4, "Add a cache-aside Redis layer to a slow endpoint, with TTLs and invalidation on writes, and measure the latency change."],
      ["Stampede protection", "Advanced", 5, "Simulate many requests hitting an expired key at once and add locking or early refresh to prevent a stampede."],
    ],
    quiz: [
      ["In the cache-aside pattern, what happens on a cache miss?", ["The request fails", "The app loads from the database and writes the result to the cache", "The cache loads itself", "The database is skipped"], 1, "The application manages the cache, filling it on demand."],
      ["What is a TTL?", ["A type of index", "How long a cached entry stays valid before it expires", "A cache server", "A query plan"], 1, "Time-to-live limits how stale cached data can get."],
      ["What is a cache stampede?", ["A cache that's too large", "Many requests rebuilding the same expired entry at once, overloading the database", "A failed deploy", "A memory leak"], 1, "Locks or staggered refreshes stop the flood."],
    ],
  },

  queues: {
    overview:
      "Message queues and background jobs move slow or unreliable work out of the request path: emails, image processing, payments. They make systems faster for users and more resilient to failures.",
    topics: [
      ["Why use a queue", "Decoupling, smoothing load spikes and retrying safely"],
      ["Producers, consumers and brokers", "RabbitMQ, SQS, Redis-backed job queues and Kafka"],
      ["Delivery guarantees", "At-least-once delivery and why handlers must be idempotent"],
      ["Retries and dead-letter queues", "Backoff, poison messages and alerting"],
      ["Scheduling", "Delayed and recurring jobs"],
    ],
    resources: [
      ["RabbitMQ tutorials", "https://www.rabbitmq.com/tutorials", "RabbitMQ", "Docs"],
      ["What is Amazon SQS?", "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html", "AWS Docs", "Docs"],
      ["BullMQ documentation", "https://docs.bullmq.io/", "BullMQ", "Docs"],
    ],
    projects: [
      ["Background email sender", "Intermediate", 5, "Move email sending out of a sign-up request into a job queue with retries and a dead-letter queue."],
      ["Image processing pipeline", "Advanced", 8, "Process uploaded images in background workers, report progress to the client and make reprocessing idempotent."],
    ],
    quiz: [
      ["Why must queue consumers usually be idempotent?", ["Queues are slow", "Messages can be delivered more than once", "It saves memory", "Brokers require it"], 1, "With at-least-once delivery, processing a message twice must be safe."],
      ["What is a dead-letter queue for?", ["Deleted users", "Messages that repeatedly fail processing", "High-priority work", "Archived logs"], 1, "Failed messages are set aside for inspection instead of blocking the queue."],
      ["What's a good reason to move work to a background job?", ["It needs to finish before the response", "It's slow or depends on an unreliable service", "It's a simple read", "It changes the UI"], 1, "Users get a fast response while the slow work happens separately."],
    ],
  },

  scalability: {
    overview:
      "Scalability is how a system keeps working as traffic and data grow. Junior engineers aren't expected to design huge systems, but they should understand the building blocks and trade-offs.",
    topics: [
      ["Vertical versus horizontal scaling", "Bigger machines versus more machines"],
      ["Load balancing", "Distributing traffic and keeping servers stateless"],
      ["Scaling databases", "Read replicas, connection pooling, partitioning and sharding"],
      ["Reliability", "Timeouts, retries, rate limiting and graceful degradation"],
      ["Thinking in trade-offs", "Consistency, latency, cost and complexity"],
    ],
    resources: [
      ["The System Design Primer", "https://github.com/donnemartin/system-design-primer", "Donne Martin (GitHub)", "Guide"],
      ["Site Reliability Engineering (book)", "https://sre.google/sre-book/table-of-contents/", "Google", "Book"],
      ["Designing Data-Intensive Applications", "https://dataintensive.net/", "Martin Kleppmann", "Book"],
    ],
    projects: [
      ["Load test and scale", "Intermediate", 6, "Load test an API with k6, find the bottleneck, then scale it horizontally behind a load balancer and compare results."],
      ["Design write-up", "Intermediate", 4, "Write a one-page design for a URL shortener at 1,000 requests per second, covering storage, caching and failure modes."],
    ],
    quiz: [
      ["What does horizontal scaling mean?", ["Buying a bigger server", "Adding more servers that share the load", "Adding columns to tables", "Using a faster language"], 1, "More instances behind a load balancer handle more traffic."],
      ["Why do read replicas help?", ["They speed up writes", "They spread read traffic across copies of the database", "They replace backups", "They enforce constraints"], 1, "Reads go to replicas; writes still go to the primary."],
      ["Why should outgoing calls have timeouts?", ["To save money", "So a slow dependency can't tie up all your resources", "They're required by HTTP", "To improve logging"], 1, "Without timeouts, one slow service can cascade into a full outage."],
    ],
  },

  "linux-basics": {
    overview:
      "Most servers, containers and cloud machines run Linux. Being comfortable on the command line, with files, permissions, processes and logs, is essential for backend, security and cloud roles.",
    topics: [
      ["The filesystem", "Paths, the directory layout and navigating with the shell"],
      ["Files and permissions", "Users, groups, chmod, chown and sudo"],
      ["Processes", "ps, top, signals and background jobs"],
      ["Packages and services", "Installing software and managing services with systemctl"],
      ["Logs and troubleshooting", "journalctl, /var/log and reading errors"],
      ["Remote access", "SSH, keys and copying files"],
    ],
    resources: [
      ["Linux Journey", "https://labex.io/linuxjourney", "LabEx (formerly linuxjourney.com)", "Course"],
      ["The command line for beginners", "https://ubuntu.com/tutorials/command-line-for-beginners", "Ubuntu (Canonical)", "Guide"],
      ["The Linux Command Line", "https://linuxcommand.org/tlcl.php", "William Shotts", "Book"],
    ],
    projects: [
      ["Set up a Linux server", "Beginner", 4, "Create a Linux VM, set up SSH key login, a non-root user, a firewall and automatic security updates."],
      ["Troubleshooting scenarios", "Intermediate", 4, "Break a service in five ways (permissions, a full disk, a bad config, a stopped process, a closed port) and fix each using logs."],
    ],
    quiz: [
      ["What does chmod 600 on a file mean?", ["Everyone can read it", "Only the owner can read and write it", "It's executable by all", "It's deleted"], 1, "6 = read+write for the owner; 0 for group and others."],
      ["Which command shows running processes interactively?", ["ls", "top", "cat", "pwd"], 1, "top (or htop) shows live CPU and memory use per process."],
      ["Why use SSH keys instead of passwords?", ["They're shorter", "They're far harder to brute-force and can be managed per device", "Passwords don't work", "They're faster to type"], 1, "Key-based auth resists guessing, and keys can be revoked individually."],
    ],
  },

  "linux-admin": {
    overview:
      "DevOps engineers run and automate Linux systems at scale. Administration skills (services, users, storage, networking and performance) are the foundation for containers, CI runners and cloud infrastructure.",
    topics: [
      ["Users, groups and sudo", "Managing access and least privilege"],
      ["systemd services", "Unit files, starting on boot, and logs with journalctl"],
      ["Storage", "Disks, partitions, mounts and checking disk usage"],
      ["Networking on Linux", "ip, ss, DNS resolution and firewalls"],
      ["Performance", "CPU, memory and I/O diagnosis with top, vmstat and iostat"],
      ["Package management and updates", "apt or dnf, repositories and patching safely"],
    ],
    resources: [
      ["Ubuntu Server documentation", "https://ubuntu.com/server/docs", "Ubuntu (Canonical)", "Docs"],
      ["systemctl manual", "https://www.freedesktop.org/software/systemd/man/latest/systemctl.html", "freedesktop.org (systemd)", "Reference"],
      ["Linux Journey", "https://labex.io/linuxjourney", "LabEx (formerly linuxjourney.com)", "Course"],
    ],
    projects: [
      ["Run an app as a service", "Intermediate", 4, "Deploy a small web app as a systemd service with restarts on failure, log rotation and a dedicated user."],
      ["Server hardening checklist", "Intermediate", 5, "Harden a fresh server (SSH config, firewall, fail2ban, updates, minimal packages) and document each step."],
    ],
    quiz: [
      ["What does systemctl enable do?", ["Starts a service now", "Starts the service automatically at boot", "Deletes a service", "Shows logs"], 1, "enable sets it to start at boot; start runs it now."],
      ["Which command shows disk space used by filesystems?", ["du -sh", "df -h", "free -m", "lsblk"], 1, "df shows filesystem usage; du shows usage of specific directories."],
      ["Why run services as dedicated non-root users?", ["It's faster", "A compromised service then has limited access to the system", "systemd requires it", "To save memory"], 1, "Least privilege limits the blast radius of a breach."],
    ],
  },

  docker: {
    overview:
      "Docker packages an application and everything it needs into a container that runs the same everywhere. Containers are the standard unit of deployment for modern backend, DevOps and cloud work.",
    topics: [
      ["Images and containers", "What each is, layers and the build cache"],
      ["Writing Dockerfiles", "Base images, COPY, RUN, CMD and ordering for fast builds"],
      ["Multi-stage builds", "Small, secure production images"],
      ["Volumes and networking", "Persisting data and connecting containers"],
      ["Docker Compose", "Running an app with its database and services locally"],
      ["Image security", "Minimal bases, non-root users and scanning for vulnerabilities"],
    ],
    resources: [
      ["Docker: Get started", "https://docs.docker.com/get-started/", "Docker Docs", "Docs"],
      ["Building best practices", "https://docs.docker.com/build/building/best-practices/", "Docker Docs", "Guide"],
      ["Multi-stage builds", "https://docs.docker.com/build/building/multi-stage/", "Docker Docs", "Guide"],
      ["Docker Compose", "https://docs.docker.com/compose/", "Docker Docs", "Docs"],
    ],
    projects: [
      ["Containerize an app", "Beginner", 4, "Write a Dockerfile for one of your apps and a Compose file that runs it with its database and a volume for data."],
      ["Slim production image", "Intermediate", 4, "Cut an image's size with a multi-stage build and a minimal base, run it as non-root and scan it for vulnerabilities."],
    ],
    quiz: [
      ["What's the difference between an image and a container?", ["None", "An image is a read-only template; a container is a running instance of it", "A container builds images", "Images run on Windows only"], 1, "You build an image once and start many containers from it."],
      ["Why copy dependency files and install them before copying the rest of the code?", ["It's required syntax", "So the dependency layer is cached when only code changes", "To reduce security risk", "To run tests"], 1, "Docker reuses unchanged layers, which makes rebuilds much faster."],
      ["What does a multi-stage build achieve?", ["Runs containers in parallel", "Keeps build tools out of the final image, making it smaller", "Adds more layers", "Encrypts the image"], 1, "Only the built artifacts are copied into the slim runtime stage."],
    ],
  },

  "ci-cd": {
    overview:
      "Continuous integration and delivery automate building, testing and deploying every change. Pipelines let teams ship small changes safely and often, and they're a core DevOps responsibility.",
    topics: [
      ["Continuous integration", "Building and testing every change on a shared branch"],
      ["Pipeline stages", "Install, lint, test, build, scan and deploy"],
      ["Writing pipelines", "GitHub Actions or GitLab CI workflows, jobs and steps"],
      ["Artifacts and caching", "Speeding up pipelines and passing outputs between jobs"],
      ["Continuous delivery", "Automated deploys to staging and gated releases to production"],
      ["Secrets in pipelines", "Storing credentials safely and limiting their scope"],
    ],
    resources: [
      ["GitHub Actions documentation", "https://docs.github.com/en/actions", "GitHub Docs", "Docs"],
      ["GitLab CI/CD", "https://docs.gitlab.com/ci/", "GitLab Docs", "Docs"],
      ["Continuous Integration", "https://martinfowler.com/articles/continuousIntegration.html", "martinfowler.com", "Guide"],
    ],
    projects: [
      ["CI for a project", "Beginner", 3, "Add a pipeline that installs, lints, tests and builds on every pull request, with dependency caching."],
      ["Build-and-deploy pipeline", "Intermediate", 6, "Build a container image, push it to a registry and deploy it to staging automatically, with a manual approval for production."],
    ],
    quiz: [
      ["What should happen when tests fail in CI?", ["Deploy anyway", "The pipeline stops and the change isn't merged or deployed", "Rerun until they pass", "Skip to deploy"], 1, "Failing fast keeps broken code out of main and production."],
      ["Why cache dependencies in a pipeline?", ["Security", "To avoid reinstalling them on every run, making pipelines faster", "To store secrets", "It's required"], 1, "Restoring a cache is much quicker than downloading everything again."],
      ["Where should pipeline credentials be stored?", ["In the workflow file", "In the CI system's encrypted secrets store", "In the README", "In a public gist"], 1, "Encrypted secrets are masked in logs and scoped to the jobs that need them."],
    ],
  },

  "logging-monitoring": {
    overview:
      "You can't fix what you can't see. Structured logs, metrics and alerts tell you when something breaks in production and why, often before users report it.",
    topics: [
      ["Structured logging", "JSON logs, levels, request IDs and what not to log"],
      ["Metrics", "Request rate, errors and latency, and percentiles"],
      ["Alerting", "Alerting on symptoms users feel, and avoiding alert fatigue"],
      ["Tracing", "Following a request across services with OpenTelemetry"],
      ["Dashboards and tools", "Cloud monitoring services, Prometheus and Grafana"],
    ],
    resources: [
      ["Monitoring Distributed Systems", "https://sre.google/sre-book/monitoring-distributed-systems/", "Google SRE Book", "Book"],
      ["OpenTelemetry documentation", "https://opentelemetry.io/docs/", "OpenTelemetry (CNCF)", "Docs"],
      ["The Twelve-Factor App: Logs", "https://12factor.net/logs", "12factor.net", "Guide"],
    ],
    projects: [
      ["Instrument an API", "Intermediate", 5, "Add structured logs with request IDs, latency and error metrics, and a dashboard to one of your APIs."],
      ["Alert on the golden signals", "Intermediate", 4, "Define alerts for error rate and p95 latency, trigger them deliberately and write a short runbook for each."],
    ],
    quiz: [
      ["Why use structured (JSON) logs?", ["They're smaller", "They can be searched and filtered by field", "They're required by Linux", "They're encrypted"], 1, "Fields like user_id or request_id make logs queryable."],
      ["Why track p95 or p99 latency rather than only the average?", ["Averages are hard to compute", "Averages hide the slow requests that some users experience", "Percentiles are cheaper", "They're the same"], 1, "Tail latency shows what your slowest users really see."],
      ["What should you avoid logging?", ["Request IDs", "Passwords, tokens and sensitive personal data", "Error messages", "Timestamps"], 1, "Logs are widely accessible and retained, so secrets and personal data don't belong there."],
    ],
  },
};
