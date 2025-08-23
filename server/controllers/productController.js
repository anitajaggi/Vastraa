import cloudinary from "../middlewares/cloudinary.js";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import subCatModel from "../models/subCatModel.js";
import { generateSlug } from "../utils/slug.js";

export const createProduct = async (req, res) => {
  try {
    const {
      productname,
      category,
      subcategory,
      mrp,
      price,
      stock,
      colors,
      sizes,
      description,
      rating,
    } = req.body;

    const colorsArray = Array.isArray(colors)
      ? colors
      : typeof colors === "string"
      ? colors.split(",").map((c) => c.trim())
      : [];

    const sizesArray = Array.isArray(sizes)
      ? sizes
      : typeof sizes === "string"
      ? sizes.split(",").map((s) => s.trim())
      : [];

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const base64 = file.buffer.toString("base64");
        const dataUri = `data:${file.mimetype};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "vastraaimgs",
        });

        imageUrls.push(result.secure_url);
      }
    }

    const slug = generateSlug(productname, true);
    const newProduct = new productModel({
      productname,
      category,
      subcategory,
      mrp,
      price,
      stock,
      images: imageUrls.length > 0 ? imageUrls : [],
      description,
      rating,
      slug,
      colors: colorsArray,
      sizes: sizesArray,
    });

    await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getLimitedProducts = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  const { categorySlug, subcategorySlug } = req.query;

  let filter = { status: true };

  if (categorySlug) {
    const category = await categoryModel.findOne({ slug: categorySlug });
    if (category) filter.category = category._id;
  }

  if (subcategorySlug) {
    const subcategory = await subCatModel.findOne({
      slug: subcategorySlug,
    });
    if (subcategory) filter.subcategory = subcategory._id;
  }

  try {
    const total = await productModel.countDocuments(filter);

    const products = await productModel
      .find(filter)
      .populate("category", "category slug")
      .populate("subcategory", "subcategory slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      success: false,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { proId } = req.params;

    const {
      productname,
      category,
      subcategory,
      mrp,
      price,
      stock,
      colors,
      sizes,
      description,
      rating,
    } = req.body;

    console.log(req.body);

    const product = await productModel.findById(proId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    // 🛠 Normalize colors and sizes into arrays
    const colorsArray = Array.isArray(colors)
      ? colors
      : typeof colors === "string"
      ? colors.split(",").map((c) => c.trim())
      : product.colors;

    const sizesArray = Array.isArray(sizes)
      ? sizes
      : typeof sizes === "string"
      ? sizes.split(",").map((s) => s.trim())
      : product.sizes;

    // Handle image update if new files are uploaded
    let imageUrls = product.images;

    if (req.files && req.files.length > 0) {
      imageUrls = [];

      for (const file of req.files) {
        const base64 = file.buffer.toString("base64");
        const dataUri = `data:${file.mimetype};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "vastraaimgs",
        });

        imageUrls.push(result.secure_url);
      }
    }

    // Update fields conditionally
    product.productname = productname || product.productname;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.mrp = mrp || product.mrp;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.description = description || product.description;
    product.rating = rating || product.rating;
    product.images = imageUrls;
    product.colors = colorsArray;
    product.sizes = sizesArray;

    if (productname && productname !== product.productname) {
      product.slug = generateSlug(productname);
    }

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { proId } = req.params;
    const delProduct = await productModel.findById(proId);
    delProduct.status = false;
    await delProduct.save();
    res
      .status(200)
      .json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product!", success: false });
  }
};

export const deleteMultipleProducts = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "No IDs provided for deletion.", success: false });
    }

    const result = await productModel.updateMany(
      { _id: { $in: ids } },
      { status: false }
    );
    res.status(200).json({
      message: "Products deleted successfully!",
      success: true,
      result,
    });
  } catch (error) {
    console.error("Bulk Delete Error:", error);
    res.status(500).json({
      message: "Error deleting products",
      success: false,
    });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
