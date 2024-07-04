import { Schema, model } from 'mongoose';
import { IProduct, IVariant } from './product.interface';

const VariantSchema = new Schema<IVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
}, { _id: false });


const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { 
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
   },
});

// Create the Mongoose model
const Product = model<IProduct>('Product', ProductSchema);

export default Product;