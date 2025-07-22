

export interface CurrentSubjectResponse {
    id: number;
    url: string;
    type: 'reflexive' | 'theoretical' | 'pragmatic';
    description: string | null;
}

export interface ArrayCurrentSubjectResponse {
    [key: string]: CurrentSubjectResponse[];
}

export interface ArrayCurrentSubjectWithExpandedResponse {
    expandedElement: boolean;
    section: {
        [key: string]: CurrentSubjectResponse[];
    };
}