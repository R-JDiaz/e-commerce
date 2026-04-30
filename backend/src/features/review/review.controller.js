import OrderReviewService from "./review.service.js";

const service = new OrderReviewService();

export default class OrderReviewController {

  static async createReview(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await service.createReview(userId, req.body);

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getReviewByOrderId(req, res, next) {
    try {
      const userId = req.user.id;
      const { order_id } = req.params;

      const result = await service.getReviewByOrderId(userId, order_id);

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getUserReviews(req, res, next) {
    try {
      const userId = req.user.id;

      const result = await service.getUserReviews(userId);

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async deleteReview(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await service.deleteReview(userId, id);

      res.json({ message: "Review deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}