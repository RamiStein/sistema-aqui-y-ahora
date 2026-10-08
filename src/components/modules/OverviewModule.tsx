import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  MapPin, 
  HeartHandshake, 
  UserCheck, 
  GraduationCap, 
  Video, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  CalendarDays,
  Play, 
  HelpCircle,
  Users
} from 'lucide-react';

export const OverviewModule: React.FC = () => {
  const { 
    setActiveTab, 
    articles, 
    questions, 
    meetings, 
    fundraiser,
    immersionTrip,
    availableUsers,
    attendanceSessions,
    classes,
    joinMeeting 
  } = useApp();

  const pinnedArticle = articles.find(a => a.pinned) || articles[0];
  const answeredQuestion = questions.find(q => q.answers.some(a => a.isPriestVerified)) || questions[0];
  const liveOrNextMeeting = meetings.find(m => m.isLiveNow) || meetings[0];

  const percentage = Math.min(100, Math.round((fundraiser.currentAmount / fundraiser.goalAmount) * 100));
  const priests = availableUsers.filter(u => u.role === 'sacerdote');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2D1B1B] via-[#4A2828] to-[#1C1414] text-white p-6 sm:p-10 shadow-xl border border-amber-900/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Bienvenido al Proseminario «Aquí y Ahora»</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif-sacred text-stone-100 tracking-wide leading-tight">
            Comunidad de Cristianos • Movimiento para la Renovación Religiosa
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
            Plataforma unificada para preparar el <strong>Viaje de Inmersión en Granja Épicos ({immersionTrip.datesText})</strong>, seguir la campaña de recaudación solidaria con su video explicativo, registrar la asistencia a los encuentros y profundizar en la cristología antroposófica.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('inmersion')}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4 text-emerald-200" />
              <span>Ver Viaje a Granja Épicos (Enero 1-11)</span>
            </button>

            <button
              onClick={() => setActiveTab('recaudacion')}
              className="px-4 py-2.5 bg-amber-600/90 hover:bg-amber-600 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 shadow-xs"
            >
              <Play className="w-4 h-4 text-amber-200" />
              <span>Video y Fondo Solidario</span>
            </button>

            <button
              onClick={() => setActiveTab('calendario_clases')}
              className="px-4 py-2.5 bg-amber-800/80 hover:bg-amber-800 text-stone-100 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 shadow-xs"
            >
              <CalendarDays className="w-4 h-4 text-amber-300" />
              <span>Calendario de Clases ({classes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('asistencia')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center space-x-2"
            >
              <UserCheck className="w-4 h-4 text-amber-300" />
              <span>Llevar Asistencia</span>
            </button>
          </div>
        </div>
      </div>

      {/* Spotlight: Immersion Trip & Fundraising Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Granja Épicos Trip Banner */}
        <div 
          onClick={() => setActiveTab('inmersion')}
          className="bg-gradient-to-br from-[#1C2618] to-[#2D3F26] text-white rounded-3xl p-6 sm:p-7 shadow-md border border-emerald-900/60 flex flex-col justify-between cursor-pointer hover:border-emerald-500 transition-all group"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {immersionTrip.datesText} (2027)
              </span>
              <span className="text-xs text-stone-300 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-rose-300" />
                Exaltación de la Cruz, Bs. As.
              </span>
            </div>

            <h3 className="text-2xl font-bold font-serif-sacred text-stone-100 group-hover:text-emerald-200 transition-colors">
              {immersionTrip.title} en {immersionTrip.locationName}
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              11 días de convivencia intensiva, labores biodinámicas en la tierra, celebración diaria del Acto de Consagración del Hombre y discernimiento vocacional.
            </p>
          </div>

          <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-emerald-300 font-medium">Ver mapa interactivo y programa diario</span>
            <span className="font-bold text-white group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* Card 2: Fundraising Campaign Progress */}
        <div 
          onClick={() => setActiveTab('recaudacion')}
          className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-stone-200 flex flex-col justify-between cursor-pointer hover:border-amber-400 transition-all group"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                <HeartHandshake className="w-3.5 h-3.5 mr-1 text-amber-700" />
                Campaña Solidaria Activa
              </span>
              <span className="text-xs font-bold text-amber-800 font-mono">
                {percentage}% de la meta
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-serif-sacred text-stone-900 group-hover:text-amber-800 transition-colors">
              Fondo de Becas y Estadía en la Granja
            </h3>

            {/* Mini Progress bar */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden border border-stone-200">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-700 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>{formatCurrency(fundraiser.currentAmount)} recaudados</span>
                <span>Meta: {formatCurrency(fundraiser.goalAmount)}</span>
              </div>
            </div>

            <p className="text-xs text-stone-600 font-serif leading-relaxed line-clamp-2">
              {fundraiser.videoDescription}
            </p>
          </div>

          <div className="pt-4 mt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-amber-800 font-semibold flex items-center space-x-1">
              <Play className="w-3.5 h-3.5 fill-amber-800" />
              <span>Ver video explicativo y colaborar</span>
            </span>
            <span className="font-bold text-stone-800 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>

      {/* 5 Clean Quick Access Modules */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div
          onClick={() => setActiveTab('inmersion')}
          className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MapPin className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-800 text-sm font-serif">Granja Épicos</h4>
          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
            1 al 11 de Enero: Mapa, cronograma y preparativos.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('recaudacion')}
          className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-800 text-sm font-serif">Fondo & Video</h4>
          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
            Por qué se necesita el dinero y cómo aportar.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('calendario_clases')}
          className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-amber-500 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <CalendarDays className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-800 text-sm font-serif">Calendario Clases</h4>
          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
            Pasadas y porvenir con sacerdotes y temarios ({classes.length}).
          </p>
        </div>

        <div
          onClick={() => setActiveTab('asistencia')}
          className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-stone-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <UserCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-800 text-sm font-serif">Asistencia & Grupo</h4>
          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
            Sacerdotes ({priests.length}) e integrantes ({availableUsers.length - priests.length}).
          </p>
        </div>

        <div
          onClick={() => setActiveTab('estudio')}
          className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-800 text-sm font-serif">Estudio & Dudas</h4>
          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
            Bibliografía de Steiner, resúmenes y consultas.
          </p>
        </div>
      </div>

      {/* Featured Priest Letter & Live Meeting Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Featured Priest Letter */}
        {pinnedArticle && (
          <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-200 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Mensaje de los Sacerdotes</span>
                </span>
                <span className="text-xs text-stone-400 font-medium">{pinnedArticle.date}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif-sacred text-stone-900 mb-2 leading-snug">
                {pinnedArticle.title}
              </h3>

              {pinnedArticle.highlightQuote && (
                <div className="bg-[#FAF7F2] border-l-4 border-amber-600 p-3.5 rounded-r-xl my-4 text-xs sm:text-sm text-stone-700 font-serif italic">
                  {pinnedArticle.highlightQuote}
                </div>
              )}

              <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed font-serif">
                {pinnedArticle.content}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={pinnedArticle.authorAvatar}
                  alt={pinnedArticle.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <span className="text-xs font-semibold text-stone-800 block">
                    {pinnedArticle.authorName}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {pinnedArticle.authorTitle}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('noticias')}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center space-x-1 transition-colors"
              >
                <span>Leer mensaje completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Right Col: Active Community Meeting */}
        {liveOrNextMeeting && (
          <div className={`p-6 rounded-3xl border shadow-xs flex flex-col justify-between ${
            liveOrNextMeeting.isLiveNow 
              ? 'bg-gradient-to-br from-rose-50 to-orange-50 border-rose-300' 
              : 'bg-white border-stone-200'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  liveOrNextMeeting.isLiveNow ? 'bg-red-600 text-white animate-pulse' : 'bg-stone-100 text-stone-600'
                }`}>
                  {liveOrNextMeeting.isLiveNow ? 'En Vivo Ahora' : 'Próxima Reunión Virtual'}
                </span>
                <span className="text-xs text-stone-500">{liveOrNextMeeting.date}</span>
              </div>

              <h4 className="font-serif-sacred font-bold text-stone-900 text-lg mb-2 leading-snug">
                {liveOrNextMeeting.title}
              </h4>
              <p className="text-xs text-stone-600 line-clamp-3 mb-4 leading-relaxed font-serif">
                {liveOrNextMeeting.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={() => joinMeeting(liveOrNextMeeting.id)}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs ${
                  liveOrNextMeeting.isLiveNow
                    ? 'bg-rose-700 hover:bg-rose-800 text-white'
                    : 'bg-stone-800 hover:bg-stone-900 text-white'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>
                  {liveOrNextMeeting.isLiveNow ? 'Unirse a la Sala de Video' : 'Entrar a la Sala Virtual'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
