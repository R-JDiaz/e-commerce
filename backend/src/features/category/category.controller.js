import { asyncHandler } from "../../common/utilities/handler.js";
import { CategoryService } from "./category.service.js";

export const CategoryController = {
    getAll: asyncHandler(async (req, res) => {
        const categories = await CategoryService.getAllCategories();
        res.json(categories);
    }),

    getById: asyncHandler(async (req, res) => {
        const category = await CategoryService.getCategoryById(req.params.id);
        res.json(category);
    }),

    create: asyncHandler(async (req, res) => {
        const category = await CategoryService.createCategory(req.body);
        res.status(201).json(category);
    }),

    update: asyncHandler(async (req, res) => {
        const category = await CategoryService.updateCategory(
            req.params.id,
            req.body
        );
        res.json(category);
    }),

    delete: asyncHandler(async (req, res) => {
        await CategoryService.deleteCategory(req.params.id);
        res.json({ message: "Category deleted" });
    })
};
