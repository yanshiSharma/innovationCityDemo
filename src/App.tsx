import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  Users, 
  Building2, 
  Globe, 
  Settings,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Terminal,
  Zap,
  Activity,
  Search,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DashboardView } from './components/DashboardView';
import { ComplianceModal } from './components/ComplianceModal';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Action {
  label: string;
  value: string;
  flowId?: string;
  stepId?: string;
}

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  actions?: Action[];
  complianceNote?: string;
}

const Logo = ({ size = 40 }: { size?: number }) => (
  <div className="flex items-center shrink-0" style={{ height: size }}>
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#70C7D9] to-[#6B5BB2]" />
      <div className="absolute bg-brand-dark" style={{ top: '35%', right: 0, width: '50%', height: '30%' }} />
    </div>
    <div className="bg-[#6B5BB2]" style={{ width: size * 0.4, height: size * 0.3, marginLeft: -size * 0.05 }} />
  </div>
);

const MODULES = [
  { id: 'licensing', name: 'Company Registration & Licensing', icon: FileText, color: 'text-brand-teal' },
  { id: 'visa', name: 'Visa & Immigration Services', icon: Globe, color: 'text-brand-teal' },
  { id: 'facilities', name: 'Facilities & Property Management', icon: Building2, color: 'text-brand-teal' },
  { id: 'finance', name: 'Finance & Accounts', icon: CreditCard, color: 'text-brand-teal' },
  { id: 'legal', name: 'Legal & Compliance', icon: ShieldCheck, color: 'text-brand-teal' },
  { id: 'it', name: 'IT & Digital Services', icon: Terminal, color: 'text-brand-teal' },
  { id: 'marketing', name: 'Marketing & Investor Relations', icon: Sparkles, color: 'text-brand-teal' },
  { id: 'hr', name: 'HR & Administration', icon: Users, color: 'text-brand-teal' },
  { id: 'bd', name: 'Business Development', icon: Zap, color: 'text-brand-teal' },
  { id: 'security', name: 'Security & Access Control', icon: ShieldCheck, color: 'text-brand-teal' },
  { id: 'procurement', name: 'Procurement & Vendor Management', icon: CreditCard, color: 'text-brand-teal' },
  { id: 'sustainability', name: 'Sustainability & ESG', icon: Globe, color: 'text-brand-teal' },
  { id: 'strategy', name: 'Executive Management & Strategy', icon: LayoutDashboard, color: 'text-brand-teal' },
];

const FLOW_STEPS: Record<string, Record<string, { content: string; actions?: Action[] }>> = {
  licensing: {
    start: {
      content: "### Licensing Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "Trade Name Check", value: "trade_name", flowId: "licensing", stepId: "trade_name_check" },
        { label: "License Renewal", value: "renewal", flowId: "licensing", stepId: "renewal_init" },
        { label: "Activity Amendment", value: "amendment", flowId: "licensing", stepId: "advisory" },
        { label: "UBO Declaration", value: "ubo", flowId: "licensing", stepId: "ubo_reg" }
      ]
    },
    advisory: {
      content: "### AI License Advisory Engine\n\nPlease describe your business activities in plain language. I will map them to the correct license category and permitted activities.",
      actions: [
        { label: "Tech Startup (AI/SaaS)", value: "tech_startup", flowId: "licensing", stepId: "recommendation" },
        { label: "Consultancy", value: "consultancy", flowId: "licensing", stepId: "recommendation" }
      ]
    },
    recommendation: {
      content: "### License Recommendation\n\nBased on your description, I recommend:\n- **License Type**: Technology License\n- **Activities**: Software Development, IT Consultancy, AI Solutions\n- **Structure**: FZ-LLC\n\nWould you like to proceed to **Trade Name Check**?",
      actions: [
        { label: "Proceed to Trade Name Check", value: "proceed_check", flowId: "licensing", stepId: "trade_name_check" }
      ]
    },
    trade_name_check: {
      content: "### NER Trade Name Check System\n\nPlease propose a trade name. I will check it against the National Economic Register (NER) and Innovation City's registry.",
      actions: [
        { label: "Check 'Nexus AI'", value: "check_name", flowId: "licensing", stepId: "ner_result" }
      ]
    },
    ner_result: {
      content: "### NER Check Result\n\n- **'Nexus AI'**: Clear (No conflicts found in NER).\n\nProceeding to **Application Drafting**...",
      actions: [
        { label: "Draft Application", value: "draft", flowId: "licensing", stepId: "drafting" }
      ]
    },
    drafting: {
      content: "### Application Drafting & Document Assembly\n\nI am auto-generating the following documents:\n- Memorandum of Association (MOA)\n- Articles of Association (AOA)\n- Shareholder Resolution\n\n*Compliance Note: MOA must be notarized by a UAE Notary Public.*",
      actions: [
        { label: "View Document Analysis", value: "doc_analysis" },
        { label: "Proceed to UBO Registry", value: "ubo", flowId: "licensing", stepId: "ubo_reg" }
      ]
    },
    ubo_reg: {
      content: "### Shareholder & UBO Registry\n\nPlease provide the ultimate beneficial ownership chain. Any UBO owning 25% or more must be disclosed per Cabinet Decision No. 58 of 2020.\n\n*Compliance Note: UBO data is synchronized with the National Economic Register (NER) in real-time.*",
      actions: [
        { label: "Submit UBO Declaration", value: "submit_ubo", flowId: "licensing", stepId: "complete" }
      ]
    },
    renewal_init: {
      content: "### License Lifecycle Management\n\nInitiating renewal process for **IC-2024-992**.\n- **Expiry**: Dec 2026\n- **Status**: Active\n\nI will now assemble the renewal package and check for outstanding payments.",
      actions: [
        { label: "Check Outstanding Payments", value: "check_payments", flowId: "finance", stepId: "start" }
      ]
    },
    complete: {
      content: "### Workflow Complete\n\nYour application has been submitted to the Orchestrator. You will receive a notification once the human checkpoint is cleared.",
    }
  },
  visa: {
    start: {
      content: "### Visa & Immigration Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "New Entry Permit", value: "new_permit", flowId: "visa", stepId: "eligibility" },
        { label: "Visa Renewal", value: "renewal", flowId: "visa", stepId: "compliance_calendar" },
        { label: "Medical Scheduling", value: "medical", flowId: "visa", stepId: "medical_schedule" },
        { label: "Emirates ID", value: "eid", flowId: "visa", stepId: "eid_coord" }
      ]
    },
    eligibility: {
      content: "### Visa Eligibility & Quota Engine\n\nDetermining eligibility based on role and salary...\n- **Active Quota**: 12/15\n- **Eligible Category**: Employment Visa (Standard)\n\nProceed to **ICA Integration Layer**?",
      actions: [
        { label: "Submit to ICA", value: "submit_ica", flowId: "visa", stepId: "ica_integration" }
      ]
    },
    ica_integration: {
      content: "### ICA Integration Layer\n\nSubmitting application to ICA SMART Services portal...\n- **Status**: Entry Permit Issued\n\nNext step: **Medical Fitness Test**.",
      actions: [
        { label: "Schedule Medical Test", value: "schedule_medical", flowId: "visa", stepId: "medical_schedule" }
      ]
    },
    medical_schedule: {
      content: "### Medical Fitness Test Scheduling\n\nPlease select a preferred date and time for the medical examination at an approved center.",
      actions: [
        { label: "Tomorrow, 09:00 AM", value: "tmw_9", flowId: "visa", stepId: "eid_coord" },
        { label: "Tomorrow, 02:00 PM", value: "tmw_2", flowId: "visa", stepId: "eid_coord" },
        { label: "Next Monday, 10:00 AM", value: "mon_10", flowId: "visa", stepId: "eid_coord" }
      ]
    },
    eid_coord: {
      content: "### Emirates ID Coordination\n\nBooking biometric appointment at FAIC service center...\n- **Location**: RAK Service Center\n- **Slot**: Feb 26, 09:00 AM\n\nProceed to **Labour Contract**?",
      actions: [
        { label: "Generate Labour Contract", value: "labour", flowId: "visa", stepId: "labour_contract" }
      ]
    },
    labour_contract: {
      content: "### Labour Contract & MOHRE Compliance\n\nGenerating MOHRE-compliant contract (Federal Decree-Law No. 33 of 2021)...\n- **Probation**: 6 months\n- **Annual Leave**: 30 days\n\nWorkflow complete.",
    },
    compliance_calendar: {
      content: "### Visa Compliance Calendar\n\nMonitoring expiry dates for all employees...\n- **Upcoming Expiries**: 2 (within 30 days)\n- **Overstay Risk**: Low\n\nWould you like to initiate renewals for these employees?",
      actions: [
        { label: "Initiate Renewals", value: "init_renewals", flowId: "visa", stepId: "ica_integration" }
      ]
    }
  },
  finance: {
    start: {
      content: "### Finance Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "Invoice Status", value: "invoices", flowId: "finance", stepId: "invoice_engine" },
        { label: "VAT Filing", value: "vat", flowId: "finance", stepId: "vat_integration" },
        { label: "WPS Compliance", value: "wps", flowId: "finance", stepId: "payment_recon" }
      ]
    },
    invoice_engine: {
      content: "### AI Invoice & Fee Engine\n\nFetching outstanding invoices...\n- **ID: INV-882**: AED 4,200 (Visa Fees)\n- **ID: INV-901**: AED 1,500 (License Amendment)\n\nProceed to **Payment Processing**?",
      actions: [
        { label: "Process Payments", value: "pay", flowId: "finance", stepId: "payment_recon" }
      ]
    },
    vat_integration: {
      content: "### FTA EmaraTax Integration\n\nPreparing VAT return draft for Q1 2026...\n- **Taxable Turnover**: AED 450,000\n- **VAT Due**: AED 22,500\n\nSubmit to FTA?",
      actions: [
        { label: "Submit to FTA", value: "submit_fta", flowId: "finance", stepId: "complete" }
      ]
    },
    payment_recon: {
      content: "### Payment Processing & Reconciliation\n\nReconciling inbound payments with open invoices...\n- **Status**: 100% Reconciled\n- **WPS Status**: Compliant\n\nAll financial records updated.",
    }
  },
  facilities: {
    start: {
      content: "### Facilities Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "Space Inventory", value: "inventory", flowId: "facilities", stepId: "leasing" },
        { label: "Maintenance", value: "maintenance", flowId: "facilities", stepId: "iot" },
        { label: "Meeting Room", value: "room", flowId: "facilities", stepId: "booking" }
      ]
    },
    leasing: {
      content: "### Space Inventory & Leasing Intelligence\n\nAvailable units in Innovation City:\n- **Office A-102**: 45 sqm (Co-working)\n- **Warehouse W-05**: 200 sqm\n\nWould you like to draft a term sheet?",
      actions: [
        { label: "Draft Term Sheet", value: "draft", flowId: "facilities", stepId: "complete" }
      ]
    },
    iot: {
      content: "### Predictive Maintenance & IoT\n\nMonitoring BMS sensors...\n- **HVAC**: Optimal\n- **Elevators**: Service due in 12 days\n\nReport a new fault?",
      actions: [
        { label: "Report Fault", value: "report", flowId: "facilities", stepId: "complete" }
      ]
    },
    booking: {
      content: "### Meeting Room Booking\n\nPlease select a date and time for your booking.",
      actions: [
        { label: "Today, 03:00 PM", value: "today_3", flowId: "facilities", stepId: "complete" },
        { label: "Tomorrow, 11:00 AM", value: "tmw_11", flowId: "facilities", stepId: "complete" }
      ]
    },
    complete: { content: "### Request Processed\n\nYour facilities request has been logged in the digital twin system." }
  },
  legal: {
    start: {
      content: "### Legal & Compliance Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "Contract Review", value: "review", flowId: "legal", stepId: "contract_intel" },
        { label: "AML Screening", value: "aml", flowId: "legal", stepId: "aml_agent" },
        { label: "Corporate Records", value: "records", flowId: "legal", stepId: "governance" }
      ]
    },
    contract_intel: {
      content: "### Contract Intelligence Engine\n\nPlease upload or describe the contract. I will perform a risk assessment based on UAE Civil Code.",
      actions: [
        { label: "Standard NDA", value: "nda", flowId: "legal", stepId: "complete" },
        { label: "Lease Agreement", value: "lease", flowId: "legal", stepId: "complete" }
      ]
    },
    aml_agent: {
      content: "### AML/KYC Compliance Agent\n\nPerforming screening against UN and UAE local terrorist lists...\n- **Status**: Clear\n- **Risk Level**: Low",
    },
  governance: {
    content: "### Corporate Governance Assistant\n\nAccessing board resolutions and statutory filings...\n- **Last Filing**: UBO Declaration (Jan 2026)\n- **Next Meeting**: Q1 Board Review\n\n*Compliance Note: All entities must maintain a Real Beneficiary Register (UBO) at their registered office.*",
    actions: [
      { label: "UBO Registry Details", value: "ubo_details" }
    ]
  },
    complete: { 
      content: "### Legal Review Initiated\n\nI have completed the preliminary legal analysis of your submission.\n\n**Analysis Summary:**\n- **Entity Type**: Free Zone Limited Liability Company (FZ-LLC)\n- **Compliance Score**: 98/100\n- **Identified Risks**: Low (Standard operational risks only)\n- **Regulatory Alignment**: Fully compliant with Innovation City Free Zone Regulations 2024.\n\nYour final license certificate is being prepared for human sign-off.",
      actions: [
        { label: "View Detailed AI Analysis", value: "doc_analysis" }
      ]
    }
  },
  it: {
    start: {
      content: "### IT & Digital Services Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "System Monitoring", value: "monitor", flowId: "it", stepId: "infra" },
        { label: "Staff Helpdesk", value: "helpdesk", flowId: "it", stepId: "helpdesk" }
      ]
    },
    infra: { content: "### Infrastructure & Systems Monitoring\n\nAll systems operational. GIAL connectivity at 100%." },
    helpdesk: { content: "### Staff Helpdesk AI Agent\n\nHow can I assist with your IT requirements today?" }
  },
  marketing: {
    start: {
      content: "### Marketing & Investor Relations Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "Campaign Intel", value: "campaign_intel" }
      ]
    },
  },
  hr: {
    start: {
      content: "### HR & Administration Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "Recruitment", value: "recruit", flowId: "hr", stepId: "recruitment" },
        { label: "Employee Lifecycle", value: "lifecycle", flowId: "hr", stepId: "employee" }
      ]
    },
    recruitment: { content: "### Recruitment Engine\n\nActive job requisitions: 3\n- **AI Engineer**: 12 applicants\n- **BD Manager**: 5 applicants" },
    employee: { content: "### Employee Lifecycle Management\n\nManaging onboarding for 2 new hires. Visa applications triggered in Module 2." }
  },
  bd: {
    start: {
      content: "### Business Development Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "Investor Prospecting", value: "prospect", flowId: "bd", stepId: "prospecting" }
      ]
    },
    prospecting: { content: "### Investor Prospecting Engine\n\nIdentified 15 high-intent prospects matching Innovation City ICP." }
  },
  security: {
    start: {
      content: "### Security & Access Control Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "Access Management", value: "access", flowId: "security", stepId: "access" }
      ]
    },
    access: { content: "### Intelligent Access Management\n\nBiometric and NFC credentials active. No anomalies detected." }
  },
  procurement: {
    start: {
      content: "### Procurement & Vendor Management Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "AI Procurement Engine", value: "procurement_engine" }
      ]
    },
  },
  sustainability: {
    start: {
      content: "### Sustainability & ESG Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "Carbon Tracker", value: "carbon", flowId: "sustainability", stepId: "tracker" }
      ]
    },
    tracker: { content: "### Carbon & Emissions Tracker\n\nInnovation City current footprint: 1,240 tCO2e. Aligned with UAE Net Zero 2050." }
  },
  strategy: {
    start: {
      content: "### Executive Management & Strategy Request Specifications\n\nSelect a specification to proceed:",
      actions: [
        { label: "Executive Dashboard", value: "dash", flowId: "strategy", stepId: "dashboard" },
        { label: "Scenario Planning", value: "scenario", flowId: "strategy", stepId: "planning" }
      ]
    },
    dashboard: { content: "### AI Executive Dashboard\n\nReal-time operational KPIs: License completions up 12% this week." },
    planning: { content: "### Scenario Planning Engine\n\nModeling impact of new Web3 license category..." }
  }
};

const MOCK_RESPONSES: Record<string, { content: string; actions?: Action[] }> = {
  default: {
    content: "I am the Innovation City AI OS Orchestrator. I can assist with licensing, visa services, and regulatory compliance. Type **'help'** to see all available request specifications.",
  },
  help: {
    content: "### Innovation City AI OS - Full Feature Directory\n\nI am your primary interface for all administrative and regulatory operations. Here are the core features available to you:\n\n1. **Licensing**: Company formation, trade names, and renewals.\n2. **Visa Services**: Residency, medicals, and Emirates ID coordination.\n3. **Facilities**: Space inventory, IoT maintenance, and room bookings.\n4. **Finance**: Invoice management, VAT filing, and WPS compliance.\n5. **Legal**: Contract intelligence, AML screening, and UBO registry.\n6. **IT Services**: System monitoring and staff helpdesk.\n7. **Marketing**: Campaign intelligence and investor relations.\n8. **HR & Admin**: Recruitment engine and employee lifecycle.\n9. **Business Dev**: Investor prospecting and ICP matching.\n10. **Security**: Access management and biometric control.\n11. **Procurement**: Vendor management and purchase requisitions.\n12. **Sustainability**: Carbon tracking and ESG reporting.\n13. **Strategy**: Executive dashboards and scenario planning.\n\nSelect a module from the sidebar or type a query to begin.",
    actions: [
      { label: "Shareholder & UBO Registry Info", value: "ubo_details" },
      { label: "Licensing Workflow", value: "licensing", flowId: "licensing", stepId: "start" },
      { label: "Visa Workflow", value: "visa", flowId: "visa", stepId: "start" },
      { label: "Compliance Center", value: "compliance" }
    ]
  },
  ubo_details: {
    content: "### Shareholder & UBO Registry Details\n\nIn accordance with **Cabinet Decision No. 58 of 2020**, Innovation City maintains a centralized digital registry for all Ultimate Beneficial Owners (UBOs).\n\n**Key Requirements:**\n- **Identification**: Any individual owning or controlling 25% or more of the company.\n- **Timeline**: Changes must be reported within 15 days.\n- **Penalties**: Non-compliance can lead to fines up to AED 100,000.\n\n*Compliance Note: The UBO Registry is shared with the Ministry of Economy via the National Economic Register (NER) integration.*",
    actions: [
      { label: "Update UBO Filing", value: "update_ubo" },
      { label: "View Shareholder List", value: "shareholders" }
    ]
  },
  compliance: {
    content: "Innovation City operates under strict UAE regulatory frameworks. I've opened the **Compliance Center** for you to review the applicable laws including PDPL and AML regulations.",
  },
  doc_analysis: {
    content: "### AI Document Analysis Result\n\nI have analyzed the drafted documents for legal consistency and regulatory compliance:\n\n- **MOA/AOA**: 100% Match with Innovation City standard templates.\n- **Shareholder Resolution**: Validated against current UBO registry data.\n- **Risk Assessment**: No high-risk clauses detected.\n- **Compliance Check**: Aligned with Federal Decree-Law No. 32 of 2021.\n\n*Compliance Note: Final documents must be digitally signed via UAE PASS or physically notarized.*",
    actions: [
      { label: "Proceed to UBO Registry", value: "ubo", flowId: "licensing", stepId: "ubo_reg" }
    ]
  },
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "System Initialized. Innovation City AI OS is online. Type **'help'** to see available request specifications or select a module from the sidebar.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [activeFlow, setActiveFlow] = useState<{ flowId: string; stepId: string } | null>(null);
  const [activeComplianceNote, setActiveComplianceNote] = useState<string | null>(null);
  const [activeDashboard, setActiveDashboard] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAction = (action: Action) => {
    const userMsg: Message = {
      role: 'user',
      content: action.label,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      let response: { content: string; actions?: Action[] } | undefined;
      
      if (action.value === 'ubo_details') {
        response = MOCK_RESPONSES.ubo_details;
      } else if (action.value === 'doc_analysis') {
        response = MOCK_RESPONSES.doc_analysis;
      } else if (action.value === 'compliance') {
        setIsComplianceOpen(true);
        response = MOCK_RESPONSES.compliance;
      } else if (action.value === 'procurement_engine') {
        setActiveDashboard('procurement_engine');
        setIsSidebarOpen(false);
        return;
      } else if (action.value === 'campaign_intel') {
        setActiveDashboard('campaign_intel');
        setIsSidebarOpen(false);
        return;
      } else if (action.flowId && action.stepId) {
        setActiveFlow({ flowId: action.flowId, stepId: action.stepId });
        response = FLOW_STEPS[action.flowId]?.[action.stepId];
      }

      if (response) {
        const complianceMatch = response.content.match(/\*Compliance Note: (.*?)\*/);
        const complianceNote = complianceMatch ? complianceMatch[1] : undefined;
        
        const assistantMessage: Message = {
          role: 'model',
          content: response.content.replace(/\*Compliance Note: .*?\*/, ''),
          timestamp: new Date(),
          actions: response.actions,
          complianceNote
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        if (complianceNote) {
          setActiveComplianceNote(complianceNote);
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  const getMockResponse = (query: string): { content: string; actions?: Action[] } => {
    const q = query.toLowerCase();
    if (q.includes('help') || q.includes('option') || q.includes('spec')) return MOCK_RESPONSES.help;
    if (q.includes('visa') || q.includes('immigration')) return FLOW_STEPS.visa.start;
    if (q.includes('license') || q.includes('registration')) return FLOW_STEPS.licensing.start;
    if (q.includes('finance') || q.includes('money') || q.includes('invoice')) return FLOW_STEPS.finance.start;
    if (q.includes('compliance') || q.includes('law')) {
      setIsComplianceOpen(true);
      return MOCK_RESPONSES.compliance;
    }
    return MOCK_RESPONSES.default;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      let response: { content: string; actions?: Action[] };

      if (currentInput.toLowerCase().includes('ubo') || currentInput.toLowerCase().includes('shareholder')) {
        response = MOCK_RESPONSES.ubo_details;
      } else if (activeFlow) {
        const { flowId, stepId } = activeFlow;
        
        if (flowId === 'licensing' && stepId === 'advisory') {
          response = FLOW_STEPS.licensing.recommendation;
          setActiveFlow({ flowId: 'licensing', stepId: 'recommendation' });
        } else if (flowId === 'licensing' && stepId === 'trade_name_check') {
          response = {
            content: `### NER Check Result\n\n- **'${currentInput}'**: Clear (No conflicts found in NER).\n\nProceeding to **Application Drafting**...`,
            actions: FLOW_STEPS.licensing.ner_result.actions
          };
          setActiveFlow({ flowId: 'licensing', stepId: 'ner_result' });
        } else if (flowId === 'visa' && stepId === 'medical_schedule') {
          response = {
            content: `### Medical Test Scheduled\n\nYour appointment for **${currentInput}** has been confirmed at the RAK Service Center.\n\nProceeding to **Emirates ID Coordination**...`,
            actions: FLOW_STEPS.visa.eid_coord.actions
          };
          setActiveFlow({ flowId: 'visa', stepId: 'eid_coord' });
        } else if (flowId === 'facilities' && stepId === 'booking') {
          response = {
            content: `### Booking Confirmed\n\nMeeting room reserved for **${currentInput}**. Details have been sent to your registered email.`,
            actions: FLOW_STEPS.facilities.complete.actions
          };
          setActiveFlow(null);
        } else {
          response = getMockResponse(currentInput);
          if (response === MOCK_RESPONSES.help || response === FLOW_STEPS.visa.start || response === FLOW_STEPS.licensing.start || response === FLOW_STEPS.finance.start) {
            setActiveFlow(null);
          }
        }
      } else {
        response = getMockResponse(currentInput);
      }

      const complianceMatch = response.content.match(/\*Compliance Note: (.*?)\*/);
      const complianceNote = complianceMatch ? complianceMatch[1] : undefined;

      const assistantMessage: Message = {
        role: 'model',
        content: response.content.replace(/\*Compliance Note: .*?\*/, ''),
        timestamp: new Date(),
        actions: response.actions,
        complianceNote
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      if (complianceNote) {
        setActiveComplianceNote(complianceNote);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-brand-dark text-white font-sans selection:bg-brand-teal/30 overflow-hidden">
      <ComplianceModal 
        isOpen={isComplianceOpen} 
        onClose={() => setIsComplianceOpen(false)} 
      />

      {/* Compliance Note Pop-up */}
      <AnimatePresence>
        {activeComplianceNote && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveComplianceNote(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-brand-surface border border-brand-teal/30 rounded-2xl shadow-2xl p-6 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-teal" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-brand-teal" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-white mb-2 uppercase tracking-tight">Compliance Note</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {activeComplianceNote}
                  </p>
                  <button
                    onClick={() => setActiveComplianceNote(null)}
                    className="mt-6 w-full py-2.5 bg-brand-teal text-black font-bold text-xs rounded-lg hover:bg-brand-teal/90 transition-all uppercase tracking-widest"
                  >
                    Acknowledge & Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-72 border-r border-brand-border bg-brand-surface flex flex-col z-50"
          >
            <div className="p-6 border-b border-brand-border flex items-center gap-4">
              <Logo size={32} />
              <div>
                <h1 className="font-bold text-sm tracking-tight text-white uppercase font-display">INNOVATION CITY</h1>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">AI OS v1.0.4</p>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              <div className="px-3 py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Dashboards</div>
              
              <div className="space-y-0.5 mt-1">
                {[
                  { id: 'finance', name: 'Finance', icon: CreditCard },
                  { id: 'visa', name: 'Visa/Immigration', icon: Globe },
                  { id: 'legal', name: 'Legal/Compliance', icon: ShieldCheck },
                  { id: 'mohre', name: 'MOHRE Compliance', icon: Users },
                  { id: 'vendor', name: 'Vendor Management', icon: CreditCard },
                  { id: 'sustainability', name: 'Sustainability', icon: Globe },
                  { id: 'security', name: 'Security', icon: ShieldCheck },
                  { id: 'bd', name: 'CRM Pipeline', icon: Zap },
                ].map((dash) => (
                  <button
                    key={dash.id}
                    onClick={() => {
                      setActiveDashboard(dash.id);
                      setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all group text-left pl-10",
                      activeDashboard === dash.id ? "bg-brand-teal/5 text-brand-teal" : "hover:bg-white/5 text-zinc-500"
                    )}
                  >
                    <dash.icon className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium group-hover:text-zinc-200">{dash.name}</span>
                  </button>
                ))}
              </div>

              <div className="pt-6 px-3 py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Core Modules</div>
              {MODULES.map((module) => (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveDashboard(null);
                    const msg = `Accessing ${module.name} module...`;
                    setMessages(prev => [...prev, { role: 'user', content: msg, timestamp: new Date() }]);
                    setIsLoading(true);
                    setTimeout(() => {
                      const flow = FLOW_STEPS[module.id];
                      setMessages(prev => [...prev, { 
                        role: 'model', 
                        content: flow?.start.content || `### ${module.name} Module\n\nSystem ready for ${module.name} operations. Please specify your request.`, 
                        timestamp: new Date(),
                        actions: flow?.start.actions
                      }]);
                      setIsLoading(false);
                    }, 800);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all group text-left"
                >
                  <module.icon className={cn("w-4 h-4 transition-colors", module.color)} />
                  <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-100 transition-colors">
                    {module.name}
                  </span>
                  <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-zinc-600" />
                </button>
              ))}

              <div className="pt-6 px-3 py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Quick Actions</div>
              <button 
                onClick={() => {
                  setActiveDashboard('audit');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all group text-left"
              >
                <Activity className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-100">Audit Trail (CC1)</span>
              </button>
              <button 
                onClick={() => {
                  setActiveDashboard('hitl');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all group text-left"
              >
                <Users className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-100">Human-in-the-Loop (CC4)</span>
              </button>
              <button 
                onClick={() => setIsComplianceOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-brand-teal/10 border border-brand-teal/20 hover:bg-brand-teal/20 transition-all group text-left"
              >
                <ShieldCheck className="w-4 h-4 text-brand-teal" />
                <span className="text-sm font-medium text-brand-teal">Compliance Center</span>
              </button>

              <div className="pt-6 px-3 py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">System Status</div>
              <div className="px-3 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">GIAL Connectivity</span>
                  <span className="flex items-center gap-1.5 text-brand-teal">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">NER Sync</span>
                  <span className="text-zinc-400">99.2%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '99.2%' }}
                    className="h-full bg-brand-teal/50"
                  />
                </div>
              </div>
            </nav>

            <div className="p-4 border-t border-brand-border">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all text-zinc-400 hover:text-zinc-100">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">System Settings</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920" 
            alt="Innovation City"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        {/* Header */}
        <header className="h-20 border-b border-brand-border flex items-center justify-between px-10 bg-brand-dark/40 backdrop-blur-md z-40">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-4">
              <Logo size={40} />
              <span className="text-xl font-display font-black tracking-tighter text-white uppercase">INNOVATION CITY</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            <a href="#" className="text-sm font-medium text-zinc-300 hover:text-brand-teal transition-colors">About Us</a>
          </nav>
          
          <div className="flex items-center gap-6">
            {!isLoggedIn && (
              <button 
                onClick={() => setShowSignUp(true)}
                className="px-8 py-2.5 bg-brand-teal text-black font-bold text-xs rounded-lg hover:bg-brand-teal/90 transition-all shadow-[0_0_20px_rgba(112,199,217,0.3)] uppercase tracking-widest"
              >
                Login
              </button>
            )}
          </div>
        </header>

        {/* Hero Text Overlay / Sign Up */}
        {!isLoggedIn && !showSignUp ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full px-6">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-display font-medium tracking-[0.4em] text-brand-teal mb-6"
            >
              WELCOME TO
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-8xl font-display font-black text-white mb-6 tracking-tighter leading-none"
            >
              INNOVATION CITY
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-display font-medium text-zinc-400 tracking-[0.3em] mb-12"
            >
              THE FREE ZONE OF THE FUTURE
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button 
                onClick={() => setShowSignUp(true)}
                className="px-12 py-4 bg-brand-teal text-black font-black text-sm rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(112,199,217,0.4)] uppercase tracking-[0.2em]"
              >
                Enter the Ecosystem
              </button>
            </motion.div>
          </div>
        ) : showSignUp && !isLoggedIn ? (
          <div className="absolute inset-0 z-50 bg-brand-dark overflow-y-auto py-20 px-6">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            
            <div className="max-w-6xl mx-auto relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white text-center mb-20 tracking-tight uppercase leading-tight">
                Let's build the <br /> future, together.
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                {/* Left Side: Features */}
                <div className="space-y-12">
                  {[
                    { 
                      icon: Zap, 
                      title: "Fast & Future-Ready:", 
                      desc: "Get your business license issued in hours, powered by AI automation." 
                    },
                    { 
                      icon: Globe, 
                      title: "Global Ecosystem:", 
                      desc: "Access investors, talent, accelerators, and world-class infrastructure." 
                    },
                    { 
                      icon: ShieldCheck, 
                      title: "Transparent & Secure:", 
                      desc: "Blockchain-verified audit trails and regulatory compliance built-in." 
                    },
                    { 
                      icon: Users, 
                      title: "Tailored Support:", 
                      desc: "From startups to enterprises, our packages grow with your vision." 
                    }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-teal/50 transition-colors">
                        <feature.icon className="w-6 h-6 text-brand-teal" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">{feature.title}</h4>
                        <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Right Side: Form */}
                <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-8">Tell us what you're building</h3>
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoggedIn(true);
                    setShowSignUp(false);
                    setActiveDashboard(null);
                  }}>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="First Name" 
                        className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal/50 transition-colors"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="Last Name" 
                        className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal/50 transition-colors"
                        required
                      />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal/50 transition-colors"
                      required
                    />
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="text-lg">🇦🇪</span>
                        <span className="text-xs text-zinc-400">+971</span>
                      </div>
                      <input 
                        type="tel" 
                        placeholder="Phone Number*" 
                        className="w-full bg-zinc-800/50 border border-white/5 rounded-xl pl-20 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal/50 transition-colors"
                        required
                      />
                    </div>
                    <select className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-400 focus:outline-none focus:border-brand-teal/50 transition-colors appearance-none">
                      <option>Inquiry Type*</option>
                      <option>Tech Startup</option>
                      <option>Investor</option>
                      <option>Corporate</option>
                    </select>
                    <textarea 
                      placeholder="Message" 
                      rows={4}
                      className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal/50 transition-colors resize-none"
                    />
                    <button 
                      type="submit"
                      className="w-full py-4 bg-brand-teal text-black font-black text-sm rounded-xl hover:scale-[1.02] transition-all shadow-lg uppercase tracking-widest mt-4"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : isLoggedIn && messages.length <= 1 && !activeDashboard && (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none select-none">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-display font-medium tracking-[0.3em] text-brand-teal mb-4"
            >
              WELCOME TO
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl font-display font-black text-white mb-4 tracking-tighter"
            >
              INNOVATION CITY
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-display font-medium text-zinc-400 tracking-widest"
            >
              THE FREE ZONE OF THE FUTURE
            </motion.p>
          </div>
        )}

        {/* Chat Area or Dashboard */}
        {isLoggedIn && (
          activeDashboard ? (
            <div className="flex-1 overflow-y-auto bg-brand-dark/50 backdrop-blur-sm z-10 relative pt-20">
              <div className="absolute top-24 left-8 flex items-center gap-4">
                <button 
                  onClick={() => setActiveDashboard(null)}
                  className="flex items-center gap-2 text-xs text-zinc-500 hover:text-brand-teal transition-colors uppercase tracking-widest"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to Chat
                </button>
              </div>
              <DashboardView type={activeDashboard} />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10 z-10 relative">
          <div className="max-w-4xl mx-auto space-y-8 pt-20">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                  "flex gap-4",
                  message.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border backdrop-blur-md",
                  message.role === 'user' 
                    ? "bg-brand-teal/10 border-brand-teal/20 text-brand-teal" 
                    : "bg-white/5 border-white/10 text-zinc-400"
                )}>
                  {message.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                </div>
                
                <div className={cn(
                  "flex flex-col gap-2 max-w-[85%]",
                  message.role === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "px-6 py-5 rounded-2xl text-sm leading-relaxed backdrop-blur-xl",
                    message.role === 'user' 
                      ? "bg-brand-teal/80 text-black font-semibold border border-brand-teal/20" 
                      : "bg-brand-surface/80 text-zinc-200 border border-brand-border shadow-2xl"
                  )}>
                    <div className="markdown-body prose prose-invert prose-sm max-w-none">
                      <Markdown>{message.content}</Markdown>
                    </div>
                    {message.actions && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {message.actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => handleAction(action)}
                            className="px-5 py-2.5 rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold hover:bg-brand-teal hover:text-black transition-all active:scale-95 uppercase tracking-wider"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                      {message.role === 'user' ? 'Investor' : 'AI_ORCHESTRATOR'}
                    </span>
                    <span className="text-zinc-800">•</span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Bot className="w-6 h-6 text-zinc-400" />
                </div>
                <div className="flex items-center gap-2 px-6 py-5 rounded-2xl bg-brand-surface/80 border border-brand-border shadow-2xl backdrop-blur-xl">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce" />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest ml-3">Processing Request...</span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        )
        )}

        {/* Input Area */}
        {isLoggedIn && !activeDashboard && (
          <div className="p-8 bg-gradient-to-t from-brand-dark via-brand-dark to-transparent z-20">
          <div className="max-w-4xl mx-auto">
            <form 
              onSubmit={handleSubmit}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-teal/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
              <div className="relative flex items-center bg-brand-surface/90 border border-brand-border rounded-2xl overflow-hidden focus-within:border-brand-teal/50 transition-all shadow-2xl backdrop-blur-xl">
                <div className="pl-6 text-zinc-500">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Query the AI OS Orchestrator (e.g., 'check visa status', 'license renewal')..."
                  className="flex-1 bg-transparent px-5 py-6 text-sm focus:outline-none placeholder:text-zinc-600"
                />
                <div className="flex items-center gap-3 px-6">
                  <button
                    type="button"
                    onClick={() => setIsComplianceOpen(true)}
                    className="p-2 text-zinc-500 hover:text-brand-teal transition-colors"
                    title="Compliance Center"
                  >
                    <ShieldCheck className="w-6 h-6" />
                  </button>
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className={cn(
                      "p-3 rounded-xl transition-all",
                      input.trim() && !isLoading 
                        ? "bg-brand-teal text-black shadow-[0_0_25px_rgba(112,199,217,0.4)] hover:scale-105 active:scale-95" 
                        : "text-zinc-600 bg-white/5"
                    )}
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-6 flex items-center justify-center gap-10">
              <div className="flex items-center gap-2.5">
                <Activity className="w-3.5 h-3.5 text-brand-teal" />
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">System Health: Optimal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Regulatory Sync: Active</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-3.5 h-3.5 text-brand-teal" />
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Data Residency: UAE</span>
              </div>
            </div>
          </div>
        </div>
        )}
      </main>
    </div>
  );
}


