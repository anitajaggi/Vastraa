import { NavLink } from "react-router-dom";

export const About = () => {
  return (
    <main className="max-w-7xl m-auto px-4 md:px-0">
      <section className="relative overflow-hidden py-10 ">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            Vastraa: Tradition's Threads
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Vastraa is a contemporary Indian fashion brand that uses a modern
            perspective to reinvent ageless customs. With a strong foundation in
            Indian artistic traditions, we collaborate with talented
            craftspeople nationwide to conserve traditional methods such as
            handloom weaving, natural dyeing, and elaborate embroidery. Each
            item of clothing conveys a tale about culture, craftsmanship, and
            mindful living in addition to fashion. We use materials that are
            ethically sourced, guarantee fair wages, and adhere to a slow
            fashion philosophy that prioritizes quality over quantity because
            sustainability is at the heart of what we do. Feeling connected to
            the creators, the materials, and the trend toward mindful style is
            what Vastraa is all about, not just how you look.
          </p>
        </div>
      </section>

      <section className="py-5 grid md:grid-cols-2 items-center gap-16">
        <div>
          <img
            src="https://cdn.shopify.com/s/files/1/0331/2140/3012/files/220325_Alkam_17_5509_1_480x480.jpg?v=1649107265"
            alt="Our Story"
            className="rounded-3xl shadow-lg object-cover w-full"
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            The Story We Tell
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Vastraa was established in 2025 to provide a worldwide platform for
            India's finest fabrics and crafts, sparked by a passion for
            tradition. To co-create clothing that is as beautiful as it is
            meaningful, we collaborate closely with artisans.
          </p>
        </div>
      </section>

      <section className="bg-[#f6f6f6] py-5 px-3">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-7">
            Our Principles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Empowerment of Artists",
                desc: "We collaborate with rural tailors and weavers to uphold craft traditions and boost local economies.",
              },
              {
                title: "Eco-Friendly Clothing",
                desc: "Vastraa is dedicated to sustainability by using natural fabrics, low-impact dyes, and no fast fashion.",
              },
              {
                title: "Elegance in Daily Life",
                desc: "We think that every body should be able to wear comfortable, expressive, and long-lasting clothing.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition duration-300"
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-5 px-6">
        <div className="text-center">
          <blockquote className="text-2xl italic text-gray-700">
            “Clothing should tell a story, not just follow a trend.”
          </blockquote>
        </div>
      </section>

      <section className="bg-[#fafafa] py-5 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Become a Part of Our Movement
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-6">
          Vastraa is not just a company. It serves as a platform for believers,
          wearers, and conscious creators.
        </p>
        <NavLink
          to={"/contact"}
          className="inline-block bg-black text-white border border-black px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
        >
          Reach Out to Us
        </NavLink>
      </section>
    </main>
  );
};
