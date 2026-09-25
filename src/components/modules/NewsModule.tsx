import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PriestArticle } from '../../types';
import { 
  Newspaper, 
  ShieldCheck, 
  Heart, 
  Clock, 
  Calendar, 
  Pin, 
  Plus, 
  Share2, 
  BookOpen,
  Filter
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const NewsModule: React.FC = () => {
  const { articles, likeArticle, activeUser, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [readingArticle, setReadingArticle] = useState<PriestArticle | null>(null);

  // New article state (for priests/coordinators)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<PriestArticle['category']>('pastoral');
  const [newContent, setNewContent] = useState('');
  const [newHighlight, setNewHighlight] = useState('');

  const categories = [
    { id: 'todos', label: 'Todos los Mensajes' },
    { id: 'pastoral', label: 'Pastoral y Espiritual' },
    { id: 'sacramental', label: 'Vida Sacramental' },
    { id: 'proseminario', label: 'Avisos Proseminario' },
    { id: 'sinodo', label: 'Sínodo y Comunidad' }
  ];

  const filteredArticles = selectedCategory === 'todos'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Por favor completa el título y el cuerpo del mensaje');
      return;
    }

    const createdArticle: PriestArticle = {
      id: `art_${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || undefined,
      authorName: activeUser.name,
      authorTitle: activeUser.role === 'sacerdote' ? 'Sacerdote Tutor' : 'Equipo Proseminario',
      authorAvatar: activeUser.avatar,
      date: new Date().toISOString().split('T')[0],
      category: newCategory,
      content: newContent.trim(),
      readingTimeMinutes: Math.max(2, Math.ceil(newContent.length / 450)),
      highlightQuote: newHighlight.trim() || undefined,
      likes: 1,
      pinned: false
    };

    // We can save via storage
    articles.unshift(createdArticle);
    setIsPublishModalOpen(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewContent('');
    setNewHighlight('');
    showToast('Mensaje pastoral publicado para todo el proseminario');
  };

  const handleShare = (article: PriestArticle) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${article.title}\n\n${article.content}`);
      showToast('Texto copiado al portapapeles');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Module Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
            <Newspaper className="w-4 h-4 text-amber-700" />
            <span>Voz de la Comunidad</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-sacred text-stone-900">
            Noticias y Cartas de los Sacerdotes
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Mensajes de acompañamiento, reflexiones litúrgicas estacionales y orientaciones teológicas compartidas por los sacerdotes tutores del seminario.
          </p>
        </div>

        {/* Action Button: Publish for priest/coordinator */}
        {(activeUser.role === 'sacerdote' || activeUser.role === 'coordinador') && (
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="self-start md:self-auto px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Redactar Carta Pastoral</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-stone-400 shrink-0 mr-1" />
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Feed */}
      <div className="grid grid-cols-1 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className={`bg-white rounded-3xl border p-6 transition-all hover:shadow-md ${
              article.pinned ? 'border-amber-300 bg-gradient-to-br from-white to-[#FCFAF6]' : 'border-stone-200'
            }`}
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={article.authorAvatar}
                  alt={article.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-semibold text-stone-900 text-sm">{article.authorName}</span>
                    <span title="Sacerdote Autorizado">
                      <ShieldCheck className="w-4 h-4 text-amber-700" />
                    </span>
                  </div>
                  <span className="text-xs text-stone-500">{article.authorTitle}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-stone-400">
                {article.pinned && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                    <Pin className="w-3 h-3 mr-1 text-amber-700" /> Fijado
                  </span>
                )}
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" /> {article.readingTimeMinutes} min de lectura
                </span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h3
              onClick={() => setReadingArticle(article)}
              className="text-xl sm:text-2xl font-bold font-serif-sacred text-stone-900 hover:text-amber-800 cursor-pointer transition-colors leading-snug mb-2"
            >
              {article.title}
            </h3>

            {article.subtitle && (
              <p className="text-xs sm:text-sm font-medium text-amber-900 italic mb-4">
                {article.subtitle}
              </p>
            )}

            {/* Highlight Quote */}
            {article.highlightQuote && (
              <blockquote className="bg-[#FAF7F2] border-l-4 border-amber-700 p-4 rounded-r-2xl my-4 text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed shadow-2xs">
                {article.highlightQuote}
              </blockquote>
            )}

            {/* Body snippet */}
            <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-5 font-serif">
              {article.content}
            </p>

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => likeArticle(article.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:border-amber-300 hover:bg-amber-50/50 text-stone-700 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-50" />
                  <span>Agradecer ({article.likes})</span>
                </button>

                <button
                  onClick={() => handleShare(article)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:border-stone-300 text-stone-600 transition-colors"
                  title="Compartir o copiar"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compartir</span>
                </button>
              </div>

              <button
                onClick={() => setReadingArticle(article)}
                className="font-bold text-amber-800 hover:text-amber-950 flex items-center space-x-1 transition-colors"
              >
                <span>Leer artículo completo</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {readingArticle && (
        <Modal
          isOpen={!!readingArticle}
          onClose={() => setReadingArticle(null)}
          title={readingArticle.title}
          subtitle={`Por ${readingArticle.authorName} (${readingArticle.authorTitle}) • ${readingArticle.date}`}
          maxWidth="3xl"
        >
          <div className="space-y-5">
            {readingArticle.subtitle && (
              <p className="text-base font-medium text-amber-900 italic font-serif">
                {readingArticle.subtitle}
              </p>
            )}

            {readingArticle.highlightQuote && (
              <div className="bg-[#FAF7F2] border-l-4 border-amber-700 p-4 rounded-r-xl text-sm font-serif italic text-stone-800 leading-relaxed">
                {readingArticle.highlightQuote}
              </div>
            )}

            <div className="prose prose-stone max-w-none text-stone-800 font-serif leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {readingArticle.content}
            </div>

            <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => {
                  likeArticle(readingArticle.id);
                  setReadingArticle(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl font-medium text-xs sm:text-sm transition-colors"
              >
                <Heart className="w-4 h-4 text-rose-600 fill-rose-100" />
                <span>Agradecer reflexión ({readingArticle.likes})</span>
              </button>

              <button
                onClick={() => setReadingArticle(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs sm:text-sm font-medium transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Publish Modal for Priest */}
      <Modal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        title="Redactar Mensaje Pastoral para el Proseminario"
        subtitle={`Publicando como: ${activeUser.name}`}
        maxWidth="2xl"
      >
        <form onSubmit={handlePublish} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Título del Mensaje *
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ej: Reflexión sobre el inicio del tiempo de Adviento..."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Subtítulo u Orientación (Opcional)
            </label>
            <input
              type="text"
              value={newSubtitle}
              onChange={(e) => setNewSubtitle(e.target.value)}
              placeholder="Ej: Para los círculos de estudio del módulo 2"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Categoría
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="pastoral">Pastoral y Espiritual</option>
                <option value="sacramental">Vida Sacramental</option>
                <option value="proseminario">Avisos Proseminario</option>
                <option value="sinodo">Sínodo y Comunidad</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Frase Destacada / Cita
              </label>
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                placeholder="«Una cita inspiradora para resaltar...»"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Contenido Completo de la Carta *
            </label>
            <textarea
              required
              rows={8}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Queridos hermanos y hermanas del Proseminario..."
              className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-3 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsPublishModalOpen(false)}
              className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Publicar Carta Pastoral
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
