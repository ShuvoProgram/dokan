import { productSearchableFields } from "./product.constant";
import { IProduct, IProductFilters } from "./product.interface";
import Product from "./product.model";

const createProduct = async (productData: IProduct) => {
  const product = await Product.create(productData);
  return product;
};

const getProductById = async (productId: string) => {
  return await Product.findById(productId);
};

const getAllProducts = async (filters: IProductFilters) => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  };

   if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  };

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Product.find(whereConditions);

  return result;

  // const total = await Product.countDocuments(whereConditions);
};

const updateProduct = async (productId: string, updateData: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(productId, updateData, { new: true });
};

const deleteProduct = async (productId: string) => {
  return await Product.findByIdAndDelete(productId);
};

export const ProductService = {
createProduct,
getProductById,
getAllProducts,
updateProduct,
deleteProduct
};
