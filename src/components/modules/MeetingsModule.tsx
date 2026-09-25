import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MeetingRoom } from '../../types';
import { 
  Video, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  BookOpen, 
  Radio, 
  Check, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const MeetingsModule: React.FC = () => {
  const { meetings, addMeeting, joinMeeting, activeUser, showToast } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('19:30');
  const [duration, setDuration] = useState(60);
  const [modality, setModality] = useState<MeetingRoom['modality']>('virtual');
  const [category, setCategory] = useState<MeetingRoom['topicCategory']>('lectura_evangelio');
  const [maxParticipants, setMaxParticipants] = useState(15);

  const getCategoryMeta = (cat: MeetingRoom['topicCategory']) => {
    switch (cat) {
      case 'lectura_evangelio':
        return { label: 'Lectura del Evangelio', icon: BookOpen, color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'practica_habla':
        return { label: 'Práctica del Habla', icon: Sparkles, color: 'bg-purple-100 text-purple-900 border-purple-300' };
      case 'repaso_conferencias':
        return { label: 'Repaso de Conferencias', icon: Calendar, color: 'bg-blue-100 text-blue-900 border-blue-300' };
      case 'conversacion_libre':
      default:
        return { label: 'Conversación Fraternal', icon: MessageSquare, color: 'bg-amber-100 text-amber-900 border-amber-300' };
    }
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Por favor completa el título y la descripción del encuentro');
      return;
    }

    addMeeting({
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      durationMinutes: Number(duration),
      modality,
      locationOrPlatform: modality === 'virtual' ? 'Sala Jitsi Integrada de Video' : 'Sede Presencial / Híbrida',
      topicCategory: category,
      maxParticipants: Number(maxParticipants)
    });

    setIsCreateModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleLaunchInstantRoom = () => {
    const instantMeetingTitle = `Encuentro Espontáneo: ${activeUser.name} y amigos`;
    const cleanRoom = 'Instantanea-' + Date.now();
    addMeeting({
      title: instantMeetingTitle,
      description: 'Sala de diálogo fraternal abierta espontáneamente para conversar en el Aquí y Ahora.',
      date: new Date().toISOString().split('T')[0],
      time: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`,
      durationMinutes: 45,
      modality: 'virtual',
      locationOrPlatform: 'Sala Jitsi Integrada de Video',
      jitsiRoomName: cleanRoom,
      topicCategory: 'conversacion_libre',
      maxParticipants: 10
    });
    showToast('Sala instantánea creada. Conectando...');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
            <Video className="w-4 h-4 text-amber-700" />
            <span>Encuentros Fraternales</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-sacred text-stone-900">
            Salas de Conversación y Estudio
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Círculos de lectura bíblica, diálogos de discernimiento vocacional y salas virtuales de video integradas para conectar en tiempo real entre integrantes de distintas ciudades.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleLaunchInstantRoom}
            className="px-3.5 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-colors"
            title="Abrir una sala de video al instante"
          >
            <Radio className="w-4 h-4 text-amber-800" />
            <span>Abrir Sala Inmediata</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Organizar Encuentro</span>
          </button>
        </div>
      </div>

      {/* Notice box about Jitsi integration */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-950 flex items-start space-x-3">
        <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Salas de Video 100% integradas y libres de instalación:</span>
          <p className="leading-relaxed text-stone-700">
            Cada encuentro virtual cuenta con una sala de videollamada interactiva (con micrófono, cámara y pantalla compartida) que se abre directamente dentro de la plataforma sin necesidad de registrarse en servicios externos.
          </p>
        </div>
      </div>

      {/* Meetings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map((meeting) => {
          const meta = getCategoryMeta(meeting.topicCategory);
          const CategoryIcon = meta.icon;

          return (
            <div
              key={meeting.id}
              className={`bg-white rounded-3xl border p-6 transition-all hover:shadow-md flex flex-col justify-between ${
                meeting.isLiveNow
                  ? 'border-rose-300 ring-2 ring-rose-100 bg-gradient-to-br from-white to-rose-50/20'
                  : 'border-stone-200'
              }`}
            >
              <div>
                {/* Header: Category & Live Indicator */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${meta.color}`}>
                    <CategoryIcon className="w-3 h-3 mr-1" />
                    {meta.label}
                  </span>

                  {meeting.isLiveNow ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white animate-pulse">
                      <Radio className="w-3 h-3 mr-1" /> EN VIVO AHORA
                    </span>
                  ) : (
                    <span className="text-[11px] text-stone-400 capitalize">
                      {meeting.modality}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif-sacred font-bold text-stone-900 text-lg leading-snug mb-2">
                  {meeting.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 mb-4 leading-relaxed font-serif">
                  {meeting.description}
                </p>

                {/* Schedule Details */}
                <div className="space-y-1.5 py-3 border-t border-b border-stone-100 text-xs text-stone-600 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1.5 text-stone-500">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{meeting.date}</span>
                    </span>
                    <span className="flex items-center space-x-1.5 font-semibold text-stone-800">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{meeting.time} hs ({meeting.durationMinutes} min)</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">Guía / Anfitrión:</span>
                    <span className="text-xs font-medium text-stone-800">{meeting.host.name}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => joinMeeting(meeting.id)}
                  className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs ${
                    meeting.isLiveNow
                      ? 'bg-rose-700 hover:bg-rose-800 text-white'
                      : 'bg-stone-800 hover:bg-stone-900 text-white'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>
                    {meeting.isLiveNow ? 'Unirse a la Videollamada en Vivo' : 'Entrar a la Sala Virtual'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Meeting Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Organizar Nuevo Encuentro o Sala de Estudio"
        subtitle={`Organizado por: ${activeUser.name}`}
        maxWidth="lg"
      >
        <form onSubmit={handleCreateMeeting} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Título del Encuentro *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Círculo de Lectura: El Prólogo del Evangelio de Juan..."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Tipo de Actividad *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="lectura_evangelio">Lectura del Evangelio</option>
                <option value="conversacion_libre">Conversación Fraternal</option>
                <option value="repaso_conferencias">Repaso de Conferencias</option>
                <option value="practica_habla">Práctica del Habla</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Modalidad
              </label>
              <select
                value={modality}
                onChange={(e) => setModality(e.target.value as any)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="virtual">Virtual (Sala Jitsi Integrada)</option>
                <option value="hibrido">Híbrido (Presencial + Transmisión)</option>
                <option value="presencial">Presencial en Sede</option>
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
                min="15"
                max="180"
                step="15"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Propósito y Temas a Tratar *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explica qué texto se leerá o el enfoque del círculo de conversación..."
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Agendar Encuentro
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
