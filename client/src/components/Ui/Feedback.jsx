export const FeedbackSection = () => (
  <section className="py-10">
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-3xl font-bold mb-4">
          Your opinions would be greatly appreciated.
        </h2>
        <p className="mb-8 text-sm">
          Tell us your thoughts on Vastraa, including its energy, style, and
          experience.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none"
          />
          <textarea
            placeholder="Your feedback..."
            rows="4"
            className="w-full px-4 py-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-black border border-black text-white cursor-pointer font-medium px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <blockquote className="p-6 rounded-xl shadow-sm border-l-4 border-black relative">
          <p className="text-lg italic">
            “My entire wardrobe was redefined by the Vastraa Collection. Each
            component feels like armor for the future.”
          </p>
          <footer className="mt-4 text-sm text-gray-600">
            — Creative Director - Zara M.
          </footer>
        </blockquote>
        <blockquote className="p-6 rounded-xl shadow-sm border-l-4 border-black relative">
          <p className="text-lg italic text-gray-800">
            “My entire wardrobe was redefined by the Vastraa Collection. Each
            component feels like armor for the future.”
          </p>
          <footer className="mt-4 text-sm text-gray-600">
            — Creative Director - Zara M.
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
);
