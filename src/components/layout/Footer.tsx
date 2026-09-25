import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, RotateCcw, Heart, Globe, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const { resetData } = useApp();

  return (
    <footer className="mt-16 bg-[#F4EFEA] border-t border-stone-200/90 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 font-serif-sacred text-lg font-bold">
              <div className="w-7 h-7 rounded-lg bg-amber-800 text-amber-200 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <span>Aquí y Ahora • Proseminario</span>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed max-w-md">
              Plataforma integradora de estudio, comunión fraternal y discernimiento vocacional para los participantes del Proseminario de la Comunidad de Cristianos (Movimiento para la Renovación Religiosa de orientación antroposófica).
            </p>
            <p className="text-[11px] text-stone-500 italic font-serif">
              «Vivir en el Aquí y Ahora es anclar el espíritu en cada acción sacramental cotidiana.»
            </p>
          </div>

          {/* Col 2: Useful Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">
              Vínculos Formativos
            </h4>
            <ul className="space-y-1.5 text-stone-600">
              <li className="flex items-center space-x-1.5 hover:text-amber-900 transition-colors">
                <Globe className="w-3.5 h-3.5 text-stone-400" />
                <a href="https://www.christengemeinschaft.org" target="_blank" rel="noreferrer">
                  Die Christengemeinschaft (Internacional)
                </a>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-amber-900 transition-colors">
                <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                <a href="https://priesterseminar-stuttgart.de" target="_blank" rel="noreferrer">
                  Seminario Sacerdotal de Stuttgart
                </a>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-amber-900 transition-colors">
                <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                <a href="https://priesterseminar-hamburg.de" target="_blank" rel="noreferrer">
                  Seminario Sacerdotal de Hamburgo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: System Utilities */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">
              Administración Local
            </h4>
            <p className="text-[11px] text-stone-500 leading-normal">
              Todos tus apuntes, preguntas, publicaciones y salas se guardan localmente en tu navegador.
            </p>
            <button
              onClick={() => {
                if (window.confirm('¿Deseas restablecer los datos de muestra originales del Proseminario? Esto renovará las preguntas, libros y avisos iniciales.')) {
                  resetData();
                }
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer datos demo</span>
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-300/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <p>© {new Date().getFullYear()} Proseminario "Aquí y Ahora" • Comunidad de Cristianos</p>
          <p className="flex items-center space-x-1">
            <span>Diseñado con devoción y espíritu comunitario</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
