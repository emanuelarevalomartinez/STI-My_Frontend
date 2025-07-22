
export interface LearnStyles {
    pragmatic: number;
    teoric: number;
    active: number;
    reflexive: number;
  }

  export interface SubjectInterface {
    subjectName: string;
    image: string | null;
    id: number;
  }

export interface UsersDataCount {
  admin: number;
  professor: number;
  student: number;
  total: number;
}

  export interface HandleActions<T> {
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
    onCancel: () => void;
  }

  export interface HandleActionsGroup<T> {
    onView: (item: T) => void;
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
  }

  export interface HandleActionsSection<T> {
    onAsignResource: (item: T) => void;
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
  }

  export interface HandleActionsResource<T> {
    onDownload: (item: T)=> void;
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
  }

  export interface HandleActionsStudentSubjects<T> {
    onAccess: (item: T)=> void;
  }

  export interface HandleActionsConfirm<T> {
    onConfirm: (item: T) => void;
    onCancel: () => void;
  }

  export interface HandleActionsTable<T> extends HandleActions<T> {
    onFastAction: (item: T) => void;
    onViewChart: (item: T) => void;
  }

  export interface PaginationInterface {
    page: number;
    limit: number;
    total: number,
    totalPages: number;
}