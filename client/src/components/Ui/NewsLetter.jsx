import { useDispatch, useSelector } from "react-redux";
import { clearFieldError } from "../../Features/subscribe/subSlice";
import { createSubs } from "../../Features/subscribe/subsThunk";
import { useState } from "react";

export const Newsletter = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const dispatch = useDispatch();
  const { fieldErrors } = useSelector((state) => state.contacts);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (fieldErrors[e.target.name]) {
      dispatch(clearFieldError(e.target.name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(createSubs(formData));

    if (createSubs.fulfilled.match(res)) {
      setFormData({
        email: "",
      });
    }
  };
  return (
    <section className="newsletter py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay in Style -- Subscribe to Vastraa!
        </h2>
        <p className="text-gray-400 mb-8 text-sm md:text-base">
          Be the first to know about new drops, restocks, and limited
          style/offers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Your email address"
            className="px-5 py-3 rounded-full w-full sm:w-80 focus:outline-none border"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-black rounded-full cursor-pointer font-medium hover:bg-gray-300 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};
