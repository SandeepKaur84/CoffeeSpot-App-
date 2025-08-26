import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        i => i._id === item._id && i.size === item.size,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        i => !(i._id === action.payload._id && i.size === action.payload.size),
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        i => i._id === action.payload._id && i.size === action.payload.size,
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        i => i._id === action.payload._id && i.size === action.payload.size,
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: state => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
