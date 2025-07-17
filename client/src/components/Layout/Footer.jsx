import { NavLink } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-black text-white py-12 px-6 md:px-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      <div>
        <h2 className="text-2xl font-bold tracking-widest mb-4">Vastraa</h2>
        <p className="text-gray-400">
          Fashion that is crafted with precision for the future. Every stitch
          has strength.
        </p>
      </div>
      <div>
        <h3 className="mb-4 font-semibold uppercase tracking-wide">Explore</h3>
        <ul className="space-y-2 links text-gray-400">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/shop"}>Shop</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="mb-4 font-semibold uppercase tracking-wide">Support</h3>
        <ul className="space-y-2 links text-gray-400">
          <li>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
          <li>
            <NavLink to={"/faqs"}>FAQs</NavLink>
          </li>
          <li>
            <NavLink to={"/shipping"}>Shipping & Returns</NavLink>
          </li>
          <li>
            <NavLink to={"/privacy"}>Privacy</NavLink>
          </li>
          <li>
            <NavLink to={"/term"}>Terms & Condition</NavLink>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-12 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
      © 2025 Vastraa. All rights reserved.
    </div>
  </footer>
);
