import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../Features/category/categoryThunk";
import { LogoutButton } from "../Ui/logout";
import { getAllSubCategories } from "../../Features/category/subcatThunk";
import { getWishlist } from "../../Features/wishlist/wishlistThunk";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "Shop" },
  { path: "/categories", label: "Categories" },
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact Us" },
];

export const MobileNav = ({ isOpen, menuRef, closeMenu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const { allCategories } = useSelector((state) => state.categories);
  const { allSubcategories } = useSelector((state) => state.subcategories);

  const { items } = useSelector((state) => state.wishlist);
  const { items: cartItems } = useSelector((state) => state.cart);
  const totalWishlistItems = items.length;
  const totalCartItems = cartItems.length;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllSubCategories());
    dispatch(getWishlist());
  }, [dispatch]);

  const handleUserClick = () => {
    if (loading || isAuthenticated === null) return;
    if (!isAuthenticated) {
      navigate("/auth");
    } else if (user?.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/profile");
    }
    closeMenu();
  };

  const subcatByCategoryId = allCategories.reduce((acc, category) => {
    const filtered = allSubcategories.filter(
      (sub) => sub.categoryId && sub.categoryId._id === category._id
    );
    acc[category._id] = filtered;
    return acc;
  }, {});

  return (
    <nav
      ref={menuRef}
      className={`fixed links top-16 left-0 right-0 bg-white z-50 shadow-xl overflow-y-auto transition-all duration-300 ease-in-out
        ${isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"} 
      `}
    >
      <div className="px-6 py-4 border-t border-indigo-100 space-y-4 text-sm text-black flex flex-col">
        <span onClick={handleUserClick} className="cursor-pointer">
          {isAuthenticated ? (
            <span className="text-sm font-semibold text-green-700">
              {user?.isAdmin ? "Dashboard" : "Profile"}
            </span>
          ) : (
            "Login"
          )}
        </span>

        <NavLink onClick={closeMenu} to="/cart">
          Cart <span>{totalCartItems}</span>
        </NavLink>
        <NavLink onClick={closeMenu} to="/wishlist">
          Wishlist <span>{totalWishlistItems}</span>
        </NavLink>

        {navLinks.map((link) =>
          link.label === "Categories" ? (
            <div key={link.path} className="flex flex-col">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center cursor-pointer justify-between font-medium text-left"
              >
                {link.label}
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="mt-2 pl-4 flex flex-col gap-2">
                  {allCategories.map((cat) => (
                    <div key={cat._id}>
                      <NavLink
                        to={`/categories/${cat.category}`}
                        onClick={closeMenu}
                        className="font-semibold cursor-pointer text-gray-800"
                      >
                        {cat.category}
                      </NavLink>
                      {subcatByCategoryId[cat._id]?.length > 0 && (
                        <div className="pl-4 mt-1 flex flex-col gap-1 text-gray-600 text-sm">
                          {subcatByCategoryId[cat._id].map((sub, idx) => (
                            <NavLink
                              key={idx}
                              to={`/categories/${cat.category}/${sub.subcategory}`}
                              onClick={closeMenu}
                              className={"cursor-pointer"}
                            >
                              {sub.subcategory}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink key={link.path} to={link.path} onClick={closeMenu}>
              {link.label}
            </NavLink>
          )
        )}

        {/* Logout */}
        {isAuthenticated && (
          <div onClick={closeMenu}>
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
};
