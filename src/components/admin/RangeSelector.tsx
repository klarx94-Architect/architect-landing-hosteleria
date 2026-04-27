"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RangeSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams?.get('range') || '7';

  const options = [
    { label: 'Hoy', value: '1' },
    { label: 'Últimos 7 días', value: '7' },
    { label: 'Últimos 30 días', value: '30' },
  ];

  const onChange = (v: string) => {
    const params = new URLSearchParams(Array.from(searchParams || []));
    params.set('range', v);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm px-3 py-2 border rounded-lg bg-white"
        aria-label="Rango de fechas"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
