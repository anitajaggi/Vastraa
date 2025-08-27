import Cookies from "js-cookie";

const CART_KEY = "cart";

// Get cart from cookies
export const getCartFromCookies = () => {
  try {
    const cart = JSON.parse(Cookies.get(CART_KEY) || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
};

// Save cart to cookies
export const saveCartToCookies = (cart) => {
  Cookies.set(CART_KEY, JSON.stringify(cart), { expires: 30 });
};

// Add item
export const addToCartCookie = ({ productId, size, color, quantity }) => {
  let cart = getCartFromCookies();

  const existing = cart.find(
    (item) =>
      item.productId === productId && item.size === size && item.color === color
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, size, color, quantity });
  }

  // Remove invalid/empty entries
  cart = cart.filter((item) => item.productId && item.quantity > 0);

  saveCartToCookies(cart);
  return cart;
};

// Remove item
export const removeFromCartCookie = ({ productId, size, color }) => {
  const cart = getCartFromCookies().filter(
    (item) =>
      !(
        item.productId === productId &&
        item.size === size &&
        item.color === color
      )
  );
  saveCartToCookies(cart);
  return cart;
};

// Update quantity
export const updateCartQtyCookie = ({ productId, size, color, quantity }) => {
  const cart = getCartFromCookies().map((item) =>
    item.productId === productId && item.size === size && item.color === color
      ? { ...item, quantity }
      : item
  );
  saveCartToCookies(cart);
  return cart;
};
