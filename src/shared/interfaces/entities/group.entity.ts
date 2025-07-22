

export interface GroupInterface {
    id: number;
    key: string;
    name: string;
}

export interface GroupSpecificInfoInterface {
        id: number;
        username: string;
        fullname: string;
        email: string;
        createAt: string;
        role: string;
        facultad: string;
        active: boolean;
}


export type GroupSpecificInfoToShowInterface = Omit<GroupSpecificInfoInterface, "id" | "createAt" | "role" | "active">;