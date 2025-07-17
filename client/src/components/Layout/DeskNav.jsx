import { NavLink } from "react-router-dom";
import { useState } from "react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "Shop" },
  { path: "/categories", label: "Categories" },
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact Us" },
];

const categoryDropdown = [
  { path: "/categories/electronics", label: "Electronics" },
  { path: "/categories/fashion", label: "Fashion" },
  { path: "/categories/home", label: "Home & Living" },
];

export const DesktopNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="hidden links md:flex gap-6">
      {navLinks.map((link) =>
        link.label === "Categories" ? (
          <div
            key={link.path}
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              {link.label}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {isDropdownOpen && (
              <div className="absolute top-4 w-100 left-0 mt-2 shadow-lg rounded-md z-50 dropdown">
                {categoryDropdown.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-white hover:bg-black"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ) : (
          <NavLink key={link.path} to={link.path}>
            {link.label}
          </NavLink>
        )
      )}
    </nav>
  );
};
