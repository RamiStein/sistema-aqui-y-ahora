import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Calendar, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Filter,
  Check,
  UserCheck
} from 'lucide-react';
import { AttendanceStatus, AttendanceSession, UserProfile } from '../../types';
import { Modal } from '../common/Modal';

export const AttendanceModule: React.FC = () => {
  const { 
    attendanceSessions, 
    updateAttendance, 
    addAttendanceSession, 
    availableUsers, 
    showToast 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'asistencia' | 'directorio'>('asistencia');
  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    attendanceSessions[0]?.id || ''
  );
  const [filterRole, setFilterRole] = useState<'todos' | 'sacerdotes' | 'estudiantes'>('todos');
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);

  // New session modal state
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [newSessionDate, setNewSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [newSessionType, setNewSessionType] = useState<AttendanceSession['type']>('clase');

  const currentSession = attendanceSessions.find(s => s.id === selectedSessionId) || attendanceSessions[0];

  // Helper to calculate statistics
  const priests = availableUsers.filter(u => u.role === 'sacerdote');
  const students = availableUsers.filter(u => u.role !== 'sacerdote');

  const getFilteredUsers = () => {
    if (filterRole === 'sacerdotes') return priests;
    if (filterRole === 'estudiantes') return students;
    return availableUsers;
  };

  const getAttendanceForUser = (sessionId: string, userId: string): { status: AttendanceStatus; note?: string } => {
    const session = attendanceSessions.find(s => s.id === sessionId);
    if (!session) return { status: 'presente' };
    const rec = session.records.find(r => r.userId === userId);
    return rec ? { status: rec.status, note: rec.note } : { status: 'presente' };
  };

  const calculateUserOverallRate = (userId: string) => {
    if (attendanceSessions.length === 0) return 100;
    let presentCount = 0;
    attendanceSessions.forEach(s => {
      const rec = s.records.find(r => r.userId === userId);
      if (rec && (rec.status === 'presente' || rec.status === 'justificado')) {
        presentCount++;
      }
    });
    return Math.round((presentCount / attendanceSessions.length) * 100);
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionTitle.trim()) {
      showToast('Por favor ingresa un título para el encuentro');
      return;
    }
    addAttendanceSession(newSessionTitle.trim(), newSessionDate, newSessionType);
    setIsNewSessionModalOpen(false);
    setNewSessionTitle('');
  };

  // Session stats
  const currentSessionStats = (() => {
    if (!currentSession) return { present: 0, absent: 0, excused: 0, total: 0, percentage: 0 };
    let present = 0;
    let absent = 0;
    let excused = 0;
    availableUsers.forEach(u => {
      const rec = getAttendanceForUser(currentSession.id, u.id);
      if (rec.status === 'presente') present++;
      else if (rec.status === 'ausente') absent++;
      else if (rec.status === 'justificado') excused++;
    });
    const total = availableUsers.length;
    const percentage = total > 0 ? Math.round(((present + excused) / total) * 100) : 0;
    return { present, absent, excused, total, percentage };
  })();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
            <Users className="w-4 h-4 text-amber-700" />
            <span>Gestión del Grupo y Registro</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-sacred text-stone-900">
            Comunidad y Registro de Asistencia
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Control de asistencia interactivo para clases y talleres, junto al directorio completo de sacerdotes tutores e integrantes del Proseminario.
          </p>
        </div>

        {/* Tab switch & Add Session button */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-200">
            <button
              onClick={() => setActiveSubTab('asistencia')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'asistencia' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Llevar Asistencia
            </button>
            <button
              onClick={() => setActiveSubTab('directorio')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'directorio' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Directorio de Integrantes ({availableUsers.length})
            </button>
          </div>

          {activeSubTab === 'asistencia' && (
            <button
              onClick={() => setIsNewSessionModalOpen(true)}
              className="px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nueva Fecha</span>
            </button>
          )}
        </div>
      </div>

      {/* Subtab 1: Llevar Asistencia */}
      {activeSubTab === 'asistencia' && (
        <div className="space-y-6">
          {/* Session Selector & Live Stats Bar */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 max-w-md">
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                  Seleccionar Clase / Encuentro
                </label>
                <select
                  value={selectedSessionId}
                  onChange={(e) => setSelectedSessionId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {attendanceSessions.map(session => (
                    <option key={session.id} value={session.id}>
                      {session.date} — {session.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stats badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">Presentes</span>
                  <span className="text-base font-bold text-emerald-900 font-mono">{currentSessionStats.present}</span>
                </div>
                <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Justificados</span>
                  <span className="text-base font-bold text-amber-900 font-mono">{currentSessionStats.excused}</span>
                </div>
                <div className="px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-bold text-rose-800 block">Ausentes</span>
                  <span className="text-base font-bold text-rose-900 font-mono">{currentSessionStats.absent}</span>
                </div>
                <div className="px-3.5 py-1.5 bg-stone-900 text-white rounded-xl text-center">
                  <span className="text-[10px] uppercase font-semibold text-stone-300 block">Asistencia</span>
                  <span className="text-base font-bold text-amber-300 font-mono">{currentSessionStats.percentage}%</span>
                </div>
              </div>
            </div>

            {/* Filter by role pills */}
            <div className="flex items-center space-x-2 pt-2 border-t border-stone-100 text-xs">
              <span className="text-stone-400 font-medium">Mostrar:</span>
              <button
                onClick={() => setFilterRole('todos')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filterRole === 'todos' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Todos ({availableUsers.length})
              </button>
              <button
                onClick={() => setFilterRole('sacerdotes')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filterRole === 'sacerdotes' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Sacerdotes ({priests.length})
              </button>
              <button
                onClick={() => setFilterRole('estudiantes')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filterRole === 'estudiantes' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Integrantes ({students.length})
              </button>
            </div>
          </div>

          {/* Interactive Attendance Table */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 border-b border-stone-100 bg-[#FCFAF7] flex items-center justify-between">
              <div>
                <h3 className="font-serif-sacred font-bold text-stone-900 text-base sm:text-lg">
                  {currentSession?.title}
                </h3>
                <p className="text-xs text-stone-500">
                  Fecha: {currentSession?.date} • Haz clic en los botones para alternar el estado
                </p>
              </div>
              <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-200/70 text-stone-700 capitalize">
                {currentSession?.type}
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {getFilteredUsers().map(user => {
                const userAtt = getAttendanceForUser(currentSession?.id || '', user.id);
                const overallRate = calculateUserOverallRate(user.id);

                return (
                  <div
                    key={user.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/70 transition-colors"
                  >
                    {/* User Identity */}
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-stone-900 text-sm">
                            {user.name}
                          </span>
                          {user.role === 'sacerdote' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                              <ShieldCheck className="w-3 h-3 mr-0.5 text-amber-700" /> Sacerdote
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-600">
                              <BookOpen className="w-3 h-3 mr-0.5 text-stone-400" /> Estudiante
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5 flex items-center space-x-2">
                          <span>{user.locality}</span>
                          <span>•</span>
                          <span className="font-mono text-stone-400">Asistencia global: {overallRate}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Attendance Toggle Buttons */}
                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      <button
                        onClick={() => updateAttendance(currentSession.id, user.id, 'presente')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${
                          userAtt.status === 'presente'
                            ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                            : 'bg-stone-100 hover:bg-emerald-100 text-stone-600 hover:text-emerald-800'
                        }`}
                        title="Presente"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Presente</span>
                      </button>

                      <button
                        onClick={() => updateAttendance(currentSession.id, user.id, 'justificado')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${
                          userAtt.status === 'justificado'
                            ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-300'
                            : 'bg-stone-100 hover:bg-amber-100 text-stone-600 hover:text-amber-800'
                        }`}
                        title="Justificado"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Justificado</span>
                      </button>

                      <button
                        onClick={() => updateAttendance(currentSession.id, user.id, 'ausente')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${
                          userAtt.status === 'ausente'
                            ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-300'
                            : 'bg-stone-100 hover:bg-rose-100 text-stone-600 hover:text-rose-800'
                        }`}
                        title="Ausente"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Ausente</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Directorio de Integrantes y Sacerdotes */}
      {activeSubTab === 'directorio' && (
        <div className="space-y-8">
          {/* Section 1: Sacerdotes Tutores */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-stone-900 font-serif-sacred text-xl font-bold border-b border-stone-200 pb-2">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              <span>Sacerdotes de la Comunidad ({priests.length})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {priests.map(priest => (
                <div
                  key={priest.id}
                  className="bg-white rounded-3xl border border-amber-300/80 p-5 shadow-xs bg-gradient-to-br from-white to-[#FAF6EE] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={priest.avatar}
                        alt={priest.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-amber-200 shadow-xs"
                      />
                      <div>
                        <h4 className="font-serif-sacred font-bold text-stone-900 text-base leading-tight">
                          {priest.name}
                        </h4>
                        <span className="text-[11px] text-amber-900 font-semibold block">
                          {priest.generation}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 font-serif leading-relaxed line-clamp-3">
                      {priest.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-amber-100 text-xs text-stone-600 space-y-1">
                    {priest.locality && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{priest.locality}</span>
                      </div>
                    )}
                    {priest.email && (
                      <div className="flex items-center space-x-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-stone-400" />
                        <span className="truncate">{priest.email}</span>
                      </div>
                    )}
                    {priest.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3.5 h-3.5 text-stone-400" />
                        <span>{priest.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Integrantes del Proseminario */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-stone-900 font-serif-sacred text-xl font-bold border-b border-stone-200 pb-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <span>Integrantes del Proseminario ({students.length})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {students.map(student => {
                const overallRate = calculateUserOverallRate(student.id);

                return (
                  <div
                    key={student.id}
                    className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-300 transition-all hover:shadow-md"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-11 h-11 rounded-full object-cover border border-stone-200"
                          />
                          <div>
                            <h4 className="font-semibold text-stone-900 text-sm">
                              {student.name}
                            </h4>
                            <span className="text-[11px] text-stone-400 block">
                              {student.generation}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-800 font-mono block">
                            {overallRate}%
                          </span>
                          <span className="text-[10px] text-stone-400">Asistencia</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 font-serif leading-relaxed line-clamp-2">
                        {student.bio || 'Participante del Proseminario de la Comunidad de Cristianos.'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1">
                      {student.locality && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          <span>{student.locality}</span>
                        </div>
                      )}
                      {student.email && (
                        <div className="flex items-center space-x-2 truncate">
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <span className="truncate">{student.email}</span>
                        </div>
                      )}
                      {student.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3.5 h-3.5 text-stone-400" />
                          <span>{student.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Attendance Session */}
      <Modal
        isOpen={isNewSessionModalOpen}
        onClose={() => setIsNewSessionModalOpen(false)}
        title="Crear Nueva Fecha de Asistencia"
        subtitle="Registra un nuevo encuentro, clase o taller del Proseminario"
        maxWidth="md"
      >
        <form onSubmit={handleCreateSession} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Nombre de la Clase o Actividad *
            </label>
            <input
              type="text"
              required
              value={newSessionTitle}
              onChange={(e) => setNewSessionTitle(e.target.value)}
              placeholder="Ej: Módulo 3: El Acto Sacramental y las Festividades..."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Fecha del Encuentro *
              </label>
              <input
                type="date"
                required
                value={newSessionDate}
                onChange={(e) => setNewSessionDate(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Tipo
              </label>
              <select
                value={newSessionType}
                onChange={(e) => setNewSessionType(e.target.value as any)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="clase">Clase Teórica</option>
                <option value="circulo">Círculo de Lectura</option>
                <option value="taller">Taller Práctico / Cúltico</option>
                <option value="retiro">Retiro / Inmersión</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsNewSessionModalOpen(false)}
              className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Crear Registro
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
