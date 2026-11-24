export const STORY_CATEGORIES = [
  { id: 'todas', label: 'Todas las historias' },
  { id: 'laboral', label: 'Entorno laboral' },
  { id: 'academico', label: 'Universidad y estudio' },
  { id: 'publico', label: 'Espacios públicos y digitales' },
  { id: 'pareja', label: 'Vínculos y familia' },
  { id: 'aliados', label: 'Aliados activos' },
];

export const INITIAL_STORIES = [
  {
    id: 'st-1',
    author: 'Valeria M.',
    alias: '@valeria_m',
    role: 'Ingeniera de Software',
    anonymous: false,
    category: 'laboral',
    categoryLabel: 'Entorno laboral',
    title: 'Cuando mis ideas en reuniones solo se escuchaban si las repetía un compañero',
    situation:
      'Durante seis meses noté que al proponer soluciones técnicas en las juntas de equipo, la conversación seguía de largo. Minutos después, un colega repetía la misma idea y recibía elogios. Empecé a dudar de mi voz y a quedarme callada para evitar incomodidad.',
    howICoped:
      'Apliqué la estructura asertiva DESC en una conversación 1 a 1 con mi líder y acordé con dos compañeras usar la técnica de "amplificación": cada vez que una intervenía, otra validaba el punto nombrándola explícitamente ("Como acaba de señalar Valeria..."). También documenté mis propuestas por escrito antes de cada reunión.',
    takeaway:
      'No se trata de hablar más fuerte, sino de crear acuerdos de reconocimiento mutuo y documentar nuestro trabajo con claridad.',
    date: 'Hace 2 días',
    readTime: '3 min',
    empathyCount: 48,
    sharesCount: 19,
    tags: ['Asertividad laboral', 'Amplificación', 'Límites'],
    comments: [
      {
        id: 'c-101',
        author: 'Camila R.',
        text: 'Me pasó exactamente lo mismo en mi primer empleo. La técnica de amplificación entre compañeras cambia por completo la dinámica de la sala.',
        time: 'Hace 1 día',
      },
      {
        id: 'c-102',
        author: 'Andrés T. (Aliado)',
        text: 'Gracias por compartirlo. Como hombre en equipos tech, ahora estoy atento para devolver el crédito cuando noto que alguien interrumpe o repite una idea ajena.',
        time: 'Hace 18 h',
      },
    ],
  },
  {
    id: 'st-2',
    author: 'Anónimo · Estrella Teal',
    alias: '@estrella_segura',
    role: 'Estudiante universitaria',
    anonymous: true,
    category: 'academico',
    categoryLabel: 'Universidad y estudio',
    title: 'Poner límites frente a comentarios "de broma" en el laboratorio',
    situation:
      'En mi facultad, un grupo de compañeros hacía chistes sexistas disfrazados de humor cada vez que hacíamos prácticas. Al principio reía por nervios para no quedar como "exagerada", pero me generaba ansiedad ir a clases.',
    howICoped:
      'Dejé de validar con sonrisas lo que me incomodaba. Preparé tres frases cortas y neutrales: "¿A qué te refieres exactamente con eso?", "Ese comentario no aporta al trabajo" y "Prefiero que mantengamos el respeto en el equipo". Además, me acerqué a la consejería estudiantil para impulsar un pacto de convivencia en el laboratorio.',
    takeaway:
      'Pedir que expliquen una "broma" ofensiva sin perder la calma desarma la agresión sutil y devuelve la responsabilidad a quien la emite.',
    date: 'Hace 4 días',
    readTime: '4 min',
    empathyCount: 72,
    sharesCount: 31,
    tags: ['Microviolencias', 'Humor respetuoso', 'Espacios académicos'],
    comments: [
      {
        id: 'c-201',
        author: 'Lucía G.',
        text: 'Preguntar "¿me explicas el chiste?" con tono tranquilo me ha salvado muchísimo. Se acaba la risa al instante.',
        time: 'Hace 3 días',
      },
    ],
  },
  {
    id: 'st-3',
    author: 'Mateo V.',
    alias: '@mateo_aliado',
    role: 'Diseñador y aliado activo',
    anonymous: false,
    category: 'aliados',
    categoryLabel: 'Aliados activos',
    title: 'Aprender a intervenir en mi grupo de amigos sin buscar aplausos',
    situation:
      'Durante años guardé silencio cuando en chats o reuniones de amigos se compartían fotos sin consentimiento o comentarios denigrantes sobre mujeres. Creía que con "no participar" ya era suficiente.',
    howICoped:
      'Entendí que el silencio también construye entornos inseguros. Empecé usando la estrategia de las 5 D: primero puse un límite directo y sereno en el chat ("Bro, esto no está bien y no quiero este tipo de contenido aquí"), y luego conversé en privado con dos amigos cercanos para explicar por qué afecta la confianza y el respeto.',
    takeaway:
      'Ser aliado no es hablar por las mujeres ni buscar reconocimiento; es asumir la incomodidad de frenar conductas dañinas entre pares.',
    date: 'Hace 5 días',
    readTime: '3 min',
    empathyCount: 64,
    sharesCount: 27,
    tags: ['Aliados', 'Chats seguros', 'Corresponsabilidad'],
    comments: [
      {
        id: 'c-301',
        author: 'Sofía P.',
        text: 'Necesitamos más conversaciones honestas entre amigos como la que cuentas. El cambio empieza en lo cotidiano.',
        time: 'Hace 4 días',
      },
    ],
  },
  {
    id: 'st-4',
    author: 'Elena C.',
    alias: '@elena_c',
    role: 'Creadora de contenido educativo',
    anonymous: false,
    category: 'publico',
    categoryLabel: 'Espacios públicos y digitales',
    title: 'Cómo blindé mi salud mental ante el acoso en redes mientras seguía divulgando',
    situation:
      'Al comenzar a publicar videos sobre ciencia y brecha de género, recibí mensajes hostiles cuestionando mi apariencia en lugar de mis argumentos. Estuve a punto de cerrar mis cuentas.',
    howICoped:
      'Creé un protocolo digital de espacio seguro: activé filtros de palabras clave, delegué la moderación inicial a dos amigas de confianza, guardé capturas de evidencia sin responder desde la rabia y convertí mi comunidad en un círculo con reglas visibles de respeto. También me di pausas semanales sin pantallas.',
    takeaway:
      'Proteger tu paz digital con reglas claras y red de apoyo no es rendirse; es sostener tu voz a largo plazo.',
    date: 'Hace 1 semana',
    readTime: '4 min',
    empathyCount: 91,
    sharesCount: 44,
    tags: ['Seguridad digital', 'Red de apoyo', 'Autocuidado'],
    comments: [
      {
        id: 'c-401',
        author: 'Paula D.',
        text: 'Delegar la moderación y tener reglas visibles hace una diferencia enorme. ¡Gracias por inspirar!',
        time: 'Hace 5 días',
      },
    ],
  },
  {
    id: 'st-5',
    author: 'Anónimo · Girasol',
    alias: '@girasol_libre',
    role: 'Madre y administradora',
    anonymous: true,
    category: 'pareja',
    categoryLabel: 'Vínculos y familia',
    title: 'Redistribuir la carga invisible en casa mediante acuerdos escritos y claros',
    situation:
      'Aunque ambos trabajábamos las mismas horas, yo asumía toda la planificación mental del hogar: citas médicas, compras, tareas escolares y reuniones familiares. Sentía agotamiento constante y resentimiento silencioso.',
    howICoped:
      'En lugar de discutir cuando ya estaba colapsada, propuse una reunión tranquila de domingo con una lista visible de todas las tareas invisibles y visibles. Usamos mensajes en primera persona ("Me siento abrumada cuando...") y dividimos responsabilidades completas de inicio a fin, sin que yo tuviera que "recordar" nada.',
    takeaway:
      'La igualdad en el hogar comienza haciendo visible el trabajo de cuidados y pasando de "ayudar" a corresponsabilizarse.',
    date: 'Hace 1 semana',
    readTime: '5 min',
    empathyCount: 115,
    sharesCount: 53,
    tags: ['Carga mental', 'Corresponsabilidad', 'Acuerdos'],
    comments: [
      {
        id: 'c-501',
        author: 'Daniela R.',
        text: 'Lo de "responsabilidad de inicio a fin" es clave. No es solo hacer el mandado, es notar qué hace falta.',
        time: 'Hace 6 días',
      },
    ],
  },
];

export const BADGES_CATALOG = [
  {
    id: 'badge-reader',
    title: 'Escucha Empática',
    description: 'Lee y conecta con la experiencia de alguien más.',
    requirement: 'Da "Me identifico" a 1 historia',
    points: 20,
    color: 'purple',
  },
  {
    id: 'badge-sharer',
    title: 'Voz que Multiplica',
    description: 'Comparte una historia o cita reflexiva para inspirar a otros.',
    requirement: 'Comparte 1 historia o cita',
    points: 25,
    color: 'amber',
  },
  {
    id: 'badge-storyteller',
    title: 'Historia Valiente',
    description: 'Publica tu propia experiencia o consejo de afrontamiento.',
    requirement: 'Publica 1 historia en la comunidad',
    points: 40,
    color: 'teal',
  },
  {
    id: 'badge-assertive',
    title: 'Comunicación Asertiva',
    description: 'Construye o copia una respuesta usando el modelo DESC.',
    requirement: 'Usa el constructor DESC en Consejos',
    points: 30,
    color: 'indigo',
  },
  {
    id: 'badge-game',
    title: 'Aliado en Acción',
    description: 'Completa una ronda de escenarios interactivos en Dinámicas.',
    requirement: 'Completa 1 dinámica interactiva',
    points: 35,
    color: 'emerald',
  },
  {
    id: 'badge-member',
    title: 'Parte del Espacio Seguro',
    description: 'Inicia sesión para personalizar tu perfil y guardar recursos.',
    requirement: 'Inicia sesión en tu cuenta',
    points: 20,
    color: 'rose',
  },
];

