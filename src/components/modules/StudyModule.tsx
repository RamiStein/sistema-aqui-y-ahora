import React, { useState } from 'react';
import { LibraryModule } from './LibraryModule';
import { SummariesModule } from './SummariesModule';
import { QuestionsModule } from './QuestionsModule';
import { BookOpen, FileText, HelpCircle, GraduationCap } from 'lucide-react';

export const StudyModule: React.FC = () => {
  const [subTab, setSubTab] = useState<'bibliografia' | 'resumenes' | 'dudas'>('bibliografia');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Switcher Ribbon */}
      <div className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 pl-2 text-stone-900 font-serif font-bold text-sm">
          <GraduationCap className="w-4 h-4 text-amber-700" />
          <span>Área de Estudio y Formación</span>
        </div>

        <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200/80">
          <button
            onClick={() => setSubTab('bibliografia')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              subTab === 'bibliografia'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Bibliografía de Lectura</span>
          </button>

          <button
            onClick={() => setSubTab('resumenes')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              subTab === 'resumenes'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Resúmenes de Estudio</span>
          </button>

          <button
            onClick={() => setSubTab('dudas')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              subTab === 'dudas'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Sacarse las Dudas</span>
          </button>
        </div>
      </div>

      {/* Render selected study area */}
      {subTab === 'bibliografia' && <LibraryModule />}
      {subTab === 'resumenes' && <SummariesModule />}
      {subTab === 'dudas' && <QuestionsModule />}
    </div>
  );
};
