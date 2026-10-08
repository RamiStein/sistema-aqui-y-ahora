import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Compass, 
  ExternalLink, 
  CheckCircle2, 
  Sun, 
  Sprout, 
  Car, 
  HeartHandshake, 
  Backpack, 
  Sparkles,
  Phone,
  Mail,
  Navigation
} from 'lucide-react';

export const TripModule: React.FC = () => {
  const { immersionTrip, setActiveTab } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner Granja Épicos */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C2618] via-[#2F3E28] to-[#172014] text-white p-6 sm:p-10 shadow-xl border border-emerald-900/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-medium">
            <Sprout className="w-3.5 h-3.5 text-emerald-300" />
            <span>Retiro de Convivencia y Trabajo en la Tierra</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-sacred text-stone-100 tracking-wide leading-tight">
            Viaje de Inmersión en Granja Épicos
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-emerald-200/90 font-medium">
            <span className="flex items-center bg-white/10 px-3 py-1 rounded-lg border border-white/15">
              <Calendar className="w-4 h-4 mr-1.5 text-amber-300" />
              {immersionTrip.datesText}
            </span>
            <span className="flex items-center bg-white/10 px-3 py-1 rounded-lg border border-white/15">
              <MapPin className="w-4 h-4 mr-1.5 text-rose-300" />
              {immersionTrip.locationName} • {immersionTrip.locationZone}
            </span>
          </div>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-light pt-1">
            {immersionTrip.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('recaudacion')}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center space-x-2"
            >
              <HeartHandshake className="w-4 h-4 text-amber-200" />
              <span>Ver Video y Fondo Solidario del Viaje</span>
            </button>

            <a
              href={immersionTrip.googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center space-x-2"
            >
              <Navigation className="w-4 h-4 text-emerald-300" />
              <span>Abrir en Google Maps / GPS</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid: Location & Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Map & How to get there */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Ubicación Exacta</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-sacred text-stone-900">
                {immersionTrip.locationName} — {immersionTrip.locationZone}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {immersionTrip.addressDetails}
              </p>
            </div>

            <a
              href={immersionTrip.googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className="self-start sm:self-auto px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 hover:bg-emerald-100 transition-colors"
            >
              <span>Cómo llegar con GPS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Map Embed Iframe */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-stone-100">
            <iframe
              src={immersionTrip.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Granja Épicos en Exaltación de la Cruz"
              className="w-full h-full"
            />
          </div>

          {/* Route details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/80 space-y-1.5">
              <span className="text-xs font-bold text-stone-700 uppercase flex items-center space-x-1.5">
                <Car className="w-4 h-4 text-amber-700" />
                <span>En Automóvil desde CABA</span>
              </span>
              <p className="text-xs text-stone-600 leading-relaxed font-serif">
                Por Autopista Panamericana (Ramal Pilar / Ruta Nacional 8) hasta el empalme con Parada Robles / Ruta Provincial 39 en Exaltación de la Cruz. Trayecto aproximado: 1h 15m.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/80 space-y-1.5">
              <span className="text-xs font-bold text-stone-700 uppercase flex items-center space-x-1.5">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>Transporte Compartido</span>
              </span>
              <p className="text-xs text-stone-600 leading-relaxed font-serif">
                Estamos coordinando vehículos compartidos y puntos de encuentro en Plaza Italia y Estación Pilar para quienes no cuenten con auto propio.
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Objectives & Coordinator card */}
        <div className="space-y-6">
          {/* Key Objectives */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-stone-900 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Pilares de la Inmersión</span>
            </div>

            <ul className="space-y-3">
              {immersionTrip.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-stone-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordination Contact Card */}
          <div className="bg-gradient-to-br from-amber-50 to-[#FAF5EE] border border-amber-200 rounded-3xl p-5 shadow-xs space-y-3">
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
              Coordinación y Logística
            </span>
            <h4 className="font-serif-sacred font-bold text-stone-900 text-base">
              {immersionTrip.coordinatorName}
            </h4>
            <div className="space-y-1.5 text-xs text-stone-700">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>+54 341 498-7712</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-amber-700" />
                <span>matias.rinaldi@proseminario.org</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('salas_cartelera')}
              className="w-full mt-2 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Coordinar viaje en la Cartelera
            </button>
          </div>
        </div>
      </div>

      {/* Daily Rhythm Section */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
            <Sun className="w-4 h-4 text-amber-700" />
            <span>Ritmo Diario en la Granja</span>
          </div>
          <h3 className="text-2xl font-bold font-serif-sacred text-stone-900">
            La Jornada de Inmersión (1 al 11 de Enero)
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            La vida en el seminario se fundamenta en un ritmo sano que equilibra la elevación del alma en el culto matutino, la actividad corporal en el compost y huerta biodinámica, y el estudio concentrado de la palabra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {immersionTrip.dailyRhythm.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-stone-200/80 bg-[#FCFAF7] hover:bg-white hover:border-amber-300 transition-all hover:shadow-xs space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>{item.time}</span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono">#{idx + 1}</span>
              </div>
              <h4 className="font-serif-sacred font-bold text-stone-900 text-sm">
                {item.activity}
              </h4>
              <p className="text-xs text-stone-600 font-serif leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* What to bring Checklist */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
          <Backpack className="w-4 h-4 text-amber-700" />
          <span>Equipaje Recomendado para los 11 Días</span>
        </div>
        <p className="text-xs text-stone-500">
          Recomendaciones esenciales para el trabajo de campo y la vida en la granja:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {immersionTrip.whatToBring.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 leading-snug"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
