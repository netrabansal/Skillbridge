import type { RawLessons } from "./types";

export const frontendLessons: RawLessons = {
  "semantic-html": {
    overview:
      "Semantic HTML means using the element that describes what content is: a heading, a list, navigation, a button. Browsers, search engines and assistive technology all rely on that meaning.",
    topics: [
      ["Document structure", "doctype, html, head and body, plus metadata such as title, charset and viewport"],
      ["Headings and text", "A logical h1–h6 outline, paragraphs, lists, quotes and emphasis"],
      ["Landmarks", "header, nav, main, aside, footer and section, and when each is appropriate"],
      ["Links, images and media", "Meaningful link text, alt text that conveys purpose, figure and figcaption"],
      ["Tables for data", "caption, thead, th scope, and why tables are not for layout"],
      ["Validating markup", "Using the W3C validator and browser dev tools to catch structural mistakes"],
    ],
    resources: [
      ["Structuring content with HTML", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content", "MDN Web Docs", "Course"],
      ["Learn HTML", "https://web.dev/learn/html", "web.dev (Google)", "Course"],
      ["HTML elements reference", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element", "MDN Web Docs", "Reference"],
    ],
    projects: [
      ["Recipe page with no CSS", "Beginner", 3, "Mark up a full recipe with headings, ordered steps, an ingredients list and a photo with alt text. It should read well with styles turned off."],
      ["Accessible article layout", "Beginner", 5, "Build a blog article page with landmarks, a table of contents and a data table, then check it with the W3C validator and a screen reader."],
    ],
    quiz: [
      ["Which element should wrap the primary content of a page?", ["<div id=\"main\">", "<main>", "<section>", "<article>"], 1, "There should be one <main> per page, and assistive technology can jump straight to it."],
      ["What makes good alt text for an informative image?", ["The file name", "\"Image of…\" followed by every detail", "A short description of what the image communicates", "Leaving it empty"], 2, "Alt text should convey the image's purpose in context. Empty alt is only right for purely decorative images."],
      ["When is a <table> the right choice?", ["For page layout", "For tabular data with rows and columns", "For any list of items", "For aligning form fields"], 1, "Tables carry row and column semantics that screen readers announce, so they should hold real tabular data."],
    ],
  },

  "html-forms": {
    overview:
      "Forms are how users give a product information. Well-built forms are labeled, validated, keyboard-friendly and clear about errors, which directly affects sign-ups and conversions.",
    topics: [
      ["Inputs and labels", "Choosing the right input type, connecting <label> with for/id, and grouping with fieldset and legend"],
      ["Native validation", "required, pattern, min/max and type-based validation, plus the Constraint Validation API"],
      ["Error messages", "Writing helpful messages, linking them with aria-describedby, and moving focus to the first error"],
      ["Submission", "GET versus POST, FormData, and handling forms with JavaScript without breaking the basics"],
      ["Autocomplete and mobile", "autocomplete tokens, inputmode, and keyboards that match the data"],
    ],
    resources: [
      ["Web forms", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms", "MDN Web Docs", "Course"],
      ["Learn Forms", "https://web.dev/learn/forms", "web.dev (Google)", "Course"],
      ["Client-side form validation", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation", "MDN Web Docs", "Guide"],
    ],
    projects: [
      ["Accessible sign-up form", "Beginner", 4, "Build a sign-up form with proper labels, native validation, inline error messages and a success state. Test it using only the keyboard."],
      ["Multi-step checkout form", "Intermediate", 8, "Create a three-step checkout with progress indication, saved state between steps and a review screen before submission."],
    ],
    quiz: [
      ["What is the most reliable way to give an input an accessible name?", ["A placeholder", "A <label> associated with the input", "A title attribute", "Text next to the input"], 1, "An associated <label> is announced by screen readers and enlarges the click target. Placeholders disappear when typing."],
      ["Which input type brings up an email-friendly keyboard on phones?", ["type=\"text\"", "type=\"email\"", "type=\"string\"", "inputmode=\"text\""], 1, "type=\"email\" adjusts mobile keyboards and adds basic format validation."],
      ["Why should client-side validation never be the only validation?", ["It's slow", "Users can bypass it, so the server must validate too", "Browsers don't support it", "It breaks accessibility"], 1, "Anything in the browser can be changed. Client-side checks are for user experience, not security."],
    ],
  },

  "css-layout": {
    overview:
      "Flexbox and Grid are the modern layout systems in CSS. Flexbox arranges items along one axis; Grid places them in rows and columns. Together they handle almost any interface layout.",
    topics: [
      ["The box model", "content, padding, border and margin, box-sizing, and how sizes are calculated"],
      ["Flexbox fundamentals", "Main and cross axes, justify-content, align-items, gap and wrapping"],
      ["Flex sizing", "flex-grow, flex-shrink, flex-basis and the flex shorthand"],
      ["Grid fundamentals", "grid-template-columns and rows, fr units, repeat(), minmax() and gap"],
      ["Placing grid items", "Line numbers, spans, named areas and auto-placement"],
      ["Choosing a tool", "When Flexbox, Grid or normal flow is the simplest option"],
    ],
    resources: [
      ["CSS layout", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout", "MDN Web Docs", "Course"],
      ["A Complete Guide to Flexbox", "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", "CSS-Tricks", "Reference"],
      ["A Complete Guide to CSS Grid", "https://css-tricks.com/snippets/css/complete-guide-grid/", "CSS-Tricks", "Reference"],
      ["Flexbox Froggy", "https://flexboxfroggy.com/", "Flexbox Froggy", "Interactive"],
    ],
    projects: [
      ["Pricing table", "Beginner", 3, "Lay out three pricing cards with Flexbox so they stay equal height and wrap neatly on narrow screens."],
      ["Dashboard shell", "Intermediate", 6, "Build a dashboard with a header, sidebar, main area and widget grid using named grid areas, without any CSS framework."],
    ],
    quiz: [
      ["Which layout system is designed for two-dimensional layouts?", ["Flexbox", "Grid", "Floats", "Inline-block"], 1, "Grid controls rows and columns together. Flexbox works along a single axis at a time."],
      ["What does the fr unit represent in Grid?", ["A fixed pixel size", "A fraction of the remaining free space", "Font-relative size", "A percentage of the viewport"], 1, "1fr takes one share of the leftover space after fixed tracks are sized."],
      ["In a row flex container, which property aligns items vertically?", ["justify-content", "align-items", "flex-direction", "text-align"], 1, "align-items works on the cross axis, which is vertical when flex-direction is row."],
    ],
  },

  "responsive-design": {
    overview:
      "Responsive design makes one interface work on any screen, from phones to wide monitors. Most traffic is mobile, so this is a baseline expectation for any frontend developer.",
    topics: [
      ["Viewport and mobile-first", "The viewport meta tag and writing base styles for small screens first"],
      ["Media queries", "min-width breakpoints chosen by content, plus prefers-color-scheme and prefers-reduced-motion"],
      ["Fluid sizing", "Relative units (rem, %, vw), clamp() for fluid type and max-width for readable lines"],
      ["Responsive images", "srcset, sizes, the picture element and object-fit"],
      ["Container queries", "Components that adapt to their container instead of the viewport"],
    ],
    resources: [
      ["Learn Responsive Design", "https://web.dev/learn/design", "web.dev (Google)", "Course"],
      ["Responsive design", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design", "MDN Web Docs", "Guide"],
      ["Using media queries", "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries", "MDN Web Docs", "Reference"],
    ],
    projects: [
      ["Responsive landing page", "Beginner", 5, "Rebuild a landing page so it works from 320px to 1440px with fluid type, a collapsing nav and responsive images."],
      ["Adaptive card component", "Intermediate", 4, "Build a product card that switches layout with container queries, and use it in both a sidebar and a wide grid."],
    ],
    quiz: [
      ["What does a mobile-first approach mean in CSS?", ["Designing only for phones", "Writing base styles for small screens and adding min-width media queries", "Using max-width queries everywhere", "Hiding content on mobile"], 1, "Base styles serve the smallest screen, and wider layouts are layered on with min-width queries."],
      ["What does srcset on an <img> let the browser do?", ["Lazy-load the image", "Choose the most appropriate image file for the screen", "Crop the image", "Add a caption"], 1, "srcset lists candidate files and the browser picks one based on viewport and pixel density."],
      ["Container queries respond to…", ["The viewport width", "The size of a parent container", "The device type", "The user's font size only"], 1, "They let a component adapt to the space it's given, wherever it's placed."],
    ],
  },

  "css-architecture": {
    overview:
      "CSS architecture is how you keep styles predictable as a codebase grows. Teams use utility frameworks, CSS Modules or naming conventions, plus design tokens, to avoid conflicts and inconsistency.",
    topics: [
      ["Cascade, specificity and inheritance", "Why styles conflict and how to keep specificity low"],
      ["Naming conventions", "BEM-style naming and other approaches for readable, collision-free class names"],
      ["Scoped styles", "CSS Modules and component-scoped styling"],
      ["Utility-first CSS", "How Tailwind works, its trade-offs and keeping markup readable"],
      ["Design tokens", "Custom properties for color, spacing and type, including theming and dark mode"],
    ],
    resources: [
      ["Cascade, specificity, and inheritance", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts", "MDN Web Docs", "Guide"],
      ["Tailwind CSS documentation", "https://tailwindcss.com/docs", "Tailwind Labs", "Docs"],
      ["Organizing your CSS", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Organizing", "MDN Web Docs", "Guide"],
      ["Using CSS custom properties", "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties", "MDN Web Docs", "Reference"],
    ],
    projects: [
      ["Token-based theme", "Intermediate", 5, "Define color, spacing and type tokens as custom properties and use them to add a working dark mode to an existing page."],
      ["Refactor a messy stylesheet", "Intermediate", 6, "Take a page with tangled, high-specificity CSS and refactor it to BEM or CSS Modules with no visual changes."],
    ],
    quiz: [
      ["Which selector has the highest specificity?", [".card .title", "#header", "div p", "a:hover"], 1, "ID selectors outrank classes, pseudo-classes and element selectors."],
      ["What problem do CSS Modules mainly solve?", ["Slow loading", "Global class name collisions", "Browser support", "Animation performance"], 1, "Class names are scoped to the component, so styles don't leak or clash."],
      ["Why use design tokens?", ["They make CSS files smaller", "To keep values like colors and spacing consistent and easy to change", "They're required by browsers", "To avoid using classes"], 1, "Tokens give each design decision a single source of truth, which makes theming possible."],
    ],
  },

  "html-css": {
    overview:
      "HTML gives a page its structure and meaning; CSS controls how it looks and adapts to different screens. Every web interface, whatever the framework, ends up as HTML and CSS.",
    topics: [
      ["Semantic HTML", "Headings, landmarks, lists, links and images with meaningful markup"],
      ["Forms", "Inputs, labels and native validation"],
      ["The box model and selectors", "How elements are sized and how to target them"],
      ["Flexbox and Grid", "Modern layout for components and whole pages"],
      ["Responsive design", "Mobile-first styles, media queries and fluid sizing"],
    ],
    resources: [
      ["Learn HTML", "https://web.dev/learn/html", "web.dev (Google)", "Course"],
      ["Learn CSS", "https://web.dev/learn/css", "web.dev (Google)", "Course"],
      ["Foundations course", "https://www.theodinproject.com/paths/foundations/courses/foundations", "The Odin Project", "Course"],
    ],
    projects: [
      ["Personal homepage", "Beginner", 5, "Build a responsive personal homepage with semantic HTML and hand-written CSS. No frameworks."],
      ["Landing page clone", "Intermediate", 8, "Recreate the layout of a real product's landing page using Flexbox and Grid, matching it from mobile to desktop."],
    ],
    quiz: [
      ["What does CSS box-sizing: border-box change?", ["Width includes padding and border", "Borders become rounded", "Margins collapse", "Elements become flex items"], 0, "With border-box, the width you set includes padding and border, which makes sizing predictable."],
      ["Which element is best for navigation links?", ["<div class=\"nav\">", "<nav>", "<menu>", "<header>"], 1, "<nav> is a landmark that screen readers can jump to."],
      ["Which is the best tool for a row of evenly spaced buttons?", ["Floats", "Flexbox", "Tables", "Absolute positioning"], 1, "Flexbox with gap handles one-dimensional rows like this cleanly."],
    ],
  },

  javascript: {
    overview:
      "JavaScript is the programming language of the web. It runs in every browser and, through Node.js, on servers. Strong fundamentals make frameworks, debugging and interviews far easier.",
    topics: [
      ["Values, types and operators", "Primitives versus objects, equality (=== versus ==) and type coercion"],
      ["Functions and scope", "Declarations, arrow functions, closures and lexical scope"],
      ["Objects and arrays", "Destructuring, spread, and map, filter and reduce"],
      ["Modules", "import and export, and how code is split across files"],
      ["Classes and prototypes", "How objects inherit behavior and when classes help"],
      ["Error handling", "try/catch, throwing errors and debugging with dev tools"],
    ],
    resources: [
      ["The Modern JavaScript Tutorial", "https://javascript.info/", "javascript.info", "Course"],
      ["JavaScript Guide", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", "MDN Web Docs", "Guide"],
      ["Eloquent JavaScript", "https://eloquentjavascript.net/", "Marijn Haverbeke", "Book"],
    ],
    projects: [
      ["Expense tracker (console)", "Beginner", 4, "Write a small module that adds, filters and totals expenses using objects, arrays and higher-order functions, with simple tests."],
      ["Quiz game", "Intermediate", 8, "Build a browser quiz game with modules, a scoring system, a timer and saved high scores."],
    ],
    quiz: [
      ["What does [1, 2, 3].map(n => n * 2) return?", ["6", "[2, 4, 6]", "undefined", "[1, 2, 3]"], 1, "map returns a new array with the callback applied to each element."],
      ["What is a closure?", ["A way to end a loop", "A function that remembers variables from the scope where it was created", "A syntax error", "A type of class"], 1, "Inner functions keep access to outer variables even after the outer function has returned."],
      ["What does 0 === \"0\" evaluate to?", ["true", "false", "TypeError", "undefined"], 1, "=== checks type and value without coercion, so a number never equals a string."],
    ],
  },

  "dom-events": {
    overview:
      "The DOM is the browser's live model of a page. Reading and changing it, and responding to user events, is how JavaScript makes interfaces interactive. Frameworks build on these same mechanics.",
    topics: [
      ["Selecting elements", "querySelector, querySelectorAll and traversing the tree"],
      ["Changing the page", "textContent, attributes, classList and creating or removing elements"],
      ["Events", "addEventListener, the event object and common events like click, input and submit"],
      ["Bubbling and delegation", "How events propagate and handling many elements with one listener"],
      ["Keeping it accessible", "Keyboard events, focus management and not breaking native behavior"],
    ],
    resources: [
      ["Introduction to the DOM", "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction", "MDN Web Docs", "Guide"],
      ["Document and events", "https://javascript.info/document", "javascript.info", "Course"],
      ["Introduction to events", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events", "MDN Web Docs", "Guide"],
    ],
    projects: [
      ["To-do list without a framework", "Beginner", 5, "Add, complete, filter and delete tasks using event delegation, and save them to localStorage."],
      ["Accessible tabs component", "Intermediate", 5, "Build a tabs widget with arrow-key navigation and correct ARIA roles, following the ARIA Authoring Practices pattern."],
    ],
    quiz: [
      ["What is event delegation?", ["Removing event listeners", "Handling events for many children with one listener on a parent", "Sending events to a server", "Delaying an event"], 1, "Because events bubble, a parent listener can handle clicks from any child, including ones added later."],
      ["Which method stops a form from reloading the page on submit?", ["event.stopPropagation()", "event.preventDefault()", "return null", "form.reset()"], 1, "preventDefault cancels the browser's default action, which for a form is navigation."],
      ["Which property safely sets plain text without parsing HTML?", ["innerHTML", "textContent", "outerHTML", "insertAdjacentHTML"], 1, "textContent treats the value as text, which avoids XSS from untrusted input."],
    ],
  },

  "async-js": {
    overview:
      "Most real interfaces wait on things: network requests, timers, files. Asynchronous JavaScript lets the page stay responsive while that happens, and it underpins data fetching in every framework.",
    topics: [
      ["The event loop", "The call stack, task queue and microtasks, and why JavaScript doesn't block"],
      ["Promises", "States, then and catch chains, and Promise.all, allSettled and race"],
      ["async/await", "Writing asynchronous code that reads top to bottom, with try/catch"],
      ["Fetching data", "fetch, JSON, checking response.ok and handling network errors"],
      ["Cancellation and races", "AbortController, timeouts and ignoring stale responses"],
    ],
    resources: [
      ["Asynchronous JavaScript", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS", "MDN Web Docs", "Course"],
      ["Promises, async/await", "https://javascript.info/async", "javascript.info", "Course"],
      ["Using the Fetch API", "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch", "MDN Web Docs", "Guide"],
    ],
    projects: [
      ["Weather lookup", "Beginner", 4, "Fetch weather for a searched city from a public API, with loading and error states and a retry button."],
      ["Search with cancellation", "Intermediate", 5, "Build a debounced search box that cancels in-flight requests with AbortController so stale results never appear."],
    ],
    quiz: [
      ["Does fetch reject its promise on an HTTP 404?", ["Yes", "No, it resolves; check response.ok", "Only in Node.js", "Only for POST requests"], 1, "fetch only rejects on network failure. HTTP error statuses still resolve, so check response.ok."],
      ["What does Promise.all do if one promise rejects?", ["Ignores it", "Rejects immediately with that error", "Retries it", "Waits for all, then resolves"], 1, "Promise.all fails fast. Use Promise.allSettled when you need every result."],
      ["What does await pause?", ["The whole browser tab", "Only the current async function", "All JavaScript on the page", "Network requests"], 1, "Only the enclosing async function pauses. The event loop keeps running other work."],
    ],
  },

  "frontend-tooling": {
    overview:
      "Modern frontend work relies on tooling: package managers to install libraries, build tools to bundle and optimize code, and linters and formatters to keep it consistent across a team.",
    topics: [
      ["npm and package.json", "Installing packages, scripts, dependencies versus devDependencies, and lockfiles"],
      ["Semantic versioning", "What ^ and ~ mean and how to update safely"],
      ["Build tools", "What a bundler does, dev servers with hot reload, and production builds with Vite"],
      ["Linting and formatting", "ESLint rules and Prettier, run automatically in the editor and CI"],
      ["Environment variables", "Configuring builds per environment without leaking secrets"],
    ],
    resources: [
      ["About npm", "https://docs.npmjs.com/about-npm", "npm Docs", "Docs"],
      ["Vite guide", "https://vite.dev/guide/", "Vite", "Docs"],
      ["Getting started with ESLint", "https://eslint.org/docs/latest/use/getting-started", "ESLint", "Docs"],
    ],
    projects: [
      ["Project starter template", "Beginner", 3, "Set up a Vite project with ESLint, Prettier, npm scripts and a README so a teammate can clone it and start working."],
      ["Upgrade an old project", "Intermediate", 5, "Take an older project, update its dependencies safely, fix the breaking changes and add linting to its CI."],
    ],
    quiz: [
      ["What does the ^ in \"^1.4.0\" allow?", ["Any version", "Minor and patch updates within 1.x", "Only patch updates", "Only exactly 1.4.0"], 1, "Caret ranges allow updates that don't change the major version."],
      ["Why commit the lockfile (package-lock.json)?", ["It makes installs faster only", "So everyone installs exactly the same dependency versions", "npm requires it", "It stores secrets"], 1, "The lockfile pins the full dependency tree for reproducible installs."],
      ["What does a linter do?", ["Formats whitespace only", "Flags likely bugs and style issues in code", "Bundles files", "Runs tests"], 1, "Linters statically analyze code for problems. Formatters like Prettier handle layout."],
    ],
  },

  typescript: {
    overview:
      "TypeScript adds static types to JavaScript, catching mistakes before code runs and making large codebases easier to change. Most professional frontend and Node.js teams now use it.",
    topics: [
      ["Basic types and inference", "Primitives, arrays, objects, and letting the compiler infer types"],
      ["Interfaces and type aliases", "Describing object shapes and composing types"],
      ["Unions and narrowing", "Union types, type guards and discriminated unions"],
      ["Generics", "Writing reusable functions and components that keep type information"],
      ["Typing React", "Props, state, events and hooks in TypeScript"],
      ["Configuration", "tsconfig, strict mode and gradual adoption"],
    ],
    resources: [
      ["The TypeScript Handbook", "https://www.typescriptlang.org/docs/handbook/intro.html", "TypeScript", "Docs"],
      ["React TypeScript Cheatsheet", "https://react-typescript-cheatsheet.netlify.app/", "Community", "Reference"],
      ["TypeScript Playground", "https://www.typescriptlang.org/play", "TypeScript", "Interactive"],
    ],
    projects: [
      ["Typed API client", "Intermediate", 5, "Write a small typed client for a public API, with response types, discriminated union errors and generics for shared request logic."],
      ["Convert a JS project", "Intermediate", 8, "Migrate an existing JavaScript project to TypeScript with strict mode on, removing every any along the way."],
    ],
    quiz: [
      ["What does a union type like string | number mean?", ["Both at once", "A value that can be either type", "An array of both", "A new primitive"], 1, "Unions describe a value that may be any one of several types. Narrowing tells you which."],
      ["Why are generics useful?", ["They make code run faster", "They let functions work with many types while preserving type information", "They replace interfaces", "They disable type checking"], 1, "A generic like identity<T>(x: T): T returns the same type it receives."],
      ["Does TypeScript type-check at runtime?", ["Yes, always", "No, types are erased when compiled to JavaScript", "Only in strict mode", "Only in the browser"], 1, "Types exist at compile time only. Validate untrusted runtime data separately."],
    ],
  },

  "react-components": {
    overview:
      "React builds interfaces from components: small, reusable functions that return UI. Thinking in components, and passing data down through props, is the foundation of every React codebase.",
    topics: [
      ["JSX", "Writing markup in JavaScript, expressions and conditional rendering"],
      ["Components and props", "Passing data down, children, and keeping components pure"],
      ["Rendering lists", "map, stable keys and why index keys can cause bugs"],
      ["Composition", "Building complex UIs from small components instead of inheritance"],
      ["Thinking in React", "Breaking a design into a component hierarchy and deciding where state lives"],
    ],
    resources: [
      ["Quick Start", "https://react.dev/learn", "React (react.dev)", "Docs"],
      ["Describing the UI", "https://react.dev/learn/describing-the-ui", "React (react.dev)", "Docs"],
      ["Thinking in React", "https://react.dev/learn/thinking-in-react", "React (react.dev)", "Guide"],
    ],
    projects: [
      ["Product listing UI", "Beginner", 5, "Turn a static product listing design into React components with props, list rendering and a reusable card."],
      ["Component library starter", "Intermediate", 10, "Build Button, Input, Card and Modal components with consistent props and variants, documented in a demo page."],
    ],
    quiz: [
      ["Why does React need a key on list items?", ["For styling", "To identify items between renders so it updates the right ones", "For accessibility", "It doesn't"], 1, "Keys let React match items across renders. Stable IDs avoid bugs when items move."],
      ["Should a component modify its props?", ["Yes, freely", "No, props are read-only", "Only in class components", "Only for arrays"], 1, "Components should be pure with respect to props. Use state for values that change."],
      ["What does JSX compile to?", ["HTML strings", "Function calls that create React elements", "Web components", "CSS"], 1, "JSX is syntax for creating React elements in JavaScript."],
    ],
  },

  "react-hooks": {
    overview:
      "Hooks let components remember values, respond to changes and share logic. useState and useEffect appear in nearly every React component, so understanding them well prevents common bugs.",
    topics: [
      ["useState", "Component memory, updating state immutably and batching"],
      ["Events and state updates", "Updater functions and why state doesn't change immediately"],
      ["useEffect", "Synchronising with external systems, dependencies and cleanup"],
      ["You might not need an effect", "Deriving values during render instead of syncing state"],
      ["useRef and useMemo", "Referencing DOM nodes and avoiding unnecessary work"],
      ["Custom hooks", "Extracting reusable stateful logic"],
    ],
    resources: [
      ["State: a component's memory", "https://react.dev/learn/state-a-components-memory", "React (react.dev)", "Docs"],
      ["Built-in React Hooks", "https://react.dev/reference/react/hooks", "React (react.dev)", "Reference"],
      ["You Might Not Need an Effect", "https://react.dev/learn/you-might-not-need-an-effect", "React (react.dev)", "Guide"],
    ],
    projects: [
      ["Pomodoro timer", "Beginner", 4, "Build a timer with useState and useEffect, including correct cleanup of intervals when it pauses or unmounts."],
      ["useLocalStorage hook", "Intermediate", 4, "Write and test a custom hook that syncs state with localStorage, handles JSON errors and works across tabs."],
    ],
    quiz: [
      ["After calling setCount(count + 1), what does count equal on the next line?", ["The new value", "The old value until the next render", "undefined", "NaN"], 1, "State updates are applied on the next render. The current render keeps its snapshot."],
      ["What does the cleanup function returned from useEffect do?", ["Runs before the first render", "Undoes the effect before it re-runs or the component unmounts", "Resets state", "Nothing"], 1, "Cleanup removes subscriptions, timers or listeners so they don't leak or duplicate."],
      ["How should you update an object in state?", ["Mutate it and call setState", "Create a new object with the changes", "Use a ref", "Call forceUpdate"], 1, "React compares references, so pass a new object. Mutating the old one can skip re-renders."],
    ],
  },

  "react-data": {
    overview:
      "Real apps load data from servers and move between pages. Handling loading, errors and caching, and routing between screens, is where most production React complexity lives.",
    topics: [
      ["Client-side routing", "Routes, links, nested layouts and route parameters"],
      ["Fetching data", "Loading, error and empty states, and avoiding race conditions"],
      ["Server-state libraries", "Caching, background refresh and mutations with TanStack Query"],
      ["Forms and mutations", "Controlled inputs, submission and optimistic updates"],
      ["Frameworks", "How Next.js handles routing, data fetching and server rendering"],
    ],
    resources: [
      ["Learn Next.js", "https://nextjs.org/learn", "Vercel (Next.js)", "Course"],
      ["TanStack Query overview", "https://tanstack.com/query/latest/docs/framework/react/overview", "TanStack", "Docs"],
      ["React Router documentation", "https://reactrouter.com/home", "React Router", "Docs"],
    ],
    projects: [
      ["Movie browser", "Intermediate", 8, "Build a multi-page movie app with search, detail pages via route params, and proper loading and error states."],
      ["CRUD dashboard", "Intermediate", 10, "Create a dashboard that lists, creates, edits and deletes records through an API, using a server-state library for caching."],
    ],
    quiz: [
      ["Why use a library like TanStack Query for server data?", ["It replaces React", "It handles caching, refetching and request state for you", "It styles components", "It's required for fetch"], 1, "Server-state libraries manage caching, deduplication and background updates that are tedious by hand."],
      ["Which state should every data request show to users?", ["Only success", "Loading, error and success (and empty when relevant)", "Only errors", "None"], 1, "Users need feedback while waiting and a way forward when something fails."],
      ["What does a dynamic route like /movies/[id] provide?", ["A static page", "A parameter you can use to load the right movie", "A redirect", "A query string"], 1, "The id segment is passed to the page so it can fetch that specific record."],
    ],
  },

  "state-management": {
    overview:
      "As apps grow, some state needs to be shared across many components. Knowing when to lift state up, use context or reach for a store keeps apps fast and understandable.",
    topics: [
      ["Lifting state up", "Sharing state through a common parent before reaching for tools"],
      ["Context", "Avoiding prop drilling, and when context causes extra renders"],
      ["External stores", "Zustand or Redux Toolkit for app-wide client state"],
      ["Server versus client state", "Keeping fetched data in a cache, separate from UI state"],
      ["Choosing the simplest tool", "Matching the tool to how widely state is shared"],
    ],
    resources: [
      ["Managing State", "https://react.dev/learn/managing-state", "React (react.dev)", "Docs"],
      ["Zustand documentation", "https://zustand.docs.pmnd.rs/", "Poimandres", "Docs"],
      ["Redux Essentials tutorial", "https://redux.js.org/tutorials/essentials/part-1-overview-concepts", "Redux", "Course"],
    ],
    projects: [
      ["Shopping cart", "Intermediate", 6, "Build a cart shared across product, header and checkout components, first with context and then with a small store."],
      ["Refactor prop drilling", "Intermediate", 4, "Take a component tree that passes props through five levels and refactor it, explaining why you chose each tool."],
    ],
    quiz: [
      ["What is prop drilling?", ["Passing props through components that don't use them", "A testing technique", "A performance optimization", "Using too many hooks"], 0, "Intermediate components pass props along purely so a deep child can receive them."],
      ["What's a common downside of putting fast-changing values in React context?", ["It can't hold objects", "Every consumer re-renders when the value changes", "It's not supported in React 19", "It leaks memory"], 1, "All consumers re-render on change. Split contexts or use a store with selectors."],
      ["Where should data fetched from an API usually live?", ["In a global UI store", "In a server-state cache such as TanStack Query", "In localStorage", "In component props only"], 1, "Server data has its own concerns (staleness, refetching) that dedicated caches handle well."],
    ],
  },

  accessibility: {
    overview:
      "Accessibility means people can use your product whatever their abilities or devices: screen readers, keyboards, zoom, captions. It's a legal requirement in many places and a mark of a professional frontend developer.",
    topics: [
      ["Who accessibility serves", "Permanent, temporary and situational disabilities, and assistive technologies"],
      ["WCAG principles", "Perceivable, operable, understandable and robust, and the AA criteria"],
      ["Keyboard and focus", "Tab order, visible focus, focus traps in dialogs and skip links"],
      ["ARIA, used sparingly", "Native HTML first, then roles, states and properties when needed"],
      ["Color and content", "Contrast ratios, not relying on color alone, and clear language"],
      ["Testing", "Automated checks, keyboard-only testing and screen readers"],
    ],
    resources: [
      ["Introduction to Web Accessibility", "https://www.w3.org/WAI/fundamentals/accessibility-intro/", "W3C WAI", "Guide"],
      ["How to Meet WCAG (Quick Reference)", "https://www.w3.org/WAI/WCAG22/quickref/", "W3C WAI", "Reference"],
      ["ARIA Authoring Practices Guide", "https://www.w3.org/WAI/ARIA/apg/", "W3C WAI", "Reference"],
      ["Learn Accessibility", "https://web.dev/learn/accessibility", "web.dev (Google)", "Course"],
    ],
    projects: [
      ["Accessibility audit", "Beginner", 4, "Audit a real website with automated tools, keyboard-only use and a screen reader, and write up prioritized fixes."],
      ["Accessible modal and menu", "Intermediate", 6, "Build a modal dialog and a dropdown menu with correct focus management, Escape handling and ARIA, and test them with a screen reader."],
    ],
    quiz: [
      ["What is the WCAG AA minimum contrast ratio for normal body text?", ["3:1", "4.5:1", "7:1", "2:1"], 1, "AA requires 4.5:1 for normal text and 3:1 for large text."],
      ["What's the first rule of ARIA?", ["Add ARIA to every element", "Use a native HTML element if one does the job", "Always use role=\"button\"", "ARIA replaces labels"], 1, "Native elements come with built-in semantics and keyboard support."],
      ["When a modal dialog opens, where should keyboard focus go?", ["Stay on the page behind", "Into the dialog, and return to the trigger when it closes", "To the browser address bar", "Nowhere"], 1, "Moving focus in, and back out on close, keeps keyboard and screen reader users oriented."],
    ],
  },

  "frontend-testing": {
    overview:
      "Automated tests let teams change code confidently. Frontend testing focuses on behavior users see: components rendering correctly, interactions working and critical flows not breaking.",
    topics: [
      ["Testing strategy", "Unit, component, integration and end-to-end tests, and what each is for"],
      ["Unit tests with Vitest or Jest", "Assertions, test structure, mocking and coverage"],
      ["Component tests", "Testing Library's approach: query by role and test like a user"],
      ["End-to-end tests", "Driving a real browser through key journeys with Playwright"],
      ["Testing in CI", "Running tests on every pull request and keeping them reliable"],
    ],
    resources: [
      ["Vitest guide", "https://vitest.dev/guide/", "Vitest", "Docs"],
      ["React Testing Library", "https://testing-library.com/docs/react-testing-library/intro/", "Testing Library", "Docs"],
      ["Playwright: getting started", "https://playwright.dev/docs/intro", "Playwright (Microsoft)", "Docs"],
    ],
    projects: [
      ["Test a form component", "Beginner", 4, "Write component tests for a sign-up form covering validation, errors and successful submission, querying by role and label."],
      ["E2E test suite", "Intermediate", 6, "Add Playwright tests for the three most important journeys in one of your apps and run them in GitHub Actions."],
    ],
    quiz: [
      ["Why does Testing Library recommend getByRole queries?", ["They're fastest", "They mirror how users and assistive tech find elements", "They avoid async code", "They don't need a DOM"], 1, "Role queries test what users perceive and also encourage accessible markup."],
      ["What do end-to-end tests check?", ["A single function", "Complete user journeys through the real app", "CSS only", "Type errors"], 1, "E2E tests exercise the whole stack in a browser, like a user would."],
      ["What makes a test 'flaky'?", ["It's slow", "It sometimes passes and sometimes fails without code changes", "It has no assertions", "It uses mocks"], 1, "Flaky tests, often caused by timing or shared state, erode trust and should be fixed."],
    ],
  },

  "web-performance": {
    overview:
      "Performance is user experience: slow pages lose users and search ranking. Frontend developers are expected to measure Core Web Vitals and fix what slows pages down.",
    topics: [
      ["Core Web Vitals", "LCP, INP and CLS: what they measure and the target thresholds"],
      ["Measuring", "Lighthouse, Chrome DevTools performance panel and real-user data"],
      ["Loading performance", "Image optimization, lazy loading, caching and critical resources"],
      ["JavaScript cost", "Bundle size, code splitting and avoiding long tasks"],
      ["Rendering", "Layout shifts, reflows and efficient React rendering"],
    ],
    resources: [
      ["Web Vitals", "https://web.dev/articles/vitals", "web.dev (Google)", "Guide"],
      ["Learn Performance", "https://web.dev/learn/performance", "web.dev (Google)", "Course"],
      ["Lighthouse overview", "https://developer.chrome.com/docs/lighthouse/overview", "Chrome for Developers", "Docs"],
    ],
    projects: [
      ["Performance makeover", "Intermediate", 6, "Take a slow page, record a Lighthouse baseline, fix images, fonts and JavaScript, and document the before and after metrics."],
      ["Code-split an app", "Advanced", 6, "Analyze a React app's bundle, add route-level code splitting and lazy-load heavy components, then measure the improvement."],
    ],
    quiz: [
      ["What does CLS measure?", ["Load time", "Unexpected layout shifts", "Server response time", "JavaScript errors"], 1, "Cumulative Layout Shift measures how much visible content jumps around while loading."],
      ["Which helps Largest Contentful Paint most for a hero image?", ["Lazy-loading it", "Serving an optimized, correctly sized image and prioritizing it", "Adding animations", "Using a GIF"], 1, "The hero is usually the LCP element. Lazy-loading it delays LCP."],
      ["What does code splitting do?", ["Minifies CSS", "Loads JavaScript in smaller chunks only when needed", "Splits the server", "Removes unused HTML"], 1, "Users download only the code each page needs instead of one large bundle."],
    ],
  },

  "frontend-deployment": {
    overview:
      "Shipping is part of the job. Frontend developers deploy to platforms like Vercel or Netlify, manage environment variables and set up previews so every change can be reviewed live.",
    topics: [
      ["Static versus server-rendered hosting", "What gets deployed for SPAs, static sites and SSR apps"],
      ["Hosting platforms", "Deploying from Git to Vercel, Netlify or GitHub Pages"],
      ["Environment variables", "Build-time versus runtime config and keeping secrets server-side"],
      ["Preview deployments", "A live URL for every pull request"],
      ["Domains and HTTPS", "Custom domains, DNS records and TLS certificates"],
    ],
    resources: [
      ["Vercel documentation", "https://vercel.com/docs", "Vercel", "Docs"],
      ["Netlify documentation", "https://docs.netlify.com/", "Netlify", "Docs"],
      ["GitHub Pages documentation", "https://docs.github.com/en/pages", "GitHub Docs", "Docs"],
    ],
    projects: [
      ["Deploy with previews", "Beginner", 2, "Deploy a project from GitHub with automatic preview URLs for pull requests and a production branch."],
      ["Custom domain setup", "Beginner", 2, "Connect a custom domain with HTTPS, configure environment variables and add a status badge to the README."],
    ],
    quiz: [
      ["Why must API secrets never be bundled into frontend code?", ["They slow the build", "Anyone can read code shipped to the browser", "Browsers block them", "They break caching"], 1, "Everything sent to the browser is public. Keep secrets on a server or serverless function."],
      ["What is a preview deployment?", ["A screenshot", "A temporary live deployment of a branch or pull request", "A staging database", "A load test"], 1, "Previews let reviewers try changes live before merging."],
      ["Which DNS record typically points a domain to a hosting provider's hostname?", ["MX", "CNAME", "TXT", "SRV"], 1, "CNAME aliases one hostname to another. Apex domains often use A or ALIAS records instead."],
    ],
  },

  "frontend-portfolio": {
    overview:
      "For junior roles, a portfolio is your evidence. Two or three polished, deployed projects with clear write-ups often matter more to hiring managers than certificates.",
    topics: [
      ["Choosing projects", "Real problems, realistic scope and showing range"],
      ["Polish", "Responsive, accessible, fast and free of obvious bugs"],
      ["Write-ups", "READMEs that explain the problem, decisions, trade-offs and what you'd improve"],
      ["Code quality", "Clean commits, tests and readable structure that reviewers will look at"],
      ["Presenting yourself", "A portfolio site and GitHub profile that point to your best work"],
    ],
    resources: [
      ["Full Stack JavaScript path", "https://www.theodinproject.com/paths/full-stack-javascript", "The Odin Project", "Course"],
      ["Frontend Mentor challenges", "https://www.frontendmentor.io/challenges", "Frontend Mentor", "Interactive"],
      ["Managing your profile README", "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme", "GitHub Docs", "Guide"],
    ],
    projects: [
      ["Portfolio website", "Intermediate", 10, "Build and deploy a fast, accessible portfolio site with case studies for your best projects."],
      ["Capstone app", "Advanced", 30, "Build a complete app that solves a real problem, with authentication, a database, tests and a thorough README."],
    ],
    quiz: [
      ["What do reviewers most want from a portfolio project README?", ["A list of every library", "The problem, key decisions, trade-offs and how to run it", "Only screenshots", "Your CV"], 1, "Explaining your reasoning shows how you think, which matters more than the stack."],
      ["Which is the stronger portfolio?", ["Ten tutorial clones", "Two or three polished, original, deployed projects", "One unfinished large project", "Only certificates"], 1, "Depth and polish demonstrate job-ready skills better than volume."],
      ["Why include a live deployment link?", ["It's required by GitHub", "Reviewers can try the project in seconds without setup", "It improves SEO only", "It replaces the code"], 1, "Most reviewers won't clone and run your project. A live link removes friction."],
    ],
  },
};
