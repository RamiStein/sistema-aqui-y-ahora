import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProseminarClass, UserProfile } from '../../types';
import { 
  CalendarDays, 
  Calendar, 
  Clock, 
  BookOpen, 
  ShieldCheck, 
  Plus, 
  CheckCircle2, 
  Video, 
  MapPin, 
  Filter, 
  FileText,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const ClassesCalendarModule: React.FC = () => {
  const { classes, addClass, availableUsers, setActiveTab, joinMeeting, meetings, showToast } = useApp();
  
  const [filterTime, setFilterTime] = useState<'todas' | 'proximas' | 'pasadas'>('todas');
  const [selectedPriestId, setSelectedPriestId] = useState<string>('todos');
  const [selectedModule, setSelectedModule] = useState<string>('todos');
  const [isNewClassModalOpen, setIsNewClassModalOpen] = useState(false);

  // Form states for adding a new class
  const [title, setTitle] = useState('');
  const [moduleNumber, setModuleNumber] = useState(2);
  const [moduleTitle, setModuleTitle] = useState('Módulo 2: Los Cuatro Evangelios');
  const [date, setDate] = useState('2026-11-15');
  const [time, setTime] = useState('10:00');
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [assignedPriestId, setAssignedPriestId] = useState('user_priest_esteban');
  const [status, setStatus] = useState<ProseminarClass['status']>('proxima');
  const [syllabusText, setSyllabusText] = useState('');
  const [requiredReading, setRequiredReading] = useState('');
  const [modality, setModality] = useState<ProseminarClass['modality']>('virtual');
  const [locationOrLink, setLocationOrLink] = useState('Sala Jitsi Integrada de Video');

  const priests = availableUsers.filter(u => u.role === 'sacerdote');

  const filteredClasses = classes.filter(cls => {
    // Filter by timing (proximas vs pasadas)
    if (filterTime === 'proximas' && cls.status !== 'proxima' && cls.status !== 'en_curso') return false;
    if (filterTime === 'pasadas' && cls.status !== 'pasada') return false;
    
    // Filter by priest
    if (selectedPriestId !== 'todos' && cls.assignedPriest.id !== selectedPriestId) return false;

    // Filter by module
    if (selectedModule !== 'todos' && cls.moduleNumber.toString() !== selectedModule) return false;

    return true;
  });

  const upcomingCount = classes.filter(c => c.status === 'proxima' || c.status === 'en_curso').length;
  const pastCount = classes.filter(c => c.status === 'pasada').length;

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Por favor completa el título de la clase');
      return;
    }

    const assignedPriest = availableUsers.find(u => u.id === assignedPriestId) || priests[0];
    const syllabus = syllabusText
      .split('\n')
      .map(line => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(l => l.length > 0);

    addClass({
      title: title.trim(),
      moduleNumber: Number(moduleNumber),
      moduleTitle,
      date,
      time,
      durationMinutes: Number(durationMinutes),
      assignedPriest,
      status,
      syllabus: syllabus.length > 0 ? syllabus : ['Estudio temático del ciclo evangélico y reflexión comunitaria.'],
      requiredReading: requiredReading.trim() || undefined,
      modality,
      locationOrLink
    });

    setIsNewClassModalOpen(false);
    setTitle('');
    setSyllabusText('');
    setRequiredReading('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
            <CalendarDays className="w-4 h-4 text-amber-700" />
            <span>Plan de Cursada y Docencia Sacerdotal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-sacred text-stone-900 leading-tight">
            Calendario de Clases: Pasadas y Porvenir
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl font-light">
            Consulta los temarios estructurados de cada sesión, las lecturas previas requeridas y los sacerdotes tutores a cargo del dictado.
          </p>
        </div>

        <button
          onClick={() => setIsNewClassModalOpen(true)}
          className="self-start md:self-auto px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Agendar Nueva Clase</span>
        </button>
      </div>

      {/* Filter and Switcher Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Timing Tabs */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200/80">
            <button
              onClick={() => setFilterTime('todas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterTime === 'todas'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Todas ({classes.length})
            </button>
            <button
              onClick={() => setFilterTime('proximas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                filterTime === 'proximas'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Porvenir / Próximas ({upcomingCount})</span>
            </button>
            <button
              onClick={() => setFilterTime('pasadas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                filterTime === 'pasadas'
                  ? 'bg-stone-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Pasadas / Dictadas ({pastCount})</span>
            </button>
          </div>

          {/* Quick Filters: Sacerdote & Módulo */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-stone-400">Sacerdote:</span>
              <select
                value={selectedPriestId}
                onChange={(e) => setSelectedPriestId(e.target.value)}
                className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 text-stone-700"
              >
                <option value="todos">Todos los sacerdotes</option>
                {priests.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-1 text-xs">
              <span className="text-stone-400">Módulo:</span>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 text-stone-700"
              >
                <option value="todos">Todos los módulos</option>
                <option value="1">Módulo 1: Fundamentos</option>
                <option value="2">Módulo 2: Evangelios</option>
                <option value="3">Módulo 3: Liturgia</option>
                <option value="4">Módulo 4: Autoeducación</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="space-y-5">
        {filteredClasses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-stone-300 p-6 text-stone-500">
            <CalendarDays className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-medium">No hay clases registradas con este filtro.</p>
          </div>
        ) : (
          filteredClasses.map((cls) => {
            const isPast = cls.status === 'pasada';

            return (
              <div
                key={cls.id}
                className={`bg-white rounded-3xl border p-6 transition-all hover:shadow-md flex flex-col justify-between ${
                  !isPast 
                    ? 'border-amber-300 bg-gradient-to-br from-white via-white to-amber-50/20 shadow-xs' 
                    : 'border-stone-200 opacity-95'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Status & Date Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        !isPast 
                          ? 'bg-amber-100 text-amber-950 border border-amber-300' 
                          : 'bg-stone-100 text-stone-600 border border-stone-200'
                      }`}>
                        {!isPast ? (
                          <>
                            <Sparkles className="w-3 h-3 mr-1 text-amber-700" />
                            Próxima Clase (Porvenir)
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3 h-3 mr-1 text-stone-500" />
                            Clase Dictada (Pasada)
                          </>
                        )}
                      </span>

                      <span className="text-[11px] font-semibold text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                        {cls.moduleTitle}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-stone-500">
                      <span className="flex items-center space-x-1 font-semibold text-stone-800">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        <span>{cls.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{cls.time} hs ({cls.durationMinutes} min)</span>
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-sacred font-bold text-stone-900 text-xl sm:text-2xl leading-snug">
                    {cls.title}
                  </h3>

                  {/* Priest in charge Card */}
                  <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200/80 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={cls.assignedPriest.avatar}
                        alt={cls.assignedPriest.name}
                        className="w-10 h-10 rounded-full object-cover border border-amber-200"
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-serif-sacred font-bold text-stone-900 text-sm">
                            {cls.assignedPriest.name}
                          </span>
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                        </div>
                        <span className="text-[11px] text-amber-900 font-medium block">
                          Sacerdote a cargo del temario
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-stone-500 capitalize hidden sm:inline-block">
                      Modalidad: {cls.modality}
                    </span>
                  </div>

                  {/* Syllabus / Temario Section */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                      Temario Formativo de la Sesión:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cls.syllabus.map((point, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-100 leading-relaxed font-serif">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Reading */}
                  {cls.requiredReading && (
                    <div className="flex items-start space-x-2 text-xs text-stone-700 bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                      <BookOpen className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-950 font-semibold">Lectura Previa Requerida:</strong>{' '}
                        <span className="font-serif italic">{cls.requiredReading}</span>
                      </div>
                    </div>
                  )}

                  {/* Summary / Notes for past classes */}
                  {isPast && cls.summaryNote && (
                    <div className="flex items-start space-x-2 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200">
                      <FileText className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-stone-800 font-semibold">Resumen / Síntesis de la clase:</strong>{' '}
                        <span className="font-serif">{cls.summaryNote}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-2 text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{cls.locationOrLink || 'Sala Jitsi'}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveTab('asistencia')}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-medium flex items-center space-x-1.5 transition-colors"
                      title="Ver o registrar asistencia de esta clase"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Ver Asistencia</span>
                    </button>

                    {!isPast ? (
                      <button
                        onClick={() => {
                          const targetMeeting = meetings[0];
                          if (targetMeeting) joinMeeting(targetMeeting.id);
                          else setActiveTab('salas_cartelera');
                        }}
                        className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-semibold flex items-center space-x-1.5 shadow-xs transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Entrar a la Sala Virtual</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveTab('estudio')}
                        className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl font-medium flex items-center space-x-1 transition-colors"
                      >
                        <span>Ver textos y resúmenes</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Agendar Nueva Clase */}
      <Modal
        isOpen={isNewClassModalOpen}
        onClose={() => setIsNewClassModalOpen(false)}
        title="Agendar Nueva Clase del Proseminario"
        subtitle="Registra el título, fecha, temario estructurado y sacerdote asignado"
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateClass} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Título de la Clase *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: El Evangelio de Lucas y la Corriente de Buda..."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Sacerdote a Cargo *
              </label>
              <select
                value={assignedPriestId}
                onChange={(e) => setAssignedPriestId(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {priests.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.locality})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Módulo del Proseminario *
              </label>
              <select
                value={moduleNumber}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  setModuleNumber(num);
                  const titles = [
                    '',
                    'Módulo 1: Fundamentos Teológicos',
                    'Módulo 2: Los Cuatro Evangelios',
                    'Módulo 3: Vida Sacramental',
                    'Módulo 4: Autoeducación y Oratoria'
                  ];
                  setModuleTitle(titles[num]);
                }}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value={1}>Módulo 1: Fundamentos Teológicos</option>
                <option value={2}>Módulo 2: Los Cuatro Evangelios</option>
                <option value={3}>Módulo 3: Vida Sacramental</option>
                <option value={4}>Módulo 4: Autoeducación y Oratoria</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Fecha *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Hora (HH:mm) *
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Duración (min)
              </label>
              <input
                type="number"
                min="30"
                max="240"
                step="15"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Temario / Puntos Clave de la Clase (Uno por línea) *
            </label>
            <textarea
              rows={4}
              required
              value={syllabusText}
              onChange={(e) => setSyllabusText(e.target.value)}
              placeholder="• Primer punto temático a desarrollar&#10;• Exégesis de pasajes bíblicos o conferencias&#10;• Diálogo y preguntas de los participantes"
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-serif focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Lectura Previa Requerida (Opcional)
            </label>
            <input
              type="text"
              value={requiredReading}
              onChange={(e) => setRequiredReading(e.target.value)}
              placeholder="Ej: GA 114 - Evangelio de San Lucas (Conferencias 1 y 2)"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsNewClassModalOpen(false)}
              className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Agendar Clase
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
