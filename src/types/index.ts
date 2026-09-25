export type UserRole = 'estudiante' | 'sacerdote' | 'coordinador' | 'invitado';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  locality: string;
  generation: string; // e.g. "Cohorte 2026", "Comunidad Buenos Aires", etc.
  bio?: string;
}

export type LiturgicalSeason = 
  | 'adviento' 
  | 'navidad' 
  | 'epifania' 
  | 'pasion' 
  | 'pascua' 
  | 'ascension' 
  | 'pentecostes' 
  | 'trinidad' 
  | 'san_juan' 
  | 'micael';

export interface LiturgicalInfo {
  season: LiturgicalSeason;
  name: string;
  colorName: string;
  colorHex: string;
  secondaryColor: string;
  textColor: string;
  motto: string;
  periodDescription: string;
  festivityDateRange: string;
}

export interface PriestArticle {
  id: string;
  title: string;
  subtitle?: string;
  authorName: string;
  authorTitle: string; // e.g. "Sacerdote de la Comunidad de Cristianos"
  authorAvatar: string;
  date: string;
  seasonTag?: LiturgicalSeason;
  category: 'pastoral' | 'sacramental' | 'proseminario' | 'sinodo';
  content: string;
  readingTimeMinutes: number;
  highlightQuote?: string;
  likes: number;
  pinned?: boolean;
}

export interface BulletinPost {
  id: string;
  title: string;
  content: string;
  category: 'anuncio' | 'encuentro' | 'alojamiento_viaje' | 'oracion_pensamiento' | 'iniciativa';
  author: UserProfile;
  date: string;
  city?: string;
  urgency?: 'normal' | 'alta';
  contactEmailOrPhone?: string;
  commentsCount: number;
}

export interface QuestionAnswer {
  id: string;
  author: UserProfile;
  content: string;
  date: string;
  isPriestVerified?: boolean;
  upvotes: number;
}

export interface QuestionPost {
  id: string;
  title: string;
  content: string;
  category: 'sacramentos' | 'cristologia' | 'vida_interior' | 'estudio_antroposofico' | 'organizacion_proseminario';
  tags: string[];
  author: UserProfile;
  date: string;
  answers: QuestionAnswer[];
  resolved: boolean;
  views: number;
}

export interface BookResource {
  id: string;
  title: string;
  author: string; // e.g., "Rudolf Steiner", "Friedrich Rittelmeyer", "Emil Bock"
  category: 'cristologia' | 'evangelios' | 'liturgia' | 'antroposofia_general' | 'vida_meditativa';
  description: string;
  coverImage?: string;
  recommendedFor: string; // e.g., "Módulo 1 - El Misterio del Gólgota"
  pageCount?: number;
  pdfUrl?: string; // external or internal link
  audioUrl?: string;
  essentialQuotes: string[];
  readingStatus?: 'pendiente' | 'leyendo' | 'completado';
}

export interface StudySummary {
  id: string;
  title: string;
  theme: string;
  author: UserProfile;
  date: string;
  relatedBookOrLecture?: string;
  cycleModule: string;
  content: string; // Markdown / formatted text
  keyTakeaways: string[];
  tags: string[];
  downloadsCount: number;
  likesCount: number;
}

export interface MeetingRoom {
  id: string;
  title: string;
  description: string;
  host: UserProfile;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (e.g. 19:30)
  durationMinutes: number;
  modality: 'virtual' | 'hibrido' | 'presencial';
  locationOrPlatform: string; // e.g. "Jitsi Meet Integrado" o "Sede Comunidad"
  jitsiRoomName?: string;
  topicCategory: 'lectura_evangelio' | 'conversacion_libre' | 'repaso_conferencias' | 'practica_habla';
  participantsCount: number;
  maxParticipants?: number;
  isLiveNow?: boolean;
}

export interface ProseminarModuleInfo {
  id: string;
  number: number;
  title: string;
  period: string;
  description: string;
  essentialThemes: string[];
  assignedPriest: string;
}
