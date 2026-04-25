import { asyncHandler } from "../../common/utilities/handler.js";
import PaymentService from "./payment.service.js";

export default class PaymentController {
  static checkoutPayment = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    const payment = await PaymentService.checkoutPayment(userId, data);

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment
    });
  });

  static getPaymentById = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const paymentId = req.params.id;

    const payment = await PaymentService.getPaymentById(userId, paymentId);

    return res.status(200).json({
      success: true,
      message: "Payment retrieved successfully",
      data: payment
    });
  });
}
