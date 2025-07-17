export const Newsletter = () => (
  <section className="newsletter py-10 px-6 md:px-20">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Join the frequency of Vastraa
      </h2>
      <p className="text-gray-400 mb-8 text-sm md:text-base">
        Get the first word on limited-edition edits, restocks, and exclusive
        drops. Just style, no spam.
      </p>

      <form className="flex flex-col sm:flex-row justify-center gap-4">
        <input
          type="email"
          placeholder="Your email address"
          className="px-5 py-3 rounded-full w-full sm:w-80 focus:outline-none border"
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
