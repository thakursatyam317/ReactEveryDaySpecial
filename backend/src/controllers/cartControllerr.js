// controllers/cartController.js
import Cart from "../models/cartModels.js";

// Add or update item in cart
export const addToCart = async (req, res) => {
  try {
    const { productId, name, price, image, quantity } = req.body;

    let existingItem = await Cart.findOne({ user: req.user.id, product: productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const newCartItem = new Cart({
      user: userId,
      product: productId,
      name,
      price,
      image,
      quantity,
    });

    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

// Get all items for a user
export const getUserCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.params.userId });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to get cart items", error });
  }
};

// Delete item from cart
export const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartItemId);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart item", error });
  }
};

// Update quantity
export const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedItem = await Cart.findByIdAndUpdate(
      req.params.cartItemId,
      { quantity },
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update quantity", error });
  }
};
