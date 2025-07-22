
export const ELEMENTS_FOR_PAGE: number = 8;

export enum SELECTION {
  ANY = "",
  YES = "yes",
  NOT = "not",
}

export enum LEARN_STYLE {
    ACTIVE = "active",
    REFLEXIVE = "reflexive",
    TEORIC = "teoric",
    PRAGMATIC = "pragmatic",
    
  }
  
export interface QuestionInterface {
    index: number;
    question:string;
    type: LEARN_STYLE;
  }

export const QUESTIONS: QuestionInterface[] = [
    {
      index: 0,
      question: "Tengo fama de decir lo que pienso claramente y sin rodeos.",
      type: LEARN_STYLE.PRAGMATIC,
    },
    {
      index: 1,
      question: "Estoy seguro/a de lo que es bueno y lo que es malo, lo que está bien y lo que está mal.",
      type: LEARN_STYLE.TEORIC,
    },
    {
      index: 2,
      question: "Muchas veces actúo sin mirar las consecuencias.",
      type: LEARN_STYLE.ACTIVE,
    },
    {
      index: 3,
      question: "Normalmente trato de resolver los problemas metódicamente y paso a paso.",
      type: LEARN_STYLE.TEORIC,
    },
    {
      index: 4,
      question: "Creo que los formalismos coartan y limitan la actuación libre de las personas.",
      type: LEARN_STYLE.ACTIVE,
    },
    {
      index: 5,
      question: "Me interesa saber cuáles son los sistemas de valores de los demás y con qué criterios actúan.",
      type: LEARN_STYLE.TEORIC,
    },
    {
      index: 6,
      question: "Pienso que el actuar intuitivamente puede ser siempre tan válido como actuar reflexivamente.",
      type: LEARN_STYLE.ACTIVE,
    },
    {
      index: 7,
      question: "Creo que lo más importante es que las cosas funcionen.",
      type: LEARN_STYLE.PRAGMATIC,
    },
    // {
    //   index: 8,
    //   question: "Procuro estar al tanto de lo que ocurre aquí y ahora.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 9,
    //   question: "Disfruto cuando tengo tiempo para preparar mi trabajo y realizarlo a conciencia.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 10,
    //   question: "Estoy a gusto siguiendo un orden en las comidas, en el estudio, haciendo ejercicio regularmente.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 11,
    //   question: "Cuando escucho una nueva idea enseguida comienzo a pensar cómo ponerla en práctica.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 12,
    //   question: "Prefiero las ideas originales y novedosas aunque no sean prácticas.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 13,
    //   question: "Admito y me ajusto a las normas sólo si me sirven para lograr mis objetivos.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 14,
    //   question: "Normalmente encajo bien con personas reflexivas, y me cuesta sintonizar con personas demasiado espontáneas, imprevisibles.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 15,
    //   question: "Escucho con más frecuencia que hablo.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 16,
    //   question: "Prefiero las cosas estructuradas a las desordenadas.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 17,
    //   question: "Cuando poseo cualquier información, trato de interpretarla bien antes de manifestar alguna conclusión.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 18,
    //   question: "Antes de hacer algo estudio con cuidado sus ventajas e inconvenientes.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 19,
    //   question: "Me entusiasmo con el reto de hacer algo nuevo y diferente.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 20,
    //   question: "Casi siempre procuro ser coherente con mis criterios y sistemas de valores. Tengo principios y los sigo.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 21,
    //   question: "Cuando hay una discusión no me gusta ir con rodeos.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 22,
    //   question: "Me disgusta implicarme afectivamente en el ambiente de la escuela. Prefiero mantener relaciones distantes.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 23,
    //   question: "Me gustan más las personas realistas y concretas que las teóricas.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 24,
    //   question: "Me cuesta ser creativo/a, romper estructuras.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 25,
    //   question: "Me siento a gusto con personas espontáneas y divertidas.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 26,
    //   question: "La mayoría de las veces expreso abiertamente cómo me siento.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 27,
    //   question: "Me gusta analizar y dar vueltas a las cosas.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 28,
    //   question: "Me molesta que la gente no se tome en serio las cosas.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 29,
    //   question: "Me atrae experimentar y practicar las últimas técnicas y novedades.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 30,
    //   question: "Soy cauteloso/a a la hora de sacar conclusiones.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 31,
    //   question: "Prefiero contar con el mayor número de fuentes de información. Cuantos más datos reúna para reflexionar, mejor.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 32,
    //   question: "Tiendo a ser perfeccionista.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 33,
    //   question: "Prefiero oír las opiniones de los demás antes de exponer la mía.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 34,
    //   question: "Me gusta afrontar la vida espontáneamente y no tener que planificar todo previamente.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 35,
    //   question: "En las discusiones me gusta observar cómo actúan los demás participantes.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 36,
    //   question: "Me siento incómodo/a con las personas calladas y demasiado analíticas.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 37,
    //   question: "Juzgo con frecuencia las ideas de los demás por su valor práctico.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 38,
    //   question: "Me agobio si me obligan a acelerar mucho el trabajo para cumplir un plazo.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 39,
    //   question: "En las reuniones apoyo las ideas prácticas y realistas.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 40,
    //   question: "Es mejor gozar del momento presente que deleitarse pensando en el pasado o en el futuro.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 41,
    //   question: "Me molestan las personas que siempre desean apresurar las cosas.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 42,
    //   question: "Aporto ideas nuevas y espontáneas en los grupos de discusión.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 43,
    //   question: "Pienso que son más consistentes las decisiones fundamentadas en un minucioso análisis que las basadas en la intuición.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 44,
    //   question: "Detecto frecuentemente la inconsistencia y puntos débiles en las argumentaciones de los demás.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 45,
    //   question: "Creo que es preciso saltarse las normas muchas más veces que cumplirlas.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 46,
    //   question: "A menudo caigo en la cuenta de otras formas mejores y más prácticas de hacer las cosas.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 47,
    //   question: "En conjunto hablo más que escucho.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 48,
    //   question: "Prefiero distanciarme de los hechos y observarlos desde otras perspectivas.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 49,
    //   question: "Estoy convencido/a que debe imponerse la lógica y el razonamiento.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 50,
    //   question: "Me gusta buscar nuevas experiencias.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 51,
    //   question: "Me gusta experimentar y aplicar las cosas.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 52,
    //   question: "Pienso que debemos llegar pronto al grano, al meollo de los temas.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 53,
    //   question: "Siempre trato de conseguir conclusiones e ideas claras.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 54,
    //   question: "Prefiero discutir cuestiones concretas y no perder el tiempo con pláticas superficiales.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 55,
    //   question: "Me impaciento cuando me dan explicaciones irrelevantes e incoherentes.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 56,
    //   question: "Compruebo antes si las cosas funcionan realmente.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 57,
    //   question: "Hago varios borradores antes de la redacción definitiva de un trabajo.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 58,
    //   question: "Soy consciente de que en las discusiones ayudo a mantener a los demás centrados en el tema, evitando divagaciones.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 59,
    //   question: "Observo que, con frecuencia, soy uno/a de los/as más objetivos/as y desapasionados/as en las discusiones.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 60,
    //   question: "Cuando algo va mal, le quito importancia y trato de hacerlo mejor.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 61,
    //   question: "Rechazo ideas originales y espontáneas si no las veo prácticas.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 62,
    //   question: "Me gusta sopesar diversas alternativas antes de tomar una decisión.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 63,
    //   question: "Con frecuencia miro hacia delante para prever el futuro.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 64,
    //   question: "En los debates y discusiones prefiero desempeñar un papel secundario antes que ser el/la líder o el/la que más participa.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 65,
    //   question: "Me molestan las personas que no actúan con lógica.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 66,
    //   question: "Me resulta incómodo tener que planificar y prever las cosas.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 67,
    //   question: "Creo que el fin justifica los medios en muchos casos.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 68,
    //   question: "Suelo reflexionar sobre los asuntos y problemas.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 69,
    //   question: "El trabajar a conciencia me llena de satisfacción y orgullo.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 70,
    //   question: "Ante los acontecimientos trato de descubrir los principios y teorías en que se basan.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 71,
    //   question: "Con tal de conseguir el objetivo que pretendo soy capaz de herir sentimientos ajenos.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 72,
    //   question: "No me importa hacer todo lo necesario para que sea efectivo mi trabajo.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 73,
    //   question: "Con frecuencia soy una de las personas que más anima las fiestas.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 74,
    //   question: "Me aburro enseguida con el trabajo metódico y minucioso.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 75,
    //   question: "La gente con frecuencia cree que soy poco sensible a sus sentimientos.",
    //   type: LEARN_STYLE.PRAGMATIC,
    // },
    // {
    //   index: 76,
    //   question: "Suelo dejarme llevar por mis intuiciones.",
    //   type: LEARN_STYLE.ACTIVE,
    // },
    // {
    //   index: 77,
    //   question: "Si trabajo en grupo procuro que se siga un método y un orden.",
    //   type: LEARN_STYLE.TEORIC,
    // },
    // {
    //   index: 78,
    //   question: "Con frecuencia me interesa averiguar lo que piensa la gente.",
    //   type: LEARN_STYLE.REFLEXIVE,
    // },
    // {
    //   index: 79,
    //   question: "Esquivo los temas subjetivos, ambiguos y poco claros.",
    //   type: LEARN_STYLE.TEORIC,
    // },
  ];
