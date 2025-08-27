// import productModel from "../models/productModel.js";

// // Add to cart
// export const addToCart = async (req, res) => {
//   const { productId, size, color, quantity } = req.body;

//   try {
//     if (!req.session.cart) req.session.cart = [];

//     const existing = req.session.cart.find(
//       (item) =>
//         item.productId === productId &&
//         item.size === size &&
//         item.color === color
//     );

//     if (existing) {
//       existing.quantity += quantity;
//     } else {
//       req.session.cart.push({ productId, size, color, quantity });
//     }

//     const cartProducts = await Promise.all(
//       req.session.cart.map(async (item) => {
//         const product = await productModel.findById(item.productId);
//         return {
//           ...item,
//           name: product.productname,
//           price: product.price,
//           stock: product.stock,
//           images: product.images,
//         };
//       })
//     );

//     res.json({ message: "Successfully Inserted Cart", cart: cartProducts });
//   } catch (error) {
//     res.json({ message: "Failed try again!" });
//   }
// };

// // Remove from cart
// export const removeFromCart = async (req, res) => {
//   const { productId, size, color } = req.body;

//   if (!req.session.cart) req.session.cart = [];

//   req.session.cart = req.session.cart.filter(
//     (item) =>
//       !(
//         String(item.productId) === String(productId) &&
//         item.size === size &&
//         item.color === color
//       )
//   );

//   const cartProducts = await Promise.all(
//     req.session.cart.map(async (item) => {
//       const product = await productModel.findById(item.productId);
//       return {
//         ...item,
//         name: product.productname,
//         price: product.price,
//         stock: product.stock,
//         images: product.images,
//       };
//     })
//   );

//   res.json({ cart: cartProducts });
// };

// // Get cart
// export const getCart = async (req, res) => {
//   const cart = req.session.cart || [];

//   const cartProducts = await Promise.all(
//     cart.map(async (item) => {
//       const product = await productModel.findById(item.productId);
//       return {
//         ...item,
//         name: product.productname,
//         price: product.price,
//         stock: product.stock,
//         images: product.images,
//       };
//     })
//   );

//   res.json({ cart: cartProducts });
// };

// // Update quantity in session cart
// export const updateCartQty = async (req, res) => {
//   const { productId, size, color, quantity } = req.body;

//   if (!req.session.cart) req.session.cart = [];

//   const existing = req.session.cart.find(
//     (item) =>
//       String(item.productId) === String(productId) &&
//       item.size === size &&
//       item.color === color
//   );

//   if (existing) {
//     existing.quantity = quantity;
//   }

//   const cartProducts = await Promise.all(
//     req.session.cart.map(async (item) => {
//       const product = await productModel.findById(item.productId);
//       return {
//         ...item,
//         name: product.productname,
//         price: product.price,
//         stock: product.stock,
//         images: product.images,
//       };
//     })
//   );

//   res.json({ message: "Qty Updated", cart: cartProducts });
// };
