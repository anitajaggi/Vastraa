export const validateProduct = (req, res, next) => {
  const {
    productname,
    category,
    subcategory,
    mrp,
    price,
    stock,
    colors,
    sizes,
  } = req.body;

  const errors = {};

  // Image validation
  if (req.fileValidationError === "LIMIT_FILE_SIZE") {
    errors.images = "Each image must be under 2MB.";
  }

  // Product name
  if (!String(productname || "").trim()) {
    errors.productname = "Product name is required.";
  } else if (String(productname).trim().length < 3) {
    errors.productname = "Product name must be at least 3 characters long.";
  }

  // Category & Subcategory
  if (!String(category || "").trim()) {
    errors.category = "Category is required.";
  }
  if (!String(subcategory || "").trim()) {
    errors.subcategory = "Subcategory is required.";
  }

  // MRP
  const mrpValue = Number(mrp);
  if (mrp === undefined || mrp === null || String(mrp).trim() === "") {
    errors.mrp = "MRP is required.";
  } else if (Number.isNaN(mrpValue) || mrpValue <= 0) {
    errors.mrp = "MRP must be a positive number.";
  }

  // Price
  const priceValue = Number(price);
  if (price === undefined || price === null || String(price).trim() === "") {
    errors.price = "Price is required.";
  } else if (Number.isNaN(priceValue) || priceValue <= 0) {
    errors.price = "Price must be a positive number.";
  } else if (!errors.mrp && priceValue > mrpValue) {
    errors.price = "Price cannot be greater than MRP.";
  }

  // Stock
  const stockValue = Number(stock);
  if (stock === undefined || stock === null || String(stock).trim() === "") {
    errors.stock = "Stock is required.";
  } else if (Number.isNaN(stockValue) || stockValue < 0) {
    errors.stock = "Stock must be a non-negative number.";
  }

  // Colors
  if (Array.isArray(colors)) {
    if (colors.filter((c) => String(c).trim()).length === 0) {
      errors.colors = "At least one color is required.";
    }
  } else if (!String(colors || "").trim()) {
    errors.colors = "At least one color is required.";
  }

  // Sizes
  if (Array.isArray(sizes)) {
    if (sizes.filter((s) => String(s).trim()).length === 0) {
      errors.sizes = "At least one size is required.";
    }
  } else if (!String(sizes || "").trim()) {
    errors.sizes = "At least one size is required.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
