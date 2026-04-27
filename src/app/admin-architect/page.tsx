import React from 'react';
import LiveMonitor from '@/components/dashboard/LiveMonitor';
import Link from 'next/link';
import AuthLayer from '@/components/dashboard/AuthLayer';
import RangeSelector from '@/components/admin/RangeSelector';
import { getWebAnalytics, getLeadAnalytics, parseDate } from '@/lib/analytics';

export default async function AdminDashboard({ searchParams }: { searchParams?: { range?: string } }) {
  const range = (searchParams?.range as string) || '7';
  const days = Number(range || 7);
  const to = new Date();
  const from = new Date(to.getTime() - (days - 1) * 24 * 60 * 60 * 1000);

  const fromIso = parseDate(new Date(from.setHours(0,0,0,0)));
  const toIso = parseDate(new Date(to.setHours(23,59,59,999)));

  const web = await getWebAnalytics(fromIso, toIso);
  const leads = await getLeadAnalytics(fromIso, toIso);

  // KPIs
  const sessions = web.sessions || 0;
  const totalLeads = leads.total || 0;
  const conversion = sessions > 0 ? Math.round((totalLeads / sessions) * 100) : 0;
  const topSource = Object.entries(leads.bySource || {}).sort((a,b) => (b[1] as number) - (a[1] as number))[0]?.[0] || Object.keys(web.utms || {})[0] || 'N/A';

  const stats = {
    conversations: sessions,
    sentiment: 'Neutro',
    closingRate: 0,
    rejectionRate: 0,
    topTopic: topSource,
    actionStage: totalLeads,
  };

  return (
    <AuthLayer>
      <div className="min-h-screen bg-[#FDFCF8] text-zinc-900 font-sans selection:bg-orange-500/30">
        <header className="border-b border-zinc-100 bg-white/70 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-orange-500/20">
                A
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-zinc-900">Architect.Sys Console</h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Node Live - Production</span>
                </div>
              </div>
            </div>
            
            <nav className="flex items-center gap-4">
              <Link href="/onboarding" className="text-xs font-bold text-zinc-500 hover:text-orange-600 transition-colors">
                Onboarding
              </Link>
              <Link href="/api/diagnostic" target="_blank" className="text-xs font-bold text-zinc-500 hover:text-orange-600 transition-colors">
                Diagnostics
              </Link>
              <div className="h-4 w-px bg-zinc-200 mx-2"></div>
              <button className="bg-zinc-900 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg hover:bg-zinc-800 transition-all">
                Export Audit
              </button>
            </nav>
          </div>
        </header>

        <main className="max-w-[1600px] mx-auto p-6 space-y-8">
          {/* GRID DE KPIs DE ALTA DENSIDAD */}
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Conversaciones', value: stats.conversations, color: 'text-orange-600', trend: 'Live' },
              { label: 'IA Sentiment', value: stats.sentiment, color: 'text-green-600', trend: 'Análisis' },
              { label: 'Tasa de Cierre', value: `${stats.closingRate}%`, color: 'text-zinc-600', trend: 'ROI' },
              { label: 'Tasa de Rechazo', value: `${stats.rejectionRate}%`, color: 'text-red-500', trend: 'Filtro' },
              { label: 'Hot Topic', value: stats.topTopic, color: 'text-blue-600', trend: 'Tendencia' },
              { label: 'Conversiones', value: stats.actionStage, color: 'text-orange-600', trend: 'Acción' },
            ].map((m, i) => (
              <div key={i} className="bg-white border border-zinc-100 p-4 rounded-3xl shadow-sm transition-all hover:shadow-xl hover:shadow-zinc-200/50">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[9px] uppercase tracking-widest text-zinc-300 font-black">{m.label}</p>
                  <span className="text-[8px] px-1.5 py-0.5 bg-zinc-50 text-zinc-400 rounded-md font-bold">{m.trend}</span>
                </div>
                <p className={`text-xl font-black tracking-tighter ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </section>
          
          <section>
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-black tracking-tighter text-zinc-900">Live Conversation Stream</h2>
                <p className="text-zinc-400 text-sm">Auditoría en tiempo real y control de respuesta manual.</p>
              </div>
              <div className="text-sm text-zinc-500">Rango: {range === '1' ? 'Hoy' : range === '7' ? 'Últimos 7 días' : 'Últimos 30 días'}</div>
            </div>

            <div className="bg-white border border-zinc-100 p-1 rounded-[2.5rem] shadow-xl shadow-zinc-200/20">
              <LiveMonitor />
            </div>
          </section>

          <section>
            <div className="mt-6 bg-white border border-zinc-100 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-4">Leads ({totalLeads})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-zinc-500">
                    <tr>
                      <th className="p-2">Fecha</th>
                      <th className="p-2">Nombre</th>
                      <th className="p-2">Teléfono</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Canal</th>
                      <th className="p-2">utm_source</th>
                      <th className="p-2">utm_campaign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(leads.leads || []).map((l: any) => (
                      <tr key={l.id} className="odd:bg-zinc-50">
                        <td className="p-2">{new Date(l.created_at).toLocaleString()}</td>
                        <td className="p-2">{l.name}</td>
                        <td className="p-2">{l.phone}</td>
                        <td className="p-2">{l.email}</td>
                        <td className="p-2">{l.source}</td>
                        <td className="p-2">{l.utm_source}</td>
                        <td className="p-2">{l.utm_campaign}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </main>
      </div>
    </AuthLayer>
  );
}
