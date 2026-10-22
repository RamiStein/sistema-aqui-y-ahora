import React, { useState } from 'react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';
import { 
  UserCheck, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  Plus, 
  Check, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowRight,
  Users,
  Info,
  Flame
} from 'lucide-react';
import { UserRole, UserProfile } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'inscribir' | 'participantes' | 'sacerdotes';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose,
  defaultTab = 'inscribir' 
}) => {
  const { 
    availableUsers, 
    activeUser, 
    setActiveUser, 
    registerParticipant, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTabState] = useState<'inscribir' | 'participantes' | 'sacerdotes'>(defaultTab);

  // Form states for new participant
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  const priests = availableUsers.filter(u => u.role === 'sacerdote');
  const participants = availableUsers.filter(u => u.role !== 'sacerdote');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Por favor ingresa tu nombre y apellido');
      return;
    }

    registerParticipant({
      name: name.trim(),
      locality: locality.trim() || 'Comunidad Buenos Aires',
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      bio: bio.trim() || undefined
    });

    // Reset and close
    setName('');
    setLocality('');
    setEmail('');
    setPhone('');
    setBio('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ingreso e Inscripción al Proseminario"
      subtitle="Identifícate con tu nombre para figurar en la lista de asistencia o accede como sacerdote gestor"
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-2xl border border-stone-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTabState('inscribir')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'inscribir'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-amber-700" />
            <span>Inscribirme</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTabState('participantes')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'participantes'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Ya Inscriptos ({participants.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTabState('sacerdotes')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'sacerdotes'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Acceso Sacerdotes</span>
          </button>
        </div>

        {/* Tab 1: Inscripción de Nuevo Participante */}
        {activeTab === 'inscribir' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-950 flex items-start space-x-3">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold">¿Cómo funciona el ingreso?</span>
                <p className="text-stone-700 mt-0.5">
                  Al inscribirte, tu nombre se suma de inmediato a la <strong>Lista de Asistencia</strong> del Proseminario. Tendrás acceso irrestricto a toda la información de cursada, bibliografía, temarios, fondos y salas virtuales.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nombre Completo <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Clara Morales"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Ciudad / Comunidad
                  </label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="Ej: Buenos Aires, Córdoba, Montevideo..."
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Correo Electrónico (Opcional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Teléfono / WhatsApp (Opcional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+54 11 ..."
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Cohorte de Cursada
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Proseminario 2026/2027"
                    className="w-full px-3.5 py-2.5 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-600 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Breve presentación o interés vocacional (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Ej: Interesado en el trabajo formativo y en el viaje a Granja Épicos..."
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md transition-all"
              >
                <UserCheck className="w-4 h-4" />
                <span>Confirmar Inscripción y Aparecer en Asistencia</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Lista de Integrantes Ya Inscriptos */}
        {activeTab === 'participantes' && (
          <div className="space-y-3">
            <p className="text-xs text-stone-500">
              Selecciona tu nombre en la lista para ingresar con tu sesión activa:
            </p>
            <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
              {participants.map((u) => {
                const isSelected = u.id === activeUser.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      setActiveUser(u);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-10 h-10 rounded-full object-cover border border-stone-200"
                        />
                        {isSelected && (
                          <span className="absolute -top-1 -right-1 bg-amber-700 text-white rounded-full p-0.5">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-semibold text-stone-900 text-xs sm:text-sm">{u.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium border border-stone-200">
                            {u.role === 'coordinador' ? 'Coordinador' : 'Integrante'}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500">{u.locality} • {u.generation}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                        isSelected 
                          ? 'bg-amber-800 text-white' 
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {isSelected ? 'Activo' : 'Ingresar'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Acceso Sacerdotes (Gestores) */}
        {activeTab === 'sacerdotes' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-amber-900 to-stone-900 text-amber-100 rounded-2xl p-4 border border-amber-800/50 space-y-2 shadow-xs">
              <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Acceso de Gestor Sacerdotal</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Los sacerdotes gestores (coordinadores y consejeros) tienen permisos exclusivos para:
              </p>
              <ul className="text-xs text-amber-200/90 space-y-1 list-disc list-inside">
                <li><strong>Redactar Cartas Pastorales:</strong> Publicar artículos y noticias formativas.</li>
                <li><strong>Gestionar Clases:</strong> Agendar nuevas clases, estructurar temarios y cargar notas/síntesis de clase.</li>
                <li><strong>Bibliografía Oficial:</strong> Cargar obras y textos de estudio recomendados.</li>
                <li><strong>Salas y Cartelera:</strong> Coordinar salas de encuentro y anuncios institucionales.</li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-stone-700 block">
                Selecciona tu perfil de Sacerdote (Coordinador o Consejero):
              </span>
              {priests.map((priest) => {
                const isSelected = priest.id === activeUser.id;
                return (
                  <div
                    key={priest.id}
                    onClick={() => {
                      setActiveUser(priest);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'border-amber-700 bg-amber-50/80 shadow-xs ring-1 ring-amber-600/30'
                        : 'border-stone-200 hover:border-amber-400 hover:bg-amber-50/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={priest.avatar}
                          alt={priest.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-amber-300 shadow-xs"
                        />
                        {isSelected && (
                          <span className="absolute -top-1 -right-1 bg-amber-800 text-white rounded-full p-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-stone-900 text-sm font-serif">{priest.name}</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            {priest.priestRole === 'coordinador' ? 'Sacerdote Coordinador' : priest.priestRole === 'consejero' ? 'Sacerdote Consejero' : 'Sacerdote'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">{priest.locality}</p>
                        {priest.bio && (
                          <p className="text-[11px] text-stone-600 line-clamp-1 italic mt-0.5">{priest.bio}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`text-xs px-3.5 py-2 rounded-xl font-bold flex items-center space-x-1.5 transition-all ${
                        isSelected 
                          ? 'bg-amber-800 text-white shadow-xs' 
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isSelected ? 'Gestor Activo' : 'Entrar como Gestor'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
