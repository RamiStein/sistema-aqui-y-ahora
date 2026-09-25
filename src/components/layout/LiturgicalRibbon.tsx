import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ChevronDown, ChevronUp, Sun } from 'lucide-react';

export const LiturgicalRibbon: React.FC = () => {
  const { liturgicalInfo } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-[#852323] via-[#731919] to-[#8d2a2a] text-white shadow-xs border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-xs sm:text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400/20 text-amber-200 shrink-0">
              <Sun className="w-3.5 h-3.5" />
            </span>
            <div className="truncate">
              <span className="font-semibold text-amber-200 mr-2 tracking-wide uppercase text-[11px]">
                {liturgicalInfo.name}:
              </span>
              <span className="italic font-serif opacity-95">
                {liturgicalInfo.motto}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0 ml-3">
            <span className="hidden md:inline-block text-[11px] text-amber-200/80 bg-white/10 px-2 py-0.5 rounded">
              {liturgicalInfo.festivityDateRange}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-amber-200/80 hover:text-white flex items-center space-x-1 text-xs transition-colors"
            >
              <span className="hidden sm:inline">{isExpanded ? 'Menos' : 'Detalles'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-white/15 text-xs text-amber-100/90 grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in duration-200">
            <div>
              <span className="font-semibold text-white block mb-0.5">Atmósfera del Tiempo:</span>
              <p className="leading-relaxed opacity-90">{liturgicalInfo.periodDescription}</p>
            </div>
            <div>
              <span className="font-semibold text-white block mb-0.5">Colores de Altar y Estola:</span>
              <div className="flex items-center space-x-2 mt-1">
                <span className="w-4 h-4 rounded-full border border-white/40 shadow-xs" style={{ backgroundColor: liturgicalInfo.colorHex }} />
                <span className="w-4 h-4 rounded-full border border-white/40 shadow-xs" style={{ backgroundColor: liturgicalInfo.secondaryColor }} />
                <span>{liturgicalInfo.colorName}</span>
              </div>
            </div>
            <div>
              <span className="font-semibold text-white block mb-0.5">Orientación Interior:</span>
              <p className="leading-relaxed opacity-90">
                La autoeducación ética y la elevación del pensamiento hacia el cosmos como preludio del adviento.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
