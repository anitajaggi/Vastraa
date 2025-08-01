export const Contact = () => {
  return (
    <main className="px-4 max-w-7xl m-auto">
      <section className="text-center py-10">
        <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg">
          Whether you have a question about a product, want to collaborate, or
          just want to say hello — we'd love to hear from you.
        </p>
      </section>

      <section className="py-10 grid md:grid-cols-2 gap-12 items-start">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-black focus:border-black"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-black focus:border-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="5"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-black focus:border-black"
              placeholder="Type your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-black text-white border cursor-pointer border-black px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            Send Message
          </button>
        </form>

        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Vastraa HQ</h2>
          <p className="text-gray-600">
            123 Fabric Street, Jaipur, Rajasthan 302001
            <br />
            India
          </p>

          <p className="text-gray-600">
            <strong>Email:</strong> support@vastraa.in
            <br />
            <strong>Phone:</strong> +91 98765 43210
          </p>

          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Follow us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-black transition">
                Instagram
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition">
                Pinterest
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f9f9] text-center py-10">
        <h2 className="text-3xl font-semibold mb-4">We’re Here for You</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Our team typically responds within 24 hours. For urgent queries,
          please reach out via WhatsApp or our support line.
        </p>
      </section>
    </main>
  );
};
