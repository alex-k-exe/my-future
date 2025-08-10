export type Base64Image = string;
export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export type ProjectId = string;

export interface User {
    uuid: UUID; // PK
    email: string;
    points: number;
    name: string;
    accountType: "citizen" | "government";
    password: string;
    address: string;
    pfp: Base64Image;
    contributedTo: ProjectId[];
}

export interface EquipmentDonation {
    donor: string;  // Business name
    equipment: string;
    estimatedValue: number;
}

export interface Project {
    id: ProjectId; // PK
    name: string;
    description: string;
    category: string;
    dateStarted: string;
    dateCompleted?: string;
    thumbnail: Base64Image;
    progress: number;
    goal: number;
    contact: string;
    citizenContributions: Record<UUID, number>;
    businessDonations: EquipmentDonation[];
}
/*
    id: ProjectId; // PK
    name: string;
    description: string;
    category: string;
    thumbnail: Base64Image;
    progress: number;
    goal: number;
*/
export interface Context {
    user: User | null;
}
