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

export const MobileNav = ({ isOpen, menuRef, closeMenu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav
      ref={menuRef}
      className={`links md:hidden z-50 absolute w-100 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="bg-white px-6 py-4 border-t border-indigo-100 space-y-3 text-sm text-black flex flex-col">
        {navLinks.map((link) =>
          link.label === "Categories" ? (
            <div key={link.path} className="flex flex-col gap-2">
              <span
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="cursor-pointer font-medium flex items-center gap-1"
              >
                {link.label}
                <svg
                  className={`h-4 w-4 transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
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
              </span>
              {isDropdownOpen &&
                categoryDropdown.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      closeMenu();
                    }}
                    className="pl-4 text-gray-600"
                  >
                    {item.label}
                  </NavLink>
                ))}
            </div>
          ) : (
            <NavLink key={link.path} to={link.path} onClick={closeMenu}>
              {link.label}
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
};
