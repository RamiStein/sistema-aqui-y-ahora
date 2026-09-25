import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Flame, ChevronDown, Menu, X, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { UserSwitcherModal } from '../common/UserSwitcherModal';

interface HeaderProps {
  onToggleMobileNav: () => void;
  isMobileNavOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileNav, isMobileNavOpen }) => {
  const { activeUser, liturgicalInfo, setIsSearchModalOpen, setActiveTab } = useApp();
  const [isUserSwitcherOpen, setIsUserSwitcherOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Left: Brand Identity */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('inicio')}>
              {/* Sacred emblem */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 flex items-center justify-center text-amber-200 shadow-md ring-1 ring-amber-400/30">
                <Flame className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-bold font-serif-sacred text-stone-900 tracking-wide leading-none">
                    Aquí y Ahora
                  </h1>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded bg-amber-100/80 text-amber-900 border border-amber-300/50">
                    Proseminario
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-500 font-medium tracking-tight mt-0.5">
                  Comunidad de Cristianos • Movimiento para la Renovación Religiosa
                </p>
              </div>
            </div>

            {/* Right: Actions, Liturgical badge, Search & Profile */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Liturgical season micro-pill */}
              <div 
                className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition-colors"
                style={{ 
                  backgroundColor: `${liturgicalInfo.colorHex}15`, 
                  borderColor: `${liturgicalInfo.colorHex}40`,
                  color: liturgicalInfo.colorHex 
                }}
                onClick={() => setActiveTab('calendario')}
                title="Ver calendario litúrgico y del proseminario"
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: liturgicalInfo.colorHex }} />
                <span>{liturgicalInfo.name.split('(')[0]}</span>
              </div>

              {/* Omni Search Button */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200/70 border border-stone-200/80 rounded-xl text-xs font-medium transition-all"
                title="Buscar en todo el Proseminario (Ctrl + K)"
              >
                <Search className="w-4 h-4 text-stone-500" />
                <span className="hidden sm:inline text-stone-600">Buscar...</span>
                <kbd className="hidden lg:inline text-[10px] bg-white border border-stone-300 text-stone-400 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
              </button>

              {/* Active User Switcher Pill */}
              <button
                onClick={() => setIsUserSwitcherOpen(true)}
                className="flex items-center space-x-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50/40 transition-all text-left"
                title="Cambiar usuario activo o rol"
              >
                <img
                  src={activeUser.avatar}
                  alt={activeUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-stone-200"
                />
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-semibold text-stone-800 leading-tight">
                      {activeUser.name}
                    </span>
                    {activeUser.role === 'sacerdote' && <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />}
                    {activeUser.role === 'coordinador' && <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
                    {activeUser.role === 'estudiante' && <BookOpen className="w-3.5 h-3.5 text-stone-500" />}
                  </div>
                  <span className="text-[10px] text-stone-500 capitalize block leading-tight">
                    {activeUser.role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:block" />
              </button>

              {/* Mobile menu hamburger toggle */}
              <button
                onClick={onToggleMobileNav}
                className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
                aria-label="Abrir menú"
              >
                {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* User Switcher Modal */}
      <UserSwitcherModal
        isOpen={isUserSwitcherOpen}
        onClose={() => setIsUserSwitcherOpen(false)}
      />
    </>
  );
};
