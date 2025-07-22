import { NotificationType } from "./notification.consts";


export const normalRegexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
export const extremRegexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
export const normalRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


export const FIDEL_SIGNATURE = "/svgs/fidelSignature.svg";

export const IMAGE_ALWAYS_CONNECTED = "/images/home/uci_20_siempre_conectados.png";

export const IMAGES_BASE_URL = "/images/home/";


export const IMAGES = [
  { src: "transformacion_digital.png", alt: "Transformación Digital" },
  { src: "futuro.png", alt: "Futuro" },
  { src: "revolucion.png", alt: "Revolución" },
  { src: "juventud.png", alt: "Juventud" },
  { src: "innovacion.png", alt: "Innovación" },
  { src: "legado.png", alt: "Legado" },
  { src: "desarrollo_sostenible.png", alt: "Desarrollo Sostenible" },
];

export const CAROUSEL_IMAGES = [
  { src: `${IMAGES_BASE_URL}/carousel/20230525_093133_1.jpg`, alt: "Estatua Mella frente a la plaza" },
  { src: `${IMAGES_BASE_URL}/carousel/portada_fidel_2.jpeg`, alt: "Cartel Frase con frase de Fidel" },
  { src: `${IMAGES_BASE_URL}/carousel/siempre_conectados.jpg`, alt: "Siempre conectados 20 aniversario" },
]

export const NOT_FOUND_DATA_IMAGE = "/images/not_found/not_found_data.png";

export const NOT_FOUND_PAGE_IMAGE = "/images/not_found/not_found_page.png";

export const NOT_AUTORIZED_IMAGE = "/images/not_found/not_autorized.png";

export const LOADING_IMAGE = "/images/loading/egg_thinking.png";

export const INIT_COURSE_IMAGE = "/images/loading/init_course.png";

export const INIT_WALK_1_IMAGE = "/images/loading/init_walk_1.png";

export const INIT_WALK_2_IMAGE = "/images/loading/init_walk_2.png";

export const INIT_WALK_3_IMAGE = "/images/loading/init_walk_3.png";

export const CHAT_WELCOME_IMAGE = "/images/chatbot/egg_welcome.png";

export const CHAT_THINKING_IMAGE_GIF = "/gifts/egg_thinking.gif";

export const CHAT_ANSWER_IMAGE = "/images/chatbot/egg_answer.png";


export const USERS_COLUMNS_MAPPING = {
    // id: "ID",
    username: "Nombre de Usuario",
    fullname: "Nombre Completo",
    email: "Correo",
    createAt: "Fecha de Creación",
    role: "Rol",
    facultad: "Facultad",
    active: "Estado"
  };

  export const GROUP_STUDENTS_COLUMNS_MAPPING = {
    username: "Nombre de Usuario",
    fullname: "Nombre Completo",
    email: "Correo",
    facultad: "Facultad",
  };
  
  export const USERS_COLUMNS_KEYS = Object.keys(USERS_COLUMNS_MAPPING) as Array<keyof typeof USERS_COLUMNS_MAPPING>;


  export interface NotificationInterface {
    isVisible: boolean;
    setIsVisible: (e: boolean) => void;
    typeNotification: NotificationType;
    message: string;
    duration?: number;
  }

  export const RESOURCE_TYPE_BY_LEARNING_STYLE = {
    ACTIVE: "active",
    PRAGMATIC: "pragmatic",
    REFLEXIVE: "reflexive", 
    THEORICAL: "theoretical",
  }
