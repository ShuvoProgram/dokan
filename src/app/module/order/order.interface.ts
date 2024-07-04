import { Types } from 'mongoose';
import { IProduct } from '../product/product.interface';

export type IOrder = {
  email: string;
  productId: Types.ObjectId | IProduct;
  price: number;
  quantity: number;
};



export type IOrderFilters = {
  searchTerm?: string
  name?: string
}
