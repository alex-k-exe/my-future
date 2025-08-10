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
    donor: string; // Business name
    equipment: string;
    estimatedValue: number;
}

export interface Project {
    id: ProjectId; // PK
    name: string;
    description: string;
    category: string;
    dateStarted: Date;
    dateCompleted?: Date;
    thumbnail: Base64Image;
    progress: number;
    goal: number;
    contact: string;
    citizenContributions?: Record<UUID, number>;  // Always there on backend, but not usually passed to frontend
    businessDonations: EquipmentDonation[];
}

export interface Context {
    user: User | null;
    fetchApi: (endpoint: `/${string}`) => Promise<Response>;
    fetchApiPublic: (endpoint: `/${string}`) => Promise<Response>;
    updateUser: (context: Context) => Promise<void>;
}
