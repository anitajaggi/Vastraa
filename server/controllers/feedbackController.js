import feedbackModel from "../models/feedbackModel.js";

export const createFeedback = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    const newfeedback = new feedbackModel({ username, email, message });
    await newfeedback.save();

    return res
      .status(201)
      .json({ message: "Feedback sent successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong! Try Again.", success: false });
  }
};

export const getFeedback = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  try {
    const totalFeedbacks = await feedbackModel.countDocuments({ status: true });

    const totalPages = Math.ceil(totalFeedbacks / limit);

    const feedbacks = await feedbackModel
      .find({ status: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      feedbacks,
      currentPage: page,
      totalPages,
      totalFeedbacks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Try Again.",
    });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { feedId } = req.params;
    const deletefeedback = await feedbackModel.findById(feedId);
    deletefeedback.status = false;
    await deletefeedback.save();
    return res
      .status(200)
      .json({ message: "Feedback deleted successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong! Try Again.", success: false });
  }
};

export const deleteMultipleFeedback = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided for deletion." });
    }

    const result = await feedbackModel.updateMany(
      { _id: { $in: ids } },
      { status: false }
    );

    return res.status(200).json({
      message: `${result.modifiedCount} Feedback(s) deleted successfully!`,
      result,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Bulk delete failed", success: false });
  }
};

export const approveReview = async (req, res) => {
  try {
    const { approved } = req.body;
    console.log(req.body);

    const feedback = await feedbackModel.findByIdAndUpdate(
      req.params.id,
      { approved },
      { new: true }
    );
    res.status(200).json({
      success: true,
      feedback,
      message: "Review updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error update feedback",
      success: false,
    });
  }
};
