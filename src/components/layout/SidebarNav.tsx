import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { 
  Home, 
  Newspaper, 
  Bell, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  Video, 
  CalendarDays,
  Sparkles
} from 'lucide-react';

interface SidebarNavProps {
  onItemClick?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ onItemClick }) => {
  const { activeTab, setActiveTab, articles, bulletinPosts, questions, meetings, summaries } = useApp();

  const unresolvedQuestionsCount = questions.filter(q => !q.resolved).length;
  const liveMeetingsCount = meetings.filter(m => m.isLiveNow).length;

  const navItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    { id: 'inicio', label: 'Inicio (Aquí y Ahora)', icon: Home },
    { id: 'noticias', label: 'Noticias de Sacerdotes', icon: Newspaper, badge: articles.length },
    { id: 'cartelera', label: 'Cartelera Comunitaria', icon: Bell, badge: bulletinPosts.length },
    { 
      id: 'dudas', 
      label: 'Sacarse las Dudas', 
      icon: HelpCircle, 
      badge: unresolvedQuestionsCount > 0 ? `${unresolvedQuestionsCount} abiertas` : undefined,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    { id: 'bibliografia', label: 'Bibliografía y Lecturas', icon: BookOpen },
    { id: 'resumenes', label: 'Resúmenes de Estudio', icon: FileText, badge: summaries.length },
    { 
      id: 'salas', 
      label: 'Salas de Conversación', 
      icon: Video,
      badge: liveMeetingsCount > 0 ? 'EN VIVO' : `${meetings.length}`,
      badgeColor: liveMeetingsCount > 0 ? 'bg-red-500 text-white animate-pulse' : undefined
    },
    { id: 'calendario', label: 'Módulos y Calendario', icon: CalendarDays },
  ];

  const handleSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (onItemClick) onItemClick();
  };

  return (
    <aside className="w-full md:w-64 shrink-0 space-y-6">
      {/* Navigation Menu */}
      <nav className="bg-white rounded-2xl border border-stone-200/90 p-3 shadow-xs space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
          Navegación del Proseminario
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-amber-800 text-white shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#F9F7F4]'
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <Icon
                  className={`w-4 h-4 transition-colors shrink-0 ${
                    isActive ? 'text-amber-200' : 'text-stone-400 group-hover:text-amber-700'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 ${
                    item.badgeColor 
                      ? item.badgeColor 
                      : isActive 
                        ? 'bg-amber-900/80 text-amber-100 border border-amber-700' 
                        : 'bg-stone-100 text-stone-600 border border-stone-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Daily Spiritual Thought / Proseminary Focus */}
      <div className="hidden md:block bg-gradient-to-br from-[#FAF5EE] to-[#F5ECE0] border border-amber-200/80 rounded-2xl p-4 text-xs text-stone-700 shadow-2xs relative overflow-hidden">
        <div className="flex items-center space-x-2 text-amber-900 font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span className="text-[11px] uppercase tracking-wider">Inspiración del Camino</span>
        </div>
        <p className="font-serif italic text-stone-800 leading-relaxed mb-2">
          «El ser humano no vive sólo del pan terrenal, sino de la Palabra viva que desciende cuando dos o tres se reúnen en Su Nombre.»
        </p>
        <span className="text-[10px] text-amber-950 font-semibold block text-right">
          — Friedrich Rittelmeyer
        </span>
      </div>
    </aside>
  );
};
