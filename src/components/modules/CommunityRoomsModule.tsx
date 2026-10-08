import React, { useState } from 'react';
import { MeetingsModule } from './MeetingsModule';
import { BoardModule } from './BoardModule';
import { Video, Bell, HeartHandshake } from 'lucide-react';

export const CommunityRoomsModule: React.FC = () => {
  const [subTab, setSubTab] = useState<'salas' | 'cartelera'>('salas');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Switcher Bar */}
      <div className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 pl-2 text-stone-900 font-serif font-bold text-sm">
          <HeartHandshake className="w-4 h-4 text-amber-700" />
          <span>Espacio Fraternal de Encuentro</span>
        </div>

        <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200/80">
          <button
            onClick={() => setSubTab('salas')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              subTab === 'salas'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-rose-600" />
            <span>Salas de Conversación en Vivo</span>
          </button>

          <button
            onClick={() => setSubTab('cartelera')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              subTab === 'cartelera'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-amber-600" />
            <span>Cartelera de Avisos</span>
          </button>
        </div>
      </div>

      {subTab === 'salas' && <MeetingsModule />}
      {subTab === 'cartelera' && <BoardModule />}
    </div>
  );
};
