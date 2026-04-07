import React from 'react';
import { supabase } from '@/lib/supabase';

// FORCE NEXT.JS TO RENDER AT RUNTIME ONLY (PREVENTS VERCEL BUILD FAILURES)
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function AdminCRM() {
  let leads: Record<string, any[]> = {};
  let errorMsg = null;

  try {
    const { data: chats, error } = await supabase
      .from('chats')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (chats) {
      leads = chats.reduce((acc: Record<string, any[]>, chat: any) => {
        if (!acc[chat.phone]) acc[chat.phone] = [];
        acc[chat.phone].push(chat);
        return acc;
      }, {});
    }
  } catch (err: any) {
    console.error("Supabase connection error:", err);
    errorMsg = err.message || "Error al conectar con la base de datos.";
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-8 text-[#FF4500]">Sala de Control | Architect.Sys</h1>
        
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-8 border border-red-200">
            <strong>Error de Conexión:</strong> {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.keys(leads).map((phone) => (
            <div key={phone} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col max-h-[600px]">
              <h2 className="text-xl font-bold mb-4 border-b pb-2 sticky top-0 bg-white z-10">Lead: {phone}</h2>
              <div className="space-y-4 overflow-y-auto pr-2 flex-1 flex flex-col-reverse">
                {leads[phone].map((msg: any) => (
                  <div key={msg.id} className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-gray-100 mr-4' : 'bg-orange-50 text-orange-900 ml-4 border border-orange-100'}`}>
                    <span className="font-bold uppercase text-[10px] block mb-1 opacity-50">{msg.role}</span>
                    {msg.content}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(leads).length === 0 && !errorMsg && (
             <p className="text-gray-500 italic bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">No hay conversaciones registradas aún. El webhook está a la espera.</p>
          )}
        </div>
      </div>
    </div>
  );
}
