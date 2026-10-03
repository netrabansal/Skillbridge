import type { RawLessons } from "./types";

export const infraLessons: RawLessons = {
  "networking-fundamentals": {
    overview:
      "Networks connect every service, container and cloud resource. Understanding layers, IP addressing, TCP and UDP, DNS and ports makes it possible to design systems and diagnose connectivity problems quickly.",
    topics: [
      ["The OSI and TCP/IP models", "What each layer does and where common protocols fit"],
      ["IP addressing and subnets", "IPv4, CIDR notation, private ranges and subnetting"],
      ["TCP and UDP", "Connections, the three-way handshake, ports and reliability"],
      ["DNS and HTTP", "Name resolution and application-layer traffic"],
      ["Routing, NAT and firewalls", "How packets find their way and how access is controlled"],
      ["Troubleshooting tools", "ping, traceroute, dig, curl, ss and tcpdump"],
    ],
    resources: [
      ["What is the OSI model?", "https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/", "Cloudflare Learning Center", "Guide"],
      ["What is TCP/IP?", "https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/", "Cloudflare Learning Center", "Guide"],
      ["TCP/IP addressing and subnetting", "https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/tcpip-addressing-and-subnetting", "Microsoft Learn", "Guide"],
      ["Beej's Guide to Network Programming", "https://beej.us/guide/bgnet/", "Brian Hall", "Book"],
    ],
    projects: [
      ["Subnet plan", "Beginner", 3, "Design an IP plan for an office with three departments and a guest network using CIDR blocks, and justify each size."],
      ["Connectivity troubleshooting lab", "Intermediate", 4, "Set up two VMs or containers, break connectivity with firewall and DNS mistakes, then diagnose each with standard tools."],
    ],
    quiz: [
      ["How many usable host addresses are in a /24 IPv4 subnet?", ["256", "254", "128", "24"], 1, "256 addresses minus the network and broadcast addresses."],
      ["Which protocol guarantees ordered, reliable delivery?", ["UDP", "TCP", "ICMP", "ARP"], 1, "TCP retransmits lost packets and keeps them in order. UDP doesn't."],
      ["Which tool shows the path packets take to a destination?", ["dig", "traceroute", "curl", "chmod"], 1, "traceroute lists each hop along the route."],
    ],
  },

  bash: {
    overview:
      "Bash scripts automate the repetitive work of running systems: deploys, backups, checks and glue between tools. Reliable, readable scripts save DevOps and cloud engineers hours every week.",
    topics: [
      ["Script basics", "Shebangs, variables, quoting and arguments"],
      ["Control flow", "if, case, loops and exit codes"],
      ["Functions and structure", "Reusable functions and readable scripts"],
      ["Text processing", "grep, sed, awk and pipelines"],
      ["Writing safe scripts", "set -euo pipefail, quoting variables and ShellCheck"],
      ["Scheduling", "cron and systemd timers"],
    ],
    resources: [
      ["Bash Reference Manual", "https://www.gnu.org/software/bash/manual/bash.html", "GNU Project", "Reference"],
      ["BashGuide", "https://mywiki.wooledge.org/BashGuide", "Greg's Wiki", "Guide"],
      ["ShellCheck", "https://www.shellcheck.net/", "ShellCheck", "Interactive"],
    ],
    projects: [
      ["Backup script", "Beginner", 3, "Write a script that archives a directory, keeps the last seven backups, logs results and exits non-zero on failure."],
      ["Health check runner", "Intermediate", 4, "Script checks for disk space, a service status and an HTTP endpoint, scheduled with cron, and alerting on failure."],
    ],
    quiz: [
      ["What does set -e do in a Bash script?", ["Enables echo", "Exits the script when a command fails", "Sets environment variables", "Enables debugging only"], 1, "It stops scripts from carrying on after an error."],
      ["Why quote variables like \"$file\"?", ["Style only", "To prevent word splitting and glob expansion on spaces or special characters", "It's faster", "Bash requires it"], 1, "Unquoted variables break on file names with spaces."],
      ["What does an exit code of 0 mean?", ["Failure", "Success", "Timeout", "Warning"], 1, "Non-zero exit codes signal errors to calling programs."],
    ],
  },

  "release-strategies": {
    overview:
      "How you release matters as much as what you release. Rolling, blue-green and canary deployments, plus feature flags, let teams ship often while limiting the impact of a bad change.",
    topics: [
      ["Rolling updates", "Replacing instances gradually"],
      ["Blue-green deployments", "Switching traffic between two environments"],
      ["Canary releases", "Exposing a small share of traffic first and watching metrics"],
      ["Feature flags", "Separating deploy from release"],
      ["Rollbacks", "Fast, rehearsed ways to undo a bad release"],
    ],
    resources: [
      ["Blue Green Deployment", "https://martinfowler.com/bliki/BlueGreenDeployment.html", "martinfowler.com", "Guide"],
      ["Canary Release", "https://martinfowler.com/bliki/CanaryRelease.html", "martinfowler.com", "Guide"],
      ["Feature Toggles", "https://martinfowler.com/articles/feature-toggles.html", "martinfowler.com", "Guide"],
      ["Argo Rollouts", "https://argo-rollouts.readthedocs.io/en/stable/", "Argo Project", "Docs"],
    ],
    projects: [
      ["Canary on Kubernetes", "Advanced", 8, "Set up a canary rollout that shifts traffic in steps and aborts automatically if the error rate rises."],
      ["Feature flag rollout", "Intermediate", 4, "Ship a feature behind a flag, enable it for 10% of users, then roll it out fully or back with no deploy."],
    ],
    quiz: [
      ["What is a canary release?", ["Deploying at night", "Sending a small share of traffic to a new version first", "Deploying everywhere at once", "Testing only in staging"], 1, "Problems affect few users and can be caught before full rollout."],
      ["What's a key benefit of blue-green deployments?", ["Lower cost", "Instant switch-back to the previous environment", "No testing needed", "Smaller images"], 1, "The old environment stays ready until you're confident."],
      ["How do feature flags help releases?", ["They speed up builds", "They let you deploy code but turn features on and off separately", "They replace tests", "They reduce logging"], 1, "Releasing becomes a switch rather than a deploy."],
    ],
  },

  kubernetes: {
    overview:
      "Kubernetes orchestrates containers across a cluster: scheduling, scaling, networking and self-healing. It's the standard platform for running containerized workloads, and central to DevOps and cloud roles.",
    topics: [
      ["Architecture", "Control plane, nodes, kubelet and the declarative model"],
      ["Pods and Deployments", "Running and updating replicated applications"],
      ["Services and Ingress", "Stable networking and exposing apps"],
      ["Configuration", "ConfigMaps, Secrets and environment variables"],
      ["Storage", "Volumes, PersistentVolumeClaims and StatefulSets"],
      ["Operations", "Probes, resource requests and limits, autoscaling and kubectl debugging"],
    ],
    resources: [
      ["Kubernetes overview", "https://kubernetes.io/docs/concepts/overview/", "Kubernetes", "Docs"],
      ["Learn Kubernetes Basics", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "Kubernetes", "Interactive"],
      ["Deployments", "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/", "Kubernetes", "Docs"],
      ["kind (Kubernetes in Docker)", "https://kind.sigs.k8s.io/", "Kubernetes SIGs", "Docs"],
    ],
    projects: [
      ["Deploy an app to a local cluster", "Intermediate", 6, "Run a web app and database on kind with Deployments, Services, an Ingress, ConfigMaps and health probes."],
      ["Autoscaling and failure drills", "Advanced", 6, "Add resource limits and a Horizontal Pod Autoscaler, load test it, then kill pods and nodes to observe self-healing."],
    ],
    quiz: [
      ["Which object keeps a set number of pod replicas running and handles rolling updates?", ["Service", "Deployment", "ConfigMap", "Namespace"], 1, "Deployments manage ReplicaSets to keep the desired state."],
      ["What does a Service provide?", ["Storage", "A stable network endpoint for a changing set of pods", "Container images", "Logs"], 1, "Pods come and go; the Service address stays the same."],
      ["What is a readiness probe for?", ["Restarting crashed containers", "Deciding when a pod can receive traffic", "Scaling the cluster", "Pulling images"], 1, "Pods only get traffic once they report ready."],
    ],
  },

  helm: {
    overview:
      "Helm is the package manager for Kubernetes. Charts template Kubernetes manifests so the same application can be installed, configured and upgraded consistently across environments.",
    topics: [
      ["Charts, releases and repositories", "What Helm packages and how it tracks installs"],
      ["Templates and values", "Go templating and per-environment values files"],
      ["Install, upgrade and rollback", "Managing releases over time"],
      ["Chart dependencies", "Reusing community charts"],
      ["Linting and testing charts", "helm lint, template rendering and chart tests"],
    ],
    resources: [
      ["Helm documentation", "https://helm.sh/docs/", "Helm", "Docs"],
      ["Chart template guide", "https://helm.sh/docs/chart_template_guide/getting_started/", "Helm", "Guide"],
      ["Artifact Hub", "https://artifacthub.io/", "CNCF", "Reference"],
    ],
    projects: [
      ["Chart your app", "Intermediate", 5, "Write a Helm chart for one of your apps with values for dev and production, and install both on a local cluster."],
      ["Upgrade and rollback drill", "Intermediate", 3, "Release a broken chart version, detect it, and roll back with Helm, documenting the process."],
    ],
    quiz: [
      ["What is a Helm chart?", ["A monitoring dashboard", "A package of templated Kubernetes manifests", "A container image", "A cluster"], 1, "Charts bundle everything needed to deploy an app."],
      ["How do you customize a chart per environment?", ["Edit templates directly each time", "Provide different values files", "Use different clusters only", "You can't"], 1, "Values files keep templates reusable."],
      ["What does helm rollback do?", ["Deletes the cluster", "Returns a release to a previous revision", "Downgrades Helm", "Removes values"], 1, "Helm stores release history, so rollbacks are quick."],
    ],
  },

  "cloud-fundamentals": {
    overview:
      "Most infrastructure now runs on AWS, Azure or Google Cloud. DevOps engineers need the core concepts (regions, compute, storage, networking, identity and pricing) on at least one major platform.",
    topics: [
      ["Cloud models", "IaaS, PaaS, SaaS and the shared responsibility model"],
      ["Regions and availability zones", "Designing for latency and resilience"],
      ["Core services", "Compute, object storage, managed databases and networking"],
      ["Identity and access", "Users, roles and least privilege"],
      ["Pricing and cost", "How billing works and avoiding surprise bills"],
    ],
    resources: [
      ["Overview of Amazon Web Services", "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html", "AWS Whitepapers", "Guide"],
      ["Describe cloud concepts", "https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/", "Microsoft Learn", "Course"],
      ["Google Cloud overview", "https://cloud.google.com/docs/overview", "Google Cloud", "Docs"],
    ],
    projects: [
      ["Three-tier app by hand", "Intermediate", 6, "Deploy a web server, app server and managed database in a cloud account through the console, then document every resource and its cost."],
      ["Budget and alerts", "Beginner", 1, "Set up a billing budget with alerts and tag every resource so costs can be traced to projects."],
    ],
    quiz: [
      ["What is an availability zone?", ["A pricing tier", "One or more isolated data centers within a region", "A user group", "A storage class"], 1, "Spreading across zones protects against a single facility failing."],
      ["Under the shared responsibility model, who secures a VM's operating system on IaaS?", ["The cloud provider", "The customer", "Nobody", "The ISP"], 1, "Providers secure the infrastructure; customers secure what they run on it."],
      ["What's a good first step in a new cloud account?", ["Create many resources", "Set up billing alerts and avoid using the root account day to day", "Disable logging", "Make storage public"], 1, "Cost alerts and least privilege prevent the most common early mistakes."],
    ],
  },

  terraform: {
    overview:
      "Terraform defines infrastructure as code: networks, servers, databases and permissions described in files and created consistently. It makes infrastructure reviewable, repeatable and easy to recreate.",
    topics: [
      ["Infrastructure as code", "Declarative configuration and why it beats clicking in consoles"],
      ["Providers and resources", "Describing cloud resources in HCL"],
      ["The workflow", "init, plan, apply and destroy"],
      ["State", "What state is, remote backends and locking"],
      ["Modules and variables", "Reusable building blocks and environments"],
      ["Working in teams", "Code review, CI for plans and avoiding drift"],
    ],
    resources: [
      ["Terraform tutorials", "https://developer.hashicorp.com/terraform/tutorials", "HashiCorp Developer", "Course"],
      ["Terraform language documentation", "https://developer.hashicorp.com/terraform/language", "HashiCorp Developer", "Docs"],
      ["State", "https://developer.hashicorp.com/terraform/language/state", "HashiCorp Developer", "Docs"],
      ["Terraform Registry", "https://registry.terraform.io/", "HashiCorp", "Reference"],
    ],
    projects: [
      ["Network and server in code", "Intermediate", 6, "Define a VPC, subnets, security groups and a VM in Terraform with remote state, then destroy and recreate it identically."],
      ["Reusable module", "Advanced", 8, "Write a module for a standard web service and use it for dev and production with different variables, plus CI that posts the plan on pull requests."],
    ],
    quiz: [
      ["What does terraform plan do?", ["Applies changes", "Shows what would change without changing anything", "Destroys resources", "Formats files"], 1, "Review the plan before running apply."],
      ["Why store state remotely with locking?", ["It's faster", "So a team shares one state and can't run conflicting applies", "Terraform requires the cloud", "To encrypt code"], 1, "Remote, locked state prevents corruption and drift between teammates."],
      ["What is configuration drift?", ["A Terraform bug", "Real infrastructure no longer matching the code, often from manual changes", "Slow plans", "A provider update"], 1, "Making changes only through code keeps them in sync."],
    ],
  },

  ansible: {
    overview:
      "Configuration management tools like Ansible keep fleets of servers consistently configured. Playbooks describe the desired state of packages, files and services, and apply it repeatably over SSH.",
    topics: [
      ["Inventory", "Defining hosts and groups"],
      ["Playbooks and tasks", "Describing desired state in YAML"],
      ["Modules and idempotency", "Built-in modules and why tasks should be safe to re-run"],
      ["Variables, templates and roles", "Reusable, configurable automation"],
      ["Secrets", "Ansible Vault for sensitive values"],
    ],
    resources: [
      ["Getting started with Ansible", "https://docs.ansible.com/ansible/latest/getting_started/index.html", "Ansible (Red Hat)", "Docs"],
      ["Ansible on GitHub", "https://github.com/ansible/ansible", "Ansible (GitHub)", "Docs"],
      ["Ansible Galaxy", "https://galaxy.ansible.com/", "Ansible (Red Hat)", "Reference"],
    ],
    projects: [
      ["Configure a web server", "Beginner", 4, "Write a playbook that installs and configures Nginx with a templated site config on two VMs, and confirm it's idempotent."],
      ["Role-based baseline", "Intermediate", 6, "Create roles for users, SSH hardening and monitoring agents, and apply them to a small fleet with Vault-encrypted secrets."],
    ],
    quiz: [
      ["What does idempotent mean for an Ansible task?", ["It runs once only", "Running it again produces no further changes", "It's encrypted", "It runs in parallel"], 1, "Idempotent tasks make playbooks safe to re-run."],
      ["How does Ansible usually connect to Linux hosts?", ["Through an agent", "Over SSH, without an agent", "Through FTP", "Through a browser"], 1, "Being agentless keeps setup simple."],
      ["What is Ansible Vault for?", ["Storing playbooks", "Encrypting sensitive variables like passwords", "Monitoring hosts", "Backing up servers"], 1, "Secrets stay encrypted in version control."],
    ],
  },

  "metrics-dashboards": {
    overview:
      "Metrics show how systems behave over time. Prometheus and Grafana are the standard open-source tools for collecting metrics, building dashboards and alerting on problems.",
    topics: [
      ["Metric types", "Counters, gauges and histograms"],
      ["The golden signals", "Latency, traffic, errors and saturation"],
      ["Prometheus", "Scraping targets, exporters and labels"],
      ["PromQL", "Rates, aggregations and percentiles"],
      ["Grafana dashboards and alerts", "Building useful views and alerting on symptoms"],
      ["SLOs", "Service level indicators, objectives and error budgets"],
    ],
    resources: [
      ["Prometheus overview", "https://prometheus.io/docs/introduction/overview/", "Prometheus", "Docs"],
      ["Querying basics (PromQL)", "https://prometheus.io/docs/prometheus/latest/querying/basics/", "Prometheus", "Docs"],
      ["Grafana documentation", "https://grafana.com/docs/grafana/latest/", "Grafana Labs", "Docs"],
      ["Monitoring Distributed Systems", "https://sre.google/sre-book/monitoring-distributed-systems/", "Google SRE Book", "Book"],
    ],
    projects: [
      ["Monitor a service", "Intermediate", 5, "Run Prometheus and Grafana with Docker Compose, instrument an app and build a golden-signals dashboard."],
      ["SLO and burn-rate alert", "Advanced", 5, "Define an availability SLO for a service and write a multi-window burn-rate alert for it."],
    ],
    quiz: [
      ["Which metric type only ever increases (until reset)?", ["Gauge", "Counter", "Histogram", "Summary"], 1, "Counters track totals; use rate() to turn them into per-second values."],
      ["What are the four golden signals?", ["CPU, memory, disk, network", "Latency, traffic, errors, saturation", "Logs, metrics, traces, events", "Uptime, cost, users, revenue"], 1, "They summarize user-facing health for most services."],
      ["What is an error budget?", ["Money set aside for outages", "The amount of unreliability an SLO allows", "A count of bugs", "A logging limit"], 1, "When the budget runs out, reliability work takes priority."],
    ],
  },

  "logging-tracing": {
    overview:
      "When something fails across many services, logs and traces tell you what happened and where. Centralised logging and distributed tracing are essential for running microservices.",
    topics: [
      ["Centralised logging", "Shipping logs from containers to one searchable place"],
      ["Structured logs and correlation IDs", "Making logs filterable and linkable across services"],
      ["Distributed tracing", "Spans, traces and context propagation"],
      ["OpenTelemetry", "Vendor-neutral instrumentation and collectors"],
      ["Tools", "Loki, Elasticsearch, Jaeger and managed cloud options"],
    ],
    resources: [
      ["Traces", "https://opentelemetry.io/docs/concepts/signals/traces/", "OpenTelemetry (CNCF)", "Docs"],
      ["Grafana Loki documentation", "https://grafana.com/docs/loki/latest/", "Grafana Labs", "Docs"],
      ["Jaeger documentation", "https://www.jaegertracing.io/docs/latest/", "Jaeger (CNCF)", "Docs"],
    ],
    projects: [
      ["Centralised logs", "Intermediate", 5, "Ship logs from several containers to Loki or Elasticsearch and build saved searches for errors by service."],
      ["Trace a request", "Advanced", 6, "Instrument two services with OpenTelemetry and follow one request end to end in Jaeger, finding the slow span."],
    ],
    quiz: [
      ["What is a span in distributed tracing?", ["A log file", "One timed operation within a trace", "A metric", "A server"], 1, "A trace is a tree of spans showing where time went."],
      ["Why add a correlation ID to logs?", ["To compress logs", "To link all log lines for one request across services", "For security", "To reduce volume"], 1, "One ID lets you follow a request everywhere it went."],
      ["What does OpenTelemetry provide?", ["A database", "Vendor-neutral APIs and SDKs for traces, metrics and logs", "A dashboard only", "A cloud provider"], 1, "Instrument once, then send data to any compatible backend."],
    ],
  },

  "incident-management": {
    overview:
      "Things will break. Incident management covers on-call, clear roles during an outage, communication, and blameless postmortems that stop the same failure happening twice.",
    topics: [
      ["On-call", "Rotas, alert quality and sustainable practices"],
      ["Incident roles", "Incident commander, communications and operations"],
      ["Runbooks", "Documented steps for known problems"],
      ["Communication", "Status updates for stakeholders and users"],
      ["Blameless postmortems", "Finding contributing factors and following through on actions"],
    ],
    resources: [
      ["Managing Incidents", "https://sre.google/sre-book/managing-incidents/", "Google SRE Book", "Book"],
      ["Postmortem Culture", "https://sre.google/sre-book/postmortem-culture/", "Google SRE Book", "Book"],
      ["PagerDuty Incident Response", "https://response.pagerduty.com/", "PagerDuty", "Guide"],
    ],
    projects: [
      ["Runbook set", "Beginner", 3, "Write runbooks for the three most likely failures of one of your services, then test them with a teammate."],
      ["Game day and postmortem", "Intermediate", 5, "Run a simulated outage, play the incident roles and write a blameless postmortem with actionable follow-ups."],
    ],
    quiz: [
      ["What does 'blameless' mean in a postmortem?", ["Nobody is responsible", "Focusing on systems and processes rather than blaming individuals", "Skipping the review", "Hiding the incident"], 1, "People share details honestly when they aren't punished for them."],
      ["What does the incident commander do?", ["Fixes every bug personally", "Coordinates the response and decisions", "Writes the code", "Talks only to customers"], 1, "Clear coordination prevents chaos during an outage."],
      ["What makes an alert worth paging someone for?", ["Any warning", "It needs urgent human action and affects users", "CPU above 50%", "A log line"], 1, "Noisy alerts cause fatigue and missed real incidents."],
    ],
  },

  "secrets-management": {
    overview:
      "Leaked credentials are one of the most common causes of breaches. Secrets management keeps passwords, keys and tokens out of code and logs, tightly scoped, and easy to rotate.",
    topics: [
      ["What counts as a secret", "API keys, database passwords, certificates and tokens"],
      ["Secret stores", "HashiCorp Vault and cloud secret managers"],
      ["Secrets in CI/CD and Kubernetes", "Pipeline secrets, Kubernetes Secrets and external secret operators"],
      ["Rotation and short-lived credentials", "Reducing the value of a leaked secret"],
      ["Detecting leaks", "Secret scanning and responding to exposures"],
    ],
    resources: [
      ["Secrets Management Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html", "OWASP", "Guide"],
      ["Vault documentation", "https://developer.hashicorp.com/vault/docs", "HashiCorp Developer", "Docs"],
      ["Using secrets in GitHub Actions", "https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions", "GitHub Docs", "Docs"],
      ["Kubernetes Secrets", "https://kubernetes.io/docs/concepts/configuration/secret/", "Kubernetes", "Docs"],
    ],
    projects: [
      ["Move secrets out of code", "Beginner", 3, "Find hard-coded secrets in a project, move them to a secret manager or CI secrets, and rotate the exposed ones."],
      ["Dynamic database credentials", "Advanced", 6, "Use Vault to issue short-lived database credentials to an app, and show they expire automatically."],
    ],
    quiz: [
      ["A secret was accidentally pushed to a public repository. What should happen first?", ["Delete the commit only", "Revoke and rotate the secret immediately", "Make the repo private", "Ignore it if nobody noticed"], 1, "Assume it's already been copied. History rewrites don't un-leak it."],
      ["Are Kubernetes Secrets encrypted by default?", ["Yes, always", "They're base64-encoded; encryption at rest must be configured", "Only in Helm", "Only on AWS"], 1, "Base64 isn't encryption. Enable encryption at rest and restrict access."],
      ["Why prefer short-lived credentials?", ["They're faster", "A leaked credential becomes useless quickly", "They're easier to type", "They avoid logging"], 1, "Short lifetimes limit the window for misuse."],
    ],
  },

  devsecops: {
    overview:
      "DevSecOps builds security into the delivery pipeline instead of bolting it on at the end. Automated scanning, least privilege and supply-chain protections catch problems while they're cheap to fix.",
    topics: [
      ["Shifting security left", "Finding issues during development and CI"],
      ["Dependency and image scanning", "Known vulnerabilities in packages and containers"],
      ["Static analysis and secret scanning", "Catching risky code and leaked keys automatically"],
      ["Least privilege in pipelines", "Scoped tokens and protected environments"],
      ["Supply-chain security", "Signed artifacts, provenance and SLSA levels"],
    ],
    resources: [
      ["CI/CD Security Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html", "OWASP", "Guide"],
      ["SLSA", "https://slsa.dev/", "OpenSSF", "Reference"],
      ["Dependabot", "https://docs.github.com/en/code-security/dependabot", "GitHub Docs", "Docs"],
      ["Trivy documentation", "https://trivy.dev/docs/latest/guide/", "Aqua Security", "Docs"],
    ],
    projects: [
      ["Secure pipeline", "Intermediate", 6, "Add dependency scanning, container scanning, secret scanning and a policy that blocks critical vulnerabilities to a CI pipeline."],
      ["Least-privilege audit", "Intermediate", 4, "Audit the permissions of your CI tokens and cloud roles, reduce each to the minimum, and document the changes."],
    ],
    quiz: [
      ["What does 'shift left' mean in DevSecOps?", ["Moving servers", "Finding security issues earlier in the development process", "Deploying on Mondays", "Reducing logging"], 1, "Earlier fixes are cheaper and less disruptive."],
      ["What does container image scanning look for?", ["Slow code", "Known vulnerabilities in OS packages and libraries", "Formatting issues", "Large images only"], 1, "Scanners match package versions against vulnerability databases."],
      ["Why limit CI token permissions?", ["To speed up builds", "A compromised pipeline can then do less damage", "Tokens expire otherwise", "GitHub requires it"], 1, "Least privilege applies to automation as much as people."],
    ],
  },
};
