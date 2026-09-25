import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BulletinPost } from '../../types';
import { 
  Bell, 
  Plus, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  Mail, 
  Heart, 
  Users, 
  Car, 
  Sparkles,
  Filter
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const BoardModule: React.FC = () => {
  const { bulletinPosts, addBulletinPost, activeUser, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<BulletinPost['category']>('iniciativa');
  const [city, setCity] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'alta'>('normal');
  const [contact, setContact] = useState('');

  const categoryFilters = [
    { id: 'todos', label: 'Todos los Avisos' },
    { id: 'alojamiento_viaje', label: 'Alojamiento y Viajes' },
    { id: 'oracion_pensamiento', label: 'Oración y Pensamiento' },
    { id: 'iniciativa', label: 'Iniciativas y Proyectos' },
    { id: 'encuentro', label: 'Grupos y Encuentros' }
  ];

  const filteredPosts = selectedCategory === 'todos'
    ? bulletinPosts
    : bulletinPosts.filter(p => p.category === selectedCategory);

  const getCategoryMeta = (cat: BulletinPost['category']) => {
    switch (cat) {
      case 'alojamiento_viaje':
        return { label: 'Alojamiento / Viajes', icon: Car, color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'oracion_pensamiento':
        return { label: 'Oración / Pensamiento', icon: Heart, color: 'bg-rose-100 text-rose-900 border-rose-300' };
      case 'encuentro':
        return { label: 'Encuentros', icon: Users, color: 'bg-purple-100 text-purple-900 border-purple-300' };
      case 'iniciativa':
      default:
        return { label: 'Iniciativa', icon: Sparkles, color: 'bg-blue-100 text-blue-900 border-blue-300' };
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('Por favor escribe un título y el mensaje del aviso');
      return;
    }

    addBulletinPost({
      title: title.trim(),
      content: content.trim(),
      category,
      city: city.trim() || undefined,
      urgency,
      contactEmailOrPhone: contact.trim() || undefined
    });

    setIsNewPostModalOpen(false);
    setTitle('');
    setContent('');
    setCity('');
    setContact('');
    setUrgency('normal');
  };

  const handleCopyContact = (contactText?: string) => {
    if (!contactText) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contactText);
      showToast(`Contacto copiado: ${contactText}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
            <Bell className="w-4 h-4 text-amber-700" />
            <span>Tablón Fraternal</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-sacred text-stone-900">
            Cartelera de la Comunidad
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Espacio vivo para conectar entre los participantes: ofrecimiento de viajes compartidos, hospedaje para intensivos, pedidos de acompañamiento espiritual y proyectos autogestionados.
          </p>
        </div>

        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="self-start md:self-auto px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publicar un Aviso</span>
        </button>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-stone-400 shrink-0 mr-1" />
        {categoryFilters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedCategory(filter.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === filter.id
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPosts.map((post) => {
          const meta = getCategoryMeta(post.category);
          const CategoryIcon = meta.icon;

          return (
            <div
              key={post.id}
              className={`bg-white rounded-3xl border p-5 sm:p-6 transition-all hover:shadow-md flex flex-col justify-between ${
                post.urgency === 'alta' ? 'border-amber-400 bg-gradient-to-br from-white to-amber-50/20' : 'border-stone-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${meta.color}`}>
                    <CategoryIcon className="w-3.5 h-3.5 mr-1" />
                    {meta.label}
                  </span>

                  <div className="flex items-center space-x-2 text-[11px] text-stone-400">
                    {post.urgency === 'alta' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                        <AlertCircle className="w-3 h-3 mr-1 text-red-600" /> Prioritario
                      </span>
                    )}
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> {post.date}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif-sacred font-bold text-stone-900 text-lg sm:text-xl leading-snug mb-2">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-serif whitespace-pre-line mb-4">
                  {post.content}
                </p>
              </div>

              {/* Author & Contact Info */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <span className="text-xs font-semibold text-stone-800 block">
                      {post.author.name}
                    </span>
                    <span className="text-[10px] text-stone-500 flex items-center">
                      {post.city ? (
                        <>
                          <MapPin className="w-2.5 h-2.5 mr-0.5 text-stone-400" />
                          {post.city}
                        </>
                      ) : (
                        post.author.generation
                      )}
                    </span>
                  </div>
                </div>

                {post.contactEmailOrPhone && (
                  <button
                    onClick={() => handleCopyContact(post.contactEmailOrPhone)}
                    className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-amber-100/70 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-colors"
                    title="Copiar contacto"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-700" />
                    <span>Contactar</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Publish Modal */}
      <Modal
        isOpen={isNewPostModalOpen}
        onClose={() => setIsNewPostModalOpen(false)}
        title="Publicar Aviso en la Cartelera Fraternal"
        subtitle={`Publicando como: ${activeUser.name}`}
        maxWidth="lg"
      >
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Título del Aviso *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Viaje compartido desde Córdoba para el intensivo de Octubre..."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Categoría *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="alojamiento_viaje">Alojamiento y Viajes</option>
                <option value="oracion_pensamiento">Oración y Pensamiento</option>
                <option value="iniciativa">Iniciativas y Proyectos</option>
                <option value="encuentro">Grupos y Encuentros</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Prioridad
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="normal">Normal</option>
                <option value="alta">Alta / Urgente</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Ciudad / Localidad
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ej: Buenos Aires / Remoto"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Contacto (Email / Teléfono)
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Ej: nombre@email.com o WhatsApp"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Detalle del Aviso *
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe lo que necesitas coordinar, ofrecer o compartir con la comunidad..."
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsNewPostModalOpen(false)}
              className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Publicar Aviso
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
