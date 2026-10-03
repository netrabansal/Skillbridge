/**
 * Role-specific quiz questions. Every role skill gets an "applied" scenario framed for that career, so roles that
 * share a lesson (Docker for Backend, DevOps and Cloud) still get different quizzes. Skills a role needs at
 * Mastered also get an "advanced" question about edge cases.
 *
 * role slug → skill id → { applied, advanced? }, each [question, options, answer index, explanation]
 */
type Q = [string, string[], number, string];

export const roleQuestions: Record<string, Record<string, { applied: Q; advanced?: Q }>> = {
  "frontend-developer": {
    "html-semantic": {
      applied: ["A design has a grid of article cards, each with a title, image, summary and link. What's the best markup for each card's title?", ["<div class=\"title\">", "A heading at the right level for the page outline, such as <h3>", "<span><b>…</b></span>", "<p class=\"heading\">"], 1, "Headings build the page outline that screen-reader users navigate by. Styling a div doesn't."],
    },
    "html-forms": {
      applied: ["Your sign-up form shows errors only as red borders. What's the most important improvement?", ["Make the border thicker", "Add a text error message linked to the field with aria-describedby", "Add a shake animation", "Disable the submit button"], 1, "Color alone isn't accessible. A linked text message is announced by screen readers and explains how to fix the problem."],
    },
    "css-layout": {
      applied: ["You need a gallery where cards fill each row and wrap automatically, with no media queries. Which CSS fits best?", ["display: flex with fixed pixel widths", "grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))", "float: left on each card", "position: absolute on each card"], 1, "auto-fill with minmax lets Grid fit as many columns as space allows and stretch them evenly."],
      advanced: ["In a flex row, a long URL inside one item pushes the layout wider than its container. What fixes the root cause?", ["Set min-width: 0 on the flex item (and handle overflow or wrapping)", "Add more padding", "Use display: block on the container", "Switch to flex-direction: column"], 0, "Flex items default to min-width: auto, so they can't shrink below their content. min-width: 0 lets them shrink so overflow-wrap or ellipsis can work."],
    },
    "css-responsive": {
      applied: ["A page looks fine on desktop but text is tiny on phones. What's most likely missing?", ["<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">", "A larger font file", "A CSS reset", "JavaScript that resizes text"], 0, "Without the viewport meta tag, mobile browsers render at a desktop width and zoom out."],
    },
    "css-architecture": {
      applied: ["Two teams' components keep overriding each other's button styles. What best prevents this?", ["Add !important", "Scope styles per component (CSS Modules or utilities) and share design tokens", "Use IDs on every element", "Put all CSS in one file"], 1, "Scoped styles stop leaks, and shared tokens keep the design consistent without global overrides."],
    },
    "js-core": {
      applied: ["What does this log?  const a = [1, 2, 3]; const b = a; b.push(4); console.log(a.length);", ["3", "4", "undefined", "TypeError"], 1, "Arrays are objects. b references the same array as a, so pushing through b changes a."],
      advanced: ["What does this log?  for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));", ["0 1 2", "3 3 3", "undefined three times", "2 2 2"], 1, "var is function-scoped, so all callbacks share one i, which is 3 when they run. let creates a new binding per iteration."],
    },
    "js-dom": {
      applied: ["Items are added to a list dynamically and each needs a click handler. What's the most robust approach?", ["Attach a listener to each item after every render", "Attach one listener to the list and use event.target to find the item", "Use inline onclick strings", "Poll the DOM for new items"], 1, "Event delegation handles current and future items with a single listener."],
    },
    "js-async": {
      applied: ["A search box requests results on every keystroke, and sometimes shows results for an older query. What fixes this?", ["Use synchronous XHR", "Debounce input and cancel or ignore stale requests, for example with AbortController", "Increase the request timeout", "Cache every response forever"], 1, "Responses can arrive out of order. Cancelling or ignoring stale requests keeps results in sync with the latest query."],
    },
    "tooling-git": {
      applied: ["Your teammate pushed new commits to main while you worked on a component branch. What do you usually do before opening your pull request?", ["Force-push over main", "Pull or rebase onto the latest main and resolve any conflicts", "Delete your branch and start again", "Email the diff"], 1, "Updating from main surfaces conflicts early and keeps the pull request reviewable."],
    },
    "tooling-build": {
      applied: ["Your production bundle includes a huge date library you barely use. What's the best first step?", ["Ignore it", "Analyze the bundle, then replace the library or import only what you need", "Minify the bundle twice", "Load everything from a CDN"], 1, "A bundle analyzer shows what's heavy. Lighter alternatives or targeted imports cut download size."],
    },
    "ts-basics": {
      applied: ["A Button's variant prop can be 'primary', 'secondary' or 'ghost'. What's the best TypeScript type?", ["string", "any", "'primary' | 'secondary' | 'ghost'", "number"], 2, "A union of string literals catches typos at compile time and powers editor autocomplete."],
    },
    "react-components": {
      applied: ["A ProductCard is used on three pages with slightly different footers. What's the most idiomatic React approach?", ["Copy the component three times", "Let each page pass its own footer via children or a footer prop", "Use a global variable", "Inherit from a base class"], 1, "Composition through props and children is how React shares structure while varying content."],
    },
    "react-hooks": {
      applied: ["A useEffect fetches data for userId. What belongs in its dependency array?", ["Nothing", "userId", "Every variable in the file", "Only the fetch function"], 1, "List every changing value the effect uses, so it re-runs when userId changes."],
    },
    "react-data": {
      applied: ["Users double-click 'Save' and create duplicate records. What's a good fix?", ["Nothing, it's the user's fault", "Disable the button while the request is pending and make the API idempotent", "Show a confirmation alert", "Reload the page after saving"], 1, "Preventing repeat submits in the UI and handling retries safely on the server stops duplicates."],
    },
    "react-state": {
      applied: ["A theme setting is needed by nearly every component and rarely changes. What's a sensible way to provide it?", ["Pass it through every component as a prop", "React context", "A new store inside every component", "Read localStorage in each component"], 1, "Context suits widely used, rarely changing values like theme or locale."],
    },
    "quality-a11y": {
      applied: ["A custom dropdown works with a mouse but not a keyboard. What's the most reliable fix?", ["Add tabindex=\"-1\"", "Use a native <select>, or follow the ARIA listbox pattern with full keyboard support", "Add a tooltip", "Increase the font size"], 1, "Native controls come with keyboard support. Custom widgets must implement the documented ARIA pattern."],
    },
    "quality-testing": {
      applied: ["Which test best protects a checkout form from regressions?", ["A snapshot of the whole page's HTML", "A component test that fills fields by label and checks submitted data and errors", "Testing internal state variable names", "Counting re-renders"], 1, "Testing behavior the way users interact catches real regressions and survives refactors."],
    },
    "quality-performance": {
      applied: ["Lighthouse reports poor LCP caused by a large hero image. Which change helps most?", ["Lazy-load the hero image", "Serve a compressed, correctly sized image (such as AVIF or WebP) and prioritize loading it", "Add a CSS animation", "Move the image to the footer"], 1, "The hero is the LCP element, so make it small and load it early. Lazy-loading it delays LCP."],
    },
    "shipping-deploy": {
      applied: ["Your deployed single-page app returns 404 when users refresh on /settings. What's the usual cause?", ["The host isn't configured to serve index.html for client-side routes", "The CSS failed to load", "DNS is misconfigured", "The browser cache"], 0, "The server looks for a /settings file that doesn't exist. Add a rewrite to index.html for app routes."],
    },
    "shipping-portfolio": {
      applied: ["A hiring manager has two minutes for your portfolio. What should they see first?", ["Your full CV", "A live demo, a short description of the problem and your role, and the repository", "Every tutorial you completed", "Your favorite libraries"], 1, "Make it effortless to see working software and understand your contribution."],
    },
  },

  "backend-developer": {
    "programming-language": {
      applied: ["Your service reads a 5 GB log file and crashes with out-of-memory errors. What's the best fix?", ["Add more RAM", "Process the file as a stream, line by line, instead of loading it all", "Split it into files by hand", "Use a faster CPU"], 1, "Streaming keeps memory flat no matter how big the input is."],
      advanced: ["Two concurrent requests update the same in-memory counter in a multi-threaded server. What can go wrong, and what's the usual fix?", ["Nothing can go wrong", "Lost updates from a race condition, fixed with atomic operations, locks or moving state to the database", "The server restarts", "Requests only get slower"], 1, "Read-modify-write without synchronization loses updates. Atomic operations or a shared store with transactions fix it."],
    },
    "programming-dsa": {
      applied: ["On every request you must check whether a user ID is among 1 million banned IDs. Which structure fits best?", ["An array searched linearly", "A hash set", "A linked list", "A sorted array re-sorted per request"], 1, "Hash sets give average O(1) membership checks."],
    },
    "programming-design": {
      applied: ["One 200-line API handler validates input, applies pricing rules, writes to the database and sends an email. What's the best refactor?", ["Leave it as is", "Split into validation, a service for business logic, a repository for data access, and a notifier", "Move it to a bigger file", "Wrap it in a class with one method"], 1, "Separating responsibilities makes each part testable and reusable."],
    },
    "git-basics": {
      applied: ["You committed an API key in your last local commit, not yet pushed. What should you do?", ["Push it and delete it later", "Remove the key, amend or reset the commit before pushing, and rotate the key anyway", "Rename the file", "Nothing"], 1, "Rewrite unpushed history to remove it, and rotate the key in case it was exposed elsewhere."],
    },
    "git-collab": {
      applied: ["Your pull request changes 2,000 lines across 40 files, and reviewers are slow to respond. What should you do differently next time?", ["Ping reviewers more often", "Split the work into smaller, focused pull requests", "Skip review", "Squash it into one commit"], 1, "Small pull requests get faster, better reviews and are safer to merge."],
    },
    "apis-http": {
      applied: ["A client retries a payment request after a timeout and the customer is charged twice. What's the standard fix?", ["Use GET for payments", "Support idempotency keys so retries are recognized and not repeated", "Increase the timeout", "Return 500 on retries"], 1, "An idempotency key lets the server return the original result instead of charging again."],
    },
    "apis-rest": {
      applied: ["You need to add a required field to a public API's request body. How do you avoid breaking existing clients?", ["Just add it", "Make it optional with a sensible default, or introduce it in a new API version", "Rename the endpoint quietly", "Return 400 to old clients"], 1, "Additive, optional changes are backwards compatible. Breaking changes need versioning."],
    },
    "apis-alt": {
      applied: ["Internal services exchange high volumes of messages and need strict contracts and streaming. Which is usually the better fit?", ["GraphQL", "gRPC with Protocol Buffers", "SOAP", "CSV over FTP"], 1, "gRPC offers typed contracts, efficient binary encoding and streaming over HTTP/2."],
    },
    "databases-sql": {
      applied: ["A report shows customer order counts but customers with zero orders are missing. The query is SELECT c.name, COUNT(o.id) FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.name. What fixes it?", ["Use LEFT JOIN orders", "Add WHERE o.id IS NOT NULL", "Add DISTINCT", "Use COUNT(*) instead"], 0, "An inner join drops customers without orders. With LEFT JOIN, COUNT(o.id) returns 0 for them."],
      advanced: ["Two transactions both read a balance of 100, subtract 30 and write 70. What prevents this lost update?", ["Adding an index", "Locking the row (SELECT … FOR UPDATE) or using an atomic UPDATE balance = balance - 30", "Running queries faster", "Using DISTINCT"], 1, "Row locks or atomic updates stop concurrent read-modify-write from overwriting each other."],
    },
    "databases-modeling": {
      applied: ["Users can join many teams, teams have many users, and each membership has a role. How should this be modeled?", ["A comma-separated team list on users", "A memberships table with user_id, team_id and role", "Duplicate user rows per team", "A JSON blob on teams"], 1, "A join table holds the relationship and its attributes, with foreign keys to both sides."],
    },
    "databases-nosql": {
      applied: ["You need sub-millisecond lookups of session data that expires after 30 minutes. Which store fits best?", ["A data warehouse", "Redis with key expiry", "A CSV file", "A relational table scanned per request"], 1, "Redis keeps data in memory and expires keys automatically."],
    },
    "auth-authn": {
      applied: ["When a user changes their password, sessions on their other devices should end. What makes that possible?", ["Long-lived JWTs with no server-side state", "Server-side sessions (or a token revocation list) that can be invalidated", "Longer passwords", "Cookies with no expiry"], 1, "You need server-side state to invalidate existing sessions."],
    },
    "auth-authz": {
      applied: ["GET /invoices/123 returns any user's invoice if they know the ID. What check is missing?", ["Rate limiting", "Checking the invoice belongs to the authenticated user or their organization", "HTTPS", "Input length validation"], 1, "Authentication isn't enough. Every request must check access to that specific record."],
    },
    "auth-security": {
      applied: ["A search endpoint builds SQL as \"... WHERE name LIKE '%\" + q + \"%'\". What's the fix?", ["Escape single quotes by hand", "Use a parameterized query with the search term as a bound parameter", "Limit q to 50 characters", "Hide SQL errors from users"], 1, "Parameters keep user input as data, so it can't change the SQL command."],
    },
    "testing-unit": {
      applied: ["A function's output depends on the current time. How do you make its unit test reliable?", ["Run the test at the same time every day", "Inject a clock or freeze time in the test", "Retry until it passes", "Skip the test"], 1, "Controlling time makes the test deterministic."],
    },
    "testing-integration": {
      applied: ["Integration tests pass locally but fail in CI because tests share database rows. What's the best fix?", ["Run tests in a fixed order", "Isolate each test with its own transaction or fresh database and seed data", "Add sleeps", "Disable the tests in CI"], 1, "Isolated tests don't depend on each other's leftovers."],
    },
    "system-caching": {
      applied: ["You cache product details for an hour. An admin updates a price and customers still see the old one. What's the best fix?", ["Stop caching", "Invalidate or update the cache entry when the product changes", "Increase the TTL", "Restart Redis daily"], 1, "Write-path invalidation keeps cached data fresh where it matters."],
    },
    "system-queues": {
      applied: ["A worker crashes halfway through processing an order message, and the message is redelivered. What keeps this safe?", ["Delete messages before processing", "Make processing idempotent, for example by checking whether the order was already handled", "Process every message twice", "Disable retries"], 1, "With at-least-once delivery, idempotent handlers prevent double processing."],
    },
    "system-scale": {
      applied: ["Your API runs two instances behind a load balancer, and users randomly get logged out. What's a likely cause?", ["Sessions are stored in each server's memory instead of a shared store", "DNS caching", "A slow database", "HTTPS"], 0, "Each instance only knows its own sessions. Use a shared store or stateless tokens."],
    },
    "deployment-linux": {
      applied: ["Your service won't start on a systemd-based server and you suspect a config error. Where do you look first?", ["journalctl -u <service-name>", "/etc/hosts", "The browser console", "~/.bashrc"], 0, "The service's journal shows startup errors and stack traces."],
    },
    "deployment-docker": {
      applied: ["Your app works locally but in its container it can't connect to Postgres at localhost:5432. Why?", ["Docker blocks all networking", "Inside a container, localhost is the container itself; use the database's service name or host address", "Postgres doesn't support Docker", "The port must be 80"], 1, "Each container has its own network namespace. In Compose, use the service name as the hostname."],
    },
    "deployment-cicd": {
      applied: ["Code sometimes ships with tests that never ran, because someone merged directly. What prevents this?", ["Asking people not to", "Branch protection requiring passing CI checks before merging", "Writing more tests", "Faster CI runners"], 1, "Required status checks make CI a gate, not a suggestion."],
    },
    "deployment-monitoring": {
      applied: ["Users report slowness but average latency looks fine. What should you check?", ["Your laptop's CPU", "Tail latency (p95/p99) and error rates by endpoint", "The number of log lines", "Disk space only"], 1, "Averages hide slow outliers. Percentiles per endpoint reveal them."],
    },
  },

  "full-stack-developer": {
    "web-htmlcss": {
      applied: ["Your landing page's buttons are <div>s styled to look like buttons. What's the main problem?", ["They're hard to style", "They aren't focusable or keyboard-operable by default and lack button semantics", "They load slowly", "They can't have colors"], 1, "Use <button> for actions. It's focusable, works with Enter and Space, and is announced correctly."],
    },
    "web-js": {
      applied: ["What does [3, 1, 10].sort() return?", ["[1, 3, 10]", "[1, 10, 3]", "[10, 3, 1]", "An error"], 1, "Without a compare function, sort compares values as strings. Use sort((a, b) => a - b) for numbers."],
      advanced: ["In what order is this logged?  console.log('A'); setTimeout(() => console.log('B'), 0); Promise.resolve().then(() => console.log('C')); console.log('D');", ["A B C D", "A D C B", "A C D B", "A D B C"], 1, "Synchronous code runs first, then microtasks (promise callbacks), then timer tasks."],
    },
    "web-how": {
      applied: ["Your new domain works for you but not for some users an hour after a DNS change. What's the likely reason?", ["Their browsers are old", "DNS caching: resolvers keep the old record until its TTL expires", "Your SSL certificate", "Their firewall"], 1, "Lower the TTL before planned changes so caches refresh quickly."],
    },
    "tooling-git": {
      applied: ["You must fix a production bug now, but your feature work is half-done. What's a clean approach?", ["Commit broken code to main", "Stash or commit your work on the feature branch, then branch a hotfix from main", "Copy files to your desktop", "Discard your changes"], 1, "Keeping work isolated on branches lets you switch context safely."],
    },
    "tooling-cli": {
      applied: ["Which command shows what's listening on port 3000, so you can find a stuck dev server?", ["lsof -i :3000 (or ss -ltnp)", "ls -l 3000", "cat /port/3000", "ping 3000"], 0, "lsof and ss list processes bound to ports."],
    },
    "frontend-ts": {
      applied: ["Your API client returns data typed as any, and a renamed field breaks the UI at runtime. What helps most?", ["More comments", "Share typed response types between server and client, and validate responses at the boundary", "Use @ts-ignore", "Turn off strict mode"], 1, "Shared types catch mismatches at compile time; runtime validation catches the rest."],
    },
    "frontend-react": {
      applied: ["A list of 5,000 rows makes the page sluggish. What's an effective approach?", ["Render all rows in one component", "Paginate or virtualize the list so only visible rows render", "Add more state", "Inline all styles"], 1, "Rendering fewer DOM nodes is the biggest win for long lists."],
    },
    "frontend-state": {
      applied: ["After a user submits a form, the list on the same page still shows old data. What's the usual fix with a server-state library?", ["Reload the page", "Invalidate or update the cached query after the mutation succeeds", "Store the data in localStorage", "Add a setTimeout"], 1, "Invalidating the query triggers a refetch so the UI matches the server."],
    },
    "backend-node": {
      applied: ["An Express route awaits a database call that throws, and the request just hangs. What's wrong?", ["Express can't use async functions", "The rejected promise isn't passed to error-handling middleware (Express 4 doesn't do this automatically)", "The database is slow", "The route should use GET"], 1, "Catch the error and call next(err), use a wrapper, or upgrade to Express 5, which forwards rejections."],
    },
    "backend-api": {
      applied: ["Your frontend lists orders and makes one extra request per order to fetch each customer's name. What's the better API design?", ["Keep it as is", "Return the needed customer fields with the orders, or support an include/expand parameter", "Add more servers", "Cache names in localStorage"], 1, "Designing endpoints around client needs avoids N+1 request waterfalls."],
      advanced: ["Clients paginate with ?page=50 on a table that receives constant inserts, and they see duplicates. What's the better design?", ["A bigger page size", "Cursor-based pagination using a stable sort key", "Random ordering", "Blocking inserts while paginating"], 1, "Cursors continue from a known position, so inserts don't shift pages."],
    },
    "backend-framework": {
      applied: ["In a Next.js app, where should a database query that needs a secret connection string run?", ["In a client component", "On the server: a server component, route handler or server action", "In localStorage", "In CSS"], 1, "Server-only code keeps secrets out of the browser bundle."],
    },
    "data-sql": {
      applied: ["A page lists posts with their comment counts. Which query is best?", ["Fetch all comments and count them in JavaScript", "SELECT p.id, COUNT(c.id) FROM posts p LEFT JOIN comments c ON c.post_id = p.id GROUP BY p.id", "One query per post", "SELECT * FROM comments"], 1, "Let the database aggregate in one query, keeping posts with zero comments."],
    },
    "data-orm": {
      applied: ["You need to rename a column the running app uses, without downtime. What's the safe approach?", ["Rename it and deploy", "Add the new column, write to both, backfill, switch reads, then drop the old one", "Drop and recreate the table", "Edit production by hand"], 1, "Expand-and-contract migrations keep old and new code working throughout."],
    },
    "security-auth": {
      applied: ["Where should your web app store its session token to limit the impact of XSS?", ["localStorage", "An HttpOnly, Secure, SameSite cookie", "A global JavaScript variable", "The URL"], 1, "HttpOnly cookies can't be read by injected scripts."],
    },
    "security-web": {
      applied: ["Your React app renders user bios with dangerouslySetInnerHTML. What's the risk and the fix?", ["There's no risk", "Stored XSS; render as text, or sanitize the HTML with a trusted library", "Slow rendering; use memo", "SQL injection; use an ORM"], 1, "Untrusted HTML can run scripts. React escapes text by default unless you bypass it."],
    },
    "testing-auto": {
      applied: ["Your end-to-end suite takes 40 minutes and is flaky. What's the best improvement?", ["Delete all the tests", "Move most checks to fast unit and integration tests, keeping a few critical E2E journeys", "Run the E2E suite twice", "Add sleeps"], 1, "A balanced pyramid is faster and more reliable."],
    },
    "shipping-deploy": {
      applied: ["Your deployed app can't reach the database, but works locally. What do you check first?", ["The CSS build", "Environment variables (the connection string) and the database's network access rules", "The README", "Your browser"], 1, "Production config and network rules are the most common causes."],
    },
    "shipping-cicd": {
      applied: ["You want a live preview for every pull request and production deploys only from main. What does that need?", ["Manual uploads", "A pipeline or platform that deploys previews per pull request and production on merges to main", "Two repositories", "A cron job"], 1, "Branch-based workflows make previews and production deploys automatic."],
    },
    "shipping-projects": {
      applied: ["Your capstone has many features, but several are half-finished. What impresses reviewers more?", ["Keep adding features", "Finish and polish a smaller core flow with tests and a clear README", "Remove the README", "Add more frameworks"], 1, "Polish and completeness show job-ready judgment."],
    },
  },

  "data-scientist": {
    "programming-python": {
      applied: ["You apply a function to 10 million pandas rows in a for loop and it's very slow. What's the best fix?", ["Use a faster laptop", "Use vectorized pandas or NumPy operations", "Add print statements", "Convert columns to strings"], 1, "Vectorized operations run in optimized C instead of Python loops."],
      advanced: ["What's printed?  def add(x, items=[]): items.append(x); return items   then add(1); print(add(2))", ["[2]", "[1, 2]", "[]", "An error"], 1, "Default arguments are evaluated once, so the same list is reused. Use items=None and create a list inside."],
    },
    "programming-notebooks": {
      applied: ["A colleague can't reproduce your notebook's results. What's the most likely cause?", ["A different screen size", "Cells were run out of order, or dependencies and random seeds weren't pinned", "The notebook is too long", "A different font"], 1, "Restart-and-run-all with pinned environments and seeds makes results reproducible."],
    },
    "stats-descriptive": {
      applied: ["You're reporting typical household income, which is strongly right-skewed. What should you report?", ["Only the mean", "The median, perhaps with quartiles", "The maximum", "The mode of exact values"], 1, "The median isn't pulled up by a few very high incomes."],
    },
    "stats-probability": {
      applied: ["A test for a condition affecting 1% of people is 99% accurate (sensitivity and specificity). Someone tests positive. Roughly how likely are they to have it?", ["99%", "About 50%", "1%", "90%"], 1, "In 10,000 people: about 99 true positives and 99 false positives, so roughly half of positives are real."],
    },
    "stats-inference": {
      applied: ["A test gives p = 0.04, but the conversion lift is 0.01 percentage points. What should you conclude?", ["Ship immediately", "The effect may be statistically significant but too small to matter in practice", "The test is broken", "p-values above 0.01 mean nothing"], 1, "Always weigh effect size and business impact, not just significance."],
    },
    "stats-linalg": {
      applied: ["Feature matrix X has shape (1000, 20) and weights w have shape (20,). What's the shape of X @ w?", ["(20,)", "(1000,)", "(1000, 20)", "(20, 1000)"], 1, "Each of the 1,000 rows is dotted with w, giving one prediction per row."],
    },
    "data-sql": {
      applied: ["You need each customer's most recent order. Which SQL feature makes this cleanest?", ["ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC)", "UNION ALL", "CROSS JOIN", "LIMIT 1 on the whole table"], 0, "Window functions rank rows within each customer; keep rank 1."],
    },
    "data-sources": {
      applied: ["An API returns up to 100 records per page and your result has exactly 100 rows. What should you check?", ["Nothing", "Whether more pages remain to be fetched", "The API's logo", "Your Python version"], 1, "A full page often means there's more data. Follow pagination until it ends."],
    },
    "wrangling-pandas": {
      applied: ["After merging orders with customers, the row count went from 10,000 to 14,000. What likely happened?", ["A pandas bug", "The customer table has duplicate keys, so the merge multiplied rows", "The orders were sorted", "The CSV was compressed"], 1, "Check key uniqueness before merging, or use validate='many_to_one'."],
      advanced: ["What's the difference between df.groupby('city')['sales'].transform('mean') and .agg('mean')?", ["None", "transform returns a value for every original row; agg returns one row per group", "agg is always faster", "transform sorts the data"], 1, "transform keeps the original shape, which is handy for creating group-level features."],
    },
    "wrangling-cleaning": {
      applied: ["A 'country' column contains 'UK', 'U.K.', 'United Kingdom' and 'uk'. What's the right step?", ["Drop the column", "Map the values to one canonical form and document the mapping", "Leave it as is", "One-hot encode it as is"], 1, "Standardizing categories avoids splitting one country into four."],
    },
    "viz-plotting": {
      applied: ["You want to compare delivery-time distributions across 5 regions. Which plot works best?", ["A pie chart", "Box or violin plots per region", "A single line chart", "A 3D bar chart"], 1, "Box and violin plots show center, spread and outliers side by side."],
    },
    "viz-eda": {
      applied: ["During EDA you find a feature that perfectly predicts the target. What should you suspect first?", ["A great feature", "Data leakage, such as a field recorded after the outcome", "Too little data", "A plotting error"], 1, "Perfect predictors are usually leaks that won't exist at prediction time."],
    },
    "viz-bi": {
      applied: ["Two dashboards show different 'active users' numbers. What's the most likely cause?", ["Different chart colors", "Different metric definitions or filters", "Screen resolution", "Browser caching"], 1, "Documented, shared metric definitions prevent conflicting numbers."],
    },
    "ml-supervised": {
      applied: ["Your churn model is 95% accurate, but only 5% of customers churn. What should you check?", ["Nothing, it's great", "Whether it just predicts 'no churn'; check recall, precision and a baseline", "Training time", "Number of features"], 1, "Predicting the majority class already gives 95% accuracy."],
    },
    "ml-evaluation": {
      applied: ["You're predicting next month's sales from daily data. How should you split training and test data?", ["Random shuffle", "By time: train on earlier periods and test on later ones", "Alphabetically by store", "By store size"], 1, "Time-based splits mimic real forecasting and avoid peeking into the future."],
    },
    "ml-features": {
      applied: ["A model uses 'days since last purchase', computed from today's date for every historical row. What's the problem?", ["It's too slow", "It leaks future information; compute features as of each prediction date", "It's categorical", "None"], 1, "Features must use only information available at the time of each prediction."],
    },
    "ml-unsupervised": {
      applied: ["Your k-means clusters are driven almost entirely by 'annual income' in dollars, ignoring other features. Why?", ["k-means only uses one feature", "Features weren't scaled, so the largest-range feature dominates distances", "Too many clusters", "Income is categorical"], 1, "Standardize features before distance-based methods."],
    },
    "experiments-ab": {
      applied: ["Halfway through an A/B test, the variant looks significantly better. What should you do?", ["Stop and ship now", "Keep running to the planned sample size, unless you're using a sequential testing method", "Restart the test", "Send more traffic to the variant"], 1, "Early peeking inflates false positives."],
    },
    "communication-storytelling": {
      applied: ["A stakeholder asks whether to expand into a new region. How should your summary begin?", ["With your data cleaning steps", "With your recommendation and the key evidence for it", "With a model diagram", "With every chart you made"], 1, "Lead with the answer; details follow for those who want them."],
    },
    "communication-portfolio": {
      applied: ["Which portfolio project best signals job readiness?", ["A Titanic tutorial notebook", "A real question with messy data, sound evaluation and a clear business conclusion", "A list of courses", "A notebook with no explanations"], 1, "Original questions and clear conclusions show judgment, not just tooling."],
    },
  },

  "ai-ml-engineer": {
    "programming-python": {
      applied: ["Data loading is the bottleneck in your training loop. What helps you find exactly where time goes?", ["A profiler such as cProfile or py-spy", "Print statements only", "Restarting the kernel", "A bigger GPU"], 0, "Profilers measure where time is actually spent, so you optimize the right thing."],
      advanced: ["Your Python inference service uses threads for CPU-heavy preprocessing but sees no speed-up. Why, typically?", ["Threads are disabled in Python", "The GIL stops CPU-bound Python threads running in parallel; use processes or native libraries", "The GPU is idle", "NumPy doesn't support threads"], 1, "For CPU-bound pure-Python work, use multiprocessing or libraries that release the GIL."],
    },
    "programming-engineering": {
      applied: ["A teammate's change silently altered a preprocessing step and model accuracy dropped. What would have caught it?", ["Nothing", "Unit tests on the transform plus a CI check of metrics on a fixed eval set", "A longer README", "More comments"], 1, "Tests and automated eval gates catch regressions before they ship."],
    },
    "math-linalg": {
      applied: ["In an attention layer, Q has shape (seq, d) and K has shape (seq, d). What's the shape of Q @ K.T?", ["(d, d)", "(seq, seq)", "(seq, d)", "(d, seq)"], 1, "(seq, d) × (d, seq) gives a score for every pair of positions."],
    },
    "math-calculus": {
      applied: ["Training loss falls smoothly, then suddenly becomes NaN. What's a common first fix?", ["Increase the learning rate", "Lower the learning rate and/or add gradient clipping", "Remove the loss function", "Add more layers"], 1, "Exploding updates often cause NaNs. Smaller steps or clipping stabilize training."],
    },
    "math-stats": {
      applied: ["Your classifier outputs 0.9 confidence for many examples it gets wrong. Which property is poor?", ["Speed", "Calibration: predicted probabilities don't match observed frequencies", "Recall only", "Tokenization"], 1, "Calibration methods like temperature scaling align confidence with accuracy."],
    },
    "ml-classical": {
      applied: ["For a tabular dataset with a few thousand rows, what's usually a strong first model?", ["A large transformer", "Gradient-boosted trees such as XGBoost or LightGBM", "A CNN", "A GAN"], 1, "Boosted trees are strong, fast baselines for tabular data."],
    },
    "ml-evaluation": {
      applied: ["You tune hyperparameters by repeatedly checking test-set accuracy. What's wrong?", ["Nothing", "You're overfitting to the test set; tune on validation data and test once at the end", "It's too slow", "Accuracy can't be tuned"], 1, "The test set should give an unbiased final estimate."],
    },
    "ml-data": {
      applied: ["Only 2% of your training labels are positive. Which approach is reasonable?", ["Delete all negatives", "Use stratified splits and consider class weights or resampling, with suitable metrics", "Duplicate the test set", "Ignore it"], 1, "Imbalance affects splitting, training and evaluation, so handle all three."],
    },
    "dl-nn": {
      applied: ["Training loss keeps falling but validation loss starts rising. What's happening, and what helps?", ["Underfitting; add layers", "Overfitting; use early stopping, regularization or more data", "An optimizer bug", "The learning rate is too low"], 1, "The model is memorizing training data. Stop earlier or regularize."],
    },
    "dl-pytorch": {
      applied: ["Evaluation runs out of GPU memory even though training worked. What's a likely fix?", ["Use a bigger batch", "Run evaluation under torch.no_grad() (or inference_mode) and call model.eval()", "Disable CUDA", "Restart Python"], 1, "Without no_grad, PyTorch stores activations for backprop you don't need."],
      advanced: ["Training fails with 'Expected all tensors to be on the same device'. What does it mean?", ["The model is too big", "Some tensors are on CPU and others on GPU; move the model and every batch to the same device", "A PyTorch version mismatch", "The wrong optimizer"], 1, "Model parameters, inputs and targets must live on the same device."],
    },
    "dl-architectures": {
      applied: ["Why does standard attention get expensive for very long inputs?", ["It uses convolutions", "Every token is compared with every other, so cost grows quadratically with length", "Tokenizers are slow", "Embeddings are large"], 1, "That's why long-context models use efficient attention variants."],
    },
    "llm-prompting": {
      applied: ["An LLM sometimes returns prose instead of the JSON your app parses. What's the most reliable fix?", ["Ask more politely", "Use structured output or tool calling with a schema, and validate and retry on failure", "Raise the temperature", "Shorten the prompt"], 1, "Schemas constrain the output; validation catches what slips through."],
    },
    "llm-rag": {
      applied: ["Your RAG bot answers confidently from the wrong document. What should you investigate first?", ["The model's size", "Retrieval quality: are the right chunks being retrieved for the query?", "The UI colors", "The API key"], 1, "Generation can only be as good as the context it's given."],
    },
    "llm-evals": {
      applied: ["You changed the system prompt and it 'feels better'. What should you do before shipping?", ["Ship it", "Run your eval set and compare scores with the previous prompt", "Ask the model whether it's better", "Increase max tokens"], 1, "Measured comparisons beat impressions."],
    },
    "llm-finetune": {
      applied: ["A model must answer questions about company policies that change monthly. What's usually best?", ["Fine-tune every month", "Use RAG over the current policy documents", "Train a model from scratch", "Prompt with no context"], 1, "Retrieval keeps answers current without retraining."],
    },
    "mlops-serving": {
      applied: ["Your model API's p95 latency spikes under load while GPU utilization stays low. What could help?", ["Smaller batches", "Dynamic batching of requests, and checking for CPU-side bottlenecks", "Removing the GPU", "More logging"], 1, "Batching keeps the GPU busy; preprocessing often hides the real bottleneck."],
    },
    "mlops-tracking": {
      applied: ["A production model performs worse than the one you evaluated, and nobody knows which code and data produced it. What prevents this?", ["Better file names", "Tracking each run's code, data version, parameters and artifacts, plus a model registry", "Emailing results", "Saving notebooks"], 1, "Lineage makes every model reproducible and auditable."],
    },
    "mlops-monitoring": {
      applied: ["A fraud model's precision drops after a new payment method launches. What's the likely cause?", ["A server outage", "Data drift: patterns the model never saw in training", "Too much logging", "The GPU driver"], 1, "Monitor input distributions and retrain when the world changes."],
    },
    "mlops-cloud": {
      applied: ["A 12-hour training job on spot instances keeps getting interrupted. What makes it robust?", ["Smaller models", "Save checkpoints regularly and resume from the latest one", "Disable logging", "Train on CPU"], 1, "Checkpointing turns interruptions into short delays."],
    },
    "projects-applied": {
      applied: ["What makes an applied AI project convincing to an employer?", ["A demo with no metrics", "A deployed system with an eval set, measured results, cost tracking and documented limitations", "The largest available model", "A long list of libraries"], 1, "Evidence of reliability and judgment matters more than model size."],
    },
  },

  "devops-engineer": {
    "linux-admin": {
      applied: ["A server's disk is 100% full and services are failing. How do you find what's using the space?", ["df -h, then du -sh on large directories such as /var/log", "rm -rf /", "top", "ping"], 0, "df shows which filesystem is full; du narrows it down to directories."],
      advanced: ["You deleted a 20 GB log file but df still shows the disk full. Why?", ["df is cached", "A running process still holds the deleted file open; restart or signal it to release the file", "The file is in the trash", "The filesystem is read-only"], 1, "Space is freed only when the last open handle closes. lsof +L1 lists deleted-but-open files."],
    },
    "linux-networking": {
      applied: ["A container can reach external IP addresses but not hostnames. What's the likely problem?", ["A firewall blocks all traffic", "DNS resolution is misconfigured", "TLS is broken", "The CPU is overloaded"], 1, "If IPs work but names don't, check resolv.conf and the DNS server."],
    },
    "scripting-bash": {
      applied: ["Your deploy script carried on after a failed build step and shipped a broken release. What should the script start with?", ["#!/bin/sh only", "set -euo pipefail", "echo \"start\"", "sleep 5"], 1, "These options stop on errors, unset variables and failures inside pipelines."],
    },
    "scripting-git": {
      applied: ["You manage infrastructure changes for several teams. Which workflow gives the safest path to production?", ["Direct pushes to main", "Short-lived branches with reviewed pull requests and required CI checks (such as terraform plan)", "Emailing patches", "Editing in the cloud console"], 1, "Review and automated checks catch mistakes before they reach production."],
    },
    "scripting-python": {
      applied: ["Your Python script calls a rate-limited API and fails intermittently with 429 errors. What's the right handling?", ["Retry immediately in a tight loop", "Retry with exponential backoff and respect Retry-After headers", "Ignore the errors", "Use more threads"], 1, "Backoff gives the API room to recover and avoids getting blocked."],
    },
    "cicd-pipelines": {
      applied: ["Your pipeline takes 25 minutes, mostly reinstalling dependencies and rebuilding images. What helps most?", ["Fewer tests", "Dependency caching and Docker layer caching", "Running it at night", "More logging"], 1, "Caching avoids redoing work that hasn't changed."],
    },
    "cicd-release": {
      applied: ["A new version passes tests, but you're unsure how it behaves under real traffic. Which release strategy limits the risk?", ["A big-bang deploy", "A canary release with automated rollback on error metrics", "Deploying on Friday evening", "Skipping monitoring"], 1, "Canaries expose a small share of users first, with automatic protection."],
    },
    "containers-docker": {
      applied: ["Your image is 1.2 GB because it includes compilers and build tools. What's the best fix?", ["Compress the image", "Use a multi-stage build and copy only the built artifacts into a slim runtime image", "Clear the Docker cache", "Use the :latest tag"], 1, "Build tools stay in the build stage; the runtime image ships only what's needed."],
      advanced: ["Every code change makes your image reinstall all dependencies. Why?", ["Docker never caches", "The Dockerfile copies all source files before installing dependencies, so any change invalidates that layer", "The base image is too old", "You need more RAM"], 1, "Copy dependency manifests and install first, then copy the rest of the source."],
    },
    "containers-k8s": {
      applied: ["A pod is stuck in CrashLoopBackOff. What's your first step?", ["Delete the cluster", "Check kubectl logs (including --previous) and kubectl describe pod for events", "Scale to 10 replicas", "Restart your laptop"], 1, "Logs and events usually show the crash reason: bad config, missing secret, failing probe."],
    },
    "containers-helm": {
      applied: ["You need the same app in staging and production with different replica counts and URLs. What's the Helm way?", ["Copy the chart twice", "One chart with a separate values file per environment", "Edit the templates before each deploy", "kubectl edit after installing"], 1, "Values files keep one chart reusable across environments."],
    },
    "iac-cloud": {
      applied: ["A developer racked up a large bill with idle GPU instances. What would have caught it earliest?", ["The monthly invoice", "Budgets with alerts, tagging, and policies limiting expensive instance types", "A bigger budget", "Turning off logging"], 1, "Guardrails and alerts catch cost problems in hours, not weeks."],
    },
    "iac-terraform": {
      applied: ["terraform plan shows it will destroy and recreate your production database. What should you do?", ["Apply quickly", "Stop and find which change forces replacement; protect critical resources with lifecycle prevent_destroy", "Delete the state file", "Run apply twice"], 1, "Always read the plan. Some attribute changes force replacement."],
    },
    "iac-config": {
      applied: ["Running your Ansible playbook a second time reports changes on every task. What does that suggest?", ["It's working perfectly", "Tasks aren't idempotent (for example raw shell commands); use proper modules or conditions", "Ansible is outdated", "The servers are offline"], 1, "Idempotent tasks report 'ok' when nothing needs changing."],
    },
    "observability-metrics": {
      applied: ["An alert fires whenever CPU exceeds 80%, waking people at night with no user impact. What's better?", ["Lower the threshold", "Alert on user-facing symptoms like error rate and latency (SLO burn); keep CPU for dashboards", "Disable all alerts", "Alert on memory instead"], 1, "Page on symptoms users feel; investigate causes on dashboards."],
    },
    "observability-logging": {
      applied: ["A request fails somewhere across five microservices. What lets you follow it end to end?", ["Grepping each server", "Distributed tracing with propagated trace IDs, and correlation IDs in logs", "Restarting services", "Reading the source code"], 1, "Traces show the full path and where it failed or slowed down."],
    },
    "observability-incidents": {
      applied: ["During an outage, three engineers are making changes at once without coordinating. What's missing?", ["More engineers", "A designated incident commander and a single coordination channel", "A postmortem template", "Faster laptops"], 1, "Clear command prevents conflicting changes and confusion."],
    },
    "security-secrets": {
      applied: ["Your CI pipeline needs cloud credentials to deploy. What's the most secure option?", ["Long-lived keys in the repository", "Short-lived credentials through OIDC federation, scoped to a deploy role", "A shared admin password", "Keys in a public gist"], 1, "OIDC removes stored secrets and limits what the pipeline can do."],
    },
    "security-devsecops": {
      applied: ["A scanner reports a critical vulnerability in a base image you use. What's the best response?", ["Ignore it", "Rebuild on a patched base image, and gate future builds on critical findings", "Disable the scanner", "Switch to :latest without checking"], 1, "Patch now, then make the pipeline enforce it going forward."],
    },
  },

  "cybersecurity-analyst": {
    "networking-tcpip": {
      applied: ["One IP sends thousands of TCP SYN packets to many ports on a host, with few completed handshakes. What is this most likely?", ["Normal browsing", "A port scan", "A DNS query", "A backup job"], 1, "SYN scans probe ports without completing connections."],
      advanced: ["A host at 10.0.5.20/24 can't reach 10.0.6.15, though both have correct addresses. What's most likely missing?", ["A DNS record", "A route through a gateway between the two subnets", "A TLS certificate", "A larger MTU"], 1, "Different /24 subnets need a router or gateway, and the right route, to talk."],
    },
    "networking-protocols": {
      applied: ["A workstation makes hundreds of DNS queries a minute for random-looking subdomains of one domain. What should you suspect?", ["Normal caching", "DNS tunnelling or malware beaconing", "A slow DNS server", "A browser update"], 1, "Encoded data in subdomains is a classic exfiltration and C2 technique."],
    },
    "networking-traffic": {
      applied: ["A packet capture shows an internal host sending lots of data to an unfamiliar external IP at 3 a.m. What's your next step?", ["Ignore it", "Identify the destination, process and user, check threat intelligence, and scope possible exfiltration", "Block all traffic company-wide", "Reboot the host"], 1, "Gather context before acting, then contain proportionately."],
    },
    "os-linux": {
      applied: ["Which file typically records SSH login attempts on Debian or Ubuntu?", ["/var/log/auth.log", "/etc/passwd", "/var/www/html", "/tmp/ssh.log"], 0, "auth.log records authentication events, including SSH. RHEL-family systems use /var/log/secure."],
    },
    "os-windows": {
      applied: ["Which Windows Security event ID records a failed logon?", ["4624", "4625", "4688", "1102"], 1, "4624 is a successful logon, 4688 process creation and 1102 the audit log being cleared."],
    },
    "fundamentals-principles": {
      applied: ["A marketing intern has admin rights on the file server 'just in case'. Which principle does this violate?", ["Defense in depth", "Least privilege", "Availability", "Non-repudiation"], 1, "Access should match what the role actually needs."],
    },
    "fundamentals-threats": {
      applied: ["A user receives repeated MFA push requests at night until they approve one. What attack is this?", ["SMS phishing", "MFA fatigue (push bombing)", "SQL injection", "Ransomware"], 1, "Attackers with a stolen password spam pushes. Number matching and alerts help defend against it."],
    },
    "fundamentals-crypto": {
      applied: ["A company website's TLS certificate expired yesterday. What do users see, and what's the risk?", ["Nothing", "Browser warnings; users may learn to click through them, which enables interception", "Faster loading", "Stronger encryption"], 1, "Expired certificates erode trust in warnings. Automate renewal."],
    },
    "scripting-python": {
      applied: ["You need to extract all IP addresses from 2 GB of firewall logs in Python. What's a sensible approach?", ["Load the whole file and split it", "Read line by line and apply a compiled regular expression", "Open it in Excel", "Copy it into a database first"], 1, "Streaming keeps memory low; a compiled regex is fast."],
    },
    "scripting-cli": {
      applied: ["Which command counts failed SSH logins by source IP in auth.log?", ["grep \"Failed password\" auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn", "cat auth.log | wc -l", "ls -la auth.log", "ping auth.log"], 0, "In 'Failed password' lines the IP is the fourth field from the end; uniq -c counts each one."],
    },
    "detection-siem": {
      applied: ["A detection for 'admin login outside business hours' fires 200 times a day, mostly for on-call engineers. What should you do?", ["Delete the rule", "Tune it, for example by excluding known on-call schedules or adding context, and keep monitoring everyone else", "Ignore the alerts", "Raise them all to critical"], 1, "Tuning keeps a useful detection without the noise."],
    },
    "detection-logs": {
      applied: ["A user logs in successfully from London, then from Singapore 10 minutes later. What's this pattern, and what next?", ["Normal roaming", "Impossible travel; verify with the user, check for VPN use and review the session's activity", "A DNS error", "Duplicated logs"], 1, "It may be a compromised account, or a VPN. Context decides."],
      advanced: ["An attacker cleared the Security event log on a server. Which event reveals this, and why does it matter?", ["4624; it records logons", "1102; log clearing is a strong sign of tampering and should trigger an investigation", "4688; it records new processes", "None; it can't be detected"], 1, "Event 1102 is written when the audit log is cleared. Forwarding logs to a SIEM preserves earlier events."],
    },
    "detection-edr": {
      applied: ["EDR shows winword.exe spawning powershell.exe with an encoded command. What should you do?", ["Ignore it", "Treat it as likely malicious: isolate the host, capture the command and document, and investigate", "Update Word", "Delete PowerShell"], 1, "Office spawning encoded PowerShell is a common malicious macro pattern."],
    },
    "vulns-scanning": {
      applied: ["You have two findings: CVSS 9.8 on an isolated test server, and CVSS 7.5 on an internet-facing server listed in CISA's KEV catalog. Which do you fix first?", ["The 9.8", "The 7.5, because it's exposed and known to be exploited", "Neither", "Pick at random"], 1, "Exploitation and exposure matter more than the raw score."],
    },
    "vulns-web": {
      applied: ["A bug report shows that changing ?user_id=1001 to 1002 reveals another user's data. What category is this?", ["Cross-site scripting", "Broken access control (IDOR)", "CSRF", "A cryptographic failure"], 1, "The server isn't checking access to the requested record."],
    },
    "ir-process": {
      applied: ["You've confirmed ransomware on one workstation. What should happen first?", ["Pay the ransom", "Isolate the machine from the network to contain spread, preserving evidence", "Wipe every server", "Contact the press"], 1, "Containment limits damage while evidence is kept for investigation."],
    },
    "ir-frameworks": {
      applied: ["Your SOC wants to know which attacker techniques it has no detections for. Which framework helps map this?", ["OWASP Top 10", "MITRE ATT&CK", "ISO 9001", "ITIL"], 1, "Mapping detections to ATT&CK techniques shows coverage gaps."],
    },
    "ir-forensics": {
      applied: ["Before shutting down a compromised machine, what should you capture first?", ["Nothing", "A memory image, because RAM contents are lost on power-off", "A photo of the screen only", "Only the browser history"], 1, "Follow the order of volatility: the most fleeting evidence first."],
    },
    "cloud-iam": {
      applied: ["An employee who left last month still has an active account with access to customer data. What process failed?", ["The password policy", "Offboarding and periodic access reviews", "MFA", "Encryption"], 1, "Joiner-mover-leaver processes and regular reviews close stale access."],
    },
    "cloud-cloudsec": {
      applied: ["A storage bucket holding customer exports is publicly readable. What's the right immediate action and follow-up?", ["Delete the bucket", "Block public access now, check access logs for exposure, and add a preventive guardrail", "Rename the bucket", "Wait for the next audit"], 1, "Contain, assess the impact, then prevent recurrence."],
    },
  },

  "cloud-engineer": {
    "foundations-linux": {
      applied: ["SSH to a new cloud VM fails with 'Connection timed out'. What's the first thing to check?", ["The VM's CPU", "That the security group or firewall allows port 22 from your IP", "Your key's file name", "The disk size"], 0, "Timeouts usually mean traffic is blocked. Authentication errors look different."],
    },
    "foundations-scripting": {
      applied: ["You need to tag 300 untagged instances consistently. What's the best approach?", ["Click through the console", "Script it with the cloud CLI or SDK, reviewed and logged", "Ask each team", "Recreate the instances"], 1, "Scripts are repeatable, reviewable and fast."],
    },
    "networking-vpc": {
      applied: ["Instances in a private subnet can't download OS updates. What's typically missing?", ["An internet gateway attached to the instance", "A NAT gateway, and a route to it from the private subnet's route table", "A public IP on the database", "A load balancer"], 1, "NAT allows outbound internet access without exposing instances inbound."],
      advanced: ["You plan a VPC using 10.0.0.0/16, but a partner network you'll peer with uses 10.0.0.0/8. What's the problem?", ["None", "The ranges overlap, so peering and routing won't work; choose non-overlapping CIDRs", "Peering requires IPv6", "The VPC is too small"], 1, "Plan address space across all networks you'll ever connect."],
    },
    "networking-dns": {
      applied: ["Your certificate covers example.com, but visitors to www.example.com get a warning. Why?", ["DNS is slow", "The certificate doesn't include www.example.com as a name", "The load balancer is down", "HTTP/2 is disabled"], 1, "Certificates must list every hostname they serve (or use a wildcard)."],
    },
    "networking-hybrid": {
      applied: ["Your company needs consistent, high-bandwidth connectivity from its data center to the cloud, not over the public internet. What fits?", ["A site-to-site VPN", "A dedicated connection such as AWS Direct Connect or Azure ExpressRoute", "VPC peering", "A public load balancer"], 1, "Dedicated links provide private, predictable bandwidth."],
    },
    "platform-compute": {
      applied: ["A batch job runs for 10 minutes once a day. Which compute option is usually most cost-effective?", ["An always-on large VM", "Serverless functions or a scheduled container job", "A dedicated host", "A three-year reservation"], 1, "Pay only for the minutes you actually use."],
    },
    "platform-storage": {
      applied: ["Old log files must be kept for 7 years but are rarely read. How do you cut costs?", ["Keep them on SSD volumes", "Use lifecycle rules to move them to an archive storage class", "Delete them", "Compress them on a VM"], 1, "Archive tiers are far cheaper for rarely accessed data."],
    },
    "platform-databases": {
      applied: ["Your managed database's primary fails. With a multi-AZ deployment, how quickly does the app typically recover?", ["Never", "Within minutes, after automatic failover to the standby", "Only after a manual restore", "Instantly with zero impact, always"], 1, "Failover is automatic but not instant. Apps should retry connections."],
    },
    "identity-iam": {
      applied: ["A Lambda function needs to read objects from one S3 bucket. Which policy is best?", ["AdministratorAccess", "Allow s3:GetObject on that bucket's objects only", "s3:* on all buckets", "No policy; use access keys"], 1, "Grant the minimum actions on the minimum resources."],
      advanced: ["An IAM policy explicitly allows s3:GetObject and another explicitly denies it for the same bucket. What happens?", ["The Allow wins", "The explicit Deny wins", "The most recent policy wins", "It depends on the region"], 1, "In AWS policy evaluation, an explicit Deny always overrides any Allow."],
    },
    "identity-encryption": {
      applied: ["Compliance requires that you can revoke access to encrypted data immediately. What helps?", ["Provider-managed keys only", "Customer-managed KMS keys whose key policy you can disable or restrict", "Base64 encoding", "Bigger disks"], 1, "Controlling the key gives you control over decryption."],
    },
    "identity-posture": {
      applied: ["How do you make sure nobody can create a publicly accessible storage bucket in any account?", ["A wiki page", "An organization-level preventive policy (such as an SCP or organization policy) blocking public access", "Weekly manual checks", "Email reminders"], 1, "Preventive guardrails stop misconfigurations before they happen."],
    },
    "iac-terraform": {
      applied: ["Two engineers ran terraform apply at the same time and the state got corrupted. What prevents this?", ["Taking turns", "A remote backend with state locking", "Local state files", "Only running plan"], 1, "Locking ensures one apply at a time against shared state."],
    },
    "iac-git": {
      applied: ["A teammate changed a security group in the console, and now Terraform wants to revert it. What's the right fix?", ["Always use the console", "Make the change in code through a pull request, and treat console edits as drift to fix", "Delete the state", "Stop using Terraform"], 1, "Code is the source of truth; manual changes cause drift."],
    },
    "containers-docker": {
      applied: ["CI pushes images to a registry. How should deployments reference them so rollbacks are reliable?", ["Always use :latest", "An immutable tag such as the git commit SHA, or an image digest", "The developer's name", "No tag"], 1, "Immutable references mean you know exactly what's running and can redeploy it."],
    },
    "containers-k8s": {
      applied: ["On managed Kubernetes, who is usually responsible for keeping worker node versions up to date?", ["Nobody", "You, through your node upgrade settings or process; the provider manages the control plane", "End users", "The container runtime"], 1, "Providers run the control plane; node upgrades are typically yours to schedule or enable."],
    },
    "operations-monitoring": {
      applied: ["Your web tier looks healthy by CPU, but users get errors. Which metric should you alert on?", ["Disk usage", "Load balancer 5xx error rate and latency", "Number of instances", "Network bytes"], 1, "Alert on what users experience."],
    },
    "operations-ha": {
      applied: ["Your RPO is 15 minutes, but you only take nightly backups. What's the gap?", ["None", "You could lose up to 24 hours of data; enable continuous backups or point-in-time recovery", "Backups are too frequent", "The RTO is wrong"], 1, "Backup frequency must match the recovery point objective."],
    },
    "operations-cost": {
      applied: ["Your development environment runs 24/7 but is only used during working hours. What's an easy saving?", ["Upgrade the instances", "Schedule it to stop outside working hours", "Move to a pricier region", "Add more monitoring"], 1, "Stopping idle non-production resources can cut their cost by more than half."],
    },
    "certification-associate": {
      applied: ["Two weeks before your exam, practice scores are steady at 60%. What's the most effective plan?", ["Sit the exam anyway", "Focus on your weakest exam-guide domains with hands-on labs, then retake practice tests", "Memorize practice answers", "Switch certifications"], 1, "Targeted, hands-on review closes gaps faster than repetition."],
    },
  },
};
