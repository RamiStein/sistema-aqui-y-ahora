import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';
import { Search, BookOpen, MessageSquare, Newspaper, Bell, Users, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    articles, 
    bulletinPosts, 
    questions, 
    books, 
    summaries, 
    meetings, 
    setActiveTab 
  } = useApp();

  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim() || query.trim().length < 2) return null;
    const q = query.toLowerCase();

    const matchedArticles = articles.filter(a => 
      a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q) || a.authorName.toLowerCase().includes(q)
    );

    const matchedQuestions = questions.filter(item => 
      item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q))
    );

    const matchedBooks = books.filter(b => 
      b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
    );

    const matchedSummaries = summaries.filter(s => 
      s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q))
    );

    const matchedPosts = bulletinPosts.filter(p => 
      p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
    );

    const matchedMeetings = meetings.filter(m => 
      m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
    );

    const totalCount = matchedArticles.length + matchedQuestions.length + matchedBooks.length + matchedSummaries.length + matchedPosts.length + matchedMeetings.length;

    return {
      totalCount,
      articles: matchedArticles,
      questions: matchedQuestions,
      books: matchedBooks,
      summaries: matchedSummaries,
      posts: matchedPosts,
      meetings: matchedMeetings
    };
  }, [query, articles, questions, books, summaries, bulletinPosts, meetings]);

  const handleNavigate = (tab: any) => {
    setActiveTab(tab);
    setIsSearchModalOpen(false);
    setQuery('');
  };

  return (
    <Modal
      isOpen={isSearchModalOpen}
      onClose={() => {
        setIsSearchModalOpen(false);
        setQuery('');
      }}
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Search input bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-stone-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por conceptos (Gólgota, Evangelio, Juan, Rittelmeyer, Meditación, etc.)..."
            className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-stone-800 placeholder:text-stone-400 font-sans"
          />
        </div>

        {/* Suggestion hints if empty */}
        {!results && (
          <div className="p-4 text-center text-xs text-stone-500 space-y-2">
            <p>Escribe al menos 2 letras para buscar en todo el Proseminario.</p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-stone-400">Sugerencias:</span>
              {['Gólgota', 'San Juan', 'Consagración', 'Meditación', 'Euritmia', 'Rittelmeyer'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results view */}
        {results && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <div className="text-xs text-stone-500 pb-1 border-b border-stone-100">
              {results.totalCount === 0 ? 'No se encontraron resultados para tu búsqueda.' : `Se encontraron ${results.totalCount} resultados.`}
            </div>

            {/* Questions matches */}
            {results.questions.length > 0 && (
              <div>
                <div className="flex items-center text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-amber-700" /> Dudas y Consultas ({results.questions.length})
                </div>
                <div className="space-y-1.5">
                  {results.questions.map(q => (
                    <div
                      key={q.id}
                      onClick={() => handleNavigate('dudas')}
                      className="p-3 bg-stone-50 hover:bg-amber-50/50 rounded-xl cursor-pointer border border-stone-200 hover:border-amber-300 transition-all flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">{q.title}</h4>
                        <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{q.content}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Books matches */}
            {results.books.length > 0 && (
              <div>
                <div className="flex items-center text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5 text-amber-700" /> Bibliografía ({results.books.length})
                </div>
                <div className="space-y-1.5">
                  {results.books.map(b => (
                    <div
                      key={b.id}
                      onClick={() => handleNavigate('bibliografia')}
                      className="p-3 bg-stone-50 hover:bg-amber-50/50 rounded-xl cursor-pointer border border-stone-200 hover:border-amber-300 transition-all flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">{b.title}</h4>
                        <p className="text-xs text-stone-500">{b.author} • {b.category}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summaries matches */}
            {results.summaries.length > 0 && (
              <div>
                <div className="flex items-center text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5 text-amber-700" /> Resúmenes de Estudio ({results.summaries.length})
                </div>
                <div className="space-y-1.5">
                  {results.summaries.map(s => (
                    <div
                      key={s.id}
                      onClick={() => handleNavigate('resumenes')}
                      className="p-3 bg-stone-50 hover:bg-amber-50/50 rounded-xl cursor-pointer border border-stone-200 hover:border-amber-300 transition-all flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">{s.title}</h4>
                        <p className="text-xs text-stone-500">{s.theme} • Por {s.author.name}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Articles matches */}
            {results.articles.length > 0 && (
              <div>
                <div className="flex items-center text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  <Newspaper className="w-3.5 h-3.5 mr-1.5 text-amber-700" /> Mensajes de Sacerdotes ({results.articles.length})
                </div>
                <div className="space-y-1.5">
                  {results.articles.map(a => (
                    <div
                      key={a.id}
                      onClick={() => handleNavigate('noticias')}
                      className="p-3 bg-stone-50 hover:bg-amber-50/50 rounded-xl cursor-pointer border border-stone-200 hover:border-amber-300 transition-all flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">{a.title}</h4>
                        <p className="text-xs text-stone-500">{a.authorName} • {a.date}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bulletin matches */}
            {results.posts.length > 0 && (
              <div>
                <div className="flex items-center text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  <Bell className="w-3.5 h-3.5 mr-1.5 text-amber-700" /> Cartelera Comunitaria ({results.posts.length})
                </div>
                <div className="space-y-1.5">
                  {results.posts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => handleNavigate('cartelera')}
                      className="p-3 bg-stone-50 hover:bg-amber-50/50 rounded-xl cursor-pointer border border-stone-200 hover:border-amber-300 transition-all flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">{p.title}</h4>
                        <p className="text-xs text-stone-500">{p.content}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meetings matches */}
            {results.meetings.length > 0 && (
              <div>
                <div className="flex items-center text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  <Users className="w-3.5 h-3.5 mr-1.5 text-amber-700" /> Salas de Encuentro ({results.meetings.length})
                </div>
                <div className="space-y-1.5">
                  {results.meetings.map(m => (
                    <div
                      key={m.id}
                      onClick={() => handleNavigate('salas')}
                      className="p-3 bg-stone-50 hover:bg-amber-50/50 rounded-xl cursor-pointer border border-stone-200 hover:border-amber-300 transition-all flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">{m.title}</h4>
                        <p className="text-xs text-stone-500">{m.date} a las {m.time} hs</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
