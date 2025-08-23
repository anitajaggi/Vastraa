import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiFileText,
  FiUsers,
  FiMessageCircle,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { MdOutlineAttachEmail } from "react-icons/md";

import { GiCardboardBox } from "react-icons/gi";
import { AiOutlineProduct } from "react-icons/ai";
import { useEffect } from "react";

export const Sidebar = ({ onNavigate }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Automatically open dropdown if any child route is active
  useEffect(() => {
    let found = false;

    navLinks.forEach((link) => {
      if (link.children) {
        const isChildActive = link.children.some((child) =>
          location.pathname.startsWith(child.path)
        );
        if (isChildActive) {
          setOpenDropdown(link.name);
          found = true;
        }
      }
    });

    if (!found) {
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  const navLinks = [
    { name: "Dashboard", path: "/admin", icon: <FiHome /> },
    {
      name: "Category",
      icon: <FiGrid />,
      children: [
        { name: "Add Category", path: "/admin/category/addcat" },
        { name: "Manage Categories", path: "/admin/category/managecat" },
      ],
    },
    {
      name: "Sub-Category",
      icon: <FiGrid />,
      children: [
        { name: "Add Sub-Category", path: "/admin/subcategory/addsubcat" },
        {
          name: "Manage Sub-Categories",
          path: "/admin/subcategory/managesubcat",
        },
      ],
    },
    {
      name: "Products",
      icon: <AiOutlineProduct />,
      children: [
        { name: "Add Product", path: "/admin/product/addprod" },
        { name: "Manage Products", path: "/admin/product/manageprod" },
      ],
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <GiCardboardBox />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FiUsers />,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: <FiMessageCircle />,
    },
    {
      name: "Reviews",
      path: "/admin/reviews",
      icon: <FiMessageSquare />,
    },
    {
      name: "Subscribers",
      path: "/admin/subscribe",
      icon: <MdOutlineAttachEmail />,
    },
  ];

  return (
    <aside className="h-full w-64 bg-white border-r shadow-sm flex flex-col p-6 overflow-auto scrollbar-hide">
      <div className="mb-4 text-center text-4xl text-black font-extrabold">
        <NavLink to="/">Vastraa</NavLink>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks.map(({ name, path, icon, children }) => (
            <li key={name}>
              {!children ? (
                <NavLink
                  to={path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-all ${
                      isActive
                        ? "bg-red-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  end
                >
                  <span className="text-lg">{icon}</span>
                  <span>{name}</span>
                </NavLink>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === name ? null : name)
                    }
                    className="flex items-center cursor-pointer justify-between w-full px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{icon}</span>
                      {name}
                    </span>
                    {openDropdown === name ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
                  {openDropdown === name && (
                    <ul className="ml-10 mt-1 space-y-2 text-sm">
                      {children.map((child) => (
                        <li key={child.name}>
                          <NavLink
                            to={child.path}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                              isActive
                                ? "bg-red-600 px-3 rounded"
                                : "text-gray-600 hover:text-gray-900"
                            }
                          >
                            {child.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
