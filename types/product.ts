export interface IProduct {
    name: string;
    description: string;
    richDescription?: string;
    image: string;
    images: string[];
    brand?: string;
    price: number;
    category: string;
    type: string;
    countInStock: number;
    rating?: number;
    numReviews?: number;
    isFeatured?: boolean;
    dateCreated?: Date;
    _id: string;
    id: string;
    quantity: number;
  }