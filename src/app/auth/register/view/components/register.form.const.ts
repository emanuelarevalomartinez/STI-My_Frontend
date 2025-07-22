

export enum ROLES {
    STUDENT = "estudiante",
    PRINCIPAL_PROFESSOR = "professor_principal",
    AUXILIAR_PROFESSOR = "professor_auxiliar",
    ADMIN = "admin"
}

export enum FACULTAD {
    // realmente docentes
    CIBERSEGURIDAD = "1", // 1
    INFORMATICA_ORGANIZACIONAL = "2", // 2
    TECOLOGIAS_LIBRES = "3",  // 3
    CIENCIAS_Y_TECOLOGIAS_COMPUTACIONALES = "4", // 4
    TECNOLOGIAS_INTERACTIVAS = "5",  // 5
    TECNOLOGIAS_EDUCATIVAS = "6", // 6

    // CIBERSEGURIDAD = "facultad_de_ciberseguridad", // 1
    // INFORMATICA_ORGANIZACIONAL = "facultad_de_informatica_organizacional", // 2
    // TECOLOGIAS_LIBRES = "facultad_de_tecnologias_libres",  // 3
    // CIENCIAS_Y_TECOLOGIAS_COMPUTACIONALES = "facultad_de_ciencias_y_tecologias_computacionales", // 4
    // TECNOLOGIAS_INTERACTIVAS = "facultad_de_tecologias_interactivas",  // 5
    // TECNOLOGIAS_EDUCATIVAS = "facultad_de_tecnologias_educativas", // 6
}

export enum INITIAL {
    ACADEMIC_YEAR = 0
}

export const DEFAULT = "default"


export const FACULTAD_OPTIONS = [
    { value: FACULTAD.CIBERSEGURIDAD, label: "FCS" },
    { value: FACULTAD.INFORMATICA_ORGANIZACIONAL, label: "FIO" },
    { value: FACULTAD.TECOLOGIAS_LIBRES, label: "FTL" },
    { value: FACULTAD.CIENCIAS_Y_TECOLOGIAS_COMPUTACIONALES, label: "XITED" },
    { value: FACULTAD.TECNOLOGIAS_INTERACTIVAS, label: "FTI" },
    { value: FACULTAD.TECNOLOGIAS_EDUCATIVAS, label: "FTE" },
  ];

  export const FACULTAD_OPTIONS_NUMBERS = [
    { value: FACULTAD.CIBERSEGURIDAD, label: "1" },
    { value: FACULTAD.INFORMATICA_ORGANIZACIONAL, label: "2" },
    { value: FACULTAD.TECOLOGIAS_LIBRES, label: "3" },
    { value: FACULTAD.CIENCIAS_Y_TECOLOGIAS_COMPUTACIONALES, label: "4" },
    { value: FACULTAD.TECNOLOGIAS_INTERACTIVAS, label: "5" },
    { value: FACULTAD.TECNOLOGIAS_EDUCATIVAS, label: "6" },
  ];
  
  export const ROLE_OPTIONS = [
    { value: ROLES.STUDENT, label: "Estudiante" },
    { value: ROLES.PRINCIPAL_PROFESSOR, label: "Profesor principal" },
    { value: ROLES.AUXILIAR_PROFESSOR, label: "Profesor Auxiliar" },
  ];

  export const USER_STATUS = [
    { value: "true", label: "Activo" },
    { value: "false", label: "Inactivo" },
  ];

  export const ACADEMIC_YEAR_OPTIONS = [
    { value: 1, label: "1er Año" },
    { value: 2, label: "2do Año" },
    { value: 3, label: "3er Año" },
    { value: 4, label: "4to Año" },
  ];
  
  export const COURSE_TYPE_OPTIONS = [
    { value: "diurno", label: "Presencial" },
    { value: "por_encuentro", label: "Por encuentro" },
  ];