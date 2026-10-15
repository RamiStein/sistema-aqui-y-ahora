import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookResource } from '../../types';
import { 
  BookOpen, 
  Bookmark, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  Quote, 
  Search,
  Filter,
  Plus,
  ShieldCheck
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const LibraryModule: React.FC = () => {
  const { books, updateBookStatus, addBook, isPriest, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookResource | null>(null);

  // Modal to upload book for priests
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('Rudolf Steiner');
  const [newCategory, setNewCategory] = useState<BookResource['category']>('cristologia');
  const [newDescription, setNewDescription] = useState('');
  const [newRecommendedFor, setNewRecommendedFor] = useState('');
  const [newPdfUrl, setNewPdfUrl] = useState('');
  const [newQuote, setNewQuote] = useState('');

  const handleUploadBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      showToast('Por favor completa el título y la descripción de la obra');
      return;
    }

    addBook({
      title: newTitle.trim(),
      author: newAuthor.trim() || 'Rudolf Steiner',
      category: newCategory,
      description: newDescription.trim(),
      recommendedFor: newRecommendedFor.trim() || 'Lectura recomendada del Proseminario',
      pdfUrl: newPdfUrl.trim() || undefined,
      essentialQuotes: newQuote.trim() ? [newQuote.trim()] : [],
      readingStatus: 'pendiente'
    });

    setIsAddBookModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewRecommendedFor('');
    setNewPdfUrl('');
    setNewQuote('');
  };

  const categories = [
    { id: 'todos', label: 'Toda la Bibliografía' },
    { id: 'liturgia', label: 'Liturgia y Sacramentos' },
    { id: 'evangelios', label: 'Evangelios y Nuevo Testamento' },
    { id: 'cristologia', label: 'Cristología Cósmica' },
    { id: 'vida_meditativa', label: 'Vida Meditativa y Ritmo Anual' },
    { id: 'antroposofia_general', label: 'Antroposofía General' },
  ];

  const filteredBooks = books.filter(b => {
    const matchesCat = selectedCategory === 'todos' || b.category === selectedCategory;
    const matchesStatus = statusFilter === 'todos' || b.readingStatus === statusFilter;
    const matchesSearch = !searchQuery.trim() || 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status?: BookResource['readingStatus']) => {
    switch (status) {
      case 'completado':
        return { label: 'Completado', icon: CheckCircle, className: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'leyendo':
        return { label: 'Leyendo actualmente', icon: Clock, className: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'pendiente':
      default:
        return { label: 'Por leer', icon: Bookmark, className: 'bg-stone-100 text-stone-600 border-stone-200' };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Biblioteca del Proseminario</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-sacred text-stone-900">
            Bibliografía y Textos de Estudio
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Corpus de lecturas fundamentales para el discipulado y el conocimiento teológico: ciclos de conferencias de Rudolf Steiner, ensayos de Friedrich Rittelmeyer y Emil Bock.
          </p>
        </div>

        {isPriest ? (
          <button
            onClick={() => setIsAddBookModalOpen(true)}
            className="self-start md:self-auto px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Subir Bibliografía (Gestor)</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Curada por los Sacerdotes Tutores</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, autor (Steiner, Rittelmeyer, Bock)..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-xs text-stone-500 whitespace-nowrap">Mi estado:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-700"
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Por leer</option>
              <option value="leyendo">Leyendo actualmente</option>
              <option value="completado">Completados</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0 mr-1" />
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const statusMeta = getStatusBadge(book.readingStatus);
          const StatusIcon = statusMeta.icon;

          return (
            <div
              key={book.id}
              className="bg-white rounded-3xl border border-stone-200 hover:border-amber-400 p-5 sm:p-6 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
                    {book.recommendedFor}
                  </span>

                  <button
                    onClick={() => {
                      const nextStatus = book.readingStatus === 'pendiente' 
                        ? 'leyendo' 
                        : book.readingStatus === 'leyendo' 
                          ? 'completado' 
                          : 'pendiente';
                      updateBookStatus(book.id, nextStatus as any);
                    }}
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all ${statusMeta.className}`}
                    title="Click para cambiar tu estado de lectura"
                  >
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusMeta.label}
                  </button>
                </div>

                {/* Author & Title */}
                <span className="text-xs font-semibold text-stone-500 block uppercase tracking-wider mb-1">
                  {book.author}
                </span>

                <h3
                  onClick={() => setSelectedBook(book)}
                  className="font-serif-sacred font-bold text-stone-900 text-lg sm:text-xl leading-snug mb-3 cursor-pointer hover:text-amber-800 transition-colors"
                >
                  {book.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 mb-4 leading-relaxed font-serif">
                  {book.description}
                </p>

                {/* Quotes peek */}
                {book.essentialQuotes.length > 0 && (
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-100 text-xs italic text-stone-700 font-serif mb-4 flex items-start space-x-2">
                    <Quote className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 opacity-60" />
                    <p className="line-clamp-2">
                      {book.essentialQuotes[0]}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400">
                  {book.pageCount ? `~${book.pageCount} páginas` : 'Conferencias'}
                </span>

                <button
                  onClick={() => setSelectedBook(book)}
                  className="font-bold text-amber-800 hover:text-amber-950 flex items-center space-x-1 transition-colors"
                >
                  <span>Ver ficha y citas</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <Modal
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          title={selectedBook.title}
          subtitle={`Autor: ${selectedBook.author} • Recomendado para: ${selectedBook.recommendedFor}`}
          maxWidth="2xl"
        >
          <div className="space-y-5">
            <div>
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                Sinopsis y Contexto Espiritual
              </h4>
              <p className="text-sm font-serif text-stone-800 leading-relaxed bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200">
                {selectedBook.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Pasajes y Citas Clave para la Meditación</span>
              </h4>
              <div className="space-y-2">
                {selectedBook.essentialQuotes.map((quote, idx) => (
                  <div key={idx} className="p-3.5 bg-amber-50/50 border border-amber-200/80 rounded-xl text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed flex items-start space-x-2">
                    <Quote className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{quote}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reading Status Selector inside modal */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-stone-600 font-medium">Mi progreso:</span>
                {(['pendiente', 'leyendo', 'completado'] as const).map(statusKey => (
                  <button
                    key={statusKey}
                    onClick={() => {
                      updateBookStatus(selectedBook.id, statusKey);
                      setSelectedBook({ ...selectedBook, readingStatus: statusKey });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-all ${
                      selectedBook.readingStatus === statusKey
                        ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {statusKey === 'leyendo' ? 'Leyendo' : statusKey === 'pendiente' ? 'Por leer' : 'Completado'}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setSelectedBook(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Subir Bibliografía / Texto de Estudio (Gestor Sacerdotal) */}
      <Modal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
        title="Subir Texto de Estudio o Bibliografía"
        subtitle="Incorpora un ciclo de conferencias, obra fundamental o ensayo pastoral al corpus del seminario"
        maxWidth="xl"
      >
        <form onSubmit={handleUploadBook} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Título de la Obra o Ciclo *
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ej: GA 131 - De Jesús a Cristo"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Autor *
              </label>
              <input
                type="text"
                required
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Ej: Rudolf Steiner, Friedrich Rittelmeyer..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Categoría Temática *
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as BookResource['category'])}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="cristologia">Cristología Cósmica</option>
                <option value="evangelios">Evangelios y Nuevo Testamento</option>
                <option value="liturgia">Liturgia y Sacramentos</option>
                <option value="vida_meditativa">Vida Meditativa y Ritmo Anual</option>
                <option value="antroposofia_general">Antroposofía General</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Descripción y Enfoque Teológico *
            </label>
            <textarea
              rows={3}
              required
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Síntesis del contenido, época del ciclo y relevancia para los seminaristas..."
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Recomendado Para
              </label>
              <input
                type="text"
                value={newRecommendedFor}
                onChange={(e) => setNewRecommendedFor(e.target.value)}
                placeholder="Ej: Módulo 1 y Módulo 2"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Enlace de Lectura o PDF (Opcional)
              </label>
              <input
                type="url"
                value={newPdfUrl}
                onChange={(e) => setNewPdfUrl(e.target.value)}
                placeholder="https://bdn-steiner.ru/..."
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Cita o Pensamiento Central (Opcional)
            </label>
            <input
              type="text"
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              placeholder="«El Cristo no vino solo a enseñar, sino a obrar como hecho cósmico...»"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddBookModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              Guardar en Bibliografía
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
