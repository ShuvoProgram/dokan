import { IOrder, IOrderFilters } from "./order.interface";
import Order from "./order.model";
import Product from "../product/product.model";

const createOrder = async (orderData: IOrder) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const product = await Product.findOne({ _id: orderData.productId }).session(session);
    if (!product) {
      throw new Error('product not found !');
    }

    if (product.inventory.quantity < orderData.quantity) {
      throw new Error('Insufficient stock');
    }

    product.inventory.quantity -= orderData.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    await product.save({ session });

    const order = await Order.create([orderData], { session });

    await session.commitTransaction();
    session.endSession();
    return order[0];
  } catch (error: any) {
     await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getOrderById = async (orderId: string) => {
  return await Order.findById(orderId);
};

const getAllOrders = async (filters: IOrderFilters) => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: ['email', 'productId', 'price', 'quantity'].map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Order.find(whereConditions);

  return result;
};

const updateOrder = async (orderId: string, updateData: Partial<IOrder>) => {
  return await Order.findByIdAndUpdate(orderId, updateData, { new: true });
};

const deleteOrder = async (orderId: string) => {
  return await Order.findByIdAndDelete(orderId);
};

export const OrderService = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
};