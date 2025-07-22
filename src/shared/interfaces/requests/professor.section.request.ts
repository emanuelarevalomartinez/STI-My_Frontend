

export interface SectionRequestInterface {
    description?: string,
    name: string,
    numberSession: string;
}

export interface SectionAsignateResourcesRequestInterface {
    idSession: number;
    idsResources: number[];
}