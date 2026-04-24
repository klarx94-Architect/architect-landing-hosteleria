'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ChatDemoWidget = dynamic(() => import('./ChatDemoWidget'), { ssr: false });

export default function DemoLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden sm:block">
        <button onClick={() => setOpen(true)} className="inline-flex items-center justify-center gap-3 bg-[#FF4500] text-white px-6 md:px-10 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold shadow-[0_0_40px_rgba(255,69,0,0.4)] hover:-translate-y-2 transition-all duration-300 whitespace-nowrap">
          Ver demostración en vivo
        </button>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        title="Probar demo con IA"
        className="fixed right-6 bottom-6 z-50 bg-white/90 dark:bg-black/80 border border-gray-200 dark:border-gray-700 shadow-xl rounded-full p-3 flex items-center gap-3 hover:scale-105 transition-transform"
      >
        <svg className="w-6 h-6 text-[#FF4500]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {open && <ChatDemoWidget onClose={() => setOpen(false)} />}
    </>
  );
}
