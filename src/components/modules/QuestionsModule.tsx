import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QuestionPost } from '../../types';
import { 
  HelpCircle, 
  Plus, 
  ShieldCheck, 
  MessageSquare, 
  ThumbsUp, 
  Tag, 
  User, 
  Send, 
  Search, 
  CheckCircle2, 
  Clock,
  Sparkles,
  Filter
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const QuestionsModule: React.FC = () => {
  const { questions, addQuestion, addAnswer, upvoteAnswer, activeUser, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected question for detail view modal
  const [activeQuestion, setActiveQuestion] = useState<QuestionPost | null>(null);
  const [replyText, setReplyText] = useState('');

  // Ask new question modal
  const [isNewQuestionModalOpen, setIsNewQuestionModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<QuestionPost['category']>('cristologia');
  const [newTagsStr, setNewTagsStr] = useState('');

  const categoryFilters = [
    { id: 'todos', label: 'Todas las Categorías' },
    { id: 'cristologia', label: 'Cristología y Gólgota' },
    { id: 'sacramentos', label: 'Sacramentos y Liturgia' },
    { id: 'vida_interior', label: 'Vida Interior y Meditación' },
    { id: 'estudio_antroposofico', label: 'Estudio Antroposófico' },
    { id: 'organizacion_proseminario', label: 'Organización y Seminario' },
  ];

  // Filtering
  const filteredQuestions = questions.filter(q => {
    const matchesCat = selectedCategory === 'todos' || q.category === selectedCategory;
    const matchesVerified = !filterVerifiedOnly || q.answers.some(a => a.isPriestVerified);
    const matchesQuery = !searchQuery.trim() || 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesVerified && matchesQuery;
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Por favor completa el título y tu planteo');
      return;
    }

    const tags = newTagsStr
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    addQuestion({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      tags: tags.length > 0 ? tags : ['Proseminario']
    });

    setIsNewQuestionModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewTagsStr('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuestion || !replyText.trim()) return;

    addAnswer(activeQuestion.id, replyText.trim());
    setReplyText('');

    // Update active question view locally
    const updatedQuestion = questions.find(q => q.id === activeQuestion.id);
    if (updatedQuestion) {
      setActiveQuestion({
        ...updatedQuestion,
        answers: [
          ...updatedQuestion.answers,
          {
            id: `ans_${Date.now()}`,
            author: activeUser,
            content: replyText.trim(),
            date: new Date().toISOString().split('T')[0],
            isPriestVerified: activeUser.role === 'sacerdote',
            upvotes: 0
          }
        ]
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Module Banner */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>Espacio de Diálogo y Consulta</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-sacred text-stone-900">
            Sacarse las Dudas
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Preguntas teológicas, antroposóficas, litúrgicas y del proceso vocacional. Las respuestas son acompañadas y validadas por los sacerdotes tutores de la Comunidad de Cristianos.
          </p>
        </div>

        <button
          onClick={() => setIsNewQuestionModalOpen(true)}
          className="self-start md:self-auto px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Plantear una Duda</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en preguntas o etiquetas (ej: Sacramento, Gólgota, Retrospectiva)..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
            />
          </div>

          <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer self-start sm:self-auto whitespace-nowrap bg-stone-50 px-3 py-2 rounded-xl border border-stone-200">
            <input
              type="checkbox"
              checked={filterVerifiedOnly}
              onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
              className="rounded text-amber-800 focus:ring-amber-500"
            />
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Con respuesta sacerdotal</span>
            </span>
          </label>
        </div>

        {/* Categories chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0 mr-1" />
          {categoryFilters.map(cat => (
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

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-stone-300 p-6 text-stone-500">
            <HelpCircle className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-medium">No se encontraron preguntas con estos filtros.</p>
            <p className="text-xs text-stone-400 mt-1">¿Tienes una inquietud formativa? ¡Sé el primero en plantearla!</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const hasPriestAnswer = q.answers.some(a => a.isPriestVerified);
            const topAnswer = q.answers[0];

            return (
              <div
                key={q.id}
                onClick={() => setActiveQuestion(q)}
                className="bg-white rounded-3xl border border-stone-200 hover:border-amber-400 p-5 sm:p-6 transition-all hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {hasPriestAnswer ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1 text-amber-700" />
                        Respuesta Sacerdotal
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600 border border-stone-200">
                        <Clock className="w-3 h-3 mr-1 text-stone-400" />
                        Esperando respuestas
                      </span>
                    )}

                    <span className="text-[11px] text-stone-400">
                      Preguntado por {q.author.name} • {q.date}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs text-stone-500 shrink-0">
                    <MessageSquare className="w-4 h-4 text-stone-400" />
                    <span className="font-semibold">{q.answers.length}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-serif-sacred text-stone-900 group-hover:text-amber-900 transition-colors leading-snug mb-2">
                  {q.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 mb-4 leading-relaxed font-serif">
                  {q.content}
                </p>

                {/* Best answer preview if available */}
                {topAnswer && (
                  <div className="bg-[#FAF8F5] border border-amber-200/70 rounded-xl p-3 mb-3 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-amber-900 flex items-center">
                        {topAnswer.isPriestVerified && <ShieldCheck className="w-3.5 h-3.5 mr-1 text-amber-700" />}
                        {topAnswer.author.name}:
                      </span>
                      <span className="text-[10px] text-stone-400">{topAnswer.upvotes} votos a favor</span>
                    </div>
                    <p className="text-stone-700 line-clamp-2 italic font-serif">
                      «{topAnswer.content}»
                    </p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100">
                  {q.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-stone-50 text-stone-600 border border-stone-200 rounded-md text-[10px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Question Detail Modal (Thread + Reply) */}
      {activeQuestion && (
        <Modal
          isOpen={!!activeQuestion}
          onClose={() => setActiveQuestion(null)}
          title="Consulta del Proseminario"
          subtitle={`Planteada por ${activeQuestion.author.name} (${activeQuestion.author.generation}) el ${activeQuestion.date}`}
          maxWidth="3xl"
        >
          <div className="space-y-6">
            {/* Question description */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200">
              <h3 className="text-xl font-bold font-serif-sacred text-stone-900 mb-2">
                {activeQuestion.title}
              </h3>
              <p className="text-sm font-serif text-stone-800 leading-relaxed whitespace-pre-line mb-3">
                {activeQuestion.content}
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                {activeQuestion.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white border border-stone-300 rounded text-[10px] font-medium text-stone-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Answers List */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                <span>Respuestas y Aportes ({activeQuestion.answers.length})</span>
              </h4>

              {activeQuestion.answers.length === 0 ? (
                <p className="text-xs text-stone-400 italic">Aún no hay respuestas para esta inquietud. Comparte tu reflexión o espera la orientación sacerdotal.</p>
              ) : (
                activeQuestion.answers.map((ans) => (
                  <div
                    key={ans.id}
                    className={`p-4 rounded-2xl border ${
                      ans.isPriestVerified 
                        ? 'bg-amber-50/50 border-amber-300 shadow-2xs' 
                        : 'bg-white border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={ans.author.avatar}
                          alt={ans.author.name}
                          className="w-8 h-8 rounded-full object-cover border border-stone-200"
                        />
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-semibold text-stone-900 text-xs sm:text-sm">
                              {ans.author.name}
                            </span>
                            {ans.isPriestVerified && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-200 text-amber-950 border border-amber-400">
                                <ShieldCheck className="w-3 h-3 mr-0.5 text-amber-800" /> Sacerdote Tutor
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-stone-400">{ans.date}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => upvoteAnswer(activeQuestion.id, ans.id)}
                        className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-amber-900 transition-colors"
                        title="Votar como respuesta esclarecedora"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-amber-700" />
                        <span>{ans.upvotes}</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-800 font-serif leading-relaxed whitespace-pre-line pl-10">
                      {ans.content}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Reply Input Box */}
            <form onSubmit={handleSendReply} className="pt-4 border-t border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Responder como <strong>{activeUser.name}</strong> ({activeUser.role})</span>
                {activeUser.role === 'sacerdote' && (
                  <span className="text-amber-800 font-medium flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Se marcará como respuesta sacerdotal verificada
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escribe tu respuesta, referencia bibliográfica o aporte fraternal..."
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-serif"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar Respuesta</span>
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* New Question Modal */}
      <Modal
        isOpen={isNewQuestionModalOpen}
        onClose={() => setIsNewQuestionModalOpen(false)}
        title="Plantear una Duda o Inquietud al Proseminario"
        subtitle={`Preguntando como: ${activeUser.name}`}
        maxWidth="lg"
      >
        <form onSubmit={handleCreateQuestion} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Título o Pregunta Central *
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ej: ¿Cómo entender la presencia del Cristo en el pan y el vino frente a otras visiones?"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Categoría Temática *
            </label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="cristologia">Cristología y Gólgota</option>
              <option value="sacramentos">Sacramentos y Liturgia</option>
              <option value="vida_interior">Vida Interior y Meditación</option>
              <option value="estudio_antroposofico">Estudio Antroposófico</option>
              <option value="organizacion_proseminario">Organización y Seminario</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Etiquetas (Separadas por comas)
            </label>
            <input
              type="text"
              value={newTagsStr}
              onChange={(e) => setNewTagsStr(e.target.value)}
              placeholder="Ej: Misa, Transubstanciación, Juan, Steiner"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Contexto o Detalle de la Duda *
            </label>
            <textarea
              required
              rows={5}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Explica qué texto estabas leyendo o qué vivencia suscita esta duda..."
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsNewQuestionModalOpen(false)}
              className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Enviar Pregunta
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
