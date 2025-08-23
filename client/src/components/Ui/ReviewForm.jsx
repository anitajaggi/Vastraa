import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFieldError } from "../../Features/feedback/feedbackSlice";
import { sendFeedback } from "../../Features/feedback/feedbackThunk";

export const ReviewForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const { fieldErrors } = useSelector((state) => state.feedback);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (fieldErrors[e.target.name]) {
      dispatch(clearFieldError(e.target.name));
    }
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(sendFeedback(formData));

    if (sendFeedback.fulfilled.match(res)) {
      setFormData({
        username: "",
        email: "",
        message: "",
      });
      setSuccessMessage(
        "Thank you! Your feedback was submitted and is awaiting admin approval."
      );
    }
  };
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">
        Your feedback means a lot to us.
      </h2>
      <p className="mb-8 text-sm">
        Tell us what you think about Vastraa -- its style, mood, and overall
        experience.
      </p>
      {successMessage && (
        <p className="mb-4 text-green-600 font-medium bg-green-50 border border-green-300 px-4 py-2 rounded-md">
          {successMessage}
        </p>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Your name"
            name="username"
            className={`mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-black focus:border-black ${
              fieldErrors?.username ? "border-red-600" : "border-gray-300"
            }`}
            value={formData.username}
            onChange={handleChange}
          />
          {fieldErrors?.username && (
            <p className="text-red-600 txt-r text-sm mt-1">
              {fieldErrors.username}
            </p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Your email"
            className={`mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-black focus:border-black ${
              fieldErrors?.email ? "border-red-600" : "border-gray-300"
            }`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {fieldErrors?.email && (
            <p className="text-red-600 txt-r text-sm mt-1">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div>
          <textarea
            rows="4"
            className={`mt-1 block text-black w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-black focus:border-black ${
              fieldErrors?.message ? "border-red-600" : "border-gray-300"
            }`}
            name="message"
            placeholder="Your feedback..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {fieldErrors?.message && (
            <p className="text-red-600 txt-r text-sm mt-1">
              {fieldErrors.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-black border border-black text-white cursor-pointer font-medium px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};
