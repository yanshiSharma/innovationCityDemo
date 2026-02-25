
export const PROCUREMENT_ENGINE_DATA = {
  requisitions: [
    { id: "PR-2026-001", item: "50 chairs for the new co-working space expansion", category: "Furniture & Fixtures", budgetStatus: "Available", status: "Draft" },
    { id: "PR-2026-002", item: "10 High-performance AI Workstations", category: "IT Hardware", budgetStatus: "Available", status: "Pending Approval" },
  ],
  vendors: [
    { name: "Office Solutions LLC", price: "AED 12,500", delivery: "3 Days", performance: 94, recommended: true, justification: "Best balance of price and proven delivery record in the Free Zone." },
    { name: "Global Furniture Co.", price: "AED 11,800", delivery: "7 Days", performance: 88, recommended: false },
    { name: "Premium Interiors", price: "AED 14,000", delivery: "2 Days", performance: 96, recommended: false },
  ],
  scorecards: [
    { vendor: "Office Solutions LLC", onTime: "98%", quality: "99%", accuracy: "100%", responsiveness: "95%", docs: "Valid (Exp: 2027-01-15)" },
    { vendor: "TechConnect UAE", onTime: "92%", quality: "95%", accuracy: "98%", responsiveness: "88%", docs: "Valid (Exp: 2026-08-22)" },
  ],
  riskAlerts: [
    { type: "Financial Distress", vendor: "Alpha Logistics", signal: "Late payments reported in industry database", risk: "Medium" },
    { type: "License Warning", vendor: "QuickBuild Ltd", signal: "Trade license expiring in 5 days (NER Alert)", risk: "High" },
    { type: "Conflict of Interest", vendor: "Nexus Supplies", signal: "UBO match found with internal staff member", risk: "Critical" },
  ],
  pos: [
    { id: "PO-9921", vendor: "Office Solutions", amount: "AED 12,500", status: "Approved", matching: "Matched", payment: "Pending" },
    { id: "PO-9918", vendor: "DEWA", amount: "AED 45,000", status: "Paid", matching: "Matched", payment: "Confirmed" },
  ],
  auditTrail: [
    { action: "PR-001 Created", user: "Admin_01", timestamp: "2026-02-24 09:00", compliance: "Federal Law No. 2 of 2016" },
    { action: "Vendor Recommended", user: "AI_ORCHESTRATOR", timestamp: "2026-02-24 09:05", compliance: "Anti-Corruption Flag: GREEN" },
  ],
  approvalQueue: [
    { id: "PR-002", type: "IT Hardware", amount: "AED 85,000", requester: "IT Dept", priority: "High" }
  ]
};

export const MARKETING_INTEL_DATA = {
  overview: {
    activeCampaigns: 8,
    leadsGenerated: 1240,
    costPerLead: "AED 45",
    conversionRate: "4.8%",
    budgetSpent: "AED 150,000",
    budgetAllocated: "AED 250,000",
    summary: "LinkedIn campaigns are outperforming email nurture sequences by 22% in the Deep Tech segment. Recommend shifting 15% of the Q1 budget from Email to LinkedIn Paid."
  },
  activeCampaigns: [
    { name: "Deep Tech 2026", type: "LinkedIn Paid", status: "Active", segment: "AI/ML Startups", leads: 450, ctr: "3.2%", cpl: "AED 38", performance: "Above Benchmark" },
    { name: "Webinar: Future of Free Zones", type: "Webinar", status: "Active", segment: "Global Investors", leads: 280, ctr: "5.5%", cpl: "AED 25", performance: "Above Benchmark" },
    { name: "Q1 Newsletter", type: "Email Nurture", status: "Paused", segment: "Existing Leads", leads: 120, ctr: "1.8%", cpl: "AED 55", performance: "Below Benchmark" },
  ],
  abTesting: [
    { campaign: "Deep Tech 2026", variantA: "4.2%", variantB: "5.8%", winner: "Variant B", recommendation: "Variant B uses more technical language which resonates better with the target audience." }
  ],
  channelOptimization: [
    { channel: "LinkedIn", allocation: "45%", recommendation: "Increase to 60%" },
    { channel: "Email", allocation: "25%", recommendation: "Decrease to 15%" },
    { channel: "Events", allocation: "20%", recommendation: "Maintain" },
    { channel: "Content", allocation: "10%", recommendation: "Maintain" },
  ],
  prospectPipeline: [
    { company: "NeuralFlow AI", scoring: 92, contact: "Sarah Chen (CTO)", profile: "Series B, SF-based, looking for ME expansion", bd: "Ahmed Ali", status: "Synced" },
    { company: "Quantum Leap", scoring: 85, contact: "Mark Weber (CEO)", profile: "R&D focused, deep tech stack", bd: "Jane Smith", status: "Pending" },
  ],
  events: [
    { name: "AI Summit Dubai", registrations: 450, target: 500, funnel: "90%", followUp: "Scheduled" },
    { name: "Webinar: Licensing 101", registrations: 120, target: 100, funnel: "120%", followUp: "Completed" },
  ],
  contentTracker: [
    { asset: "UAE AI Regulation Report", downloads: 850, segment: "Legal Tech" },
    { asset: "Innovation City Case Study", downloads: 420, segment: "SaaS" },
  ],
  competitorIntel: [
    { prospect: "NeuralFlow AI", evaluating: ["ADGM", "DIFC"], comparison: "Innovation City offers 20% lower operational costs and faster tech-visa processing.", talkingPoints: "Focus on AI-specific infrastructure and GIAL integration." }
  ],
  aiInsights: [
    "Deep Tech segment has the highest conversion potential this month.",
    "LinkedIn is the most cost-effective channel for lead generation.",
    "Recommend increasing budget for 'Webinar: Future of Free Zones' due to high registration velocity."
  ]
};

export const FINANCE_DATA = {
  cashPosition: "AED 45,200,000",
  arAging: [
    { range: "0-30 Days", amount: 1200000 },
    { range: "31-60 Days", amount: 450000 },
    { range: "61-90 Days", amount: 150000 },
    { range: "90+ Days", amount: 50000 },
  ],
  kpis: {
    collectionRate: "94%",
    wpsStatus: "Compliant",
    overdueInvoices: 14
  }
};

export const VISA_DATA = {
  expiries: [
    { name: "John Doe", type: "Employment", expiry: "2026-03-15", fine: "AED 0" },
    { name: "Jane Smith", type: "Investor", expiry: "2026-03-20", fine: "AED 0" },
    { name: "Ahmed Ali", type: "Employment", expiry: "2026-02-20", fine: "AED 500" },
  ],
  quota: {
    total: 500,
    used: 420,
    available: 80
  }
};

export const LEGAL_DATA = {
  amlStatus: [
    { entity: "Nexus AI", status: "Cleared", risk: "Low" },
    { entity: "Global Tech", status: "Pending", risk: "Medium" },
    { entity: "Alpha Corp", status: "Flagged", risk: "High" },
  ],
  sanctionsAlerts: 2,
  strQueue: 5
};

export const MOHRE_DATA = {
  headcount: 1250,
  emiratization: {
    current: "4.2%",
    target: "5.0%",
    nafisEnrolled: 45
  }
};

export const VENDOR_DATA = [
  { name: "Etisalat", category: "Telecom", score: 95, delivery: "On-time" },
  { name: "DEWA", category: "Utilities", score: 98, delivery: "On-time" },
  { name: "Aramex", category: "Logistics", score: 82, delivery: "Delayed" },
];

export const SUSTAINABILITY_DATA = {
  emissions: [
    { scope: "Scope 1", value: 450, unit: "tCO2e" },
    { scope: "Scope 2", value: 1200, unit: "tCO2e" },
    { scope: "Scope 3", value: 3500, unit: "tCO2e" },
  ],
  trends: [
    { month: 'Jan', emissions: 400 },
    { month: 'Feb', emissions: 380 },
    { month: 'Mar', emissions: 420 },
  ]
};

export const SECURITY_DATA = {
  anomalies: [
    { time: "02:14 AM", location: "Zone B Entrance", type: "Unauthorized Access Attempt" },
    { time: "04:45 AM", location: "Server Room", type: "Temperature Spike" },
  ],
  cctvAlerts: 3,
  incidentStatus: "Stable"
};

export const BD_DATA = {
  pipeline: [
    { stage: "Lead", count: 45, value: "AED 2.5M" },
    { stage: "Proposal", count: 12, value: "AED 5.8M" },
    { stage: "Negotiation", count: 5, value: "AED 3.2M" },
    { stage: "Closed", count: 22, value: "AED 12M" },
  ],
  conversionRate: "18.5%",
  priorityActions: [
    "Follow up with TechGlobal",
    "Send proposal to InnovateX",
    "Review contract for SolarSys"
  ]
};

export const AUDIT_TRAIL = [
  { timestamp: "2026-02-24 08:30:12", user: "System", action: "UBO Sync with NER", status: "Success" },
  { timestamp: "2026-02-24 08:15:45", user: "Admin_01", action: "License Approval IC-992", status: "Verified" },
  { timestamp: "2026-02-24 07:50:22", user: "User_442", action: "Visa Application Submission", status: "Pending" },
];

export const HITL_QUEUE = [
  { id: "REQ-442", type: "License Amendment", priority: "High", timeInQueue: "2h 15m" },
  { id: "REQ-445", type: "Complex UBO Structure", priority: "Medium", timeInQueue: "4h 30m" },
  { id: "REQ-450", type: "Sanction Match Review", priority: "Critical", timeInQueue: "15m" },
];
