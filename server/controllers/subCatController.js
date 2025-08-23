import subCatModel from "../models/subCatModel.js";
import { generateSlug } from "../utils/slug.js";

export const createSubCategory = async (req, res) => {
  try {
    const { subcategory, categoryId } = req.body;
    const existing = await subCatModel.findOne({
      subcategory: subcategory,
    });

    if (existing) {
      return res.status(400).json({
        message: "Subcategory already exists",
        success: false,
      });
    }

    const subcategorySlug = generateSlug(subcategory);
    const newSubCategory = new subCatModel({
      subcategory,
      categoryId,
      slug: subcategorySlug,
    });
    await newSubCategory.save();
    return res.status(201).json({
      message: "Subcategory created successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong! Try Again.", success: false });
  }
};

export const getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await subCatModel
      .find({ status: true })
      .populate("categoryId", "category");

    return res.status(200).json({
      message: "Subcategories fetched successfully",
      success: true,
      subcategories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching subcategories",
      success: false,
    });
  }
};

export const getLimitedSubCategories = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  try {
    const total = await subCatModel.countDocuments({ status: true });

    const subcategories = await subCatModel
      .find({ status: true })
      .populate("categoryId", "category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: subcategories,
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

export const updateSubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const { subcategory, categoryId } = req.body;

    const existing = await subCatModel.findOne({
      subcategory: subcategory,
    });

    if (existing) {
      return res.status(400).json({
        message: "Subcategory already exists",
        success: false,
      });
    }

    const updateSubCat = await subCatModel.findById(subCategoryId);
    if (!updateSubCat) {
      return res
        .status(404)
        .json({ message: "Subcategory not found", success: false });
    }

    updateSubCat.subcategory = subcategory || updateSubCat.subcategory;
    updateSubCat.categoryId = categoryId || updateSubCat.categoryId;

    await updateSubCat.save();

    return res.status(200).json({
      message: "Subcategory updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    return res.status(500).json({
      message: "Something went wrong! Try again.",
      success: false,
    });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    const subCat = await subCatModel.findById(subCategoryId);

    subCat.status = false;
    await subCat.save();

    return res.status(200).json({
      message: "Subcategory deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong! Try again.",
      success: false,
    });
  }
};

export const deleteMultipleSubCategories = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: "No subcategory IDs provided for deletion.",
        success: false,
      });
    }

    const result = await subCatModel.updateMany(
      { _id: { $in: ids } },
      { status: false }
    );

    return res.status(200).json({
      message: "Subcategories deleted successfully",
      result,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Bulk subcategory delete failed",
      success: false,
    });
  }
};
