import { IProduct } from "./product";

export interface IOrder {
    orderItems: string;
    name: string;
    shippingAddress: string;
    city: string;
    zip: string;
    phone: string;
    status: string;
    userEmail: string;
    document: string;
    email: string;
    paymentMPStatus?: string;
    paymentMPStatus_detail?: string;
    MPPreferenceId?: string;
    MPbutton?: boolean;
    paymentStatus?: string;
    trackingCode?: string;
    dateOrdered?: Date;
    _id: string;
}

export interface IOrderWithItemsList {
    orderItems: {
        cart: IProduct[],
        subtotal: number,
        total:number,
        shippingCost: number,
    }
    name: string;
    shippingAddress: string;
    city: string;
    zip: string;
    phone: string;
    status: string;
    userEmail: string;
    document: string;
    email: string;
    paymentMPStatus?: string;
    paymentMPStatus_detail?: string;
    MPPreferenceId?: string;
    MPbutton?: boolean;
    paymentStatus?: string;
    trackingCode?: string;
    dateOrdered?: Date;
    _id: string;
}