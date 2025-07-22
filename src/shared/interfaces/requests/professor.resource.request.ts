
export interface ResourceRequestInterface {
    typeResource: string;
    file: File;
    description?: string;
    sessionId?: number;
}

export type ResourceRequestInterfaceUpdate = Omit<ResourceRequestInterface, "file">;