import CategoryRepository from "./category.repository.js";

export const CategoryService = {
    async getAllCategories() {
        return await CategoryRepository.findAll();
    },

    async getCategoryById(id) {
        const category = await CategoryRepository.findById(id);
        if (!category) throw new Error("Category not found");
        return category;
    },

    async createCategory(data) {
        return await CategoryRepository.create(data);
    },

    async updateCategory(id, data) {
        const category = await CategoryRepository.findById(id);
        if (!category) throw new Error("Category not found");

        return await CategoryRepository.update(id, data);
    },

    async deleteCategory(id) {
        const category = await CategoryRepository.findById(id);
        if (!category) throw new Error("Category not found");

        return await CategoryRepository.delete(id);
    }
};

