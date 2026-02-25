
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, AlertCircle, CheckCircle2, 
  Clock, Shield, Zap, Globe, Users, CreditCard, 
  Building2, FileText, Activity, Search, ShieldCheck,
  Sparkles, ChevronRight
} from 'lucide-react';
import * as Data from '../constants/dashboardData';
import { cn } from '../lib/utils';

interface DashboardViewProps {
  type: string;
  onClose?: () => void;
}

const COLORS = ['#70C7D9', '#6B5BB2', '#FF6321', '#00FF00', '#FFD700'];

export const DashboardView: React.FC<DashboardViewProps> = ({ type }) => {
  const renderProcurementEngine = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Purchase Requisition Submission */}
        <div className="lg:col-span-2 bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-5 h-5 text-brand-teal" />
            <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Purchase Requisition Submission</h5>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Requirement Description</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g., I need 50 chairs for the new co-working space expansion"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm text-white focus:outline-none focus:border-brand-teal/50 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-teal text-black text-[10px] font-bold rounded-lg uppercase tracking-widest">
                  Classify
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/2 border border-white/5 rounded-xl">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">AI Classification</p>
                <p className="text-sm font-bold text-brand-teal">Furniture & Fixtures</p>
              </div>
              <div className="p-4 bg-white/2 border border-white/5 rounded-xl">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Budget Availability</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <p className="text-sm font-bold text-emerald-400">Available (Finance Module Sync)</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-brand-teal/5 border border-brand-teal/10 rounded-xl">
              <h6 className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-2">Draft Purchase Requisition</h6>
              <p className="text-xs text-zinc-400 leading-relaxed">
                PR-2026-001: Procurement of 50 ergonomic office chairs for Co-working Zone B. 
                Estimated Budget: AED 12,500. Approval routing: Dept Head → Finance Director.
              </p>
            </div>
          </div>
        </div>

        {/* Approval Queue */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Approval Queue</h5>
            <button className="text-[10px] text-brand-teal font-bold uppercase hover:underline">DOA Matrix</button>
          </div>
          <div className="space-y-4">
            {Data.PROCUREMENT_ENGINE_DATA.approvalQueue.map((item, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-white">{item.type}</p>
                    <p className="text-[10px] text-zinc-500 uppercase">{item.requester}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[8px] font-bold rounded uppercase tracking-widest">
                    {item.priority}
                  </span>
                </div>
                <p className="text-sm font-bold text-brand-teal">{item.amount}</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-lg uppercase tracking-widest border border-emerald-500/30">Approve</button>
                  <button className="flex-1 py-2 bg-rose-500/20 text-rose-400 text-[10px] font-bold rounded-lg uppercase tracking-widest border border-rose-500/30">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supplier Selection Panel */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Supplier Selection Panel</h5>
            <button className="text-[10px] text-brand-teal font-bold uppercase hover:underline">Vendor Browser</button>
          </div>
          <div className="space-y-4">
            {Data.PROCUREMENT_ENGINE_DATA.vendors.map((vendor, i) => (
              <div key={i} className={cn(
                "p-4 rounded-xl border transition-all",
                vendor.recommended ? "bg-brand-teal/5 border-brand-teal/30" : "bg-white/2 border-white/5"
              )}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h6 className="text-sm font-bold text-white">{vendor.name}</h6>
                    <p className="text-[10px] text-zinc-500 uppercase">Performance: {vendor.performance}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{vendor.price}</p>
                    <p className="text-[10px] text-zinc-500 uppercase">Delivery: {vendor.delivery}</p>
                  </div>
                </div>
                {vendor.recommended && (
                  <div className="mt-3 pt-3 border-t border-brand-teal/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-3 h-3 text-brand-teal" />
                      <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">AI Recommendation</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 leading-relaxed italic">{vendor.justification}</p>
                    <button className="mt-3 w-full py-2 bg-brand-teal text-black text-[10px] font-bold rounded-lg uppercase tracking-widest">
                      Confirm Selection
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Performance Scorecards */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Vendor Performance Scorecards</h5>
          <div className="space-y-4">
            {Data.PROCUREMENT_ENGINE_DATA.scorecards.map((card, i) => (
              <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-xl">
                <h6 className="text-sm font-bold text-white mb-4">{card.vendor}</h6>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest mb-1">On-Time</p>
                    <p className="text-xs font-bold text-emerald-400">{card.onTime}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest mb-1">Quality</p>
                    <p className="text-xs font-bold text-emerald-400">{card.quality}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest mb-1">Accuracy</p>
                    <p className="text-xs font-bold text-emerald-400">{card.accuracy}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest mb-1">Response</p>
                    <p className="text-xs font-bold text-brand-teal">{card.responsiveness}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Compliance Docs</span>
                  <span className="text-[10px] font-mono text-emerald-400">{card.docs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendor Risk Alerts */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Vendor Risk Alerts</h5>
          <div className="space-y-4">
            {Data.PROCUREMENT_ENGINE_DATA.riskAlerts.map((alert, i) => (
              <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-xl flex items-start gap-4">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  alert.risk === 'Critical' ? "bg-rose-500/10" : alert.risk === 'High' ? "bg-amber-500/10" : "bg-brand-teal/10"
                )}>
                  <AlertCircle className={cn(
                    "w-4 h-4",
                    alert.risk === 'Critical' ? "text-rose-500" : alert.risk === 'High' ? "text-amber-500" : "text-brand-teal"
                  )} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-white uppercase">{alert.type}</span>
                    <span className={cn(
                      "px-1.5 py-0.5 text-[8px] font-bold rounded uppercase",
                      alert.risk === 'Critical' ? "bg-rose-500/10 text-rose-400" : alert.risk === 'High' ? "bg-amber-500/10 text-amber-400" : "bg-brand-teal/10 text-brand-teal"
                    )}>{alert.risk}</span>
                  </div>
                  <p className="text-xs font-bold text-zinc-300 mb-1">{alert.vendor}</p>
                  <p className="text-[10px] text-zinc-500 leading-relaxed">{alert.signal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Order Tracker */}
        <div className="lg:col-span-2 bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
          <div className="p-6 border-bottom border-brand-border">
            <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Purchase Order Tracker</h5>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-zinc-500">
              <tr>
                <th className="px-6 py-3 font-medium">PO ID</th>
                <th className="px-6 py-3 font-medium">Vendor</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Data.PROCUREMENT_ENGINE_DATA.pos.map((po, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-zinc-400">{po.id}</td>
                  <td className="px-6 py-4 text-white font-medium">{po.vendor}</td>
                  <td className="px-6 py-4 text-zinc-300">{po.amount}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 text-[10px] font-bold rounded uppercase tracking-tighter",
                      po.status === 'Paid' ? "bg-emerald-500/10 text-emerald-400" : "bg-brand-teal/10 text-brand-teal"
                    )}>{po.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full", po.payment === 'Confirmed' ? "bg-emerald-400" : "bg-amber-400")} />
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{po.payment}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance & Audit Trail */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
        <div className="p-6 border-bottom border-brand-border flex items-center justify-between">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Compliance & Audit Trail</h5>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Anti-Corruption (Law No. 2 of 2016)</span>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {Data.PROCUREMENT_ENGINE_DATA.auditTrail.map((log, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white/2 border border-white/5 rounded-xl">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-zinc-500">{log.timestamp}</span>
                <p className="text-xs font-bold text-white">{log.action}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">User: {log.user}</span>
                <span className="text-[10px] text-brand-teal font-mono">{log.compliance}</span>
              </div>
            </div>
          ))}
          <div className="pt-4 flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest">
            <Clock className="w-3 h-3" />
            Post-approval lock active: Decisions cannot be modified once approved.
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarketingIntel = () => (
    <div className="space-y-8">
      {/* Campaign Overview Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Active Campaigns", value: Data.MARKETING_INTEL_DATA.overview.activeCampaigns, icon: Activity },
          { label: "Leads Generated", value: Data.MARKETING_INTEL_DATA.overview.leadsGenerated, icon: Users },
          { label: "Cost Per Lead", value: Data.MARKETING_INTEL_DATA.overview.costPerLead, icon: CreditCard },
          { label: "Conversion Rate", value: Data.MARKETING_INTEL_DATA.overview.conversionRate, icon: TrendingUp },
          { label: "Budget Spent", value: Data.MARKETING_INTEL_DATA.overview.budgetSpent, icon: Zap },
          { label: "Budget Allocated", value: Data.MARKETING_INTEL_DATA.overview.budgetAllocated, icon: Building2 },
        ].map((stat, i) => (
          <div key={i} className="bg-brand-surface border border-brand-border p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[8px] text-zinc-500 uppercase tracking-widest">{stat.label}</p>
              <stat.icon className="w-3 h-3 text-brand-teal" />
            </div>
            <h4 className="text-lg font-bold text-white">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Performance Summary */}
          <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-brand-teal" />
              <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Weekly Performance Summary (AI-Generated)</h5>
            </div>
            <div className="p-4 bg-brand-teal/5 border border-brand-teal/10 rounded-xl">
              <p className="text-sm text-zinc-300 leading-relaxed italic">
                "{Data.MARKETING_INTEL_DATA.overview.summary}"
              </p>
            </div>
          </div>

          {/* Active Campaigns Table */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
            <div className="p-6 border-bottom border-brand-border">
              <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Active Campaigns</h5>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-zinc-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Campaign</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Leads</th>
                  <th className="px-6 py-3 font-medium">CTR</th>
                  <th className="px-6 py-3 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {Data.MARKETING_INTEL_DATA.activeCampaigns.map((camp, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-white">{camp.name}</p>
                      <p className="text-[10px] text-zinc-500 uppercase">{camp.type}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 text-[10px] font-bold rounded uppercase tracking-tighter",
                        camp.status === 'Active' ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-zinc-500"
                      )}>{camp.status}</span>
                    </td>
                    <td className="px-6 py-4 text-zinc-300 font-mono">{camp.leads}</td>
                    <td className="px-6 py-4 text-zinc-300 font-mono">{camp.ctr}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-full", camp.performance === 'Above Benchmark' ? "bg-emerald-400" : "bg-rose-400")} />
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest", camp.performance === 'Above Benchmark' ? "text-emerald-400" : "text-rose-400")}>
                          {camp.performance}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign Creation Panel */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Campaign Creation Panel</h5>
          <form className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Campaign Type</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-brand-teal/50 transition-colors appearance-none">
                <option>Email Nurture Sequence</option>
                <option>LinkedIn Paid Campaign</option>
                <option>Event Invitation</option>
                <option>Webinar Promotion</option>
                <option>Content Distribution</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Industry Vertical</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-brand-teal/50 transition-colors appearance-none">
                <option>AI & Deep Tech</option>
                <option>R&D & Robotics</option>
                <option>SaaS & Cloud</option>
                <option>Fintech</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Budget (AED)</label>
              <input type="number" placeholder="50,000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-teal/50 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Start Date</label>
                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-zinc-400 focus:outline-none focus:border-brand-teal/50 transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">End Date</label>
                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-zinc-400 focus:outline-none focus:border-brand-teal/50 transition-colors" />
              </div>
            </div>
            <button className="w-full py-3 bg-brand-teal text-black font-bold text-xs rounded-xl uppercase tracking-widest mt-4">
              Launch Campaign
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* A/B Testing Panel */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">A/B Testing Panel</h5>
          {Data.MARKETING_INTEL_DATA.abTesting.map((test, i) => (
            <div key={i} className="space-y-4">
              <p className="text-xs font-bold text-white">{test.campaign}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/2 border border-white/5 rounded-xl text-center">
                  <p className="text-[8px] text-zinc-500 uppercase mb-1">Variant A</p>
                  <p className="text-lg font-bold text-zinc-400">{test.variantA}</p>
                </div>
                <div className="p-4 bg-brand-teal/10 border border-brand-teal/30 rounded-xl text-center">
                  <p className="text-[8px] text-brand-teal uppercase mb-1">Variant B</p>
                  <p className="text-lg font-bold text-brand-teal">{test.variantB}</p>
                </div>
              </div>
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">AI Recommended Winner</span>
                </div>
                <p className="text-[10px] text-zinc-400 leading-relaxed italic">"{test.recommendation}"</p>
                <button className="mt-3 w-full py-2 bg-emerald-500 text-black text-[10px] font-bold rounded-lg uppercase tracking-widest">
                  Apply Winner
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Channel Performance Optimizer */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Channel Optimizer</h5>
          <div className="space-y-4">
            {Data.MARKETING_INTEL_DATA.channelOptimization.map((opt, i) => (
              <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-white">{opt.channel}</span>
                  <span className="text-[10px] text-zinc-500 uppercase">Current: {opt.allocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-brand-teal" />
                  <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">{opt.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prospect Pipeline */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Prospect Pipeline</h5>
          <div className="space-y-4">
            {Data.MARKETING_INTEL_DATA.prospectPipeline.map((prospect, i) => (
              <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <h6 className="text-xs font-bold text-white">{prospect.company}</h6>
                  <span className="text-[10px] font-mono text-brand-teal">Score: {prospect.scoring}</span>
                </div>
                <p className="text-[10px] text-zinc-400">{prospect.contact}</p>
                <p className="text-[10px] text-zinc-500 italic">"{prospect.profile}"</p>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[8px] text-zinc-600 uppercase tracking-widest">BD: {prospect.bd}</span>
                  <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">{prospect.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event & Webinar Management */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Event & Webinar Management</h5>
          <div className="space-y-4">
            {Data.MARKETING_INTEL_DATA.events.map((event, i) => (
              <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="text-xs font-bold text-white">{event.name}</h6>
                  <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">Funnel: {event.funnel}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[8px] text-zinc-500 uppercase mb-1">Registrations</p>
                    <p className="text-xs font-bold text-white">{event.registrations}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-zinc-500 uppercase mb-1">Target</p>
                    <p className="text-xs font-bold text-zinc-400">{event.target}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-zinc-500 uppercase mb-1">Follow-up</p>
                    <p className="text-xs font-bold text-emerald-400">{event.followUp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Distribution Tracker */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Content Distribution Tracker</h5>
          <div className="space-y-4">
            {Data.MARKETING_INTEL_DATA.contentTracker.map((asset, i) => (
              <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-xl flex items-center justify-between">
                <div>
                  <h6 className="text-xs font-bold text-white">{asset.asset}</h6>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{asset.segment}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-brand-teal">{asset.downloads}</p>
                  <p className="text-[8px] text-zinc-600 uppercase">Downloads</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competitor Intelligence Panel */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Competitor Intelligence Panel</h5>
          {Data.MARKETING_INTEL_DATA.competitorIntel.map((intel, i) => (
            <div key={i} className="space-y-4">
              <div className="flex justify-between items-center">
                <h6 className="text-xs font-bold text-white">{intel.prospect}</h6>
                <div className="flex gap-2">
                  {intel.evaluating.map((comp, ci) => (
                    <span key={ci} className="px-2 py-0.5 bg-white/5 text-zinc-500 text-[8px] font-bold rounded uppercase tracking-widest border border-white/10">{comp}</span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-brand-teal/5 border border-brand-teal/10 rounded-xl">
                <p className="text-[10px] text-zinc-300 leading-relaxed">{intel.comparison}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[8px] text-zinc-500 uppercase tracking-widest">Recommended Talking Points</p>
                <div className="p-3 bg-white/2 border border-white/5 rounded-xl">
                  <p className="text-[10px] text-brand-teal font-bold">{intel.talkingPoints}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights & Recommendations */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">AI Insights & Recommendations</h5>
          <div className="space-y-4">
            {Data.MARKETING_INTEL_DATA.aiInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white/2 border border-white/5 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-brand-surface border border-brand-border p-6 rounded-2xl h-[300px]">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">AR Aging Analysis</h5>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={Data.FINANCE_DATA.arAging}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="range" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#151619', border: '1px solid #ffffff10', borderRadius: '8px' }}
                cursor={{ fill: '#ffffff05' }}
              />
              <Bar dataKey="amount" fill="#70C7D9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-4">
          <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Daily Cash Position</p>
            <h4 className="text-2xl font-bold text-white">{Data.FINANCE_DATA.cashPosition}</h4>
          </div>
          <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">WPS Compliance</p>
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded uppercase tracking-tighter">
                {Data.FINANCE_DATA.kpis.wpsStatus}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Collection Rate</p>
              <span className="text-lg font-bold text-white">{Data.FINANCE_DATA.kpis.collectionRate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVisa = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
          <div className="p-6 border-bottom border-brand-border">
            <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Compliance Calendar</h5>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-zinc-500">
              <tr>
                <th className="px-6 py-3 font-medium">Employee</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Expiry</th>
                <th className="px-6 py-3 font-medium">Fines</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Data.VISA_DATA.expiries.map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                  <td className="px-6 py-4 text-zinc-400">{item.type}</td>
                  <td className="px-6 py-4 text-zinc-400">{item.expiry}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs font-bold",
                      item.fine !== 'AED 0' ? "text-rose-400" : "text-emerald-400"
                    )}>
                      {item.fine}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl h-[300px]">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Quota Utilization</h5>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Used', value: Data.VISA_DATA.quota.used },
                  { name: 'Available', value: Data.VISA_DATA.quota.available },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#70C7D9" />
                <Cell fill="#ffffff10" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-[-100px] mb-[60px]">
            <p className="text-2xl font-bold text-white">{Data.VISA_DATA.quota.used}</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Total Active Visas</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLegal = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-brand-teal" />
            <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">AML/KYC Status</h5>
          </div>
          <div className="space-y-4">
            {Data.LEGAL_DATA.amlStatus.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div>
                  <p className="text-sm font-bold text-white">{item.entity}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Risk: {item.risk}</p>
                </div>
                <span className={cn(
                  "px-2 py-1 text-[10px] font-bold rounded uppercase tracking-tighter",
                  item.status === 'Cleared' ? "bg-emerald-500/10 text-emerald-400" : 
                  item.status === 'Pending' ? "bg-amber-500/10 text-amber-400" : "bg-rose-500/10 text-rose-400"
                )}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl flex flex-col justify-center items-center text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
          <h4 className="text-4xl font-bold text-white mb-2">{Data.LEGAL_DATA.sanctionsAlerts}</h4>
          <p className="text-xs text-zinc-400 uppercase tracking-widest">Active Sanctions Alerts</p>
          <button className="mt-6 w-full py-2 bg-rose-500/20 text-rose-400 text-[10px] font-bold rounded-lg uppercase tracking-widest border border-rose-500/30">
            Review Alerts
          </button>
        </div>

        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl flex flex-col justify-center items-center text-center">
          <FileText className="w-12 h-12 text-brand-teal mb-4" />
          <h4 className="text-4xl font-bold text-white mb-2">{Data.LEGAL_DATA.strQueue}</h4>
          <p className="text-xs text-zinc-400 uppercase tracking-widest">STR Queue Length</p>
          <button className="mt-6 w-full py-2 bg-brand-teal/20 text-brand-teal text-[10px] font-bold rounded-lg uppercase tracking-widest border border-brand-teal/30">
            Open Queue
          </button>
        </div>
      </div>
    </div>
  );

  const renderMohre = () => (
    <div className="bg-brand-surface border border-brand-border p-8 rounded-2xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">MOHRE Compliance</h5>
          <h4 className="text-3xl font-bold text-white">Emiratization Tracking</h4>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Total Headcount</p>
          <p className="text-2xl font-bold text-brand-teal">{Data.MOHRE_DATA.headcount}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
              <span>Current Percentage</span>
              <span>{Data.MOHRE_DATA.emiratization.current}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-teal" 
                style={{ width: Data.MOHRE_DATA.emiratization.current }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
              <span>Target Percentage</span>
              <span>{Data.MOHRE_DATA.emiratization.target}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-teal/30" 
                style={{ width: Data.MOHRE_DATA.emiratization.target }}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
          <Users className="w-8 h-8 text-brand-teal mb-3" />
          <h4 className="text-2xl font-bold text-white">{Data.MOHRE_DATA.emiratization.nafisEnrolled}</h4>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Nafis Enrolled Employees</p>
        </div>
        
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-3" />
          <h4 className="text-lg font-bold text-white uppercase tracking-tighter">Compliant</h4>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Current Status</p>
        </div>
      </div>
    </div>
  );

  const renderSustainability = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl h-[350px]">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Carbon Emissions by Scope</h5>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={Data.SUSTAINABILITY_DATA.emissions} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
              <XAxis type="number" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis dataKey="scope" type="category" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#151619', border: '1px solid #ffffff10', borderRadius: '8px' }}
                cursor={{ fill: '#ffffff05' }}
              />
              <Bar dataKey="value" fill="#70C7D9" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl h-[350px]">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Emissions Trend (tCO2e)</h5>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={Data.SUSTAINABILITY_DATA.trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="month" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#151619', border: '1px solid #ffffff10', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="emissions" stroke="#70C7D9" strokeWidth={3} dot={{ fill: '#70C7D9', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
          <div className="p-6 border-bottom border-brand-border flex items-center justify-between">
            <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Access Anomaly Monitoring</h5>
            <span className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              <Activity className="w-3 h-3 animate-pulse" />
              Live Feed
            </span>
          </div>
          <div className="divide-y divide-white/5">
            {Data.SECURITY_DATA.anomalies.map((item, i) => (
              <div key={i} className="p-4 hover:bg-white/5 transition-colors flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-mono text-zinc-500">{item.time}</span>
                    <span className="text-xs font-bold text-white">{item.type}</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl text-center">
            <Zap className="w-10 h-10 text-brand-teal mx-auto mb-4" />
            <h4 className="text-3xl font-bold text-white mb-1">{Data.SECURITY_DATA.cctvAlerts}</h4>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">CCTV Intelligence Alerts</p>
          </div>
          <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl text-center">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-1">{Data.SECURITY_DATA.incidentStatus}</h4>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Overall Incident Status</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBD = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl h-[350px]">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">CRM Pipeline Intelligence</h5>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={Data.BD_DATA.pipeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="stage" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#151619', border: '1px solid #ffffff10', borderRadius: '8px' }}
              />
              <Bar dataKey="count" fill="#70C7D9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Priority Action List</h5>
          <div className="space-y-4">
            {Data.BD_DATA.priorityActions.map((action, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-brand-teal/30 transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-brand-teal" />
                </div>
                <p className="text-sm text-zinc-200">{action}</p>
              </div>
            ))}
            <div className="pt-6 border-t border-white/5 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Conversion Rate</span>
                <span className="text-xl font-bold text-brand-teal">{Data.BD_DATA.conversionRate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAudit = () => (
    <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
      <div className="p-6 border-bottom border-brand-border flex items-center justify-between">
        <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Immutable Regulatory Audit Trail</h5>
        <span className="px-3 py-1 bg-brand-teal/10 text-brand-teal text-[10px] font-bold rounded-full uppercase tracking-widest border border-brand-teal/20">
          Blockchain Verified
        </span>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-zinc-500">
          <tr>
            <th className="px-6 py-3 font-medium">Timestamp</th>
            <th className="px-6 py-3 font-medium">User</th>
            <th className="px-6 py-3 font-medium">Action</th>
            <th className="px-6 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {Data.AUDIT_TRAIL.map((item, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 font-mono text-[10px] text-zinc-400">{item.timestamp}</td>
              <td className="px-6 py-4 text-zinc-300">{item.user}</td>
              <td className="px-6 py-4 text-white font-medium">{item.action}</td>
              <td className="px-6 py-4">
                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">{item.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHITL = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Data.HITL_QUEUE.map((item, i) => (
          <div key={i} className="bg-brand-surface border border-brand-border p-6 rounded-2xl relative overflow-hidden group hover:border-brand-teal/50 transition-all">
            <div className={cn(
              "absolute top-0 left-0 w-1 h-full",
              item.priority === 'Critical' ? "bg-rose-500" : 
              item.priority === 'High' ? "bg-amber-500" : "bg-brand-teal"
            )} />
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-zinc-500">{item.id}</span>
              <span className={cn(
                "px-2 py-0.5 text-[8px] font-bold rounded uppercase tracking-widest",
                item.priority === 'Critical' ? "bg-rose-500/10 text-rose-400" : 
                item.priority === 'High' ? "bg-amber-500/10 text-amber-400" : "bg-brand-teal/10 text-brand-teal"
              )}>
                {item.priority}
              </span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{item.type}</h4>
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest">
              <Clock className="w-3 h-3" />
              Waiting for {item.timeInQueue}
            </div>
            <button className="mt-6 w-full py-2.5 bg-brand-teal text-black font-bold text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest">
              Review Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVendor = () => (
    <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
      <div className="p-6 border-bottom border-brand-border">
        <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Vendor Scorecards (M11.2)</h5>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-zinc-500">
          <tr>
            <th className="px-6 py-3 font-medium">Vendor</th>
            <th className="px-6 py-3 font-medium">Category</th>
            <th className="px-6 py-3 font-medium">Performance Score</th>
            <th className="px-6 py-3 font-medium">Delivery Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {Data.VENDOR_DATA.map((vendor, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 font-medium text-white">{vendor.name}</td>
              <td className="px-6 py-4 text-zinc-400">{vendor.category}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[100px]">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        vendor.score >= 90 ? "bg-emerald-400" : 
                        vendor.score >= 80 ? "bg-brand-teal" : "bg-amber-400"
                      )}
                      style={{ width: `${vendor.score}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white">{vendor.score}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  vendor.delivery === 'On-time' ? "text-emerald-400" : "text-amber-400"
                )}>
                  {vendor.delivery}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case 'finance': return renderFinance();
      case 'visa': return renderVisa();
      case 'legal': return renderLegal();
      case 'mohre': return renderMohre();
      case 'vendor': return renderVendor();
      case 'sustainability': return renderSustainability();
      case 'security': return renderSecurity();
      case 'bd': return renderBD();
      case 'audit': return renderAudit();
      case 'hitl': return renderHITL();
      case 'procurement_engine': return renderProcurementEngine();
      case 'campaign_intel': return renderMarketingIntel();
      default: return <div className="text-center py-20 text-zinc-500">Dashboard not found</div>;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'finance': return "Finance";
      case 'visa': return "Visa/Immigration";
      case 'legal': return "Legal/Compliance";
      case 'mohre': return "MOHRE Compliance";
      case 'vendor': return "Vendor Management";
      case 'sustainability': return "Sustainability";
      case 'security': return "Security";
      case 'bd': return "CRM Pipeline Intelligence";
      case 'audit': return "Audit Trail";
      case 'hitl': return "Human-in-the-Loop";
      case 'procurement_engine': return "AI Procurement Engine";
      case 'campaign_intel': return "Campaign Intelligence";
      default: return "Dashboard";
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-display font-black text-white tracking-tighter uppercase">{getTitle()}</h2>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-[0.3em] mt-2">Innovation City AI OS • Real-time Intelligence</p>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};
