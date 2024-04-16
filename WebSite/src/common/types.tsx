export interface Plan {
    id: number;
    name: string;
    description: string | undefined | null;
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
    z: string | undefined
}