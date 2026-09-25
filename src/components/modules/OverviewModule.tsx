import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  Video, 
  Bell, 
  Newspaper, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  FileText,
  HeartHandshake
} from 'lucide-react';

export const OverviewModule: React.FC = () => {
  const { 
    setActiveTab, 
    articles, 
    questions, 
    bulletinPosts, 
    meetings, 
    books, 
    summaries, 
    activeUser,
    joinMeeting 
  } = useApp();

  const pinnedArticle = articles.find(a => a.pinned) || articles[0];
  const answeredQuestion = questions.find(q => q.answers.some(a => a.isPriestVerified)) || questions[0];
  const liveOrNextMeeting = meetings.find(m => m.isLiveNow) || meetings[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2D1B1B] via-[#4A2828] to-[#1C1414] text-white p-6 sm:p-10 shadow-xl border border-amber-900/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Bienvenido al Proseminario de la Comunidad de Cristianos</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif-sacred text-stone-100 tracking-wide leading-tight">
            «Aquí y Ahora»: El espacio de encuentro, estudio y discernimiento para nuestra comunidad.
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
            Un portal vivo para unificar toda la vida del proseminario: consultar dudas con los sacerdotes tutores, explorar la bibliografía antroposófica, acceder a la cartelera fraternal, compartir resúmenes de estudio y reunirse en salas de diálogo sincero.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('dudas')}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <HelpCircle className="w-4 h-4 text-amber-200" />
              <span>Espacio de Dudas</span>
            </button>

            {liveOrNextMeeting && (
              <button
                onClick={() => {
                  if (liveOrNextMeeting.isLiveNow) {
                    joinMeeting(liveOrNextMeeting.id);
                  } else {
                    setActiveTab('salas');
                  }
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 border ${
                  liveOrNextMeeting.isLiveNow
                    ? 'bg-red-600/90 hover:bg-red-700 text-white border-red-500 shadow-md animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 text-stone-200 border-white/20'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>
                  {liveOrNextMeeting.isLiveNow ? '¡Sala en Vivo! Unirse Ahora' : 'Ver Salas de Encuentro'}
                </span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('cartelera')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center space-x-2"
            >
              <Bell className="w-4 h-4 text-amber-300" />
              <span>Ver Cartelera Viva</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Action Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => setActiveTab('dudas')}
          className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-800 text-sm font-serif">Sacarse Dudas</h3>
          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
            Preguntas teológicas, vocacionales y prácticas con respuestas guiadas.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('bibliografia')}
          className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-800 text-sm font-serif">Bibliografía Esencial</h3>
          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
            Steiner, Rittelmeyer, Bock, y los ciclos de conferencias clave.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('resumenes')}
          className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-800 text-sm font-serif">Resúmenes de Estudio</h3>
          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
            Apuntes y esquemas colaborativos redactados por los integrantes.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('salas')}
          className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Video className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-800 text-sm font-serif">Salas de Conversación</h3>
          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
            Videollamadas integradas para lectura de evangelios y diálogo libre.
          </p>
        </div>
      </div>

      {/* Main Grid: Priority priest notice + Q&A spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Featured Priest Message */}
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
              {pinnedArticle.subtitle && (
                <p className="text-xs sm:text-sm font-medium text-amber-900 mb-4 italic">
                  {pinnedArticle.subtitle}
                </p>
              )}

              {pinnedArticle.highlightQuote && (
                <div className="bg-[#FAF7F2] border-l-4 border-amber-600 p-3.5 rounded-r-xl my-4 text-xs sm:text-sm text-stone-700 font-serif italic">
                  {pinnedArticle.highlightQuote}
                </div>
              )}

              <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
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

        {/* Right Col: Community Pulse & Next Meeting */}
        <div className="space-y-6">
          {/* Active / Next Meeting Card */}
          {liveOrNextMeeting && (
            <div className={`p-5 rounded-3xl border shadow-xs ${
              liveOrNextMeeting.isLiveNow 
                ? 'bg-gradient-to-br from-rose-50 to-orange-50 border-rose-300' 
                : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  liveOrNextMeeting.isLiveNow ? 'bg-red-600 text-white animate-pulse' : 'bg-stone-100 text-stone-600'
                }`}>
                  {liveOrNextMeeting.isLiveNow ? 'Transmisión en Vivo' : 'Próxima Reunión'}
                </span>
                <span className="text-xs text-stone-500">{liveOrNextMeeting.date}</span>
              </div>

              <h4 className="font-serif-sacred font-bold text-stone-900 text-base mb-1.5 leading-snug">
                {liveOrNextMeeting.title}
              </h4>
              <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                {liveOrNextMeeting.description}
              </p>

              <div className="flex items-center justify-between text-xs text-stone-500 mb-4 pt-2 border-t border-stone-100">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>{liveOrNextMeeting.time} hs</span>
                </div>
                <span>Guía: {liveOrNextMeeting.host.name}</span>
              </div>

              <button
                onClick={() => joinMeeting(liveOrNextMeeting.id)}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs ${
                  liveOrNextMeeting.isLiveNow
                    ? 'bg-rose-700 hover:bg-rose-800 text-white'
                    : 'bg-stone-800 hover:bg-stone-900 text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>
                  {liveOrNextMeeting.isLiveNow ? 'Entrar a la Sala de Video' : 'Ver Detalles del Encuentro'}
                </span>
              </button>
            </div>
          )}

          {/* Quick Cartelera Teaser */}
          <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
              <div className="flex items-center space-x-2 text-stone-900 font-bold text-xs uppercase tracking-wider">
                <Bell className="w-3.5 h-3.5 text-amber-700" />
                <span>Avisos de Cartelera</span>
              </div>
              <button
                onClick={() => setActiveTab('cartelera')}
                className="text-[11px] text-amber-800 hover:underline font-medium"
              >
                Ver todos ({bulletinPosts.length})
              </button>
            </div>

            <div className="space-y-3">
              {bulletinPosts.slice(0, 2).map((post) => (
                <div
                  key={post.id}
                  onClick={() => setActiveTab('cartelera')}
                  className="p-3 bg-[#FAF8F5] rounded-xl hover:bg-amber-50/50 cursor-pointer border border-stone-100 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] text-stone-500 mb-1">
                    <span className="font-semibold text-amber-900">{post.author.name}</span>
                    <span>{post.date}</span>
                  </div>
                  <h5 className="font-semibold text-xs text-stone-800 leading-snug line-clamp-1">
                    {post.title}
                  </h5>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Q&A Section */}
      {answeredQuestion && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-sm font-serif">
                  Duda Esclarecida por los Sacerdotes
                </h3>
                <p className="text-xs text-stone-500">
                  Preguntas teológicas y formativas de los participantes
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('dudas')}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center space-x-1"
            >
              <span>Ver todas las consultas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-stone-200/80">
            <h4 className="text-base font-bold font-serif-sacred text-stone-900 mb-2">
              {answeredQuestion.title}
            </h4>
            <p className="text-xs text-stone-600 mb-4 italic">
              «{answeredQuestion.content}»
            </p>

            {answeredQuestion.answers.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-amber-200/80 shadow-2xs">
                <div className="flex items-center space-x-2 mb-2 text-xs font-semibold text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Respuesta de {answeredQuestion.answers[0].author.name} (Sacerdote Tutor):</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-serif">
                  {answeredQuestion.answers[0].content}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
