

export interface SectionInterface {
    id: number,
    description?: string,
    name: string,
    numberSession: string;
}

export interface SectionTransformInterface {
    value: string;
    label: string;
  }

  export interface ResourcesToAsignateASectionInterface{
    description?: string;
    id: number;
    session: SectionInterface;
    type: string;
  }