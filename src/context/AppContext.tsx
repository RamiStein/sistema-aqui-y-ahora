import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  PriestArticle, 
  BulletinPost, 
  QuestionPost, 
  BookResource, 
  StudySummary, 
  MeetingRoom,
  LiturgicalInfo
} from '../types';
import { StorageService } from '../services/storage';
import { CURRENT_LITURGICAL_INFO, SEED_USERS } from '../data/seedData';

export type ActiveTab = 
  | 'inicio' 
  | 'noticias' 
  | 'cartelera' 
  | 'dudas' 
  | 'bibliografia' 
  | 'resumenes' 
  | 'salas' 
  | 'calendario';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeUser: UserProfile;
  setActiveUser: (user: UserProfile) => void;
  availableUsers: UserProfile[];
  liturgicalInfo: LiturgicalInfo;
  
  // Articles
  articles: PriestArticle[];
  likeArticle: (id: string) => void;

  // Bulletin
  bulletinPosts: BulletinPost[];
  addBulletinPost: (post: Omit<BulletinPost, 'id' | 'author' | 'date' | 'commentsCount'>) => void;

  // Questions
  questions: QuestionPost[];
  addQuestion: (q: { title: string; content: string; category: QuestionPost['category']; tags: string[] }) => void;
  addAnswer: (questionId: string, content: string) => void;
  upvoteAnswer: (questionId: string, answerId: string) => void;

  // Books
  books: BookResource[];
  updateBookStatus: (bookId: string, status: BookResource['readingStatus']) => void;

  // Summaries
  summaries: StudySummary[];
  addSummary: (summary: { title: string; theme: string; cycleModule: string; relatedBookOrLecture?: string; content: string; keyTakeaways: string[]; tags: string[] }) => void;
  likeSummary: (id: string) => void;

  // Meetings
  meetings: MeetingRoom[];
  addMeeting: (meeting: Omit<MeetingRoom, 'id' | 'host' | 'participantsCount' | 'isLiveNow'>) => void;
  joinMeeting: (id: string) => void;

  // Search & Global state
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  activeMeetingForCall: MeetingRoom | null;
  setActiveMeetingForCall: (meeting: MeetingRoom | null) => void;

  // Reset demo
  resetData: () => void;
  
  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [activeUser, setActiveUserState] = useState<UserProfile>(StorageService.getActiveUser());
  const [liturgicalInfo] = useState<LiturgicalInfo>(CURRENT_LITURGICAL_INFO);

  const [articles, setArticles] = useState<PriestArticle[]>([]);
  const [bulletinPosts, setBulletinPosts] = useState<BulletinPost[]>([]);
  const [questions, setQuestions] = useState<QuestionPost[]>([]);
  const [books, setBooks] = useState<BookResource[]>([]);
  const [summaries, setSummaries] = useState<StudySummary[]>([]);
  const [meetings, setMeetings] = useState<MeetingRoom[]>([]);

  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeMeetingForCall, setActiveMeetingForCall] = useState<MeetingRoom | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize data from storage
  useEffect(() => {
    setArticles(StorageService.getArticles());
    setBulletinPosts(StorageService.getPosts());
    setQuestions(StorageService.getQuestions());
    setBooks(StorageService.getBooks());
    setSummaries(StorageService.getSummaries());
    setMeetings(StorageService.getMeetings());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const setActiveUser = (user: UserProfile) => {
    setActiveUserState(user);
    StorageService.setActiveUser(user);
    showToast(`Sesión cambiada a: ${user.name}`);
  };

  const likeArticle = (id: string) => {
    const updated = StorageService.toggleLikeArticle(id);
    setArticles(updated);
    showToast('Agradecimiento registrado');
  };

  const addBulletinPost = (data: Omit<BulletinPost, 'id' | 'author' | 'date' | 'commentsCount'>) => {
    const newPost: BulletinPost = {
      ...data,
      id: `post_${Date.now()}`,
      author: activeUser,
      date: new Date().toISOString().split('T')[0],
      commentsCount: 0
    };
    const updated = StorageService.addPost(newPost);
    setBulletinPosts(updated);
    showToast('Aviso publicado en la cartelera');
  };

  const addQuestion = (qData: { title: string; content: string; category: QuestionPost['category']; tags: string[] }) => {
    const newQ: QuestionPost = {
      id: `q_${Date.now()}`,
      title: qData.title,
      content: qData.content,
      category: qData.category,
      tags: qData.tags,
      author: activeUser,
      date: new Date().toISOString().split('T')[0],
      answers: [],
      resolved: false,
      views: 1
    };
    const updated = StorageService.addQuestion(newQ);
    setQuestions(updated);
    showToast('Tu consulta ha sido enviada al espacio de dudas');
  };

  const addAnswer = (questionId: string, content: string) => {
    const newAns = {
      id: `ans_${Date.now()}`,
      author: activeUser,
      content,
      date: new Date().toISOString().split('T')[0],
      isPriestVerified: activeUser.role === 'sacerdote',
      upvotes: 0
    };
    const updated = StorageService.addAnswer(questionId, newAns);
    setQuestions(updated);
    showToast('Respuesta publicada con éxito');
  };

  const upvoteAnswer = (questionId: string, answerId: string) => {
    const updated = StorageService.upvoteAnswer(questionId, answerId);
    setQuestions(updated);
    showToast('Voto registrado para la respuesta');
  };

  const updateBookStatus = (bookId: string, status: BookResource['readingStatus']) => {
    const updated = StorageService.updateBookStatus(bookId, status);
    setBooks(updated);
    showToast('Estado de lectura actualizado');
  };

  const addSummary = (data: {
    title: string;
    theme: string;
    cycleModule: string;
    relatedBookOrLecture?: string;
    content: string;
    keyTakeaways: string[];
    tags: string[];
  }) => {
    const newSum: StudySummary = {
      ...data,
      id: `sum_${Date.now()}`,
      author: activeUser,
      date: new Date().toISOString().split('T')[0],
      downloadsCount: 0,
      likesCount: 0
    };
    const updated = StorageService.addSummary(newSum);
    setSummaries(updated);
    showToast('Resumen de estudio compartido con el proseminario');
  };

  const likeSummary = (id: string) => {
    const updated = StorageService.likeSummary(id);
    setSummaries(updated);
    showToast('¡Agradeciste este resumen!');
  };

  const addMeeting = (data: Omit<MeetingRoom, 'id' | 'host' | 'participantsCount' | 'isLiveNow'>) => {
    const cleanRoomName = data.title.replace(/[^a-zA-Z0-9]/g, '') + '-' + Math.floor(Math.random() * 1000);
    const newMeeting: MeetingRoom = {
      ...data,
      id: `meet_${Date.now()}`,
      host: activeUser,
      participantsCount: 1,
      jitsiRoomName: data.jitsiRoomName || `ProseminarioAquiYAhora-${cleanRoomName}`,
      isLiveNow: false
    };
    const updated = StorageService.addMeeting(newMeeting);
    setMeetings(updated);
    showToast('Encuentro programado en el calendario de salas');
  };

  const joinMeeting = (id: string) => {
    const target = meetings.find(m => m.id === id);
    if (target) {
      const updated = StorageService.joinMeeting(id);
      setMeetings(updated);
      setActiveMeetingForCall(target);
    }
  };

  const resetData = () => {
    StorageService.resetAll();
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeUser,
        setActiveUser,
        availableUsers: SEED_USERS,
        liturgicalInfo,
        articles,
        likeArticle,
        bulletinPosts,
        addBulletinPost,
        questions,
        addQuestion,
        addAnswer,
        upvoteAnswer,
        books,
        updateBookStatus,
        summaries,
        addSummary,
        likeSummary,
        meetings,
        addMeeting,
        joinMeeting,
        globalSearchQuery,
        setGlobalSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
        activeMeetingForCall,
        setActiveMeetingForCall,
        resetData,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
