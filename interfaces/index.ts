export interface List {
  link: string;
  title: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: null;
  image: string;
  hashedPassword: null;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export interface Reviews {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string;
  user: User;
}

export interface Images {
  color: string;
  colorCode: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  images: Images[];
  reviews: Reviews[];
}

export interface CardProdType {
  id: string;
  name: string;
  category: string;
  brand: string;
  selectedImg: string;
  quantity: number;
  price: number;
  color: string;
}
