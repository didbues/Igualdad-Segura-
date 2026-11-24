export const ASSERTIVE_FRAMEWORKS = [
  {
    id: 'desc',
    badge: 'Estructura Verbal',
    title: 'Modelo DESC para Límites Asertivos',
    subtitle: 'Una secuencia clara de 4 pasos para expresar desacuerdos sin atacar ni callar.',
    color: 'purple',
    steps: [
      {
        letter: 'D',
        name: 'Describir los hechos',
        detail: 'Narra lo ocurrido de forma objetiva, sin etiquetas ni juicios personales.',
        example: '"En las últimas dos reuniones, mi propuesta fue interrumpida antes de terminar..."',
      },
      {
        letter: 'E',
        name: 'Expresar el impacto',
        detail: 'Habla en primera persona sobre cómo te afecta o qué dificulta en el trabajo.',
        example: '"...esto me hace sentir desvalorizada y frena el aporte técnico al proyecto."',
      },
      {
        letter: 'S',
        name: 'Sugerir una alternativa',
        detail: 'Propón un cambio concreto, viable y observable para el futuro cercano.',
        example: '"Necesito que respetemos los turnos de palabra hasta concluir cada punto."',
      },
      {
        letter: 'C',
        name: 'Consecuencias positivas',
        detail: 'Muestra el beneficio compartido de cumplir el acuerdo (o el siguiente paso si persiste).',
        example: '"Así aprovecharemos mejor el tiempo y todas las ideas quedarán registradas."',
      },
    ],
  },
  {
    id: '5d',
    badge: 'Intervención de Aliados',
    title: 'Las 5 D del Espectador Seguro',
    subtitle: 'Cómo actuar ante situaciones de acoso o exclusión sin escalar el peligro.',
    color: 'teal',
    steps: [
      {
        letter: '1',
        name: 'Distraer',
        detail: 'Corta la situación de forma sutil cambiando el foco o simulando pedir ayuda.',
        example: '"Disculpa, ¿me ayudas un segundo con este archivo / esta dirección?"',
      },
      {
        letter: '2',
        name: 'Delegar',
        detail: 'Busca apoyo de una persona con autoridad, moderación o seguridad del espacio.',
        example: 'Avisar a coordinación, docente, RR. HH. o personal capacitado del lugar.',
      },
      {
        letter: '3',
        name: 'Documentar',
        detail: 'Registra fechas, capturas o hechos relevantes y entrega el material solo a la persona afectada.',
        example: 'Guardar capturas de mensajes con fecha visible sin difundirlas públicamente.',
      },
      {
        letter: '4',
        name: 'Dirigirse',
        detail: 'Pon un límite firme y breve si es seguro hacerlo, enfocándote en la conducta.',
        example: '"Ese comentario no es respetuoso, dejemos eso hasta aquí."',
      },
      {
        letter: '5',
        name: 'Dialogar después',
        detail: 'Acércate luego a quien vivió la situación para validar su experiencia y ofrecer compañía.',
        example: '"Vi lo que pasó y no estuvo bien. ¿Cómo te sientes? Estoy aquí si necesitas apoyo."',
      },
    ],
  },
  {
    id: 'safe-space',
    badge: 'Arquitectura Comunitaria',
    title: '4 Pilares de un Espacio Seguro Real',
    subtitle: 'Estructuras organizativas necesarias en escuelas, oficinas y comunidades digitales.',
    color: 'amber',
    steps: [
      {
        letter: 'P1',
        name: 'Acuerdos visibles y previos',
        detail: 'Normas claras sobre trato digno, privacidad, consentimiento y moderación.',
        example: 'Código de convivencia firmado y accesible desde el primer día.',
      },
      {
        letter: 'P2',
        name: 'Escucha sin revictimización',
        detail: 'Recibir reportes sin cuestionar vestimenta, tono o por qué no reaccionó antes.',
        example: 'Protocolo de primera acogida con preguntas empáticas y confidenciales.',
      },
      {
        letter: 'P3',
        name: 'Corresponsabilidad activa',
        detail: 'La seguridad no recae solo en quien se protege, sino en todo el grupo.',
        example: 'Equipos mixtos capacitados en prevención e intervención temprana.',
      },
      {
        letter: 'P4',
        name: 'Rutas claras de acción',
        detail: 'Canales anónimos, tiempos de respuesta definidos y seguimiento real.',
        example: 'Buzón seguro con plazos de atención de 24 a 72 horas y acompañamiento.',
      },
    ],
  },
];

export const ASSERTIVE_TEMPLATES = [
  {
    id: 'tpl-1',
    context: 'Interrupciones constantes en reuniones',
    phrase:
      '«Permíteme terminar mi idea antes de pasar al siguiente punto; en un minuto concluyo y escuchamos tu perspectiva.»',
  },
  {
    id: 'tpl-2',
    context: 'Chistes o comentarios sexistas',
    phrase:
      '«No comparto ese tipo de humor y me incomoda en este espacio. Volvamos al tema que estamos trabajando.»',
  },
  {
    id: 'tpl-3',
    context: 'Invasión de límites personales o digitales',
    phrase:
      '«Prefiero mantener nuestra comunicación únicamente en canales laborales y sobre temas del proyecto. Gracias por respetar este límite.»',
  },
  {
    id: 'tpl-4',
    context: 'Cómo intervenir como aliado/a',
    phrase:
      '«Me gustaría retomar lo que acaba de proponer [Nombre], porque creo que dio en el punto clave antes de que cambiáramos de tema.»',
  },
];

export const DYNAMIC_SCENARIOS = [
  {
    id: 'sc-1',
    tag: 'Entorno laboral',
    question:
      'En una reunión virtual, un compañero interrumpe por tercera vez a Laura y repite la solución que ella propuso hace dos minutos. ¿Cuál es la respuesta más asertiva y constructiva?',
    options: [
      {
        id: 'a',
        text: 'Quedarte en silencio para no generar tensión y luego comentarlo por chat privado.',
        isBest: false,
        feedback:
          'Aunque validar en privado ayuda después, el silencio en vivo deja el mérito desbalanceado y normaliza la interrupción.',
      },
      {
        id: 'b',
        text: 'Intervenir con calma: "Gracias por retomarlo, Carlos; justo como Laura explicó hace un momento, esa ruta tiene mucho sentido. Laura, ¿quieres añadir algo más?"',
        isBest: true,
        feedback:
          '¡Excelente! Aplicas amplificación asertiva: devuelves el crédito sin agresividad y abres de nuevo el espacio para Laura.',
      },
      {
        id: 'c',
        text: 'Reprocharle en tono sarcástico delante de todo el equipo para que sienta vergüenza.',
        isBest: false,
        feedback:
          'El sarcasmo suele poner a la defensiva y desvía la conversación del respeto hacia una pelea de egos.',
      },
    ],
  },
  {
    id: 'sc-2',
    tag: 'Espacio académico',
    question:
      'Alguien en tu grupo de estudio hace una "broma" sobre que ciertas carreras no son para mujeres. Todos se quedan incómodos. ¿Qué estrategia funciona mejor?',
    options: [
      {
        id: 'a',
        text: 'Reír incómodamente para encajar y cambiar de tema rápido.',
        isBest: false,
        feedback:
          'La risa por compromiso suele interpretarse como aprobación y hace que el ambiente siga siendo inseguro.',
      },
      {
        id: 'b',
        text: 'Mantener gesto sereno y preguntar: "¿Podrías explicar por qué te parece gracioso ese comentario?" o decir "Aquí todas y todos aportamos por igual, sigamos con la guía."',
        isBest: true,
        feedback:
          '¡Muy asertivo! Desarmas la agresión sutil sin perder la compostura y estableces una norma clara de respeto.',
      },
      {
        id: 'c',
        text: 'Abandonar el grupo de estudio inmediatamente sin decir por qué.',
        isBest: false,
        feedback:
          'Alejarse puede ser válido si no te sientes segura, pero si el entorno permite poner un límite breve, visibilizar la norma protege también al grupo.',
      },
    ],
  },
  {
    id: 'sc-3',
    tag: 'Espacios digitales',
    question:
      'En un grupo de mensajería reenvían una foto privada de una conocida haciendo burla de su apariencia. ¿Cómo actúas usando las 5 D?',
    options: [
      {
        id: 'a',
        text: 'No escribir nada, solo salirte del grupo en silencio.',
        isBest: false,
        feedback:
          'Salirte te protege, pero no frena la difusión ni apoya a la persona afectada si el grupo continúa haciéndolo.',
      },
      {
        id: 'b',
        text: 'Decir directamente: "Compartir fotos sin consentimiento no es gracioso ni está bien, borren esto por favor", avisar a moderación y apoyar a la persona si corresponde.',
        isBest: true,
        feedback:
          '¡Correcto! Combinas Dirigirse + Delegar + Dialogar, frenando la violencia digital en el acto.',
      },
      {
        id: 'c',
        text: 'Reenviar la captura a otro grupo para criticar a quienes la enviaron.',
        isBest: false,
        feedback:
          'Reenviar la imagen multiplica la exposición de la persona afectada y vulnera aún más su privacidad.',
      },
    ],
  },
  {
    id: 'sc-4',
    tag: 'Vínculos y corresponsabilidad',
    question:
      'Sientes que llevas toda la carga organizativa de un proyecto compartido y estás agotada. ¿Cómo planteas el límite usando el modelo DESC?',
    options: [
      {
        id: 'a',
        text: '"Nunca haces nada, siempre me toca resolver todo sola porque eres irresponsable."',
        isBest: false,
        feedback:
          'Los absolutos ("nunca", "siempre") y las etiquetas personales cierran el diálogo y no siguen la estructura DESC.',
      },
      {
        id: 'b',
        text: '"Esta semana asumí la coordinación, el calendario y las entregas, y me siento saturada. Necesito que te encargues por completo de las entregas del viernes para equilibrar el equipo."',
        isBest: true,
        feedback:
          '¡Perfecto! Describe hechos concretos, expresa cómo te afecta, sugiere un reparto específico y busca equilibrio.',
      },
      {
        id: 'c',
        text: 'Seguir haciéndolo todo en silencio esperando que la otra persona lo note por sí sola.',
        isBest: false,
        feedback:
          'Esperar que otros adivinen nuestras necesidades suele acumular resentimiento y desgaste emocional.',
      },
    ],
  },
];

export const MYTH_VS_REALITY = [
  {
    id: 'mr-1',
    myth: '"Los espacios seguros buscan censurar o evitar todo debate."',
    reality:
      'Falso. Un espacio seguro fomenta el debate de ideas con respeto; lo que excluye es el acoso, la humillación y la discriminación.',
  },
  {
    id: 'mr-2',
    myth: '"La igualdad de género es un tema exclusivo de mujeres."',
    reality:
      'Falso. La igualdad beneficia a toda la sociedad y requiere corresponsabilidad activa de hombres, mujeres y comunidades.',
  },
  {
    id: 'mr-3',
    myth: '"Si alguien no dijo nada en el momento, es porque no le molestó."',
    reality:
      'Falso. Muchas personas se congelan o callan por miedo a represalias o por proteger su seguridad inmediata. Validar después sigue siendo valioso.',
  },
  {
    id: 'mr-4',
    myth: '"Ser asertivo significa imponerse o ganar una discusión."',
    reality:
      'Falso. La asertividad equilibra firmeza y respeto: defiende tus derechos y límites sin vulnerar la dignidad de nadie.',
  },
];

