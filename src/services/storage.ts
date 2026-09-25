import { 
  PriestArticle, 
  BulletinPost, 
  QuestionPost, 
  BookResource, 
  StudySummary, 
  MeetingRoom, 
  UserProfile 
} from '../types';
import { 
  SEED_PRIEST_ARTICLES, 
  SEED_BULLETIN_POSTS, 
  SEED_QUESTIONS, 
  SEED_BOOKS, 
  SEED_STUDY_SUMMARIES, 
  SEED_MEETING_ROOMS, 
  SEED_USERS 
} from '../data/seedData';

const KEYS = {
  ARTICLES: 'proseminario_articles_v1',
  POSTS: 'proseminario_bulletin_v1',
  QUESTIONS: 'proseminario_questions_v1',
  BOOKS: 'proseminario_books_v1',
  SUMMARIES: 'proseminario_summaries_v1',
  MEETINGS: 'proseminario_meetings_v1',
  ACTIVE_USER: 'proseminario_active_user_v1',
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

  // Active User Profile
  getActiveUser(): UserProfile {
    return getFromStorage(KEYS.ACTIVE_USER, SEED_USERS[0]);
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
  }
};
