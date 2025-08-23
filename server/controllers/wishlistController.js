import wishlistModel from "../models/wishlistModel.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    console.log("Adding to wishlist:", { userId, productId });

    let wishlist = await wishlistModel.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new wishlistModel({ user: userId, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();

    wishlist = await wishlistModel
      .findOne({ user: userId })
      .populate("products");

    res.json({ success: true, message: "Product added to wishlist", wishlist });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlist = await wishlistModel
      .findOneAndUpdate(
        { user: userId },
        { $pull: { products: productId } },
        { new: true }
      )
      .populate("products");

    res.json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove product from wishlist",
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await wishlistModel
      .findOne({ user: userId })
      .populate("products");

    res.json({ success: true, wishlist });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve wishlist" });
  }
};
