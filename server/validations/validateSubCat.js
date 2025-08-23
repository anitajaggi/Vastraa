export const validateSubCat = (req, res, next) => {
  const { subcategory, categoryId } = req.body;
  const errors = {};
  const trimmedSubCategory = subcategory?.trim();

  if (!trimmedSubCategory) {
    errors.subcategory = "Subcategory name is required";
  }
  if (!categoryId) {
    errors.categoryId = "Category is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
