import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { LiturgicalRibbon } from './components/layout/LiturgicalRibbon';
import { SidebarNav } from './components/layout/SidebarNav';
import { Footer } from './components/layout/Footer';
import { OverviewModule } from './components/modules/OverviewModule';
import { TripModule } from './components/modules/TripModule';
import { FundraiserModule } from './components/modules/FundraiserModule';
import { AttendanceModule } from './components/modules/AttendanceModule';
import { ClassesCalendarModule } from './components/modules/ClassesCalendarModule';
import { StudyModule } from './components/modules/StudyModule';
import { CommunityRoomsModule } from './components/modules/CommunityRoomsModule';
import { NewsModule } from './components/modules/NewsModule';
import { SearchModal } from './components/common/SearchModal';
import { JitsiVideoModal } from './components/common/JitsiVideoModal';
import { CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { 
    activeTab, 
    setIsSearchModalOpen, 
    activeMeetingForCall, 
    setActiveMeetingForCall, 
    toastMessage 
  } = useApp();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Global keyboard shortcut: Ctrl+K or Cmd+K to open Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-800">
      {/* Liturgical Season Atmospheric Ribbon */}
      <LiturgicalRibbon />

      {/* Main App Header */}
      <Header
        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        isMobileNavOpen={isMobileNavOpen}
      />

      {/* Mobile Drawer Navigation */}
      {isMobileNavOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white p-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <SidebarNav onItemClick={() => setIsMobileNavOpen(false)} />
        </div>
      )}

      {/* Main Content Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden md:block">
            <SidebarNav />
          </div>

          {/* Dynamic Module Content View */}
          <main className="flex-1 w-full min-w-0">
            {activeTab === 'inicio' && <OverviewModule />}
            {activeTab === 'inmersion' && <TripModule />}
            {activeTab === 'recaudacion' && <FundraiserModule />}
            {activeTab === 'asistencia' && <AttendanceModule />}
            {activeTab === 'calendario_clases' && <ClassesCalendarModule />}
            {activeTab === 'estudio' && <StudyModule />}
            {activeTab === 'salas_cartelera' && <CommunityRoomsModule />}
            {activeTab === 'noticias' && <NewsModule />}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <SearchModal />
      
      {/* Video Call Modal */}
      <JitsiVideoModal
        meeting={activeMeetingForCall}
        onClose={() => setActiveMeetingForCall(null)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900/90 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-xs backdrop-blur-sm border border-stone-700 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
