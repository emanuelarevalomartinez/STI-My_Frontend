

export interface RegisterVerifyData {
   name: string;
   firstName: string;
   lastName:string;
   email: string;
   password: string;
   confirmPassword: string;
   role: string;
   facultad: string;
   group: string;
   academicYear: number;
   curseType: string;
   subject: string;
  }

  export interface RegisterRequestInterface {
    fullname: string;
    email: string;
    password: string;
    role: string;
    facultad: string;
  }

  export interface RegisterProfessorRequestInterface extends RegisterRequestInterface {
    subject: string;
  }

  export interface RegisterStudentRequestInterface extends RegisterRequestInterface {
    group: string;
    academicYear: number;
    curseType: string;
  }

