import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PROSEMINAR_MODULES } from '../../data/seedData';
import { 
  CalendarDays, 
  CheckCircle2, 
  Sun, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Compass, 
  MapPin, 
  Clock,
  ArrowRight
} from 'lucide-react';

export const CalendarModule: React.FC = () => {
  const { liturgicalInfo, setActiveTab } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'modulos' | 'liturgia' | 'seminario'>('modulos');

  const liturgicalCycles = [
    {
      season: 'Adviento',
      color: '#3b82f6', // blue / violet
      dates: 'Cuatro semanas previas a Navidad',
      quality: 'La espera en recogimiento, el silencio del alma ante la venida de la Luz.',
      vestments: 'Azul profundo / Violeta'
    },
    {
      season: 'Navidad y Doce Noches Santas',
      color: '#ffffff', // white
      dates: '24 de Diciembre – 6 de Enero',
      quality: 'El nacimiento de la Luz crística en la noche de la Tierra. Paz a los hombres de buena voluntad.',
      vestments: 'Blanco inmaculado y Oro'
    },
    {
      season: 'Epifanía',
      color: '#ffffff',
      dates: '6 de Enero – Tiempo previo a Pasión',
      quality: 'La manifestación de la divinidad en el Bautismo del Jordán. El Cristo desciende a la biografía de Jesús.',
      vestments: 'Blanco'
    },
    {
      season: 'Pasión (Cuaresma)',
      color: '#1e1b4b', // deep violet / black
      dates: 'Cuatro semanas previas a Pascua',
      quality: 'El dolor cósmico, la prueba, la confrontación de las sombras y la purificación del corazón.',
      vestments: 'Negro / Violeta'
    },
    {
      season: 'Pascua',
      color: '#dc2626', // scarlet / white
      dates: 'Domingo de Resurrección – Cuatro semanas',
      quality: 'La Resurrección. El triunfo de la Vida (Zoe) sobre la muerte física. La Tierra recibe su alma inmortal.',
      vestments: 'Rojo vivo y Blanco'
    },
    {
      season: 'Ascensión',
      color: '#ffffff',
      dates: '40 días tras Pascua',
      quality: 'El Cristo se ensancha en las esferas del aire y del éter cósmico que envuelven la Tierra.',
      vestments: 'Blanco'
    },
    {
      season: 'Pentecostés',
      color: '#ea580c', // fire orange / gold
      dates: '50 días tras Pascua',
      quality: 'La efusión del Espíritu Santo. Las lenguas de fuego sobre la comunidad y el nacimiento de la Iglesia universal.',
      vestments: 'Rojo ígneo / Naranja'
    },
    {
      season: 'San Juan',
      color: '#16a34a', // green / light
      dates: '24 de Junio y semanas posteriores',
      quality: 'El solsticio: la naturaleza en su máxima expansión. El llamado del Bautista: «Es necesario que Él crezca y yo disminuya».',
      vestments: 'Blanco'
    },
    {
      season: 'Micael',
      color: '#991b1b', // crimson
      dates: '29 de Septiembre – Adviento',
      quality: 'El coraje del alma. La espada de luz que vence al dragón del miedo y la apatía en la civilización.',
      vestments: 'Rojo carmesí'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
            <CalendarDays className="w-4 h-4 text-amber-700" />
            <span>Estructura y Ritmo Formativo</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-sacred text-stone-900">
            Módulos del Proseminario y Año Litúrgico
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Toda la información simplificada de la cursada propedéutica, las cuatro estaciones del año sagrado y la articulación hacia el Seminario Sacerdotal formal.
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-200">
          <button
            onClick={() => setActiveSubTab('modulos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'modulos' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Los 4 Módulos
          </button>
          <button
            onClick={() => setActiveSubTab('liturgia')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'liturgia' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Año Litúrgico
          </button>
          <button
            onClick={() => setActiveSubTab('seminario')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'seminario' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            El Seminario
          </button>
        </div>
      </div>

      {/* Subtab 1: Los 4 Módulos */}
      {activeSubTab === 'modulos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROSEMINAR_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between hover:border-amber-400 transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-amber-800 text-white font-serif-sacred font-bold flex items-center justify-center text-sm shadow-xs">
                      {mod.number}
                    </span>
                    <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      {mod.period}
                    </span>
                  </div>

                  <h3 className="font-serif-sacred font-bold text-stone-900 text-xl leading-snug mb-2">
                    {mod.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-serif mb-4">
                    {mod.description}
                  </p>

                  <div className="space-y-2 mb-4 bg-[#FAF8F5] p-4 rounded-2xl border border-stone-100">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                      Ejes Temáticos Esenciales:
                    </span>
                    {mod.essentialThemes.map((theme, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{theme}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Tutoría: {mod.assignedPriest}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('estudio')}
                    className="text-amber-800 hover:text-amber-950 font-semibold"
                  >
                    Ver lecturas →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 2: Año Litúrgico */}
      {activeSubTab === 'liturgia' && (
        <div className="space-y-6">
          <div className="bg-[#FAF7F2] p-5 rounded-3xl border border-stone-200 text-xs sm:text-sm text-stone-700 space-y-2">
            <h3 className="text-base font-bold font-serif-sacred text-stone-900 flex items-center space-x-2">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>La Respiración del Año Cristiano</span>
            </h3>
            <p className="font-serif leading-relaxed">
              En la Comunidad de Cristianos, el año litúrgico no es una mera convención calendárica, sino la vivencia consciente del intercambio entre el alma humana, las fuerzas de la Tierra y las corrientes solares cósmicas. Los sacerdotes modifican las vestiduras, los altares y las oraciones del Acto de Consagración del Hombre según este ritmo sagrado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {liturgicalCycles.map((cycle, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-2 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif-sacred font-bold text-stone-900 text-base">
                    {cycle.season}
                  </span>
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-xs"
                    style={{ backgroundColor: cycle.color }}
                  />
                </div>
                <span className="text-[11px] text-amber-900 font-semibold block">
                  {cycle.dates}
                </span>
                <p className="text-xs text-stone-600 font-serif leading-relaxed">
                  {cycle.quality}
                </p>
                <div className="pt-2 border-t border-stone-100 text-[10px] text-stone-400">
                  Vestiduras: {cycle.vestments}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: El Seminario Sacerdotal */}
      {activeSubTab === 'seminario' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <h3 className="text-2xl font-bold font-serif-sacred text-stone-900">
              Del Proseminario al Seminario Sacerdotal
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed">
              El Proseminario "Aquí y Ahora" funciona como puente y preparación propedéutica para quienes sienten la inquietud de formarse como sacerdotes de la Comunidad de Cristianos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center space-x-2 text-stone-900 font-bold font-serif text-lg">
                <MapPin className="w-5 h-5 text-amber-700" />
                <span>Priesterseminar Stuttgart</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-serif">
                El seminario histórico original de la Comunidad de Cristianos en Alemania. Ofrece un programa intensivo de tres a cuatro años que integra exégesis bíblica en griego original, teología antroposófica, euritmia cúltica, arte de la palabra, pastoral hospitalaria y práctica litúrgica diaria.
              </p>
              <a
                href="https://priesterseminar-stuttgart.de"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center space-x-1"
              >
                <span>Conocer sede Stuttgart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center space-x-2 text-stone-900 font-bold font-serif text-lg">
                <MapPin className="w-5 h-5 text-amber-700" />
                <span>Priesterseminar Hamburg</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-serif">
                Sede complementaria en el norte de Alemania con cohortes internacionales y fuerte vinculación con el arte social, la educación de adultos y la renovación espiritual en contextos urbanos contemporáneos.
              </p>
              <a
                href="https://priesterseminar-hamburg.de"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center space-x-1"
              >
                <span>Conocer sede Hamburgo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 text-xs text-stone-800 space-y-1.5 font-serif">
            <span className="font-bold text-amber-950 block">¿Cómo dar el paso siguiente?</span>
            <p>
              Durante el proseminario, mantendrás coloquios individuales de acompañamiento con los sacerdotes tutores (Pbro. Esteban Morales y Pbra. Helena Von Berg) para discernir conjuntamente el momento oportuno de postulación al seminario formal europeo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
