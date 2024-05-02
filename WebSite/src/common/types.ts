export interface Plan {
    id: number;
    userId: number;
    name: string;
    description: string | null;
    url: string;
}

export interface Beacon {
    id: number;
    name: string;
    description: string;
    uuid: string,
    major: number,
    minor: number,

    x: number,
    y: number,
    z: string | null
}

export interface Booth {
    id: number;
    name: string;
    externalId : string | null;
}

export interface QrCode {
    id: number;
    name: string;
    description: string;

    url: string;
    imageBase64: string

    x: number,
    y: number,
    z: string | null
}

export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    login: string;
    password: string,
}

export interface User {
    id: number;
    type: number;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    login: string;
    password: string,
}