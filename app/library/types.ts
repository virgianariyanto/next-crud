export type User = {
    id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
};

export type ActionState = {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        address?: string[];
        phone?: string[];
    };
};