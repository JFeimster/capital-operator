import React from 'react';
import { ArrowUpRight, Banknote, Building2, FileText, Landmark, PackageOpen, Truck } from 'lucide-react';
import { Container } from '../layout/Container';
import { toAppHref } from '../../lib/routeLocation';

const actions = [
  { label: 'Working Capital', desc: 'Operating cash, payroll, inventory, growth', href: '/get-funded/working-capital', icon: Banknote },
  { label: 'Finance Equipment', desc: 'Vehicles, machinery, tools, production assets', href: '/get-funded/equipment', icon: Truck },
  { label: 'Buy a Business', desc: 'Acquisition and SBA-oriented capital paths', href: '/get-funded/business-acquisition', icon: Building2 },
  { label: 'Fund a Gov Contract', desc: 'Mobilization, hiring, equipment, receivables', href: '/get-funded/government-contract', icon: FileText },
  { label: 'Finance Receivables', desc: 'Factoring and invoice-driven working capital', href: '/get-funded/factoring', icon: PackageOpen },
  { label: 'Commercial Real Estate', desc: 'Property-backed and DSCR-oriented paths', href: '/get-funded/commercial-real-estate', icon: Landmark }
];

export const ActionDeck: React.FC = () => (
  <div className="relative -mt-2 pb-10 sm:pb-14">
    <Container>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] sm:text-xs tracking-[.2em] text-cyan-400">START WITH THE OUTCOME</div>
          <h2 className="mt-1 text-xl sm:text-2xl font-black text-white">What are you trying to fund?</h2>
        </div>
        <a href={toAppHref('/get-funded')} className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-emerald-200">
          All funding paths <ArrowUpRight className="h-3.5 w-3.5"/>
        </a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map(({label,desc,href,icon:Icon}) => (
          <a key={href} href={toAppHref(href)}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/55 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-slate-900 card-glow-hover">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.12),transparent_45%)]"/>
            <div className="relative flex items-start gap-4">
              <div className="rounded-xl border border-slate-700 bg-slate-950 p-2.5 group-hover:border-emerald-500/40">
                <Icon className="h-5 w-5 text-emerald-400"/>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-white">{label}</h3>
                  <ArrowUpRight className="h-4 w-4 text-slate-600 group-hover:text-emerald-400"/>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{desc}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </Container>
  </div>
);
