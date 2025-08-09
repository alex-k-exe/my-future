export type Base64Image = string;
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface User {
    uuid: UUID; // PK
    email: string;
    phoneNumber: string;
    points: number;
    name: string;
    accountType: "citizen" | "business" | "government";
    password: string;
    birthdate: string;
    address: string;
    pfp: Base64Image;
}

export interface EquipmentDonation {
    donor: UUID;
    equipment: string;
    estimatedValue: number;
}

export interface Project {
    id: string; // PK
    name: string;
    description: string;
    dateStarted: string;
    thumbnail: Base64Image;
    progress: number;
    goal: number;
    contact: string;
    businessDonations: EquipmentDonation[];
}

export interface Context {
    user: User | null;
}
