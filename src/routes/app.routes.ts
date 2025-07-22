

export enum APP_ROUTES {
    HOME = "/",
    LOGIN= "/login",
    REGISTER = "/register",
    INFO_VIEW = "/info",
    STUDENT_VIEW = "/home/student",
    ADMIN_VIEW = "/home/admin",
    PROFESOR_VIEW = "/home/profesor",
    NOT_FOUND_PAGE = "*",
    NOT_AUTORIZED_PAGE = "/not_autorized",
}

export enum STUDENT_ROUTES {
    HOME = "/home/student",
    ENABLE_SUBJECTS = "/home/student/enabledSubjects",
    CURRENT_SUBJECT = "/home/student/subject/",

}

export enum ADMIN_ROUTES {
    HOME = "/home/admin",
    USERS = "/home/admin/users",
    SIGNATURES = "/home/admin/signatures",

}

export enum PROFESSOR_ROUTES {
    HOME = "/home/professor",
    SECTIONS = "/home/professor/sections",
    GROUPS = "/home/professor/groups",
    RESOURCES = "/home/professor/resources",
    SPECIFIC_GROUP_INFO = "/home/professor/group/",
}

