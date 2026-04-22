import PaymentService from "./payment.service.js";


export default class PaymentController {

  // POST /payments/checkout
  static async checkoutPayment(req, res, next) {
    try {
      const userId = 5; // from auth middleware
      const data = req.body;

      const payment = await PaymentService.checkoutPayment(userId, data);

      return res.status(201).json({
        success: true,
        message: "Payment created successfully",
        data: payment
      });

    } catch (err) {
      next(err);
    }
  }

  // GET /payments/:id
  static async getPaymentById(req, res, next) {
    try {
      const userId = 3;
      const paymentId = req.params.id;

      const payment = await PaymentService.getPaymentById(userId, paymentId);

      return res.status(200).json({
        success: true,
        message: "Payment retrieved successfully",
        data: payment
      });

    } catch (err) {
      next(err);
    }
  }
}