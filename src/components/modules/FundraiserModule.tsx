import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HeartHandshake, 
  Play, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  DollarSign, 
  PiggyBank, 
  Gift, 
  Send,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const FundraiserModule: React.FC = () => {
  const { fundraiser, addDonation, activeUser, showToast } = useApp();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  // Donation form state
  const [donorName, setDonorName] = useState(activeUser.name);
  const [donationAmount, setDonationAmount] = useState<number>(25000);
  const [donationMessage, setDonationMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const percentage = Math.min(100, Math.round((fundraiser.currentAmount / fundraiser.goalAmount) * 100));

  const handleCopy = (text: string, fieldName: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      showToast(`Copiado al portapapeles: ${text}`);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount || donationAmount <= 0) {
      showToast('Por favor ingresa un monto válido');
      return;
    }

    addDonation(
      donorName.trim() || 'Amigo de la Comunidad',
      Number(donationAmount),
      donationMessage.trim() || undefined,
      isAnonymous
    );

    setIsDonateModalOpen(false);
    setDonationMessage('');
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
            <HeartHandshake className="w-4 h-4 text-amber-700" />
            <span>Fondo Comunitario y Becas de Viaje</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-sacred text-stone-900 leading-tight">
            Recaudación Solidaria: Inmersión Granja Épicos
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-2xl font-light leading-relaxed">
            Un fondo transparente para cubrir el alojamiento, la alimentación biodinámica y el soporte de traslado para que los estudiantes de todo el país puedan asistir al retiro del 1 al 11 de Enero.
          </p>
        </div>

        <button
          onClick={() => setIsDonateModalOpen(true)}
          className="self-start md:self-auto px-5 py-3 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white rounded-2xl text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-md transition-all shrink-0"
        >
          <Gift className="w-4 h-4 text-amber-200" />
          <span>Registrar o Simular Aporte</span>
        </button>
      </div>

      {/* Video Presentation Spotlight */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 rounded-3xl overflow-hidden border border-stone-800 shadow-xl text-white grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
        {/* Left Video Player Preview Thumbnail (7 cols) */}
        <div className="lg:col-span-7 relative h-72 sm:h-96 w-full bg-stone-950 flex items-center justify-center overflow-hidden group cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
          <img
            src={fundraiser.videoThumbnail}
            alt="Video explicativo del viaje"
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-85 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-transparent" />

          {/* Central Play Button */}
          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow-2xl group-hover:bg-amber-500 group-hover:scale-110 transition-all border-2 border-white/40 ring-8 ring-amber-500/20">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-stone-300">
            <span className="bg-stone-900/80 px-2.5 py-1 rounded-md backdrop-blur-xs font-mono">
              Duración: 3:15 min
            </span>
            <span className="text-amber-300 font-semibold flex items-center space-x-1">
              <span>Haz clic para ver el video</span>
            </span>
          </div>
        </div>

        {/* Right Explanation Text (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Play className="w-3 h-3 fill-amber-300" />
            <span>Video Explicativo</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif-sacred text-stone-100 leading-snug">
            {fundraiser.videoTitle}
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
            {fundraiser.videoDescription}
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-stone-100 border border-white/20 rounded-xl text-xs sm:text-sm font-medium flex items-center space-x-2 transition-colors"
            >
              <Play className="w-4 h-4 text-amber-400" />
              <span>Reproducir video completo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar & Campaign Stats */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Total Recaudado Hasta el Momento
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl sm:text-5xl font-bold font-serif-sacred text-stone-900">
                {formatCurrency(fundraiser.currentAmount)}
              </span>
              <span className="text-xs sm:text-sm text-stone-500 font-medium">
                de una meta de {formatCurrency(fundraiser.goalAmount)}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-bold text-amber-800 font-mono">
              {percentage}%
            </span>
            <span className="text-xs text-stone-400 block">del objetivo completado</span>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full bg-stone-100 h-4 rounded-full overflow-hidden p-0.5 border border-stone-200">
          <div
            className="h-full bg-gradient-to-r from-amber-600 to-amber-700 rounded-full transition-all duration-1000 ease-out shadow-xs"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 pt-1">
          <span>{fundraiser.contributions.length} aportes de la comunidad</span>
          <span>Faltan {formatCurrency(Math.max(0, fundraiser.goalAmount - fundraiser.currentAmount))} para llegar a la meta</span>
        </div>
      </div>

      {/* Two Column Grid: Budget Breakdown & Bank Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Breakdown */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-stone-900 font-bold text-xs uppercase tracking-wider">
            <PiggyBank className="w-4 h-4 text-amber-700" />
            <span>¿En qué se usa el dinero? (Desglose del Presupuesto)</span>
          </div>

          <div className="space-y-3">
            {fundraiser.breakdown.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FCFAF7] border border-stone-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-stone-900 text-xs sm:text-sm">
                    {item.label}
                  </h4>
                  <span className="font-bold text-amber-900 text-xs sm:text-sm font-mono">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-serif leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bank & Payment Details */}
        <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F5ECE0] rounded-3xl border border-amber-200/80 p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Canales Oficiales para Transferir</span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-serif">
              Puedes realizar transferencias bancarias directas o mediante billeteras virtuales (Mercado Pago, Cuenta DNI, etc.).
            </p>

            <div className="space-y-2.5">
              {/* Alias */}
              <div className="bg-white p-3.5 rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Alias CBU / CVU</span>
                  <span className="text-sm font-bold text-stone-900 font-mono">{fundraiser.aliasCbu}</span>
                </div>
                <button
                  onClick={() => handleCopy(fundraiser.aliasCbu, 'alias')}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold rounded-lg flex items-center space-x-1 transition-colors"
                >
                  {copiedField === 'alias' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'alias' ? 'Copiado' : 'Copiar Alias'}</span>
                </button>
              </div>

              {/* CBU */}
              <div className="bg-white p-3.5 rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Número de CBU</span>
                  <span className="text-xs font-semibold text-stone-800 font-mono">{fundraiser.cbuNumber}</span>
                </div>
                <button
                  onClick={() => handleCopy(fundraiser.cbuNumber, 'cbu')}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold rounded-lg flex items-center space-x-1 transition-colors"
                >
                  {copiedField === 'cbu' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'cbu' ? 'Copiado' : 'Copiar CBU'}</span>
                </button>
              </div>

              {/* Account owner */}
              <div className="text-xs text-stone-600 space-y-1 pt-1">
                <p><strong>Titular:</strong> {fundraiser.titular}</p>
                <p><strong>Banco:</strong> {fundraiser.banco}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsDonateModalOpen(true)}
            className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs flex items-center justify-center space-x-2"
          >
            <Gift className="w-4 h-4 text-amber-200" />
            <span>Notificar o Registrar tu Aporte</span>
          </button>
        </div>
      </div>

      {/* Wall of Gratitude / Recent Contributions */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Comunidad en Acción</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-sacred text-stone-900">
              Aportes y Mensajes de Gratitud
            </h3>
          </div>
          <span className="text-xs text-stone-400">{fundraiser.contributions.length} donaciones</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fundraiser.contributions.map((donation) => (
            <div
              key={donation.id}
              className="p-4 rounded-2xl bg-[#FCFAF7] border border-stone-200/80 space-y-2 hover:shadow-xs transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 text-xs sm:text-sm">
                  {donation.isAnonymous ? 'Donante Anónimo' : donation.donorName}
                </span>
                <span className="font-bold text-amber-800 text-xs font-mono">
                  {formatCurrency(donation.amount)}
                </span>
              </div>

              {donation.message && (
                <p className="text-xs text-stone-600 font-serif italic leading-relaxed">
                  «{donation.message}»
                </p>
              )}

              <span className="text-[10px] text-stone-400 block pt-1 border-t border-stone-100">
                {donation.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={fundraiser.videoTitle}
        subtitle="Testimonios de los sacerdotes y estudiantes sobre la experiencia en Granja Épicos"
        maxWidth="3xl"
      >
        <div className="space-y-4">
          {/* Responsive Video Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
            <iframe
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Video explicativo del viaje del Proseminario"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 text-xs text-stone-700 font-serif leading-relaxed">
            <span className="font-bold text-stone-900 block mb-1">Sobre este video:</span>
            Los sacerdotes tutores (Pbro. Esteban Morales y Pbra. Helena Von Berg) explican la trascendencia de la convivencia en la tierra y el Acto de Consagración diario para templar el alma en el camino sacerdotal antroposófico.
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setIsVideoModalOpen(false);
                setIsDonateModalOpen(true);
              }}
              className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Colaborar con el Fondo</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal to Register Donation */}
      <Modal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        title="Registrar Aporte para el Viaje a Granja Épicos"
        subtitle="Tu aporte se sumará a la meta y alentará a toda la comunidad"
        maxWidth="md"
      >
        <form onSubmit={handleSubmitDonation} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Nombre del Aportante o Familia
            </label>
            <input
              type="text"
              required={!isAnonymous}
              disabled={isAnonymous}
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
            />
            <label className="flex items-center space-x-2 text-xs text-stone-600 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-amber-800 focus:ring-amber-500"
              />
              <span>Deseo que mi aporte figure como Anónimo en la cartelera</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Monto a Contribuir (ARS) *
            </label>
            <input
              type="number"
              required
              min="1000"
              step="1000"
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[10000, 25000, 50000, 100000].map(sug => (
                <button
                  type="button"
                  key={sug}
                  onClick={() => setDonationAmount(sug)}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs font-mono text-stone-700 transition-colors"
                >
                  +{formatCurrency(sug)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Mensaje o Bendición para el Grupo (Opcional)
            </label>
            <textarea
              rows={3}
              value={donationMessage}
              onChange={(e) => setDonationMessage(e.target.value)}
              placeholder="Que este viaje en Granja Épicos llene de fuerza el corazón de todos..."
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-serif focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsDonateModalOpen(false)}
              className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Confirmar Aporte
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
