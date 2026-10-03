import type { RawLessons } from "./types";

export const securityLessons: RawLessons = {
  "network-protocols": {
    overview:
      "Security analysts read network activity every day. Knowing how DNS, HTTP, TLS and DHCP normally behave is what lets you recognize when traffic is suspicious.",
    topics: [
      ["DNS", "Queries, record types, and abuse such as tunnelling and malicious domains"],
      ["HTTP and HTTPS", "Requests, headers, status codes and what TLS hides"],
      ["TLS", "The handshake, certificates and certificate validation"],
      ["DHCP and ARP", "Address assignment, and spoofing risks"],
      ["Email protocols", "SMTP, SPF, DKIM and DMARC for spotting spoofed mail"],
    ],
    resources: [
      ["What is DNS?", "https://www.cloudflare.com/learning/dns/what-is-dns/", "Cloudflare Learning Center", "Guide"],
      ["What happens in a TLS handshake?", "https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/", "Cloudflare Learning Center", "Guide"],
      ["An overview of HTTP", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", "MDN Web Docs", "Guide"],
      ["What are DMARC, DKIM, and SPF?", "https://www.cloudflare.com/learning/email-security/dmarc-dkim-spf/", "Cloudflare Learning Center", "Guide"],
    ],
    projects: [
      ["Protocol field notes", "Beginner", 3, "Capture your own DNS, HTTP and TLS traffic and annotate a normal example of each, noting the fields an analyst would check."],
      ["Email header analysis", "Intermediate", 3, "Analyze the headers of a phishing sample and a legitimate email, explaining SPF, DKIM and DMARC results for each."],
    ],
    quiz: [
      ["Which port does HTTPS use by default?", ["21", "22", "80", "443"], 3, "HTTPS uses 443. Port 80 is plain HTTP, 22 is SSH and 21 is FTP."],
      ["What does DMARC help prevent?", ["SQL injection", "Email spoofing of your domain", "DDoS attacks", "Weak passwords"], 1, "It tells receivers how to handle mail that fails SPF or DKIM checks."],
      ["Why might unusually long, random-looking DNS queries be suspicious?", ["They're always errors", "They can indicate DNS tunnelling or malware beaconing", "They're faster", "They use IPv6"], 1, "Attackers sometimes encode data in DNS requests to bypass controls."],
    ],
  },

  "traffic-analysis": {
    overview:
      "Packet captures show exactly what happened on a network. Analysts use Wireshark and tcpdump to investigate alerts, confirm infections and trace attacker activity.",
    topics: [
      ["Capturing traffic", "tcpdump, capture filters and where to capture"],
      ["Wireshark basics", "Display filters, following streams and protocol hierarchy"],
      ["Spotting anomalies", "Scans, beaconing, unusual ports and large transfers"],
      ["Extracting artifacts", "Exporting files and identifying indicators of compromise"],
      ["Writing findings", "Turning a capture into a clear timeline"],
    ],
    resources: [
      ["Wireshark User's Guide", "https://www.wireshark.org/docs/wsug_html_chunked/", "Wireshark", "Docs"],
      ["tcpdump manual", "https://www.tcpdump.org/manpages/tcpdump.1.html", "tcpdump", "Reference"],
      ["Malware-Traffic-Analysis.net", "https://www.malware-traffic-analysis.net/", "Brad Duncan", "Interactive"],
    ],
    projects: [
      ["PCAP investigation", "Intermediate", 4, "Work through a published malware traffic exercise and write a short report with the infected host, indicators and timeline."],
      ["Detect a port scan", "Beginner", 2, "Run a scan against your own lab VM, capture it and write a Wireshark filter that highlights it."],
    ],
    quiz: [
      ["Which Wireshark feature reconstructs a full conversation?", ["Statistics → Endpoints", "Follow TCP Stream", "Coloring rules", "Expert info"], 1, "It shows the reassembled data exchanged in one session."],
      ["Regular, small connections to the same external host every 60 seconds might indicate…", ["Normal browsing", "Malware beaconing to command and control", "A slow network", "DNS caching"], 1, "Periodic beacons are a classic C2 pattern."],
      ["What's the difference between capture and display filters?", ["None", "Capture filters limit what's recorded; display filters limit what's shown", "Display filters are faster", "Capture filters only work on Windows"], 1, "Capture filters can't be undone after recording."],
    ],
  },

  "windows-ad": {
    overview:
      "Most organizations run Windows endpoints and Active Directory, and attackers target both. Analysts need to understand users, groups, Group Policy and Windows event logs to investigate incidents.",
    topics: [
      ["Active Directory basics", "Domains, users, groups and organizational units"],
      ["Authentication", "Kerberos and NTLM, and why attackers target them"],
      ["Group Policy", "Centrally enforcing security settings"],
      ["Windows event logs", "Logon events, process creation and PowerShell logging"],
      ["Securing AD", "Privileged accounts, tiering and common attack paths"],
    ],
    resources: [
      ["Active Directory Domain Services overview", "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview", "Microsoft Learn", "Docs"],
      ["Best practices for securing Active Directory", "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory", "Microsoft Learn", "Guide"],
      ["Sysinternals", "https://learn.microsoft.com/en-us/sysinternals/", "Microsoft Learn", "Reference"],
    ],
    projects: [
      ["Home AD lab", "Intermediate", 8, "Build a small Active Directory lab with a domain controller and a client, apply a security Group Policy and generate logon events."],
      ["Event log hunt", "Intermediate", 4, "Simulate failed logins and a new admin account in your lab and find each in the Windows event logs."],
    ],
    quiz: [
      ["Which protocol does Active Directory use by default for authentication?", ["FTP", "Kerberos", "SMTP", "Telnet"], 1, "NTLM still exists for compatibility but Kerberos is the default."],
      ["What is Group Policy used for?", ["Email filtering", "Centrally applying settings to users and computers", "Backups", "Network routing"], 1, "It enforces configuration such as password policy across a domain."],
      ["Why are Domain Admin accounts high-value targets?", ["They're shared", "They control the whole domain", "They never expire", "They're unmonitored"], 1, "Compromising them gives attackers control of every joined machine."],
    ],
  },

  "security-principles": {
    overview:
      "Security principles are the ideas every control is built on: confidentiality, integrity, availability, least privilege and defense in depth. They help analysts judge risk and explain decisions clearly.",
    topics: [
      ["The CIA triad", "Confidentiality, integrity and availability"],
      ["Least privilege and need-to-know", "Limiting access to what's required"],
      ["Defense in depth", "Layered controls so one failure isn't a breach"],
      ["Zero trust", "Verifying every request instead of trusting the network"],
      ["Risk", "Assets, threats, vulnerabilities, likelihood and impact"],
    ],
    resources: [
      ["What is Zero Trust security?", "https://www.cloudflare.com/learning/security/glossary/what-is-zero-trust/", "Cloudflare Learning Center", "Guide"],
      ["OWASP Top 10 Proactive Controls", "https://top10proactive.owasp.org/", "OWASP", "Guide"],
      ["Least privilege (glossary)", "https://csrc.nist.gov/glossary/term/least_privilege", "NIST CSRC", "Reference"],
    ],
    projects: [
      ["Risk assessment", "Beginner", 3, "Write a simple risk assessment for a small business, listing assets, threats, likelihood, impact and recommended controls."],
      ["Defense-in-depth map", "Beginner", 2, "Map the layers of controls protecting one system and note what would happen if each layer failed."],
    ],
    quiz: [
      ["Which principle means giving users only the access they need?", ["Defense in depth", "Least privilege", "Separation of duties", "Availability"], 1, "It limits what a compromised account can do."],
      ["Ransomware encrypting a company's files mainly attacks which part of the CIA triad?", ["Confidentiality only", "Availability (and often confidentiality, if data is stolen)", "Integrity only", "None"], 1, "Data becomes unavailable, and modern ransomware often steals it too."],
      ["What does zero trust assume?", ["The internal network is safe", "No request is trusted by default, regardless of where it comes from", "Users never need MFA", "Firewalls are enough"], 1, "Every request is authenticated and authorized."],
    ],
  },

  "threats-attacks": {
    overview:
      "Analysts need to recognize how attacks actually happen: phishing, malware, credential theft and exploitation. Understanding attacker techniques makes alerts easier to interpret and prioritize.",
    topics: [
      ["Social engineering and phishing", "Lures, pretexts and credential harvesting"],
      ["Malware", "Ransomware, trojans, loaders and info-stealers"],
      ["Credential attacks", "Password spraying, credential stuffing and MFA fatigue"],
      ["Exploitation", "Vulnerable services, web attacks and privilege escalation"],
      ["The attack lifecycle", "From initial access to lateral movement and exfiltration"],
    ],
    resources: [
      ["MITRE ATT&CK", "https://attack.mitre.org/", "MITRE", "Reference"],
      ["Cyber Threats and Advisories", "https://www.cisa.gov/topics/cyber-threats-and-advisories", "CISA", "Reference"],
      ["What is phishing?", "https://www.cloudflare.com/learning/access-management/phishing-attack/", "Cloudflare Learning Center", "Guide"],
    ],
    projects: [
      ["Threat report summary", "Beginner", 3, "Summarize a recent public threat advisory: who was targeted, which techniques were used and which defenses would help."],
      ["Phishing analysis", "Intermediate", 3, "Analyze a phishing email sample safely, extract indicators and write a short user-facing warning."],
    ],
    quiz: [
      ["An email urges you to 'verify your account' via a lookalike domain. What attack is this?", ["DDoS", "Phishing", "SQL injection", "Brute force"], 1, "Phishing tricks people into handing over credentials."],
      ["What is password spraying?", ["Trying many passwords on one account", "Trying a few common passwords across many accounts", "Encrypting passwords", "Resetting passwords"], 1, "Spreading attempts avoids account lockouts."],
      ["What is lateral movement?", ["Moving data to the cloud", "An attacker moving from one compromised system to others", "Changing jobs", "Patching servers"], 1, "It's how a single foothold becomes a wider breach."],
    ],
  },

  cryptography: {
    overview:
      "Cryptography protects data and proves identity. Analysts don't design algorithms, but they must understand hashing, encryption and certificates well enough to spot weak configurations and investigate misuse.",
    topics: [
      ["Hashing", "Integrity checks, and why passwords need slow, salted hashes"],
      ["Symmetric encryption", "AES and shared keys"],
      ["Asymmetric encryption", "Public and private keys, and key exchange"],
      ["Digital signatures and certificates", "PKI, certificate authorities and trust chains"],
      ["Common weaknesses", "Outdated algorithms, weak keys and misconfigured TLS"],
    ],
    resources: [
      ["What is encryption?", "https://www.cloudflare.com/learning/ssl/what-is-encryption/", "Cloudflare Learning Center", "Guide"],
      ["Cryptographic Storage Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html", "OWASP", "Guide"],
      ["The Cryptopals Crypto Challenges", "https://cryptopals.com/", "Cryptopals", "Interactive"],
    ],
    projects: [
      ["TLS configuration review", "Beginner", 2, "Check the TLS configuration of a few public sites with an online scanner and explain the grades."],
      ["Hashing and encryption lab", "Intermediate", 4, "Use OpenSSL to hash files, encrypt and decrypt with AES, and sign and verify a file with a key pair."],
    ],
    quiz: [
      ["Which is used to verify integrity rather than keep data secret?", ["AES", "A hash function like SHA-256", "RSA encryption", "TLS"], 1, "Hashes detect changes; they don't hide content."],
      ["In asymmetric encryption, what can anyone use?", ["The private key", "The public key", "Both keys", "Neither"], 1, "Anyone can encrypt with the public key; only the private key decrypts."],
      ["What does a certificate authority do?", ["Encrypts all traffic", "Vouches that a public key belongs to a particular domain or entity", "Stores passwords", "Hashes files"], 1, "Browsers trust certificates signed by trusted CAs."],
    ],
  },

  siem: {
    overview:
      "A SIEM collects logs from across an organization and turns them into searches, dashboards and alerts. Working in a SIEM like Splunk, Elastic or Microsoft Sentinel is the core daily task of a SOC analyst.",
    topics: [
      ["What a SIEM does", "Collecting, normalizing and correlating logs"],
      ["Searching", "Query languages, time ranges and filtering"],
      ["Detections and alerts", "Writing rules, tuning noise and severity"],
      ["Triage", "Investigating an alert and deciding if it's real"],
      ["Dashboards", "Visibility into authentication, endpoints and network activity"],
    ],
    resources: [
      ["Microsoft Sentinel overview", "https://learn.microsoft.com/en-us/azure/sentinel/overview", "Microsoft Learn", "Docs"],
      ["Wazuh documentation", "https://documentation.wazuh.com/current/index.html", "Wazuh", "Docs"],
      ["Boss of the SOC v3 dataset", "https://github.com/splunk/botsv3", "Splunk (GitHub)", "Interactive"],
    ],
    projects: [
      ["Home SIEM lab", "Intermediate", 8, "Set up an open-source SIEM, forward logs from two machines and build a dashboard of logons and errors."],
      ["Write three detections", "Intermediate", 5, "Write detections for brute-force logins, a new admin account and suspicious PowerShell, then test each in your lab."],
    ],
    quiz: [
      ["What is a SIEM's main job?", ["Blocking malware", "Collecting and correlating logs to detect and investigate threats", "Scanning for vulnerabilities", "Backing up data"], 1, "It gives analysts one place to search and alert on activity."],
      ["Why tune detection rules?", ["To make them slower", "To reduce false positives so real alerts get attention", "To delete logs", "It's not needed"], 1, "Noisy rules cause alert fatigue and missed incidents."],
      ["What's the first step when triaging an alert?", ["Wipe the machine", "Gather context: what triggered it, which user and host, and what else happened around it", "Close it", "Email everyone"], 1, "Context decides whether it's benign or an incident."],
    ],
  },

  "log-analysis": {
    overview:
      "Logs are the evidence trail of what happened on systems. Analysts read authentication, endpoint, firewall and application logs to spot suspicious activity and build incident timelines.",
    topics: [
      ["Log sources", "Authentication, endpoint, network, cloud and application logs"],
      ["Windows and Linux logs", "Key event IDs, auth logs and syslog"],
      ["Normal versus suspicious", "Baselines, rare events and impossible travel"],
      ["Building timelines", "Correlating events across sources by time"],
      ["Data sources for detection", "Mapping logs to attacker techniques"],
    ],
    resources: [
      ["MITRE ATT&CK data sources", "https://attack.mitre.org/datasources/", "MITRE", "Reference"],
      ["Security auditing overview (Windows)", "https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/security-auditing-overview", "Microsoft Learn", "Docs"],
      ["Security Datasets", "https://github.com/OTRF/Security-Datasets", "Open Threat Research Forge (GitHub)", "Interactive"],
    ],
    projects: [
      ["Brute-force investigation", "Beginner", 3, "Analyze an SSH auth log to find a brute-force attack, the attacking IPs and whether any login succeeded."],
      ["Incident timeline", "Intermediate", 5, "Use a public security dataset to reconstruct an attack timeline across endpoint and network logs."],
    ],
    quiz: [
      ["Many failed logins followed by one success from the same IP suggests…", ["Normal use", "A possibly successful brute-force attack", "A DNS issue", "A backup job"], 1, "It's worth checking what that account did next."],
      ["Why are baselines useful in log analysis?", ["They compress logs", "They show what normal looks like, so anomalies stand out", "They're required by law", "They replace alerts"], 1, "You can't spot unusual without knowing usual."],
      ["What's essential for correlating logs from different systems?", ["Same file format", "Accurate, synchronised timestamps", "Same log size", "Same vendor"], 1, "Clock drift makes timelines misleading."],
    ],
  },

  "edr-ids": {
    overview:
      "Intrusion detection systems watch network traffic, while EDR tools watch endpoints. Analysts use both to detect threats and respond, such as isolating a compromised laptop.",
    topics: [
      ["Network IDS and IPS", "Signature and anomaly detection with Suricata or Snort"],
      ["Network security monitoring", "Zeek logs for connections, DNS and files"],
      ["Endpoint detection and response", "Process, file and registry telemetry"],
      ["Investigating EDR alerts", "Process trees and command lines"],
      ["Response actions", "Isolating hosts and killing processes"],
    ],
    resources: [
      ["Suricata documentation", "https://docs.suricata.io/en/latest/", "OISF (Suricata)", "Docs"],
      ["Zeek", "https://zeek.org/", "Zeek Project", "Docs"],
      ["Microsoft Defender for Endpoint", "https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint", "Microsoft Learn", "Docs"],
    ],
    projects: [
      ["Suricata lab", "Intermediate", 5, "Run Suricata on a lab network, replay a malicious PCAP and investigate the alerts it raises."],
      ["Process tree analysis", "Intermediate", 3, "Analyze a suspicious process tree (for example, Office spawning PowerShell) and explain why it's alarming."],
    ],
    quiz: [
      ["What is the difference between an IDS and an IPS?", ["None", "An IDS alerts; an IPS can also block traffic", "An IPS only logs", "An IDS runs on endpoints"], 1, "IPS sits inline and can drop malicious packets."],
      ["Why is Word launching PowerShell suspicious?", ["It's slow", "Office apps rarely need to spawn shells; it's a common malware technique", "PowerShell is banned", "It uses memory"], 1, "Malicious macros often do exactly this."],
      ["What does isolating an endpoint do?", ["Deletes it", "Cuts its network access while keeping it available for investigation", "Reinstalls Windows", "Changes its IP"], 1, "Isolation stops spread without destroying evidence."],
    ],
  },

  "vulnerability-management": {
    overview:
      "Every organization has more vulnerabilities than it can fix at once. Vulnerability management means finding them, prioritizing by real risk and tracking fixes to completion.",
    topics: [
      ["The vulnerability lifecycle", "Discover, assess, prioritize, remediate and verify"],
      ["Scanning", "Authenticated and unauthenticated scans with Nessus or OpenVAS"],
      ["CVEs and CVSS", "Understanding identifiers and severity scores"],
      ["Prioritizing by risk", "Exploitability (KEV, EPSS), exposure and asset value"],
      ["Remediation and reporting", "Patching, mitigations and tracking SLAs"],
    ],
    resources: [
      ["Common Vulnerability Scoring System", "https://www.first.org/cvss/", "FIRST", "Reference"],
      ["Known Exploited Vulnerabilities Catalog", "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", "CISA", "Reference"],
      ["National Vulnerability Database", "https://nvd.nist.gov/", "NIST", "Reference"],
      ["Exploit Prediction Scoring System (EPSS)", "https://www.first.org/epss/", "FIRST", "Reference"],
    ],
    projects: [
      ["Scan a lab network", "Intermediate", 5, "Scan a deliberately vulnerable lab VM with OpenVAS or Nessus Essentials and write a prioritized remediation report."],
      ["Prioritization exercise", "Beginner", 3, "Given a list of 20 CVEs, rank them using CVSS, the KEV catalog and EPSS, and justify the top five."],
    ],
    quiz: [
      ["What is a CVE?", ["A scanning tool", "A unique identifier for a publicly known vulnerability", "A severity score", "A firewall rule"], 1, "CVSS is the separate severity scoring system."],
      ["Why isn't CVSS score alone enough to prioritize?", ["It's always wrong", "It ignores whether the flaw is being exploited and how exposed your asset is", "It's too new", "It only covers Windows"], 1, "Exploitation data and context change real risk."],
      ["What does CISA's KEV catalog list?", ["All CVEs", "Vulnerabilities known to be actively exploited", "Patched systems", "Vendors"], 1, "These should usually be fixed first."],
    ],
  },

  "incident-response": {
    overview:
      "Incident response is the structured process of handling a security breach: detecting it, containing it, removing the threat and recovering. Analysts are often the first people in the room.",
    topics: [
      ["Preparation", "Plans, contacts, tools and playbooks before anything happens"],
      ["Detection and analysis", "Confirming an incident and scoping it"],
      ["Containment", "Limiting damage while preserving evidence"],
      ["Eradication and recovery", "Removing the threat and restoring safely"],
      ["Lessons learned", "Post-incident reviews and improving defenses"],
    ],
    resources: [
      ["NIST SP 800-61 Rev. 3: Incident Response Recommendations", "https://csrc.nist.gov/pubs/sp/800/61/r3/final", "NIST CSRC", "Reference"],
      ["Cybersecurity Incident & Vulnerability Response Playbooks", "https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks", "CISA", "Guide"],
      ["PagerDuty Incident Response", "https://response.pagerduty.com/", "PagerDuty", "Guide"],
    ],
    projects: [
      ["Phishing playbook", "Intermediate", 4, "Write an incident response playbook for a reported phishing email, from triage to user notification and lessons learned."],
      ["Tabletop exercise", "Intermediate", 3, "Run a ransomware tabletop exercise with friends or classmates and document the decisions and gaps."],
    ],
    quiz: [
      ["After confirming an active incident, what usually comes next?", ["Writing the final report", "Containment, to limit the damage", "Wiping every system", "Ignoring it until Monday"], 1, "Contain first, while preserving evidence."],
      ["Why preserve evidence during containment?", ["It's tidy", "It's needed to understand scope, root cause and possibly for legal action", "To save disk space", "It isn't necessary"], 1, "Destroying evidence can hide how attackers got in."],
      ["What's the purpose of the lessons-learned phase?", ["Assigning blame", "Improving controls and processes so it doesn't happen again", "Closing tickets", "Marketing"], 1, "It's how incidents make the organization stronger."],
    ],
  },

  "security-frameworks": {
    overview:
      "Frameworks give security work a shared language. MITRE ATT&CK describes attacker techniques, and the NIST Cybersecurity Framework and CIS Controls structure how organizations defend themselves.",
    topics: [
      ["MITRE ATT&CK", "Tactics, techniques and mapping detections to them"],
      ["NIST Cybersecurity Framework", "Govern, Identify, Protect, Detect, Respond and Recover"],
      ["CIS Critical Security Controls", "Prioritized, practical safeguards"],
      ["MITRE D3FEND", "Defensive techniques mapped to attacks"],
      ["Using frameworks in practice", "Coverage maps, gap analysis and reporting"],
    ],
    resources: [
      ["MITRE ATT&CK", "https://attack.mitre.org/", "MITRE", "Reference"],
      ["NIST Cybersecurity Framework", "https://www.nist.gov/cyberframework", "NIST", "Reference"],
      ["CIS Critical Security Controls", "https://www.cisecurity.org/controls", "Center for Internet Security", "Reference"],
      ["MITRE D3FEND", "https://d3fend.mitre.org/", "MITRE", "Reference"],
    ],
    projects: [
      ["ATT&CK coverage map", "Intermediate", 4, "Map the detections in your SIEM lab to ATT&CK techniques and identify the biggest coverage gaps."],
      ["CSF self-assessment", "Beginner", 3, "Assess a small organization against the NIST CSF functions and recommend three priorities."],
    ],
    quiz: [
      ["What does MITRE ATT&CK catalog?", ["Vulnerabilities", "Adversary tactics and techniques seen in real attacks", "Firewall vendors", "Compliance laws"], 1, "It's a knowledge base of how attackers operate."],
      ["Which is a NIST CSF 2.0 core function?", ["Exploit", "Detect", "Encrypt", "Monetise"], 1, "The functions are Govern, Identify, Protect, Detect, Respond and Recover."],
      ["How do analysts typically use ATT&CK?", ["To write malware", "To map detections and find gaps in coverage", "To score CVEs", "To configure DNS"], 1, "Coverage maps show which techniques you'd miss."],
    ],
  },

  "digital-forensics": {
    overview:
      "Digital forensics recovers and examines evidence from disks, memory and logs to explain exactly what happened. It supports incident response and, sometimes, legal proceedings.",
    topics: [
      ["Forensic principles", "Chain of custody, order of volatility and working on copies"],
      ["Acquisition", "Disk images and memory captures"],
      ["Disk forensics", "File systems, deleted files and timelines with Autopsy"],
      ["Memory forensics", "Processes, network connections and injected code with Volatility"],
      ["Reporting", "Clear, defensible findings"],
    ],
    resources: [
      ["Autopsy", "https://www.sleuthkit.org/autopsy/", "The Sleuth Kit", "Docs"],
      ["Volatility 3 documentation", "https://volatility3.readthedocs.io/en/latest/", "Volatility Foundation", "Docs"],
      ["NIST SP 800-86: Integrating Forensic Techniques into Incident Response", "https://csrc.nist.gov/pubs/sp/800/86/final", "NIST CSRC", "Reference"],
      ["CFReDS forensic datasets", "https://cfreds.nist.gov/", "NIST", "Interactive"],
    ],
    projects: [
      ["Disk image investigation", "Intermediate", 6, "Analyze a practice disk image from CFReDS with Autopsy and write up the key findings and timeline."],
      ["Memory analysis", "Advanced", 6, "Analyze a practice memory image with Volatility to find a malicious process and its network connections."],
    ],
    quiz: [
      ["What is chain of custody?", ["A network diagram", "A documented record of who handled evidence and when", "A backup schedule", "An encryption method"], 1, "It shows evidence hasn't been tampered with."],
      ["Why capture memory before shutting a machine down?", ["It's faster", "Memory contents like running processes and keys are lost on power-off", "Disks need it", "It's not useful"], 1, "Order of volatility: collect the most fleeting evidence first."],
      ["Why do forensic analysts work on copies?", ["Copies are faster", "To avoid altering the original evidence", "It's cheaper", "Originals are encrypted"], 1, "Verified images preserve the original's integrity."],
    ],
  },
};
