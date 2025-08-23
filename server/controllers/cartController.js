import cartModel from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, size, color, quantity } = req.body;

  try {
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({ userId, items: [] });
    }

    const existing = cart.items.find(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ productId, size, color, quantity });
    }

    await cart.save();
    await cart.populate("items.productId");
    res.json({
      message: "Product added to cart successfully!",
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await cartModel
      .findOne({ userId: req.user._id })
      .populate("items.productId");
    res.json({
      message: "Cart fetched successfully!",
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    let cart = await cartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId.toString()
    );

    await cart.save();

    await cart.populate("items.productId");

    res.json({ message: "Product removed from cart successfully!", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCartQty = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await cartModel.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId.toString()
    );

    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId.toString()
      );
    }

    await cart.save();
    await cart.populate("items.productId");
    res.json({ message: "Cart updated successfully!", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
