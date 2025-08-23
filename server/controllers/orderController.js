import cartModel from "../models/cartModel.js";
import orderModel from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;
    const userId = req.user._id;

    const newOrder = new orderModel({
      userId,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    await newOrder.save();
    await cartModel.updateOne(
      { userId: req.user._id },
      { $set: { items: [] } }
    );

    res.json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.user._id })
      .populate("items.productId", "productname price")
      .sort({
        createdAt: -1,
      });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getLimitedOrders = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  try {
    const total = await orderModel.countDocuments();

    const orders = await orderModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "username email")
      .populate("items.productId", "productname price");

    res.status(200).json({
      success: true,
      data: orders,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      success: false,
      error: error.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status!" });
  }
};
