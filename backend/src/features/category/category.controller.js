import { CategoryService } from "./category.service.js";

export const CategoryController = {
    async getAll(req, res, next) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.json(categories);
        } catch (err) {
            next(err);
        }
    },

    async getById(req, res, next) {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            res.json(category);
        } catch (err) {
            next(err);
        }
    },

    async create(req, res, next) {
        try {
            const category = await CategoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const category = await CategoryService.updateCategory(
                req.params.id,
                req.body
            );
            res.json(category);
        } catch (err) {
            next(err);
        }
    },

    async delete(req, res, next) {
        try {
            await CategoryService.deleteCategory(req.params.id);
            res.json({ message: "Category deleted" });
        } catch (err) {
            next(err);
        }
    }
};