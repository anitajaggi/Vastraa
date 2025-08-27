import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RiUserFill,
  RiShoppingCartFill,
  RiPokerHeartsFill,
} from "react-icons/ri";
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

export const DesktopNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const { allCategories } = useSelector((state) => state.categories);
  const { allSubcategories } = useSelector((state) => state.subcategories);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.wishlist);
  const totalWishlistItems = items.length;
  const { items: cartItems } = useSelector((state) => state.cart);
  const totalCartItems = cartItems.length;

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
  };

  const subcatByCategoryId = allCategories.reduce((acc, category) => {
    acc[category._id] = allSubcategories.filter(
      (sub) => sub.categoryId._id === category._id
    );
    return acc;
  }, {});

  return (
    <nav className="hidden links md:flex items-center gap-6">
      {navLinks.map((link) =>
        link.label === "Categories" ? (
          <div
            key={link.path}
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer text-white">
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
              <div className="absolute top-4 left-0 mt-2 bg-red-700 text-white shadow-lg rounded-md z-50 min-w-[200px]">
                {allCategories.map((cat) => (
                  <div key={cat._id} className="group relative">
                    <NavLink
                      to={`/shop/${cat.slug}`}
                      className="block px-4 py-2 hover:bg-black font-medium"
                    >
                      {cat.category}
                    </NavLink>

                    {subcatByCategoryId[cat._id]?.length > 0 && (
                      <div className="absolute top-0 left-full overflow-hidden mt-0 hidden group-hover:block bg-red-800 shadow-md rounded-md z-50 min-w-[180px]">
                        {subcatByCategoryId[cat._id].map((sub, index) => (
                          <NavLink
                            key={index}
                            to={`/shop/${cat.slug}/${sub.slug}`}
                            className="block px-4 py-2 text-sm hover:bg-black"
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
          <NavLink
            key={link.path}
            to={link.path}
            className="text-white transition"
          >
            {link.label}
          </NavLink>
        )
      )}

      <div className="flex gap-4 items-center bg-black/30 px-2 py-1 rounded-2xl">
        <button onClick={handleUserClick} className="cursor-pointer text-white">
          {isAuthenticated ? (
            <span className="text-sm font-medium">
              {user?.isAdmin ? "Dashboard" : "Profile"}
            </span>
          ) : (
            <RiUserFill />
          )}
        </button>

        <NavLink to="/cart" className="flex items-center gap-1 text-white">
          <RiShoppingCartFill />
          <span>{totalCartItems}</span>
        </NavLink>

        <NavLink to="/wishlist" className="flex items-center gap-1 text-white">
          <RiPokerHeartsFill />
          <span>{totalWishlistItems}</span>
        </NavLink>
      </div>

      {isAuthenticated && (
        <div onClick={() => setIsDropdownOpen(false)}>
          <LogoutButton />
        </div>
      )}
    </nav>
  );
};
