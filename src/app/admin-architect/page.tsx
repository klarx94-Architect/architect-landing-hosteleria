import React from 'react';
import { supabase } from '@/lib/supabase';

export const revalidate = 0; // Dynamic route

export default async function AdminCRM() {
  const { data: chats } = await supabase
    .from('chats')
    .select('*')
    .order('created_at', { ascending: false });

  // Group by phone
  const leads = chats?.reduce((acc: any, chat: any) => {
    if (!acc[chat.phone]) acc[chat.phone] = [];
    acc[chat.phone].push(chat);
    return acc;
  }, {}) || {};

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-8 text-[#FF4500]">Sala de Control | Architect.Sys</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.keys(leads).map((phone) => (
            <div key={phone} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Lead: {phone}</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {leads[phone].reverse().map((msg: any) => (
                  <div key={msg.id} className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-gray-100 ml-4' : 'bg-orange-50 text-orange-900 mr-4 border border-orange-100'}`}>
                    <span className="font-bold uppercase text-[10px] block mb-1 opacity-50">{msg.role}</span>
                    {msg.content}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(leads).length === 0 && (
             <p className="text-gray-500 italic">No hay conversaciones registradas aún.</p>
          )}
        </div>
      </div>
    </div>
  );
}
