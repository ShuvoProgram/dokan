import { Request, Response } from 'express';
import { ProductService } from './product.service';
import sendResponse from '../../shared/sendResponse';
import { IProduct } from './product.interface';
import httpStatus from 'http-status';
import pick from '../../shared/pick';
import { productFilterableFields } from './product.constant';

const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.createProduct(req.body);
    sendResponse<IProduct>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    sendResponse<null>(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getProductById(req.params.id);
    if (!result) {
      return sendResponse<null>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Product not found',
        data: null,
      });
    }
    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product retrieved successfully!',
      data: result,
    });
  } catch (error: any) {
    sendResponse<null>(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, productFilterableFields)
    const result = await ProductService.getAllProducts(filters);
    sendResponse<IProduct[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products retrieved successfully!',
      data: result,
    });
  } catch (error: any) {
    sendResponse<null>(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.updateProduct(req.params.id, req.body);
    if (!result) {
      return sendResponse<null>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Product not found',
        data: null,
      });
    }
    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error: any) {
    sendResponse<null>(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.deleteProduct(req.params.id);
    if (!result) {
      return sendResponse<null>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Product not found',
        data: null,
      });
    }
    sendResponse<null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    sendResponse<null>(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      data: null,
    });
  }
};


export const ProductController = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct
}