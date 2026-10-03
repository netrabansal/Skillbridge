import type { RawLessons } from "./types";

export const cloudLessons: RawLessons = {
  "cloud-networking": {
    overview:
      "Virtual networks are the foundation of every cloud environment. Designing VPCs, subnets, route tables and security groups correctly decides what can talk to what, and what's exposed to the internet.",
    topics: [
      ["VPCs and CIDR planning", "Choosing address ranges that won't clash later"],
      ["Public and private subnets", "Internet gateways, NAT gateways and route tables"],
      ["Security groups and network ACLs", "Stateful and stateless filtering"],
      ["Connecting services privately", "Private endpoints and keeping traffic off the internet"],
      ["Multi-AZ layouts", "Spreading subnets across availability zones"],
    ],
    resources: [
      ["What is Amazon VPC?", "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html", "AWS Docs", "Docs"],
      ["Azure Virtual Network overview", "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview", "Microsoft Learn", "Docs"],
      ["VPC networks overview", "https://cloud.google.com/vpc/docs/overview", "Google Cloud", "Docs"],
      ["Security groups", "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html", "AWS Docs", "Docs"],
    ],
    projects: [
      ["Three-tier network", "Intermediate", 5, "Build a VPC with public, private and database subnets across two zones, where only the load balancer is internet-facing."],
      ["Network diagram and review", "Beginner", 2, "Diagram an existing cloud network and list every path from the internet to a database, closing any that shouldn't exist."],
    ],
    quiz: [
      ["What makes a subnet 'public' in AWS?", ["More IP addresses", "A route to an internet gateway", "A different region", "IPv6 only"], 1, "Subnets are public when their route table sends 0.0.0.0/0 to an internet gateway."],
      ["How do instances in a private subnet usually reach the internet for updates?", ["They can't", "Through a NAT gateway", "Through the load balancer", "By having public IPs"], 1, "NAT allows outbound traffic without exposing instances inbound."],
      ["Security groups are…", ["Stateless", "Stateful: return traffic is allowed automatically", "Only for databases", "Applied to whole regions"], 1, "Network ACLs are the stateless option."],
    ],
  },

  "dns-load-balancing": {
    overview:
      "DNS routes users to your services and load balancers spread traffic across healthy instances. Together with TLS certificates, they're how cloud applications stay reachable, secure and resilient.",
    topics: [
      ["DNS records", "A, AAAA, CNAME, alias records and TTLs"],
      ["Managed DNS", "Hosted zones and routing policies"],
      ["Load balancer types", "Application (layer 7) versus network (layer 4) load balancers"],
      ["Health checks", "Removing unhealthy targets automatically"],
      ["TLS certificates", "Issuing, attaching and renewing certificates"],
    ],
    resources: [
      ["What is Amazon Route 53?", "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html", "AWS Docs", "Docs"],
      ["What is Elastic Load Balancing?", "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html", "AWS Docs", "Docs"],
      ["What is load balancing?", "https://www.cloudflare.com/learning/performance/what-is-load-balancing/", "Cloudflare Learning Center", "Guide"],
      ["How It Works", "https://letsencrypt.org/how-it-works/", "Let's Encrypt", "Guide"],
    ],
    projects: [
      ["Load-balanced web tier", "Intermediate", 4, "Put two instances behind an application load balancer with health checks and HTTPS, then stop one and confirm traffic keeps flowing."],
      ["DNS failover", "Intermediate", 3, "Configure DNS health checks to fail over from a primary endpoint to a static maintenance page."],
    ],
    quiz: [
      ["Which load balancer type can route by URL path?", ["Network (layer 4)", "Application (layer 7)", "Neither", "DNS only"], 1, "Layer 7 balancers understand HTTP, so they can route on paths and headers."],
      ["What does a DNS TTL control?", ["Encryption strength", "How long resolvers cache a record", "Load balancer timeout", "Server uptime"], 1, "Lower TTLs mean changes take effect sooner, at the cost of more lookups."],
      ["Why do load balancers run health checks?", ["For billing", "To stop sending traffic to unhealthy instances", "To renew certificates", "To scale databases"], 1, "Unhealthy targets are removed until they recover."],
    ],
  },

  "hybrid-connectivity": {
    overview:
      "Many organizations connect cloud networks to offices, data centers and other clouds. VPNs, peering and private links let traffic flow securely without crossing the public internet.",
    topics: [
      ["Site-to-site VPNs", "Encrypted tunnels between networks"],
      ["Peering", "Connecting VPCs directly and its limits"],
      ["Transit hubs", "Transit gateways or hub-and-spoke designs"],
      ["Dedicated connections", "Direct Connect and ExpressRoute for consistent bandwidth"],
      ["Private service access", "PrivateLink and private endpoints"],
    ],
    resources: [
      ["What is AWS Site-to-Site VPN?", "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html", "AWS Docs", "Docs"],
      ["What is VPC peering?", "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html", "AWS Docs", "Docs"],
      ["About VPN Gateway", "https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways", "Microsoft Learn", "Docs"],
      ["What is AWS PrivateLink?", "https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html", "AWS Docs", "Docs"],
    ],
    projects: [
      ["Peer two VPCs", "Intermediate", 3, "Peer two VPCs with non-overlapping ranges, update route tables and security groups, and test private connectivity."],
      ["Hybrid design document", "Intermediate", 3, "Design connectivity for a company with two offices and two cloud regions, comparing VPN and dedicated links on cost and reliability."],
    ],
    quiz: [
      ["Why must peered VPCs have non-overlapping CIDR ranges?", ["Billing", "Routing can't distinguish overlapping addresses", "For DNS", "It's not required"], 1, "Plan address space early to avoid painful re-addressing."],
      ["What does a site-to-site VPN provide?", ["Faster internet", "An encrypted tunnel between two networks over the internet", "A private physical cable", "Load balancing"], 1, "Dedicated connections provide private physical links instead."],
      ["Is VPC peering transitive?", ["Yes", "No: A↔B and B↔C doesn't connect A and C", "Only in Azure", "Only with NAT"], 1, "That's why transit hubs exist for larger networks."],
    ],
  },

  "cloud-compute": {
    overview:
      "Compute is where applications run: virtual machines, containers and serverless functions. Choosing the right model, and scaling it automatically, balances performance, operations effort and cost.",
    topics: [
      ["Virtual machines", "Instance types, images and connecting securely"],
      ["Autoscaling", "Scaling groups, policies and launch templates"],
      ["Containers in the cloud", "Managed container services such as ECS and Cloud Run"],
      ["Serverless functions", "Event-driven compute with Lambda or Azure Functions"],
      ["Choosing a model", "Control versus convenience, and cost profiles"],
    ],
    resources: [
      ["Amazon EC2 Auto Scaling", "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html", "AWS Docs", "Docs"],
      ["What is AWS Lambda?", "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html", "AWS Docs", "Docs"],
      ["Virtual machines in Azure", "https://learn.microsoft.com/en-us/azure/virtual-machines/overview", "Microsoft Learn", "Docs"],
      ["What is Cloud Run?", "https://cloud.google.com/run/docs/overview/what-is-cloud-run", "Google Cloud", "Docs"],
    ],
    projects: [
      ["Autoscaling web app", "Intermediate", 5, "Run a web app in an autoscaling group behind a load balancer and scale it out with a load test."],
      ["Serverless API", "Intermediate", 5, "Build a small API with serverless functions and a managed database, and compare its cost to an always-on VM."],
    ],
    quiz: [
      ["When is serverless compute a good fit?", ["Long-running, steady CPU-heavy jobs", "Spiky or event-driven workloads", "Workloads needing custom kernels", "Always"], 1, "You pay per execution and scale to zero when idle."],
      ["What does an autoscaling group do?", ["Backs up data", "Adds or removes instances based on demand or health", "Encrypts disks", "Routes DNS"], 1, "It keeps capacity matched to load and replaces failed instances."],
      ["Why use machine images (AMIs or images) for instances?", ["They're cheaper", "To launch identical, preconfigured servers quickly", "They're required for SSH", "To encrypt traffic"], 1, "Images make scaling and recovery consistent."],
    ],
  },

  "cloud-storage": {
    overview:
      "Cloud storage holds everything from user uploads to backups and data lakes. Knowing object, block and file storage, plus storage classes and access controls, is fundamental to cloud engineering.",
    topics: [
      ["Object storage", "Buckets, objects, keys and durability"],
      ["Block and file storage", "Volumes attached to VMs and shared file systems"],
      ["Storage classes and lifecycle", "Moving data to cheaper tiers automatically"],
      ["Access control", "Bucket policies, blocking public access and presigned URLs"],
      ["Protection", "Versioning, replication and backups"],
    ],
    resources: [
      ["What is Amazon S3?", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html", "AWS Docs", "Docs"],
      ["Introduction to Azure Storage", "https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction", "Microsoft Learn", "Docs"],
      ["Cloud Storage product overview", "https://cloud.google.com/storage/docs/introduction", "Google Cloud", "Docs"],
    ],
    projects: [
      ["Secure upload flow", "Intermediate", 4, "Let users upload files directly to a private bucket with presigned URLs, with lifecycle rules moving old files to cheaper storage."],
      ["Bucket security review", "Beginner", 2, "Audit buckets for public access, enable versioning and default encryption, and document the settings."],
    ],
    quiz: [
      ["Which storage suits millions of user-uploaded images?", ["Block storage on one VM", "Object storage like S3, Blob or Cloud Storage", "A VM's local disk", "A database column"], 1, "Object storage scales almost without limit and serves files over HTTP."],
      ["What do presigned URLs allow?", ["Permanent public access", "Temporary access to a specific object without exposing credentials", "Faster uploads only", "Bucket deletion"], 1, "They expire, so access is limited in time and scope."],
      ["Why enable object versioning?", ["To save money", "To recover from accidental overwrites or deletions", "To speed up reads", "It's required"], 1, "Previous versions can be restored."],
    ],
  },

  "managed-databases": {
    overview:
      "Managed database services handle patching, backups and failover so teams can focus on their data. Cloud engineers provision, secure, scale and recover these databases.",
    topics: [
      ["Managed relational databases", "RDS, Cloud SQL and Azure SQL"],
      ["High availability", "Multi-AZ deployments and automatic failover"],
      ["Backups and recovery", "Automated backups, snapshots and point-in-time recovery"],
      ["Scaling", "Read replicas, instance sizing and connection pooling"],
      ["Managed NoSQL", "DynamoDB, Cosmos DB and Firestore use cases"],
    ],
    resources: [
      ["What is Amazon RDS?", "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html", "AWS Docs", "Docs"],
      ["Cloud SQL overview", "https://cloud.google.com/sql/docs/introduction", "Google Cloud", "Docs"],
      ["What is Amazon DynamoDB?", "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html", "AWS Docs", "Docs"],
    ],
    projects: [
      ["Highly available database", "Intermediate", 4, "Provision a multi-AZ managed Postgres in a private subnet, connect an app, and trigger a failover to observe the recovery time."],
      ["Restore drill", "Intermediate", 3, "Restore a database to a point in time into a new instance and verify the data, timing each step."],
    ],
    quiz: [
      ["What does a multi-AZ database deployment provide?", ["More read capacity", "A standby in another zone for automatic failover", "Lower cost", "Encryption"], 1, "Read replicas are for scaling reads; standbys are for availability."],
      ["What is point-in-time recovery?", ["Recovering a deleted user", "Restoring a database to any moment within the retention window", "A query cache", "A replica"], 1, "It's built from backups plus transaction logs."],
      ["Where should a production database usually live?", ["A public subnet", "A private subnet reachable only from the app tier", "Anywhere", "On a developer laptop"], 1, "Databases shouldn't be directly reachable from the internet."],
    ],
  },

  iam: {
    overview:
      "Identity and access management controls who and what can do things: people, services and machines. Most cloud breaches involve identity, so least privilege, MFA and access reviews are core skills.",
    topics: [
      ["Identities", "Users, groups, roles and service accounts"],
      ["Policies and least privilege", "Granting only the permissions needed"],
      ["MFA and SSO", "Stronger authentication and central identity providers"],
      ["Roles for workloads", "Temporary credentials for applications instead of keys"],
      ["Access reviews and auditing", "Finding unused permissions and logging access"],
    ],
    resources: [
      ["What is IAM?", "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html", "AWS Docs", "Docs"],
      ["Security best practices in IAM", "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html", "AWS Docs", "Guide"],
      ["IAM overview", "https://cloud.google.com/iam/docs/overview", "Google Cloud", "Docs"],
      ["What is Microsoft Entra ID?", "https://learn.microsoft.com/en-us/entra/fundamentals/whatis", "Microsoft Learn", "Docs"],
    ],
    projects: [
      ["Least-privilege policy", "Intermediate", 4, "Write a policy that lets an app read one bucket prefix and nothing else, then test that other actions are denied."],
      ["Access review", "Beginner", 3, "Review an account's users and roles, enforce MFA, remove unused access and document the findings."],
    ],
    quiz: [
      ["How should an app on a cloud VM access storage?", ["Hard-coded admin keys", "An attached role with only the permissions it needs", "A public bucket", "Root credentials"], 1, "Roles provide short-lived, automatically rotated credentials."],
      ["What does least privilege mean?", ["Everyone gets admin", "Granting only the access needed for the task", "No access for anyone", "Sharing accounts"], 1, "It limits the damage a compromised identity can do."],
      ["Why enforce MFA?", ["It's faster", "A stolen password alone is no longer enough to sign in", "It replaces passwords entirely", "For billing"], 1, "MFA blocks most credential-stuffing and phishing takeovers."],
    ],
  },

  "encryption-kms": {
    overview:
      "Encryption protects data at rest and in transit, and key management services control who can use the keys. Cloud engineers configure encryption by default and manage keys safely.",
    topics: [
      ["At rest and in transit", "Disk, database and storage encryption, and TLS"],
      ["Key management services", "KMS, Key Vault and Cloud KMS"],
      ["Envelope encryption", "Data keys wrapped by master keys"],
      ["Key policies and rotation", "Controlling key use and rotating keys"],
      ["Secrets versus keys", "When to use a secrets manager instead"],
    ],
    resources: [
      ["AWS KMS concepts", "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html", "AWS Docs", "Docs"],
      ["Azure Key Vault overview", "https://learn.microsoft.com/en-us/azure/key-vault/general/overview", "Microsoft Learn", "Docs"],
      ["Cryptographic Storage Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html", "OWASP", "Guide"],
    ],
    projects: [
      ["Encrypt everything by default", "Intermediate", 3, "Enable default encryption with a customer-managed key for storage and databases, restricting key use to specific roles."],
      ["Envelope encryption demo", "Intermediate", 4, "Encrypt files in an app using envelope encryption with a KMS data key, and show that revoking key access blocks decryption."],
    ],
    quiz: [
      ["What is envelope encryption?", ["Encrypting emails", "Encrypting data with a data key, then encrypting that key with a master key", "Double TLS", "Hashing passwords"], 1, "Master keys never leave the KMS; only data keys are used locally."],
      ["What protects data in transit?", ["Disk encryption", "TLS", "Backups", "IAM"], 1, "TLS encrypts data moving over networks."],
      ["Why restrict who can use a KMS key?", ["Cost", "Access to the key effectively means access to the data", "It's slower otherwise", "Regulation only"], 1, "Key policies are part of access control."],
    ],
  },

  "cloud-security": {
    overview:
      "Cloud security posture means configuring cloud accounts safely and continuously checking them. Most cloud incidents come from misconfiguration, such as public storage, open ports or overly broad permissions.",
    topics: [
      ["Shared responsibility", "What the provider secures versus what you must"],
      ["Common misconfigurations", "Public buckets, open security groups and unused admin access"],
      ["Logging and detection", "Audit logs such as CloudTrail and threat detection services"],
      ["Guardrails", "Organization policies and preventive controls"],
      ["Posture management", "Benchmarks and continuous compliance checks"],
    ],
    resources: [
      ["Security pillar: AWS Well-Architected", "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html", "AWS Docs", "Guide"],
      ["What is Microsoft Defender for Cloud?", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction", "Microsoft Learn", "Docs"],
      ["Security best practices in IAM", "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html", "AWS Docs", "Guide"],
    ],
    projects: [
      ["Posture assessment", "Intermediate", 4, "Run a cloud security posture tool against a test account, triage the findings and fix the five most serious."],
      ["Preventive guardrails", "Advanced", 5, "Add organization-level policies that block public buckets and restrict regions, then prove they work."],
    ],
    quiz: [
      ["What causes most cloud security incidents?", ["Provider data center failures", "Customer misconfigurations", "Hardware theft", "Solar flares"], 1, "Public storage, open ports and broad permissions are the usual culprits."],
      ["What does an audit log like CloudTrail record?", ["Application errors", "API calls and changes made in the account", "Website traffic", "Billing only"], 1, "It shows who did what, and when."],
      ["What is a preventive guardrail?", ["An alert after the fact", "A policy that blocks risky actions before they happen", "A backup", "A firewall log"], 1, "Prevention stops misconfigurations instead of just reporting them."],
    ],
  },

  "high-availability": {
    overview:
      "High availability and disaster recovery keep services running through failures, from a crashed instance to a lost region. Cloud engineers design for failure and test recovery regularly.",
    topics: [
      ["Designing for failure", "Redundancy, no single points of failure and graceful degradation"],
      ["Multi-AZ architectures", "Spreading every tier across zones"],
      ["RTO and RPO", "How fast you must recover and how much data you can lose"],
      ["Backup and DR strategies", "Backup and restore, pilot light, warm standby and multi-region active"],
      ["Testing recovery", "Game days and restore drills"],
    ],
    resources: [
      ["Reliability pillar: AWS Well-Architected", "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html", "AWS Docs", "Guide"],
      ["Disaster recovery of workloads on AWS", "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html", "AWS Whitepapers", "Guide"],
      ["Azure reliability documentation", "https://learn.microsoft.com/en-us/azure/reliability/overview", "Microsoft Learn", "Docs"],
    ],
    projects: [
      ["Failure drill", "Intermediate", 4, "Terminate instances and a database primary in a multi-AZ setup, measure recovery and document what users would have seen."],
      ["DR plan", "Intermediate", 4, "Write a disaster recovery plan with RTO and RPO targets for a sample app and choose a DR strategy that meets them."],
    ],
    quiz: [
      ["What does RPO measure?", ["Recovery cost", "How much data loss is acceptable, measured in time", "Uptime percentage", "Number of replicas"], 1, "An RPO of one hour means losing up to an hour of data is acceptable."],
      ["Running instances across availability zones protects against…", ["Bugs in your code", "Failure of a single data center", "High costs", "Slow DNS"], 1, "Zones are isolated facilities within a region."],
      ["Why test backups by restoring them?", ["To use storage", "Untested backups often fail when you need them", "It's required by law", "To speed up backups"], 1, "A backup is only proven by a successful restore."],
    ],
  },

  "cloud-cost": {
    overview:
      "Cloud bills grow fast without attention. Cost optimization, right-sizing, pricing models and visibility, is an expected part of cloud engineering, and often the easiest place to show business impact.",
    topics: [
      ["Understanding the bill", "What drives cost: compute, storage, data transfer"],
      ["Tagging and visibility", "Attributing costs to teams and projects"],
      ["Right-sizing and scheduling", "Matching resources to use and turning off idle ones"],
      ["Pricing models", "On-demand, reserved, savings plans and spot"],
      ["FinOps culture", "Budgets, alerts and shared ownership of cost"],
    ],
    resources: [
      ["Cost optimization pillar: AWS Well-Architected", "https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html", "AWS Docs", "Guide"],
      ["What is FinOps?", "https://www.finops.org/introduction/what-is-finops/", "FinOps Foundation", "Guide"],
      ["Cost Management overview", "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/overview-cost-management", "Microsoft Learn", "Docs"],
    ],
    projects: [
      ["Cost review", "Beginner", 3, "Analyze a month of cloud spend, tag resources by project and identify three savings with estimated amounts."],
      ["Automated shutdown", "Intermediate", 3, "Schedule non-production resources to stop outside working hours and report the monthly saving."],
    ],
    quiz: [
      ["What's often an overlooked cloud cost?", ["Console access", "Data transfer between regions or out to the internet", "IAM users", "DNS records"], 1, "Egress charges can be significant."],
      ["When do spot instances make sense?", ["Critical single databases", "Fault-tolerant, interruptible workloads like batch jobs", "Always", "Never"], 1, "They're much cheaper but can be reclaimed."],
      ["Why tag cloud resources?", ["Required to launch them", "To attribute costs and ownership", "To speed them up", "For encryption"], 1, "Tags make cost reports and clean-ups possible."],
    ],
  },

  "cloud-certification": {
    overview:
      "An associate-level certification such as AWS Solutions Architect Associate, Azure Administrator or Google Associate Cloud Engineer is a recognized signal for entry-level cloud roles, especially alongside hands-on projects.",
    topics: [
      ["Choosing a certification", "Matching the provider to the jobs you're targeting"],
      ["Exam domains", "Reading the official exam guide and mapping gaps"],
      ["Hands-on practice", "Labs and building real things, not just memorizing"],
      ["Practice exams", "Finding weak areas and reviewing explanations"],
      ["Exam logistics", "Booking, timing strategy and recertification"],
    ],
    resources: [
      ["AWS Certified Solutions Architect – Associate", "https://aws.amazon.com/certification/certified-solutions-architect-associate/", "AWS", "Reference"],
      ["Microsoft Certified: Azure Administrator Associate", "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/", "Microsoft Learn", "Reference"],
      ["Associate Cloud Engineer", "https://cloud.google.com/learn/certification/cloud-engineer", "Google Cloud", "Reference"],
    ],
    projects: [
      ["Exam study plan", "Beginner", 2, "Map the official exam guide's domains to your skills, mark gaps and plan weekly study and labs."],
      ["Certification capstone", "Intermediate", 12, "Build a project that covers the major exam domains (networking, compute, storage, IAM, monitoring) and document it."],
    ],
    quiz: [
      ["What should guide your choice of first cloud certification?", ["Whichever is shortest", "The provider most used in jobs you're targeting", "The most expensive", "The newest"], 1, "Certifications are most valuable when they match local demand."],
      ["What's the best starting document for exam preparation?", ["Forum posts", "The official exam guide and its domains", "Random practice questions", "A vendor's marketing page"], 1, "It lists exactly what's assessed."],
      ["Why combine certification with projects?", ["Projects are required", "Hands-on work proves you can apply the knowledge", "Exams are easy", "To delay the exam"], 1, "Employers value demonstrated skills alongside credentials."],
    ],
  },
};
