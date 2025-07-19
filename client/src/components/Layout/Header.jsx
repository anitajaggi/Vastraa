import {
  RiUserFill,
  RiShoppingCartFill,
  RiPokerHeartsFill,
  RiMenu3Fill,
  RiCloseFill,
} from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { DesktopNav } from "./DeskNav";
import { MobileNav } from "./MobileNav";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", closeOnOutsideClick);
      document.addEventListener("keydown", closeOnOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnOutsideClick);
    };
  }, [isOpen]);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`top-0 left-0 z-50 w-full bg-white shadow ${
        isSticky ? "header sticky" : "header"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="logo font-bold text-lg">
          <NavLink to={"/"} className="text-white text-2xl">
            Vastraa
          </NavLink>
        </div>

        <DesktopNav />

        <div className="flex gap-4 items-center bg-red-300 px-2 rounded-2xl">
          <button aria-label="User">
            <NavLink to={"/auth"}>
              <RiUserFill />
            </NavLink>
          </button>
          <button aria-label="Cart">
            <NavLink className="flex items-center gap-1" to={"/cart"}>
              <RiShoppingCartFill />
              <span>0</span>
            </NavLink>
          </button>
          <button aria-label="Favorites">
            <NavLink className="flex items-center gap-1" to={"/wishlist"}>
              <RiPokerHeartsFill />
              <span>0</span>
            </NavLink>
          </button>
        </div>

        <button
          className="md:hidden cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <RiCloseFill size={20} /> : <RiMenu3Fill size={20} />}
        </button>
      </div>

      <MobileNav
        isOpen={isOpen}
        menuRef={menuRef}
        closeMenu={() => setIsOpen(false)}
      />
    </header>
  );
};
