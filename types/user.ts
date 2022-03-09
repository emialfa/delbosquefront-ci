export interface IUser {
    name: string;
    email: string;
    passwordHash?: string;
    phone?: string;
    document?: string;
    isAdmin?: boolean;
    street?: string;
    apartment?: string;
    zip?: string;
    city?: string;
    country?: string;
    cart?: string;
    shippingAdress?: string;
    activation?: boolean;
    favorites: string[];
}

export interface IUserWithShippingAddressObject {
    name: string;
    email: string;
    passwordHash?: string;
    phone?: string;
    document?: string;
    isAdmin?: boolean;
    street?: string;
    apartment?: string;
    zip?: string;
    city?: string;
    country?: string;
    cart?: string;
    shippingAdress?: {
        name: string;
        email: string;
        phone?: string;
        document?: string;
        zip?: string;
        city?: string;
        street?: string;
    };
    activation?: boolean;
    favorites: string[];
}