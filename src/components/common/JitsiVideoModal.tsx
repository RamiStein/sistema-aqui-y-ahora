import React, { useState } from 'react';
import { Modal } from './Modal';
import { MeetingRoom } from '../../types';
import { useApp } from '../../context/AppContext';
import { Video, Users, FileText, Send, Sparkles, ExternalLink } from 'lucide-react';

interface JitsiVideoModalProps {
  meeting: MeetingRoom | null;
  onClose: () => void;
}

export const JitsiVideoModal: React.FC<JitsiVideoModalProps> = ({ meeting, onClose }) => {
  const { activeUser } = useApp();
  const [activeTab, setActiveTab] = useState<'video' | 'notes'>('video');
  const [sessionNotes, setSessionNotes] = useState('');
  const [meetingChat, setMeetingChat] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Pbro. Esteban Morales', text: '¡Bienvenidos todos! Iniciamos con 2 minutos de silencio interior.', time: '19:30' },
    { sender: 'Clara Menéndez', text: 'Buenas tardes a todos, conectada desde Uruguay.', time: '19:32' }
  ]);
  const [chatInput, setChatInput] = useState('');

  if (!meeting) return null;

  const roomName = meeting.jitsiRoomName || `ProseminarioAquiYAhora-${meeting.id}`;
  const jitsiUrl = `https://meet.jit.si/${encodeURIComponent(roomName)}#userInfo.displayName=${encodeURIComponent(activeUser.name)}&config.prejoinPageEnabled=false&config.startWithAudioMuted=true&config.startWithVideoMuted=false`;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setMeetingChat(prev => [...prev, { sender: activeUser.name, text: chatInput.trim(), time: timeStr }]);
    setChatInput('');
  };

  return (
    <Modal
      isOpen={!!meeting}
      onClose={onClose}
      title={meeting.title}
      subtitle={`Anfitrión: ${meeting.host.name} • ${meeting.modality.toUpperCase()} • ${meeting.date} a las ${meeting.time} hs`}
      maxWidth="full"
    >
      <div className="flex flex-col space-y-4">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50/70 border border-amber-200/70 p-3 rounded-xl">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              Sala Activa en Vivo
            </span>
            <span className="text-stone-300">•</span>
            <div className="flex items-center text-xs text-stone-600">
              <Users className="w-3.5 h-3.5 mr-1 text-stone-500" />
              <span>{meeting.participantsCount} participantes conectados</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors ${
                activeTab === 'video'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videollamada</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors ${
                activeTab === 'notes'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Cuaderno de Apuntes</span>
            </button>
            <a
              href={`https://meet.jit.si/${encodeURIComponent(roomName)}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 flex items-center space-x-1 transition-colors"
              title="Abrir en ventana completa independiente de Jitsi"
            >
              <span>Abrir en navegador</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[500px]">
          {/* Left/Center 2 Cols: Video iframe or Notes */}
          <div className="lg:col-span-2 bg-stone-900 rounded-2xl overflow-hidden shadow-inner flex flex-col border border-stone-800 min-h-[460px]">
            {activeTab === 'video' ? (
              <div className="relative w-full h-full min-h-[460px] flex flex-col">
                <iframe
                  src={jitsiUrl}
                  title="Sala de Conversación Proseminario"
                  className="w-full h-full min-h-[460px] border-0"
                  allow="camera; microphone; fullscreen; display-capture; autoplay"
                />
              </div>
            ) : (
              <div className="p-6 bg-white flex flex-col h-full text-stone-800">
                <div className="flex items-center justify-between mb-3 border-b border-stone-200 pb-2">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <h4 className="font-semibold text-stone-900 text-sm">
                      Notas personales y reflexiones del encuentro
                    </h4>
                  </div>
                  <span className="text-xs text-stone-400">Autoguardado local</span>
                </div>
                <p className="text-xs text-stone-500 mb-3">
                  Toma tus apuntes durante la conferencia o diálogo del grupo. Podrás luego convertirlos en un resumen para compartir en la plataforma.
                </p>
                <textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Escribe aquí las impresiones, versículos citados, preguntas que surgieron o reflexiones de los sacerdotes..."
                  className="flex-1 w-full p-4 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none font-serif text-sm leading-relaxed text-stone-700 bg-stone-50/50"
                  rows={14}
                />
              </div>
            )}
          </div>

          {/* Right Col: Meeting Sidebar with Agenda and Chat */}
          <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-4 flex flex-col justify-between h-full">
            <div>
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Objetivo del Encuentro
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed mb-4 bg-white p-3 rounded-xl border border-stone-100">
                {meeting.description}
              </p>

              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Chat Fraternal en Vivo
              </h4>
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 text-xs">
                {meetingChat.map((msg, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-stone-100 shadow-2xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-amber-900">{msg.sender}</span>
                      <span className="text-[10px] text-stone-400">{msg.time}</span>
                    </div>
                    <p className="text-stone-700 leading-snug">{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleSendMessage} className="mt-3 pt-3 border-t border-stone-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Escribe un mensaje fraternal..."
                  className="flex-1 text-xs px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
                <button
                  type="submit"
                  className="p-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors"
                  title="Enviar"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
