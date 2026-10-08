import { 
  UserProfile, 
  LiturgicalInfo, 
  PriestArticle, 
  BulletinPost, 
  QuestionPost, 
  BookResource, 
  StudySummary, 
  MeetingRoom,
  ProseminarModuleInfo,
  AttendanceSession,
  FundraiserCampaign,
  ImmersionTrip
} from '../types';

export const CURRENT_LITURGICAL_INFO: LiturgicalInfo = {
  season: 'micael',
  name: 'Tiempo Micaélico (Otoño / Primavera según hemisferio)',
  colorName: 'Rojo Carmesí y Oro Solar',
  colorHex: '#991b1b', // crimson red
  secondaryColor: '#f59e0b', // amber gold
  textColor: '#ffffff',
  motto: '«Que la fuerza de Micael despierte en nuestras almas el valor para obrar con claridad de pensamiento y calor de corazón.»',
  periodDescription: 'Época del discernimiento, de la batalla interior contra la pesadez y el adormecimiento de la conciencia. Momento propicio para la autoeducación y la acción consciente en comunidad.',
  festivityDateRange: '29 de Septiembre – Inicio de Adviento'
};

export const SEED_USERS: UserProfile[] = [
  // Sacerdotes
  {
    id: 'user_priest_esteban',
    name: 'Pbro. Esteban Morales',
    role: 'sacerdote',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    locality: 'Comunidad de Buenos Aires',
    generation: 'Sacerdote Tutor',
    bio: 'Sacerdote de la Comunidad de Cristianos. Guía litúrgico y acompañante espiritual del Proseminario.',
    email: 'esteban.morales@comunidaddecristianos.org',
    phone: '+54 11 4782-1190'
  },
  {
    id: 'user_priest_helena',
    name: 'Pbra. Helena Von Berg',
    role: 'sacerdote',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    locality: 'Comunidad de Córdoba / Santiago',
    generation: 'Tutora Proseminario',
    bio: 'Sacerdotisa y formadora. Guía en el estudio bíblico, euritmia y práctica meditativa.',
    email: 'helena.vonberg@comunidaddecristianos.org',
    phone: '+54 351 554-3211'
  },
  {
    id: 'user_priest_martin',
    name: 'Pbro. Martín Vignale',
    role: 'sacerdote',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    locality: 'Comunidad de Buenos Aires',
    generation: 'Sacerdote Asesor',
    bio: 'Sacerdote de la comunidad, consejero en el proceso de discernimiento vocacional.',
    email: 'martin.vignale@comunidaddecristianos.org',
    phone: '+54 11 4552-8871'
  },
  // Integrantes del Proseminario
  {
    id: 'user_ramiro',
    name: 'Ramiro (Tú)',
    role: 'estudiante',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    locality: 'Buenos Aires, Argentina',
    generation: 'Proseminario 2026/2027',
    bio: 'Participante activo del proseminario. Profundizando en la cristología y el Acto de Consagración.',
    email: 'ramiro@proseminario.org',
    phone: '+54 11 6234-9988'
  },
  {
    id: 'user_clara',
    name: 'Clara Menéndez',
    role: 'estudiante',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    locality: 'Montevideo, Uruguay',
    generation: 'Proseminario 2026/2027',
    bio: 'Estudiante de euritmia y participante del ciclo preparatorio del seminario sacerdotal.',
    email: 'clara.m@proseminario.org',
    phone: '+598 99 123 456'
  },
  {
    id: 'user_matias',
    name: 'Matías Rinaldi',
    role: 'coordinador',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    locality: 'Rosario, Argentina',
    generation: 'Coordinación Logística',
    bio: 'Coordinador de los encuentros y responsable del viaje de inmersión en Granja Épicos.',
    email: 'matias.rinaldi@proseminario.org',
    phone: '+54 341 498-7712'
  },
  {
    id: 'user_sofia',
    name: 'Sofía Alvarado',
    role: 'estudiante',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    locality: 'Mendoza, Argentina',
    generation: 'Proseminario 2026/2027',
    bio: 'Pedagoga Waldorf e interesada en la renovación religiosa y la pastoral sacramental.',
    email: 'sofia.alvarado@proseminario.org',
    phone: '+54 261 411-2390'
  },
  {
    id: 'user_tomas',
    name: 'Tomás Benítez',
    role: 'estudiante',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    locality: 'Córdoba Capital, Argentina',
    generation: 'Proseminario 2026/2027',
    bio: 'Estudiante de filosofía y participante del grupo de estudio del Evangelio de Juan.',
    email: 'tomas.benitez@proseminario.org',
    phone: '+54 351 688-4410'
  },
  {
    id: 'user_lucia',
    name: 'Lucía Rossi',
    role: 'estudiante',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
    locality: 'Bariloche, Río Negro',
    generation: 'Proseminario 2026/2027',
    bio: 'Terapeuta artística y participante de los encuentros patagónicos de la comunidad.',
    email: 'lucia.rossi@proseminario.org',
    phone: '+54 294 455-8912'
  },
  {
    id: 'user_ignacio',
    name: 'Ignacio Fontana',
    role: 'estudiante',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    locality: 'La Plata, Buenos Aires',
    generation: 'Proseminario 2026/2027',
    bio: 'Agrónomo orientado a la agricultura biodinámica y estudiante del proseminario.',
    email: 'ignacio.fontana@proseminario.org',
    phone: '+54 221 533-0091'
  }
];

export const SEED_PRIEST_ARTICLES: PriestArticle[] = [
  {
    id: 'art_1',
    title: 'El Acto de Consagración del Hombre: La comunión del alma con el devenir de la Tierra',
    subtitle: 'Reflexión para el inicio del ciclo lectivo del Proseminario',
    authorName: 'Pbro. Esteban Morales',
    authorTitle: 'Sacerdote tutor del Proseminario',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: '2026-09-20',
    category: 'pastoral',
    readingTimeMinutes: 7,
    likes: 34,
    pinned: true,
    highlightQuote: '«El sacramento no es un rito del pasado que conmemoramos con nostalgia, sino un hecho cósmico y humano que crea presente y libera el futuro.»',
    content: `Queridos hermanos y hermanas del Proseminario:

Al iniciar este período de estudio conjunto bajo el lema "Aquí y Ahora", es indispensable volver la mirada al centro palpitante de nuestra comunidad: el Acto de Consagración del Hombre (Menschenweihehandlung).

Muchas veces, cuando nos acercamos por primera vez a los textos de Rudolf Steiner y a los impulsos de Friedrich Rittelmeyer, podemos sentir la tentación de vivir el estudio puramente en la esfera abstracta del intelecto. Sin embargo, la teología renovada que aquí nos convoca sólo puede respirar cuando el pensar se vuelve cálido, cuando se hace corazón y se experimenta en la quietud del templo y en la fraternidad cotidiana.

En el altar, Cristo no se muestra como una idea filosófica distante, sino como una Fuerza de Resurrección viviente que se une a la sustancia de la Tierra y al yo de cada ser humano. Durante este trimestre profundizaremos en las cuatro partes del servicio: la Proclama del Evangelio, el Ofertorio, la Transubstanciación y la Comunión.

Les aliento a acercarse a cada encuentro de estudio no sólo con interrogantes, sino con una actitud devota de escucha interior.
Que la bendición acompañe a cada uno en sus hogares.`
  },
  {
    id: 'art_2',
    title: 'Orientaciones sobre el Proceso de Discernimiento Vocacional',
    subtitle: '¿Qué significa prepararse para el Seminario Sacerdotal?',
    authorName: 'Pbra. Helena Von Berg',
    authorTitle: 'Formadora y Sacerdotisa',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    date: '2026-09-14',
    category: 'proseminario',
    readingTimeMinutes: 5,
    likes: 28,
    pinned: false,
    highlightQuote: '«La vocación no es un certificado exterior, sino un fuego tenue que pide ser cuidado con constancia y madurez moral.»',
    content: `En el Proseminario no formamos sacerdotes aún; preparamos el suelo del alma. Es un tiempo de propedéutica, de autoencuentro sincero donde cada participante se pregunta: ¿Es mi destino acompañar a la humanidad en los umbrales de la vida y de la muerte mediante la palabra sacramental?

El camino exige tres pilares irrenunciables:
1. Estudio riguroso de la Antroposofía y de las Sagradas Escrituras.
2. Una vida meditativa regular y disciplina interior.
3. El cultivo del amor al prójimo concreto y la superación del egoísmo sutil.

Nuestros círculos semanales de conversación están abiertos para que traigan sus dudas sin temor. Nadie es juzgado por sus incertidumbres; al contrario, una duda bien trabajada es la semilla de una fe consciente.`
  },
  {
    id: 'art_3',
    title: 'Convocatoria al Retiro Presencial de Primavera / San Juan',
    subtitle: 'Fechas, programa preliminar y preparativos del encuentro conjunto',
    authorName: 'Pbro. Esteban Morales',
    authorTitle: 'Sacerdote tutor del Proseminario',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: '2026-09-08',
    category: 'sacramental',
    readingTimeMinutes: 4,
    likes: 19,
    pinned: false,
    highlightQuote: '«Encontrarnos cara a cara, respirar el mismo silencio y celebrar juntos el servicio renueva todas nuestras fuerzas interiores.»',
    content: `Nos complace anunciar las fechas tentativas para el primer encuentro presencial del ciclo. Tendrá lugar en la Sede de la Comunidad de Cristianos durante un fin de semana completo.

Habrá conferencias compartidas, euritmia sacramental, práctica de oratoria cúltica y espacios para compartir alimentos y diálogos francos. En la sección de Cartelera hemos abierto el hilo para coordinar traslados y alojamientos compartidos.`
  }
];

export const SEED_BULLETIN_POSTS: BulletinPost[] = [
  {
    id: 'post_1',
    title: 'Coordinación de viajes y hospedaje para el Encuentro Presencial',
    content: 'Hola queridos amigos, para quienes viajamos desde Córdoba y el Litoral al encuentro en Buenos Aires, estamos armando un grupo para compartir auto o coordinar pasajes en tren. También la comunidad ofrece 4 plazas en casas de familias amigas.',
    category: 'alojamiento_viaje',
    author: SEED_USERS[3], // Clara
    date: '2026-09-22',
    city: 'Córdoba / Buenos Aires',
    urgency: 'alta',
    contactEmailOrPhone: 'clara.m@proseminario.org',
    commentsCount: 6
  },
  {
    id: 'post_2',
    title: 'Círculo de oración y pensamiento matutino: Martes y Jueves 07:30 hs',
    content: 'Invitamos a los integrantes del proseminario a conectarse 15 minutos antes de iniciar la jornada laboral para meditar en silencio y sostener en pensamientos a los miembros de la comunidad que atraviesan procesos de salud.',
    category: 'oracion_pensamiento',
    author: SEED_USERS[1], // Pbro Esteban
    date: '2026-09-18',
    city: 'Virtual (Abierto)',
    urgency: 'normal',
    commentsCount: 12
  },
  {
    id: 'post_3',
    title: 'Búsqueda de ejemplares de "El Quinto Evangelio" (Editorial Antroposófica)',
    content: 'Si alguien tiene un ejemplar en papel repetido o disponible en préstamo para la biblioteca circulante del proseminario, por favor avísenme. Tenemos varios interesados en sumarse a la lectura física.',
    category: 'iniciativa',
    author: SEED_USERS[0], // Ramiro
    date: '2026-09-15',
    city: 'Buenos Aires',
    urgency: 'normal',
    contactEmailOrPhone: 'ramiro@proseminario.org',
    commentsCount: 3
  },
  {
    id: 'post_4',
    title: 'Grupo de estudio sobre los Evangelios en relación con la Euritmia',
    content: 'Estamos conformando una pequeña iniciativa los sábados por la tarde para experimentar gestualmente los versos del Evangelio según San Juan. Quienes deseen sumarse, sean muy bienvenidos.',
    category: 'encuentro',
    author: SEED_USERS[4], // Matías
    date: '2026-09-12',
    city: 'Rosario / Híbrido',
    urgency: 'normal',
    commentsCount: 4
  }
];

export const SEED_QUESTIONS: QuestionPost[] = [
  {
    id: 'q_1',
    title: '¿Cuál es la diferencia medular entre la Cristología tradicional dogmática y la Cristología antroposófica?',
    content: 'Leyendo las primeras conferencias de Rudolf Steiner sobre los evangelios, noto que se hace hincapié en el acontecimiento del Gólgota no como un sacrificio para aplacar la ira divina, sino como una metamorfosis cósmica y vital para la Tierra. ¿Cómo se explica esto en relación con la liturgia de la Comunidad de Cristianos?',
    category: 'cristologia',
    tags: ['Cristología', 'Gólgota', 'Rudolf Steiner', 'Sacramentos'],
    author: SEED_USERS[0], // Ramiro
    date: '2026-09-21',
    resolved: true,
    views: 89,
    answers: [
      {
        id: 'ans_1',
        author: SEED_USERS[1], // Pbro. Esteban Morales
        isPriestVerified: true,
        date: '2026-09-22',
        upvotes: 14,
        content: `Estimado Ramiro, tocas el corazón mismo de la renovación religiosa. En la teología escolástica tradicional prevaleció la idea de la "expiación vicaria" (Anselmo de Canterbury), donde el ser humano debía una deuda infinita y el Hijo sufre el castigo.

Desde la Ciencia Espiritual Antroposófica y la revelación de la Comunidad de Cristianos, el Cristo no viene a pagar una deuda a un Dios distante: viene como el Ser Solar Cósmico que desciende por amor a la densidad material para infundir Su Vida y Su Luz en el cuerpo de la Tierra en agonía y en el Yo humano.

El Gólgota es el punto de inflexión del cosmos: la muerte física es superada desde dentro. En el Acto de Consagración del Hombre no imploramos perdón pasivo; participamos conscientemente en la transubstanciación de la materia y de nuestra propia alma.`
      },
      {
        id: 'ans_2',
        author: SEED_USERS[3], // Clara Menéndez
        isPriestVerified: false,
        date: '2026-09-22',
        upvotes: 5,
        content: 'Muchas gracias por la respuesta tan clara padre. Recomiendo complementar esto con la lectura del capítulo 4 del libro de Friedrich Rittelmeyer "El Cristianismo como realidad viviente". Ayuda mucho a visualizarlo.'
      }
    ]
  },
  {
    id: 'q_2',
    title: '¿Cómo organizar un ritmo sano de meditación diaria trabajando 8 horas al día?',
    content: 'Muchos de los que estamos en el proseminario tenemos ocupaciones laicas demandantes. A veces llego al final del día agotado y me cuesta concentrarme en los versos o en la retrospectiva (Rückschau). ¿Qué consejos prácticos tienen los sacerdotes y compañeros?',
    category: 'vida_interior',
    tags: ['Meditación', 'Ritmo Diario', 'Retrospectiva', 'Práctica Interior'],
    author: SEED_USERS[3], // Clara
    date: '2026-09-19',
    resolved: false,
    views: 64,
    answers: [
      {
        id: 'ans_3',
        author: SEED_USERS[2], // Pbra. Helena
        isPriestVerified: true,
        date: '2026-09-20',
        upvotes: 9,
        content: `Querida Clara: Rudolf Steiner siempre insistió en que vale más 5 o 7 minutos de concentración pura, amorosa y libre de distracción a la mañana temprano, que 40 minutos forzados y exhaustos antes de dormir.

Consejo práctico:
1. Por la mañana: elige una sola frase (por ejemplo del Evangelio o un verso meditativo). Dedícale 5 minutos en calma absoluta, antes de mirar el teléfono.
2. Durante el día: un "minuto de oro" de silencio al mediodía.
3. A la noche: una retrospectiva breve, no autoacusatoria, sino contemplando los sucesos del día como un testigo pacífico desde la noche hacia la mañana.`
      }
    ]
  },
  {
    id: 'q_3',
    title: 'Requisitos de idiomas (Alemán / Griego / Latín) para quienes aspiren al Seminario formal',
    content: 'Tengo la duda de si para ingresar posteriormente al Seminario Sacerdotal en Stuttgart o Hamburgo es excluyente dominar el alemán previamente o si se puede cursar con apoyo en español/inglés en las etapas iniciales.',
    category: 'organizacion_proseminario',
    tags: ['Seminario', 'Idiomas', 'Formación', 'Vocación'],
    author: SEED_USERS[0], // Ramiro
    date: '2026-09-17',
    resolved: true,
    views: 52,
    answers: [
      {
        id: 'ans_4',
        author: SEED_USERS[4], // Matías (Coordinador)
        isPriestVerified: false,
        date: '2026-09-17',
        upvotes: 6,
        content: 'No es requisito excluyente saber alemán para iniciar el Proseminario latinoamericano. De hecho, gran parte del material y los encuentros son en castellano. Para la etapa posterior en Europa, se brindan cursos intensivos de inmersión y existen cohortes con soporte lingüístico. Lo primordial en esta fase es la afinidad del alma con el impulso sacramental.'
      }
    ]
  }
];

export const SEED_BOOKS: BookResource[] = [
  {
    id: 'book_1',
    title: 'El Acto de Consagración del Hombre: Fundamentos espirituales y litúrgicos',
    author: 'Friedrich Rittelmeyer & Rudolf Steiner',
    category: 'liturgia',
    description: 'Estudio fundamental sobre el nuevo sacramento del altar entregado a la Comunidad de Cristianos en 1922. Explica la arquitectura interna de la misa renovada, el papel de las vestiduras, los colores litúrgicos y la fuerza transformadora de la palabra sacramental.',
    recommendedFor: 'Módulo 1 y 3 del Proseminario',
    pageCount: 220,
    essentialQuotes: [
      '«El sacerdote no se interpone entre Dios y el hombre; se ofrece como servidor para que la presencia del Resucitado pueda tocar la sustancia de la Tierra.»',
      '«Cada palabra del Acto es un órgano de respiración para el alma moderna.»'
    ],
    readingStatus: 'leyendo'
  },
  {
    id: 'book_2',
    title: 'El Evangelio según San Juan en relación con los otros tres evangelios (GA 112)',
    author: 'Rudolf Steiner',
    category: 'evangelios',
    description: 'Ciclo de 14 conferencias dictadas en Kassel en 1909. Revela la naturaleza única del cuarto evangelio como texto de iniciación y documento cumbre para comprender la venida del Logos a la Tierra.',
    recommendedFor: 'Módulo 2: Estudio Bíblico Profundo',
    pageCount: 310,
    essentialQuotes: [
      '«En el principio era el Verbo, y el Verbo estaba con Dios, y el Verbo era Dios... En Él estaba la vida, y la vida era la luz de los hombres.»',
      '«Comprender a San Juan significa despertar al Cristo cósmico en el centro de la conciencia despierta.»'
    ],
    readingStatus: 'pendiente'
  },
  {
    id: 'book_3',
    title: 'Mi encuentro con Rudolf Steiner',
    author: 'Friedrich Rittelmeyer',
    category: 'antroposofia_general',
    description: 'La emocionante autobiografía testimonial del eminente teólogo luterano que lideró la fundación de la Comunidad de Cristianos. Narra sus dudas honestas, sus conversaciones íntimas con Steiner y la gestación de la renovación religiosa.',
    recommendedFor: 'Lectura introductoria imprescindible',
    pageCount: 195,
    essentialQuotes: [
      '«No buscaba una nueva secta ni un dogma frío, sino la respuesta viva a cómo Cristo puede redimir la tragedia de nuestro tiempo.»'
    ],
    readingStatus: 'completado'
  },
  {
    id: 'book_4',
    title: 'El Círculo del Año como Camino de Iniciación',
    author: 'Emil Bock',
    category: 'vida_meditativa',
    description: 'Obra maestra de uno de los primeros sacerdotes y directores del seminario. Un recorrido por las festividades cristianas: desde el recogimiento de Adviento hasta la luz ígnea de San Juan, explicando los colores, las lecturas y la transformación del alma.',
    recommendedFor: 'Módulo 3: Vida Sacramental y Ritmo Anual',
    pageCount: 260,
    essentialQuotes: [
      '«El año de la Tierra no es un mero giro astronómico, sino la respiración viva de la naturaleza unida a la biografía de Cristo.»'
    ],
    readingStatus: 'pendiente'
  },
  {
    id: 'book_5',
    title: 'El Quinto Evangelio: Investigaciones de la Crónica del Akasha (GA 148)',
    author: 'Rudolf Steiner',
    category: 'cristologia',
    description: 'Conferencias dictadas en 1913 donde Steiner describe las vivencias íntimas de Jesús de Nazaret desde sus doce años hasta el Bautismo en el Jordán, incluyendo sus encuentros con la sabiduría esenia y la angustia de la decadencia espiritual de la época.',
    recommendedFor: 'Módulo 2: Profundización Cristológica',
    pageCount: 180,
    essentialQuotes: [
      '«Sólo quien comprende el inmenso dolor y soledad de Jesús de Nazaret puede vislumbrar la magnitud del descenso del Ser de Cristo.»'
    ],
    readingStatus: 'pendiente'
  }
];

export const SEED_STUDY_SUMMARIES: StudySummary[] = [
  {
    id: 'sum_1',
    title: 'Síntesis: El Prólogo del Evangelio de Juan (Jn 1, 1-18) a la luz de la Antroposofía',
    theme: 'Cristología y Exégesis Espiritual',
    author: SEED_USERS[0], // Ramiro
    date: '2026-09-23',
    cycleModule: 'Módulo 2: Los Evangelios',
    relatedBookOrLecture: 'GA 112 - El Evangelio de San Juan',
    tags: ['Prólogo', 'Logos', 'Luz y Tinieblas', 'Zoe / Bios'],
    downloadsCount: 18,
    likesCount: 12,
    keyTakeaways: [
      'El "En Arjé" griego no significa simplemente "en el comienzo cronológico", sino "en el principio originario primordial".',
      'Distinción clave entre "Bios" (vida biológica temporal) y "Zoe" (la Vida divina increada y resurrectora del Logos).',
      'El versículo 14: "Y el Verbo se hizo carne" (sarx egeneto): el ingreso real y sustancial en la condición humana terrenal.',
      'El testimonio del Bautista como el heraldo de la transición entre la conciencia antigua clarividente y el Yo despierto.'
    ],
    content: `## 1. Introducción al Estudio del Prólogo
El Prólogo de San Juan es considerado por Rudolf Steiner y los sacerdotes fundadores como el himno supremo de la evolución cósmica. Lejos de ser un poema alegórico, contiene la fórmula exacta de la encarnación del Logos en el curso histórico de la humanidad.

### 2. Estructura Cuatripartita del Prólogo
Podemos distinguir con nitidez cuatro movimientos espirituales:
1. **Los versículos 1-5:** El Logos Cósmico en el seno primordial divino ("En el Principio"). La Vida como Luz de los hombres y la confrontación con las tinieblas que no la comprendieron.
2. **Los versículos 6-8:** La figura de Juan el Bautista. Él no era la Luz, sino enviado a dar testimonio de la Luz para que todos creyesen a través de él.
3. **Los versículos 9-13:** La venida al mundo terrenal. Estaba en el mundo, el mundo fue hecho por Él, pero los suyos no lo recibieron; mas a los que lo acogieron les confirió el poder de transformarse en Hijos de Dios.
4. **Los versículos 14-18:** El misterio supremo del Gólgota y la encarnación: "Y el Verbo se hizo carne y habitó entre nosotros (puso su tienda entre nosotros - eskenosen), y contemplamos su gloria".

### 3. Aplicación para la Meditación del Proseminario
Se sugiere a los integrantes del grupo tomar diariamente el versículo 4: *«En Él estaba la Vida, y la Vida era la Luz de los Hombres»*, visualizando cómo esa Vida impregna el corazón y vence el desaliento interior.`
  },
  {
    id: 'sum_2',
    title: 'Esquema Comparativo: Las 4 Fases del Acto de Consagración del Hombre',
    theme: 'Liturgia Sacramental Renovada',
    author: SEED_USERS[3], // Clara Menéndez
    date: '2026-09-16',
    cycleModule: 'Módulo 3: Vida Sacramental',
    relatedBookOrLecture: 'El Acto de Consagración del Hombre - F. Rittelmeyer',
    tags: ['Liturgia', 'Ofertorio', 'Transubstanciación', 'Comunión', 'Evangelio'],
    downloadsCount: 25,
    likesCount: 15,
    keyTakeaways: [
      'Proclama del Evangelio: apertura de la palabra sagrada y purificación del oído espiritual.',
      'Ofertorio: el alma ofrece sus fuerzas terrenales y el fruto del trabajo humano al altar.',
      'Transubstanciación: el momento culminante donde el pan y el vino son colmados de la presencia crística.',
      'Comunión: recepción del alimento de inmortalidad para salir fortalecidos al mundo.'
    ],
    content: `## Síntesis de las Cuatro Fases de la Misa Renovada

1. **Lectura del Evangelio (La Palabra):**
   - El sacerdote se vuelve hacia la comunidad portando el texto del ciclo anual.
   - El alma de los presentes se aquieta y se eleva hacia la atmósfera de los acontecimientos bíblicos.
   - Actúa principalmente sobre el cuerpo de pensamiento y la comprensión luminosa.

2. **El Ofertorio (La Ofrenda Humana):**
   - Presentación de las sustancias: el cáliz con el vino y la patena con el pan.
   - El incienso asciende como símbolo de las oraciones y la devoción purificada.
   - Correspondencia moral: ¿Qué traigo hoy al altar de mi propia vida para consagrarlo?

3. **La Transubstanciación (La Metamorfosis Sagrada):**
   - El sacerdote invoca la acción viva del Espíritu Santo y del Hijo Resucitado.
   - La sustancia perecedera se hace portadora de la vida imperecedera del Cristo.
   - Profundo silencio en el templo: el umbral entre el mundo sensible y el suprasensible se vuelve transparente.

4. **La Comunión (La Unión Fraternal):**
   - Participación comunitaria del sacramento.
   - Cierre con la triple bendición sacerdotal: paz y valor para el testimonio cotidiano.`
  },
  {
    id: 'sum_3',
    title: 'Apuntes de Clase: La metamorfosis del dolor en el camino del discipulado',
    theme: 'Autoeducación y Formación Interior',
    author: SEED_USERS[4], // Matías
    date: '2026-09-10',
    cycleModule: 'Módulo 1: Fundamentos',
    relatedBookOrLecture: 'Cómo se alcanza el conocimiento de los mundos superiores (GA 10)',
    tags: ['Dolor', 'Autoeducación', 'Resignación activa', 'Mundo Superior'],
    downloadsCount: 14,
    likesCount: 8,
    keyTakeaways: [
      'El sufrimiento no es un castigo, sino un llamado de despertar de la conciencia.',
      'El dolor vivido con dignidad ensancha la capacidad de compasión hacia los semejantes.',
      'El secreto sacerdotal consiste en no endurecerse ante la herida ajena.'
    ],
    content: `## Notas del Taller impartido por la Pbra. Helena Von Berg:
- Rudolf Steiner advierte que el estudiante espiritual que busca el conocimiento superior sin cultivar paralelamente la bondad y la empatía cae en el riesgo del orgullo intelectual.
- Cada paso adelante en el conocimiento debe estar precedido por tres pasos en el perfeccionamiento moral y en la abnegación cariñosa hacia los demás.
- Ejercicio propuesto: reflexionar al final de la semana sobre un momento difícil y reconocer qué cualidad interior exigió desarrollar.`
  }
];

export const SEED_MEETING_ROOMS: MeetingRoom[] = [
  {
    id: 'room_1',
    title: 'Círculo Semanal: Estudio del Evangelio de Juan (Capítulo 4: La Samaritana en el Pozo)',
    description: 'Lectura comentada versículo por versículo, intercambio de impresiones y vinculación con el agua viva del espíritu.',
    host: SEED_USERS[1], // Pbro. Esteban
    date: '2026-09-25',
    time: '19:30',
    durationMinutes: 75,
    modality: 'virtual',
    locationOrPlatform: 'Sala Jitsi Integrada de Video',
    jitsiRoomName: 'ProseminarioComunidadCristianos-EvangelioJuan',
    topicCategory: 'lectura_evangelio',
    participantsCount: 8,
    maxParticipants: 20,
    isLiveNow: true
  },
  {
    id: 'room_2',
    title: 'Espacio Abierto de Dudas y Conversación Fraternal',
    description: 'Sala libre para conversar entre estudiantes sobre las lecturas de la semana, compartir dudas del seminario y coordinar tareas.',
    host: SEED_USERS[0], // Ramiro
    date: '2026-09-27',
    time: '18:00',
    durationMinutes: 60,
    modality: 'virtual',
    locationOrPlatform: 'Sala Jitsi Integrada de Video',
    jitsiRoomName: 'ProseminarioComunidadCristianos-DudasFraternales',
    topicCategory: 'conversacion_libre',
    participantsCount: 4,
    maxParticipants: 15,
    isLiveNow: false
  },
  {
    id: 'room_3',
    title: 'Taller de Fonética y Formación del Habla Sacramental',
    description: 'Práctica guiada de respiración, dicción y escucha del sonido de las consonantes y vocales en las oraciones cúlticas.',
    host: SEED_USERS[2], // Pbra. Helena
    date: '2026-10-02',
    time: '17:00',
    durationMinutes: 90,
    modality: 'hibrido',
    locationOrPlatform: 'Sede Comunidad / Transmisión en Vivo',
    jitsiRoomName: 'ProseminarioComunidadCristianos-FormacionHabla',
    topicCategory: 'practica_habla',
    participantsCount: 12,
    maxParticipants: 25,
    isLiveNow: false
  }
];

export const PROSEMINAR_MODULES: ProseminarModuleInfo[] = [
  {
    id: 'mod_1',
    number: 1,
    title: 'Fundamentos de la Antroposofía y la Nueva Teología',
    period: 'Marzo – Mayo',
    description: 'Aproximación sistemática a la imagen del ser humano cuatripartito (físico, etérico, astral y Yo) y tripartito (cuerpo, alma y espíritu). El origen del impulso de la Comunidad de Cristianos en 1922.',
    essentialThemes: [
      'El ser humano como templo del Espíritu',
      'Rudolf Steiner y Friedrich Rittelmeyer: El encuentro de dos caminos',
      'El pensar viviente frente al materialismo moderno'
    ],
    assignedPriest: 'Pbro. Esteban Morales'
  },
  {
    id: 'mod_2',
    number: 2,
    title: 'Los Cuatro Evangelios y el Misterio del Gólgota',
    period: 'Junio – Agosto',
    description: 'Exégesis espiritual de los sinópticos y el Evangelio de San Juan. El misterio de los dos niños Jesús y la encarnación del Logos en el Bautismo del Jordán.',
    essentialThemes: [
      'Las cuatro corrientes evangélicas y sus imágenes querubínicas',
      'El Quinto Evangelio y los años preparatorios de Jesús de Nazaret',
      'El Acontecimiento del Gólgota como hecho central de la evolución terrestre'
    ],
    assignedPriest: 'Pbra. Helena Von Berg'
  },
  {
    id: 'mod_3',
    number: 3,
    title: 'La Vida Sacramental y el Círculo del Año Cristiano',
    period: 'Septiembre – Noviembre',
    description: 'Estudio de los siete sacramentos renovados, con especial dedicación al Acto de Consagración del Hombre. El ritmo de las estaciones y las grandes festividades sagradas.',
    essentialThemes: [
      'Arquitectura espiritual del Acto de Consagración del Hombre',
      'Los Siete Sacramentos en los umbrales de la biografía humana',
      'Las cuatro festividades cardinales: Micael, Navidad, Pascua y San Juan'
    ],
    assignedPriest: 'Pbro. Esteban Morales'
  },
  {
    id: 'mod_4',
    number: 4,
    title: 'Autoeducación, Oratoria Sagrada y Discernimiento Vocacional',
    period: 'Diciembre – Febrero',
    description: 'Espacio de maduración personal, ejercicios meditativos, arte de la palabra y clarificación de los pasos hacia el Seminario Sacerdotal formal.',
    essentialThemes: [
      'Los seis ejercicios subsidiarios de Rudolf Steiner',
      'La palabra hablada como vehículo de fuerzas espirituales',
      'El discernimiento individual de la vocación y el servicio a la comunidad'
    ],
    assignedPriest: 'Equipo de Sacerdotes y Tutores'
  }
];

export const SEED_ATTENDANCE_SESSIONS: AttendanceSession[] = [
  {
    id: 'att_1',
    date: '2026-09-20',
    title: 'Apertura: Fundamentos de la Cristología y el Nuevo Impulso Sacramental',
    type: 'clase',
    records: [
      { userId: 'user_ramiro', status: 'presente' },
      { userId: 'user_clara', status: 'presente' },
      { userId: 'user_matias', status: 'presente' },
      { userId: 'user_sofia', status: 'presente' },
      { userId: 'user_tomas', status: 'presente' },
      { userId: 'user_lucia', status: 'presente' },
      { userId: 'user_ignacio', status: 'presente' },
      { userId: 'user_priest_esteban', status: 'presente' },
      { userId: 'user_priest_helena', status: 'presente' },
      { userId: 'user_priest_martin', status: 'justificado', note: 'Servicio sacramental' }
    ]
  },
  {
    id: 'att_2',
    date: '2026-09-27',
    title: 'Estudio de los Cuatro Evangelios y el Prólogo de San Juan',
    type: 'circulo',
    records: [
      { userId: 'user_ramiro', status: 'presente' },
      { userId: 'user_clara', status: 'presente' },
      { userId: 'user_matias', status: 'presente' },
      { userId: 'user_sofia', status: 'justificado', note: 'Compromiso laboral' },
      { userId: 'user_tomas', status: 'presente' },
      { userId: 'user_lucia', status: 'ausente' },
      { userId: 'user_ignacio', status: 'presente' },
      { userId: 'user_priest_esteban', status: 'presente' },
      { userId: 'user_priest_helena', status: 'presente' },
      { userId: 'user_priest_martin', status: 'presente' }
    ]
  },
  {
    id: 'att_3',
    date: '2026-10-04',
    title: 'Práctica Cúltica y Estudio del Acto de Consagración del Hombre',
    type: 'taller',
    records: [
      { userId: 'user_ramiro', status: 'presente' },
      { userId: 'user_clara', status: 'presente' },
      { userId: 'user_matias', status: 'presente' },
      { userId: 'user_sofia', status: 'presente' },
      { userId: 'user_tomas', status: 'justificado', note: 'Viaje desde Córdoba' },
      { userId: 'user_lucia', status: 'presente' },
      { userId: 'user_ignacio', status: 'presente' },
      { userId: 'user_priest_esteban', status: 'presente' },
      { userId: 'user_priest_helena', status: 'presente' },
      { userId: 'user_priest_martin', status: 'justificado' }
    ]
  },
  {
    id: 'att_4',
    date: '2026-10-07',
    title: 'Encuentro Preparatorio: Convivencia y Logística en Granja Épicos',
    type: 'encuentro',
    records: [
      { userId: 'user_ramiro', status: 'presente' },
      { userId: 'user_clara', status: 'presente' },
      { userId: 'user_matias', status: 'presente' },
      { userId: 'user_sofia', status: 'presente' },
      { userId: 'user_tomas', status: 'presente' },
      { userId: 'user_lucia', status: 'presente' },
      { userId: 'user_ignacio', status: 'presente' },
      { userId: 'user_priest_esteban', status: 'presente' },
      { userId: 'user_priest_helena', status: 'presente' },
      { userId: 'user_priest_martin', status: 'presente' }
    ]
  }
];

export const SEED_FUNDRAISER: FundraiserCampaign = {
  title: 'Campaña Solidaria: Viaje de Inmersión Proseminario 2027',
  subtitle: 'Fondo comunitario para cubrir hospedaje, alimentación biodinámica y becas de viaje para todos los integrantes.',
  goalAmount: 3200000,
  currentAmount: 1890000,
  currency: 'ARS',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0', // Video embed / player
  videoThumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
  videoTitle: '¿Para qué necesitamos este dinero? La voz de los sacerdotes y estudiantes',
  videoDescription: 'En este video de 3 minutos, los sacerdotes tutores y los integrantes del Proseminario comparten el sentido profundo del retiro de 11 días en la Granja Épicos y por qué la solidaridad comunitaria hace posible que nadie quede afuera por motivos económicos.',
  aliasCbu: 'proseminario.epicos',
  cbuNumber: '0000003100045892147852',
  titular: 'Asociación Civil Comunidad de Cristianos',
  banco: 'Banco Credicoop Cooperativo',
  mercadoPagoLink: 'https://link.mercadopago.com.ar/proseminarioepicos',
  breakdown: [
    {
      label: 'Hospedaje y Alimentación en Granja Épicos (11 días)',
      amount: 1750000,
      description: 'Alojamiento para 12 integrantes y sacerdotes, más cuatro comidas diarias elaboradas con ingredientes biodinámicos de la propia granja.'
    },
    {
      label: 'Fondo de Becas de Pasajes para Estudiantes del Interior',
      amount: 950000,
      description: 'Aporte solidario para traslados terrestres desde Mendoza, Bariloche, Córdoba y Montevideo (Uruguay).'
    },
    {
      label: 'Materiales Pedagógicos, Textos y Capilla Portátil',
      amount: 500000,
      description: 'Cuadernos de estudio, velas de cera de abejas, vestiduras para el Acto de Consagración y elementos de trabajo en la tierra.'
    }
  ],
  contributions: [
    {
      id: 'don_1',
      donorName: 'Comunidad de Cristianos de Buenos Aires (Fondo Pastoral)',
      amount: 600000,
      date: '2026-09-18',
      message: 'Bendiciones para este impulso formador en la tierra fértil de Exaltación.'
    },
    {
      id: 'don_2',
      donorName: 'Familia Stein',
      amount: 350000,
      date: '2026-09-24',
      message: 'Con profunda alegría apoyando el camino de los futuros servidores de la comunidad.'
    },
    {
      id: 'don_3',
      donorName: 'Círculo de Amigos de Córdoba',
      amount: 280000,
      date: '2026-09-29',
      message: 'Para que todos los jóvenes del interior puedan viajar.'
    },
    {
      id: 'don_4',
      donorName: 'Donante Anónimo',
      amount: 450000,
      date: '2026-10-02',
      message: 'En gratitud por los sacramentos renovados.',
      isAnonymous: true
    },
    {
      id: 'don_5',
      donorName: 'Grupo de Euritmia Montevideo',
      amount: 210000,
      date: '2026-10-06',
      message: 'Abrazo fraternal desde Uruguay para Clara y todo el grupo.'
    }
  ]
};

export const SEED_IMMERSION_TRIP: ImmersionTrip = {
  title: 'Viaje de Inmersión Proseminario 2027',
  datesText: '1 al 11 de Enero',
  startDate: '2027-01-01',
  endDate: '2027-01-11',
  locationName: 'Granja Épicos',
  locationZone: 'Exaltación de la Cruz, Provincia de Buenos Aires',
  addressDetails: 'Ruta Provincial 39 y Camino a Parada Robles, Partido de Exaltación de la Cruz, Pcia. de Buenos Aires (a 80 km de Capital Federal)',
  // Google Maps embed centrado en Exaltación de la Cruz / Capilla del Señor
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52726.83687358245!2d-59.1558231!3d-34.2937746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bb786016e3eb73%3A0xa19b48b6c4cfcb64!2sExaltaci%C3%B3n%20de%20la%20Cruz%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1710000000000!5m2!1ses!2sar',
  googleMapsLink: 'https://maps.google.com/?q=Exaltacion+de+la+Cruz+Buenos+Aires+Granja+Epicos',
  description: 'Once días de inmersión total en la respiración de la naturaleza, el trabajo comunitario en la tierra biodinámica, la celebración diaria del Acto de Consagración del Hombre y el discernimiento de la vocación sacerdotal.',
  objectives: [
    'Encuentro vivo con la sustancia de la Tierra: labores biodinámicas en los campos y huertas de Granja Épicos.',
    'Ritmo sacramental cotidiano: celebración matutina del Acto de Consagración del Hombre en la capilla del predio.',
    'Estudio profundo de los Evangelios, Cristología antroposófica y oratoria sagrada.',
    'Coloquios individuales de discernimiento con los sacerdotes acompañantes.',
    'Convivencia fraterna real: cocina compartida, euritmia en la naturaleza y silencios conscientes.'
  ],
  dailyRhythm: [
    { time: '06:30 hs', activity: 'Despertar y recogimiento', detail: 'Silencio interior y preparación para el oficio sacro.' },
    { time: '07:15 hs', activity: 'Acto de Consagración del Hombre', detail: 'Celebración diaria en la capilla del predio.' },
    { time: '08:30 hs', activity: 'Desayuno fraternal', detail: 'Alimentos biodinámicos elaborados en Granja Épicos.' },
    { time: '09:30 hs', activity: 'Trabajo en la Tierra (Granja Épicos)', detail: 'Labores de huerta, preparados biodinámicos, compost y cuidado animal.' },
    { time: '13:00 hs', activity: 'Almuerzo y pausa reparadora', detail: 'Tiempo de descanso o contemplación en el parque.' },
    { time: '15:30 hs', activity: 'Seminario de Estudio Evangélico', detail: 'Exégesis del Evangelio de Juan y textos de Rudolf Steiner.' },
    { time: '17:30 hs', activity: 'Euritmia y Arte de la Palabra', detail: 'Práctica corporal de los gestos sonoros y consonantes sacras.' },
    { time: '19:30 hs', activity: 'Coloquios de Acompañamiento y Cena', detail: 'Diálogo personal con sacerdotes y cena compartida.' },
    { time: '21:00 hs', activity: 'Cierre del día y Retrospectiva (Rückschau)', detail: 'Revisión contemplativa de la jornada antes del descanso nocturno.' }
  ],
  whatToBring: [
    'Ropa cómoda y resistente para trabajo en la tierra / huerta (pantalón largo, gorro de sol, guantes de trabajo).',
    'Calzado cerrado firme y botas de lluvia para el campo.',
    'Cuaderno de notas personal y Biblia / Evangelio de Juan.',
    'Ropa clara o apropiada para la asistencia al Acto de Consagración del Hombre.',
    'Sábanas individuales o bolsa de dormir y toalla.',
    'Elementos de higiene personal biodegradables / ecológicos.',
    'Protector solar, repelente de insectos y botella de agua personal.'
  ],
  coordinatorName: 'Matías Rinaldi (Coordinador Logístico)',
  coordinatorContact: '+54 341 498-7712 • matias.rinaldi@proseminario.org'
};
