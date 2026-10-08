import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { 
  Home, 
  MapPin, 
  HeartHandshake, 
  UserCheck, 
  GraduationCap, 
  Video, 
  Newspaper,
  Sparkles,
  Calendar
} from 'lucide-react';

interface SidebarNavProps {
  onItemClick?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ onItemClick }) => {
  const { 
    activeTab, 
    setActiveTab, 
    fundraiser, 
    availableUsers,
    attendanceSessions,
    articles
  } = useApp();

  const percentage = Math.round((fundraiser.currentAmount / fundraiser.goalAmount) * 100);

  const navItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    { 
      id: 'inicio', 
      label: 'Inicio (Aquí y Ahora)', 
      icon: Home 
    },
    { 
      id: 'inmersion', 
      label: 'Viaje Granja Épicos', 
      icon: MapPin, 
      badge: 'Ene 1-11',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
    },
    { 
      id: 'recaudacion', 
      label: 'Fondo Solidario & Video', 
      icon: HeartHandshake,
      badge: `${percentage}%`,
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300 font-bold'
    },
    { 
      id: 'asistencia', 
      label: 'Comunidad & Asistencia', 
      icon: UserCheck, 
      badge: `${availableUsers.length}`,
      badgeColor: 'bg-stone-100 text-stone-700 border-stone-200'
    },
    { 
      id: 'estudio', 
      label: 'Estudio & Formación', 
      icon: GraduationCap 
    },
    { 
      id: 'salas_cartelera', 
      label: 'Salas & Cartelera', 
      icon: Video 
    },
    { 
      id: 'noticias', 
      label: 'Cartas de Sacerdotes', 
      icon: Newspaper, 
      badge: articles.length 
    },
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
          Menú del Proseminario
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

      {/* Immersion Trip Mini-Teaser */}
      <div 
        onClick={() => setActiveTab('inmersion')}
        className="hidden md:block bg-gradient-to-br from-[#1C2618] to-[#2A3723] border border-emerald-900/50 rounded-2xl p-4 text-xs text-white shadow-xs cursor-pointer hover:border-emerald-500 transition-all group"
      >
        <div className="flex items-center space-x-1.5 text-emerald-300 font-bold mb-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] uppercase tracking-wider">Próxima Inmersión</span>
        </div>
        <h4 className="font-serif-sacred font-bold text-sm text-stone-100 group-hover:text-emerald-200 transition-colors">
          Granja Épicos
        </h4>
        <p className="text-[11px] text-stone-300 mt-0.5">
          1 al 11 de Enero • Exaltación de la Cruz, Bs. As.
        </p>
        <div className="mt-2 text-[10px] text-amber-300 font-semibold flex items-center justify-between border-t border-white/10 pt-2">
          <span>Ver mapa y programa</span>
          <span>→</span>
        </div>
      </div>
    </aside>
  );
};
