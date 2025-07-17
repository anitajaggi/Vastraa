import { NavLink } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="bg-white">
      <div className="py-10 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 hero-content">
          <span className="bg-red-300 px-2 rounded-2xl">
            Fit Checks Start Here
          </span>
          <h1 className="text-4xl md:text-6xl font-bold">
            Here's Where Your
            <br className="hidden md:inline" /> New Favorite Outfit Begins
          </h1>
          <p className="mt-4">
            Curated collections created for effortless comfort, self-assurance,
            and daily style.
          </p>
          <div className="mt-6 flex justify-start gap-4">
            <NavLink to={"/shop"} className="btn">
              Shop Now
            </NavLink>
          </div>
        </div>

        <div className="hidden flex-1 md:grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
          <div className="row-span-2 overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <img
              src="hero3.jpg"
              alt="Fashion Women"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <img
              src="hero2.jpg"
              alt="Fashion Women"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <img
              src="hero1.jpg"
              alt="Fashion Women"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
