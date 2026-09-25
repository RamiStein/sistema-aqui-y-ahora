import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudySummary } from '../../types';
import { 
  FileText, 
  Plus, 
  Heart, 
  Download, 
  Calendar, 
  User, 
  Tag, 
  CheckCircle2, 
  Sparkles, 
  Search,
  Filter,
  Copy
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const SummariesModule: React.FC = () => {
  const { summaries, addSummary, likeSummary, activeUser, showToast } = useApp();
  const [selectedModule, setSelectedModule] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSummary, setSelectedSummary] = useState<StudySummary | null>(null);

  // New summary modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [cycleModule, setCycleModule] = useState('Módulo 2: Los Evangelios');
  const [relatedBook, setRelatedBook] = useState('');
  const [takeawaysStr, setTakeawaysStr] = useState('');
  const [content, setContent] = useState('');
  const [tagsStr, setTagsStr] = useState('');

  const moduleOptions = [
    'Módulo 1: Fundamentos de la Nueva Teología',
    'Módulo 2: Los Cuatro Evangelios',
    'Módulo 3: Vida Sacramental y Ritmo Anual',
    'Módulo 4: Autoeducación y Oratoria Sagrada',
    'General / Conferencias Libres'
  ];

  const filteredSummaries = summaries.filter(s => {
    const matchesMod = selectedModule === 'todos' || s.cycleModule.includes(selectedModule);
    const matchesSearch = !searchQuery.trim() ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesMod && matchesSearch;
  });

  const handleCreateSummary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('Por favor completa el título y el cuerpo del resumen');
      return;
    }

    const takeaways = takeawaysStr
      .split('\n')
      .map(line => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(l => l.length > 0);

    const tags = tagsStr
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    addSummary({
      title: title.trim(),
      theme: theme.trim() || 'Estudio Proseminario',
      cycleModule,
      relatedBookOrLecture: relatedBook.trim() || undefined,
      content: content.trim(),
      keyTakeaways: takeaways.length > 0 ? takeaways : ['Comprensión fundamental del texto analizado.'],
      tags: tags.length > 0 ? tags : ['Resumen']
    });

    setIsUploadModalOpen(false);
    setTitle('');
    setTheme('');
    setRelatedBook('');
    setTakeawaysStr('');
    setContent('');
    setTagsStr('');
  };

  const handleCopyContent = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('Resumen copiado al portapapeles');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
            <FileText className="w-4 h-4 text-amber-700" />
            <span>Colaboración Fraternal</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-sacred text-stone-900">
            Resúmenes y Cuadernos de Estudio
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Espacio colaborativo donde los participantes del proseminario suben sus apuntes de conferencias, síntesis de lecturas bíblicas y mapas conceptuales para enriquecer el camino común.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="self-start md:self-auto px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Subir Resumen de Estudio</span>
        </button>
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
              placeholder="Buscar por tema, evangelio o autor del resumen..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-xs text-stone-500 whitespace-nowrap">Filtrar por Módulo:</span>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-700"
            >
              <option value="todos">Todos los Módulos</option>
              <option value="Módulo 1">Módulo 1: Fundamentos</option>
              <option value="Módulo 2">Módulo 2: Evangelios</option>
              <option value="Módulo 3">Módulo 3: Sacramentos</option>
              <option value="Módulo 4">Módulo 4: Autoeducación</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summaries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSummaries.map((summary) => (
          <div
            key={summary.id}
            className="bg-white rounded-3xl border border-stone-200 hover:border-amber-400 p-6 transition-all hover:shadow-md flex flex-col justify-between"
          >
            <div>
              {/* Module Pill & Date */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200/80 uppercase">
                  {summary.cycleModule.split(':')[0]}
                </span>
                <span className="text-[11px] text-stone-400 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" /> {summary.date}
                </span>
              </div>

              {/* Title & Theme */}
              <h3
                onClick={() => setSelectedSummary(summary)}
                className="font-serif-sacred font-bold text-stone-900 text-lg sm:text-xl leading-snug mb-1 cursor-pointer hover:text-amber-800 transition-colors"
              >
                {summary.title}
              </h3>
              <p className="text-xs font-semibold text-amber-900/80 mb-3">
                {summary.theme} {summary.relatedBookOrLecture && `• ${summary.relatedBookOrLecture}`}
              </p>

              {/* Key Takeaways snippet */}
              <div className="space-y-1.5 mb-4 bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-100">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  Puntos Centrales:
                </span>
                {summary.keyTakeaways.slice(0, 3).map((takeaway, idx) => (
                  <div key={idx} className="flex items-start space-x-1.5 text-xs text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{takeaway}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                {summary.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-stone-50 text-stone-600 border border-stone-200 rounded text-[10px]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author info & Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={summary.author.avatar}
                  alt={summary.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-stone-200"
                />
                <span className="text-xs font-semibold text-stone-800">
                  {summary.author.name}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => likeSummary(summary.id)}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-stone-200 hover:border-amber-300 text-stone-600 hover:text-amber-900 transition-colors text-xs"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-50" />
                  <span>{summary.likesCount}</span>
                </button>

                <button
                  onClick={() => setSelectedSummary(summary)}
                  className="px-3 py-1 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Ver Resumen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Reader Modal */}
      {selectedSummary && (
        <Modal
          isOpen={!!selectedSummary}
          onClose={() => setSelectedSummary(null)}
          title={selectedSummary.title}
          subtitle={`Aporte de ${selectedSummary.author.name} • ${selectedSummary.cycleModule}`}
          maxWidth="3xl"
        >
          <div className="space-y-5">
            {/* Key takeaways box */}
            <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-stone-200">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Puntos Clave y Conclusiones</span>
              </h4>
              <ul className="space-y-2">
                {selectedSummary.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Markdown / Text Content */}
            <div>
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Desarrollo del Estudio
              </h4>
              <div className="bg-white p-5 rounded-2xl border border-stone-200 font-serif leading-relaxed text-sm sm:text-base text-stone-800 whitespace-pre-line space-y-4">
                {selectedSummary.content}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => handleCopyContent(selectedSummary.content)}
                className="flex items-center space-x-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar texto completo</span>
              </button>

              <button
                onClick={() => {
                  likeSummary(selectedSummary.id);
                  setSelectedSummary({ ...selectedSummary, likesCount: selectedSummary.likesCount + 1 });
                }}
                className="flex items-center space-x-1.5 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-medium transition-colors"
              >
                <Heart className="w-4 h-4 text-rose-600 fill-rose-100" />
                <span>Agradecer al autor ({selectedSummary.likesCount})</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Summary Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Compartir Resumen o Apuntes de Estudio"
        subtitle={`Subiendo como: ${activeUser.name}`}
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateSummary} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Título del Resumen *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Síntesis del Evangelio de Lucas: La corriente de Buda y Zaratustra..."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Módulo del Proseminario *
              </label>
              <select
                value={cycleModule}
                onChange={(e) => setCycleModule(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {moduleOptions.map((mod, i) => (
                  <option key={i} value={mod}>{mod}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Eje Temático *
              </label>
              <input
                type="text"
                required
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Ej: Cristología, Exégesis, Liturgia"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Libro o Conferencia Relacionada
              </label>
              <input
                type="text"
                value={relatedBook}
                onChange={(e) => setRelatedBook(e.target.value)}
                placeholder="Ej: GA 114 - Evangelio de San Lucas"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Etiquetas (Separadas por comas)
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="Ej: Lucas, Niños Jesús, Compasión"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Puntos Clave / Conclusiones (Uno por línea)
            </label>
            <textarea
              rows={3}
              value={takeawaysStr}
              onChange={(e) => setTakeawaysStr(e.target.value)}
              placeholder="• Primera conclusión esencial&#10;• Segundo punto a recordar&#10;• Pregunta que queda abierta para meditar"
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-serif"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Cuerpo del Resumen / Apuntes de Estudio *
            </label>
            <textarea
              required
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe tus notas, síntesis explicativa, citas de conferencias y reflexiones..."
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Publicar Resumen
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
