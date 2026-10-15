import { 
  PriestArticle, 
  BulletinPost, 
  QuestionPost, 
  BookResource, 
  StudySummary, 
  MeetingRoom, 
  UserProfile,
  AttendanceSession,
  FundraiserCampaign,
  ImmersionTrip,
  AttendanceStatus,
  ContributionDonation,
  ProseminarClass,
  UserRole
} from '../types';
import { 
  SEED_PRIEST_ARTICLES, 
  SEED_BULLETIN_POSTS, 
  SEED_QUESTIONS, 
  SEED_BOOKS, 
  SEED_STUDY_SUMMARIES, 
  SEED_MEETING_ROOMS, 
  SEED_USERS,
  SEED_ATTENDANCE_SESSIONS,
  SEED_FUNDRAISER,
  SEED_IMMERSION_TRIP,
  SEED_CLASSES
} from '../data/seedData';

const KEYS = {
  ARTICLES: 'proseminario_articles_v1',
  POSTS: 'proseminario_bulletin_v1',
  QUESTIONS: 'proseminario_questions_v1',
  BOOKS: 'proseminario_books_v1',
  SUMMARIES: 'proseminario_summaries_v1',
  MEETINGS: 'proseminario_meetings_v1',
  ACTIVE_USER: 'proseminario_active_user_v1',
  ATTENDANCE: 'proseminario_attendance_v1',
  FUNDRAISER: 'proseminario_fundraiser_v1',
  TRIP: 'proseminario_trip_v1',
  CLASSES: 'proseminario_classes_v1',
  USERS: 'proseminario_users_v1',
};

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err);
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
}

export const StorageService = {
  // Articles (Priests news)
  getArticles(): PriestArticle[] {
    return getFromStorage(KEYS.ARTICLES, SEED_PRIEST_ARTICLES);
  },
  saveArticles(articles: PriestArticle[]) {
    setToStorage(KEYS.ARTICLES, articles);
  },
  toggleLikeArticle(articleId: string): PriestArticle[] {
    const articles = this.getArticles();
    const updated = articles.map(art => {
      if (art.id === articleId) {
        return { ...art, likes: art.likes + 1 };
      }
      return art;
    });
    this.saveArticles(updated);
    return updated;
  },
  addArticle(article: PriestArticle): PriestArticle[] {
    const articles = [article, ...this.getArticles()];
    this.saveArticles(articles);
    return articles;
  },

  // Bulletin Posts (Cartelera)
  getPosts(): BulletinPost[] {
    return getFromStorage(KEYS.POSTS, SEED_BULLETIN_POSTS);
  },
  savePosts(posts: BulletinPost[]) {
    setToStorage(KEYS.POSTS, posts);
  },
  addPost(post: BulletinPost): BulletinPost[] {
    const posts = [post, ...this.getPosts()];
    this.savePosts(posts);
    return posts;
  },

  // Questions (Sacarse las dudas)
  getQuestions(): QuestionPost[] {
    return getFromStorage(KEYS.QUESTIONS, SEED_QUESTIONS);
  },
  saveQuestions(questions: QuestionPost[]) {
    setToStorage(KEYS.QUESTIONS, questions);
  },
  addQuestion(question: QuestionPost): QuestionPost[] {
    const questions = [question, ...this.getQuestions()];
    this.saveQuestions(questions);
    return questions;
  },
  addAnswer(questionId: string, answer: QuestionPost['answers'][0]): QuestionPost[] {
    const questions = this.getQuestions();
    const updated = questions.map(q => {
      if (q.id === questionId) {
        return { ...q, answers: [...q.answers, answer] };
      }
      return q;
    });
    this.saveQuestions(updated);
    return updated;
  },
  upvoteAnswer(questionId: string, answerId: string): QuestionPost[] {
    const questions = this.getQuestions();
    const updated = questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: q.answers.map(ans => ans.id === answerId ? { ...ans, upvotes: ans.upvotes + 1 } : ans)
        };
      }
      return q;
    });
    this.saveQuestions(updated);
    return updated;
  },

  // Books / Bibliografía
  getBooks(): BookResource[] {
    return getFromStorage(KEYS.BOOKS, SEED_BOOKS);
  },
  saveBooks(books: BookResource[]) {
    setToStorage(KEYS.BOOKS, books);
  },
  updateBookStatus(bookId: string, status: BookResource['readingStatus']): BookResource[] {
    const books = this.getBooks();
    const updated = books.map(b => b.id === bookId ? { ...b, readingStatus: status } : b);
    this.saveBooks(updated);
    return updated;
  },
  addBook(book: BookResource): BookResource[] {
    const books = [book, ...this.getBooks()];
    this.saveBooks(books);
    return books;
  },

  // Study Summaries
  getSummaries(): StudySummary[] {
    return getFromStorage(KEYS.SUMMARIES, SEED_STUDY_SUMMARIES);
  },
  saveSummaries(summaries: StudySummary[]) {
    setToStorage(KEYS.SUMMARIES, summaries);
  },
  addSummary(summary: StudySummary): StudySummary[] {
    const summaries = [summary, ...this.getSummaries()];
    this.saveSummaries(summaries);
    return summaries;
  },
  likeSummary(summaryId: string): StudySummary[] {
    const summaries = this.getSummaries();
    const updated = summaries.map(s => s.id === summaryId ? { ...s, likesCount: s.likesCount + 1 } : s);
    this.saveSummaries(updated);
    return updated;
  },

  // Meeting Rooms
  getMeetings(): MeetingRoom[] {
    return getFromStorage(KEYS.MEETINGS, SEED_MEETING_ROOMS);
  },
  saveMeetings(meetings: MeetingRoom[]) {
    setToStorage(KEYS.MEETINGS, meetings);
  },
  addMeeting(meeting: MeetingRoom): MeetingRoom[] {
    const meetings = [meeting, ...this.getMeetings()];
    this.saveMeetings(meetings);
    return meetings;
  },
  joinMeeting(meetingId: string): MeetingRoom[] {
    const meetings = this.getMeetings();
    const updated = meetings.map(m => m.id === meetingId ? { ...m, participantsCount: m.participantsCount + 1 } : m);
    this.saveMeetings(updated);
    return updated;
  },

  // Attendance Sessions
  getAttendanceSessions(): AttendanceSession[] {
    return getFromStorage(KEYS.ATTENDANCE, SEED_ATTENDANCE_SESSIONS);
  },
  saveAttendanceSessions(sessions: AttendanceSession[]) {
    setToStorage(KEYS.ATTENDANCE, sessions);
  },
  updateUserAttendance(sessionId: string, userId: string, status: AttendanceStatus, note?: string): AttendanceSession[] {
    const sessions = this.getAttendanceSessions();
    const updated = sessions.map(session => {
      if (session.id !== sessionId) return session;
      const existingRecordIndex = session.records.findIndex(r => r.userId === userId);
      let updatedRecords = [...session.records];
      if (existingRecordIndex >= 0) {
        updatedRecords[existingRecordIndex] = { userId, status, note };
      } else {
        updatedRecords.push({ userId, status, note });
      }
      return { ...session, records: updatedRecords };
    });
    this.saveAttendanceSessions(updated);
    return updated;
  },
  addAttendanceSession(session: AttendanceSession): AttendanceSession[] {
    const sessions = [session, ...this.getAttendanceSessions()];
    this.saveAttendanceSessions(sessions);
    return sessions;
  },

  // Fundraiser Campaign
  getFundraiser(): FundraiserCampaign {
    return getFromStorage(KEYS.FUNDRAISER, SEED_FUNDRAISER);
  },
  saveFundraiser(fundraiser: FundraiserCampaign) {
    setToStorage(KEYS.FUNDRAISER, fundraiser);
  },
  addDonation(donation: Omit<ContributionDonation, 'id' | 'date'>): FundraiserCampaign {
    const current = this.getFundraiser();
    const newDonation: ContributionDonation = {
      ...donation,
      id: `don_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updated: FundraiserCampaign = {
      ...current,
      currentAmount: current.currentAmount + donation.amount,
      contributions: [newDonation, ...current.contributions]
    };
    this.saveFundraiser(updated);
    return updated;
  },

  // Immersion Trip
  getTrip(): ImmersionTrip {
    return getFromStorage(KEYS.TRIP, SEED_IMMERSION_TRIP);
  },
  saveTrip(trip: ImmersionTrip) {
    setToStorage(KEYS.TRIP, trip);
  },

  // Classes Calendar (Past and upcoming)
  getClasses(): ProseminarClass[] {
    return getFromStorage(KEYS.CLASSES, SEED_CLASSES);
  },
  saveClasses(classes: ProseminarClass[]) {
    setToStorage(KEYS.CLASSES, classes);
  },
  addClass(cls: ProseminarClass): ProseminarClass[] {
    const classes = [cls, ...this.getClasses()];
    this.saveClasses(classes);
    return classes;
  },
  updateClassNote(classId: string, note: string): ProseminarClass[] {
    const classes = this.getClasses();
    const updated = classes.map(c => {
      if (c.id === classId) {
        return { ...c, summaryNote: note };
      }
      return c;
    });
    this.saveClasses(updated);
    return updated;
  },

  // Users Directory & Participant Registration
  getUsers(): UserProfile[] {
    return getFromStorage(KEYS.USERS, SEED_USERS);
  },
  saveUsers(users: UserProfile[]) {
    setToStorage(KEYS.USERS, users);
  },
  registerUser(userData: {
    name: string;
    locality: string;
    email?: string;
    phone?: string;
    bio?: string;
    role?: UserRole;
  }): { user: UserProfile; updatedUsers: UserProfile[]; updatedAttendance: AttendanceSession[] } {
    const users = this.getUsers();
    const id = `user_part_${Date.now()}`;
    const avatarList = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
    ];
    const avatar = avatarList[users.length % avatarList.length];

    const newUser: UserProfile = {
      id,
      name: userData.name,
      role: userData.role || 'estudiante',
      avatar,
      locality: userData.locality || 'Comunidad Local',
      generation: 'Proseminario 2026/2027',
      email: userData.email,
      phone: userData.phone,
      bio: userData.bio || 'Participante inscripto en el Proseminario Aquí y Ahora'
    };
    
    const updatedUsers = [...users, newUser];
    this.saveUsers(updatedUsers);

    // Auto-add new participant to existing attendance sessions so they appear immediately
    const sessions = this.getAttendanceSessions();
    const updatedAttendance = sessions.map(s => {
      const alreadyHas = s.records.some(r => r.userId === newUser.id);
      if (!alreadyHas) {
        return {
          ...s,
          records: [...s.records, { userId: newUser.id, status: 'presente' as AttendanceStatus }]
        };
      }
      return s;
    });
    this.saveAttendanceSessions(updatedAttendance);

    // Set as active user
    this.setActiveUser(newUser);

    return { user: newUser, updatedUsers, updatedAttendance };
  },

  // Active User Profile
  getActiveUser(): UserProfile {
    const users = this.getUsers();
    const saved = getFromStorage<UserProfile | null>(KEYS.ACTIVE_USER, null);
    if (saved) {
      const match = users.find(u => u.id === saved.id);
      if (match) return match;
    }
    // Default to Ramiro or first student
    return users.find(u => u.role === 'estudiante') || users[0] || SEED_USERS[3];
  },
  setActiveUser(user: UserProfile) {
    setToStorage(KEYS.ACTIVE_USER, user);
  },

  // Reset to initial seed
  resetAll() {
    localStorage.removeItem(KEYS.ARTICLES);
    localStorage.removeItem(KEYS.POSTS);
    localStorage.removeItem(KEYS.QUESTIONS);
    localStorage.removeItem(KEYS.BOOKS);
    localStorage.removeItem(KEYS.SUMMARIES);
    localStorage.removeItem(KEYS.MEETINGS);
    localStorage.removeItem(KEYS.ACTIVE_USER);
    localStorage.removeItem(KEYS.ATTENDANCE);
    localStorage.removeItem(KEYS.FUNDRAISER);
    localStorage.removeItem(KEYS.TRIP);
    localStorage.removeItem(KEYS.CLASSES);
    localStorage.removeItem(KEYS.USERS);
  }
};
