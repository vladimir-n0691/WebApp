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
    userRole: number;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    login: string;
    password: string,
}