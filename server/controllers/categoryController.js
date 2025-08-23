import categoryModel from "../models/categoryModel.js";
import { generateSlug } from "../utils/slug.js";

export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const existingCategory = await categoryModel.findOne({
      category: category,
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
        success: false,
      });
    }

    const categorySlug = generateSlug(category);
    const newCategory = new categoryModel({
      category,
      slug: categorySlug,
    });

    await newCategory.save();
    return res.status(201).json({
      message: "Category created successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong! Try Again.", success: false });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({ status: true });
    return res.status(200).json({
      message: "Categories fetched successfully",
      success: true,
      categories,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching categories", success: false });
  }
};

export const getLimitedCategories = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  try {
    const total = await categoryModel.countDocuments({ status: true });

    const categories = await categoryModel
      .find({ status: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: categories,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
      success: false,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { category } = req.body;

    if (!category) {
      return res
        .status(400)
        .json({ message: "Category name is required", success: false });
    }

    const existingCategory = await categoryModel.findOne({
      category: category,
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
        success: false,
      });
    }

    const updateCat = await categoryModel.findById(categoryId);

    updateCat.category = category || updateCat.category;
    await updateCat.save();
    return res.status(200).json({
      message: "Category updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong! Try again.", success: false });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const deleteCat = await categoryModel.findById(categoryId);
    deleteCat.status = false;
    await deleteCat.save();
    return res
      .status(200)
      .json({ message: "Category deleted successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong! Try Again.", success: false });
  }
};

export const deleteMultipleCategories = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided for deletion." });
    }

    const result = await categoryModel.updateMany(
      { _id: { $in: ids } },
      { status: false }
    );

    return res.status(200).json({
      message: "Categories deleted successfully",
      result,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Bulk delete failed", success: false });
  }
};
