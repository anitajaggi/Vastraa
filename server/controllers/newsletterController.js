import Subscriber from "../models/newsletterModel.js";

export const createSubs = async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmail = await Subscriber.findOne({
      email: email.toLowerCase(),
    });
    if (existingEmail) {
      return res.status(400).json({
        message: "Subscriber already exists",
        success: false,
      });
    }
    const newSubs = new Subscriber({ email });
    await newSubs.save();
    return res
      .status(201)
      .json({ message: "Successfully subscribed!", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong! Try Again.", success: false });
  }
};

export const getLimitedSubs = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  try {
    const total = await Subscriber.countDocuments({ status: true });

    const subscribers = await Subscriber.find({ status: true })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: subscribers,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching subscribers!",
      success: false,
    });
  }
};

export const deleteSubscriber = async (req, res) => {
  try {
    const { subId } = req.params;

    const deleteSub = await Subscriber.findById(subId);
    deleteSub.status = false;
    await deleteSub.save();
    return res
      .status(200)
      .json({ message: "Subscriber deleted successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong! Try Again.", success: false });
  }
};

export const deleteMultipleSubs = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided for deletion." });
    }

    const result = await Subscriber.updateMany(
      { _id: { $in: ids } },
      { status: false }
    );

    return res.status(200).json({
      message: "Subscribers deleted successfully",
      result,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Bulk delete failed", success: false });
  }
};
