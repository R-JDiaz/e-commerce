import AppError from "../../common/utilities/error.js";
import { withTransaction } from "../../common/utilities/handler.js";

import OrderRepository from "../order/order.repository.js";
import OrderReviewRepository from "./review.repository.js";

export default class OrderReviewService {

  // -------------------------
  // CREATE REVIEW
  // -------------------------
  async createReview(userId, data) {
    const { order_id, rating, comment } = data;

    return await withTransaction(OrderReviewRepository.pool, async (conn) => {

      // 1. check order exists
      const order = await OrderRepository.findById(order_id);

      if (!order) {
        throw new AppError("Order not found", 404);
      }

      // 2. ownership check
      if (order.user_id !== userId) {
        throw new AppError("Unauthorized to review this order", 403);
      }

      // 3. business rule (optional but recommended)
      if (order.status !== "completed") {
        throw new AppError("You can only review completed orders", 400);
      }

      // 4. prevent duplicate review
      const exists = await OrderReviewRepository.findByOrderId(order_id);

      if (exists) {
        throw new AppError("Review already exists for this order", 409);
      }

      // 5. create review
      const result = await OrderReviewRepository.create({
        order_id,
        user_id: userId,
        rating,
        comment,
      }, conn);

      if (!result || result.affectedRows === 0) {
        throw new AppError("Failed to create review", 500);
      }

      return {
        id: result.insertId,
        order_id,
        user_id: userId,
        rating,
        comment,
      };
    });
  }

  // -------------------------
  // GET REVIEW BY ORDER ID
  // -------------------------
  async getReviewByOrderId(userId, orderId) {
    const review = await OrderReviewRepository.findByOrderId(orderId);

    if (!review) {
      throw new AppError("Review not found", 404);
    }

    if (review.user_id !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    return review;
  }

  // -------------------------
  // GET USER REVIEWS
  // -------------------------
  async getUserReviews(userId) {
    const reviews = await OrderReviewRepository.findByUserId(userId);

    if (!reviews || reviews.length === 0) {
      throw new AppError("No reviews found", 404);
    }

    return reviews;
  }

  // -------------------------
  // DELETE REVIEW
  // -------------------------
  async deleteReview(userId, reviewId) {
    const review = await OrderReviewRepository.findById(reviewId);

    if (!review) {
      throw new AppError("Review not found", 404);
    }

    if (review.user_id !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    const result = await OrderReviewRepository.delete(reviewId);

    if (!result) {
      throw new AppError("Failed to delete review", 500);
    }

    return true;
  }

  // -------------------------
  // GET TOP REVIEWS
  // -------------------------
  async getTopReviews(limit = 10) {
    const reviews = await OrderReviewRepository.findTopHighRating(limit);

    if (!reviews || reviews.length === 0) {
      throw new AppError("No reviews found", 404);
    }

    return reviews;
  }
}