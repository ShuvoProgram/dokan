import { Request, Response } from 'express';
import { OrderService } from './order.service';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../shared/pick';
import { orderFilterableFields } from './order.constant';
import { IOrder } from './order.interface';

const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.createOrder(req.body);
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Order created successfully!',
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

const getOrderById = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getOrderById(req.params.id);
    if (!result) {
      return sendResponse<null>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Order not found',
        data: null,
      });
    }
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully!',
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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, orderFilterableFields);
    const result = await OrderService.getAllOrders(filters);
    sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders retrieved successfully!',
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

const updateOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.updateOrder(req.params.id, req.body);
    if (!result) {
      return sendResponse<null>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Order not found',
        data: null,
      });
    }
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order updated successfully!',
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

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.deleteOrder(req.params.id);
    if (!result) {
      return sendResponse<null>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Order not found',
        data: null,
      });
    }
    sendResponse<null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order deleted successfully!',
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

export const OrderController = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder
};