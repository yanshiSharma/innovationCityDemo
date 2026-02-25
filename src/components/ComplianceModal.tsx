import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, ExternalLink, Scale, FileText, Landmark } from 'lucide-react';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LAWS = [
  {
    id: 'pdpl',
    title: 'Data Protection (PDPL)',
    law: 'Federal Decree-Law No. 45 of 2021',
    desc: 'Governs personal data processing, consent management, and data subject rights within Innovation City.',
    icon: ShieldCheck,
    color: 'text-brand-teal',
    bg: 'bg-brand-teal/10'
  },
  {
    id: 'aml',
    title: 'Anti-Money Laundering',
    law: 'Federal Decree-Law No. 20 of 2018',
    desc: 'Mandatory KYC/AML screening for all entities, shareholders, and UBOs to align with FATF standards.',
    icon: Landmark,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10'
  },
  {
    id: 'labour',
    title: 'UAE Labour Law',
    law: 'Federal Decree-Law No. 33 of 2021',
    desc: 'Standardized employment contracts, leave entitlements, and end-of-service gratuity calculations.',
    icon: Users,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    id: 'ubo',
    title: 'UBO Regulations',
    law: 'Cabinet Decision No. 58 of 2020',
    desc: 'Requirement to maintain and disclose Ultimate Beneficial Ownership chains to the Ministry of Economy.',
    icon: Scale,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  }
];

import { Users } from 'lucide-react';

export const ComplianceModal: React.FC<ComplianceModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-brand-surface border border-brand-border rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-border flex items-center justify-between bg-white/2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-brand-teal" />
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-white uppercase font-display">Regulatory Compliance Center</h2>
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Innovation City AI OS • Legal Framework</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LAWS.map((item) => (
                  <div 
                    key={item.id}
                    className="p-5 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <ExternalLink className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                    </div>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-[10px] font-mono text-zinc-500 mb-3 uppercase tracking-tighter">{item.law}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-brand-teal/5 border border-brand-teal/10">
                <div className="flex items-center gap-3 mb-3">
                  <Landmark className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-bold text-sm text-brand-teal uppercase font-display">GIAL Integration Status</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Ministry of Economy (NER)</span>
                    <span className="text-brand-teal font-mono">CONNECTED</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">ICA Smart Services</span>
                    <span className="text-brand-teal font-mono">CONNECTED</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">MOHRE Tawjeeh API</span>
                    <span className="text-amber-400 font-mono">PENDING_AUTH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-white/2 flex items-center justify-between">
              <p className="text-[10px] text-zinc-600 font-mono uppercase">Last Audit: 2026-02-24 06:11:23</p>
              <button 
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-all"
              >
                Close Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
