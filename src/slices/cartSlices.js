// slices/cartSlices.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // lista de cartItems
    totalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
      state.totalQuantity += action.payload.quantity;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (!item) return;
      state.totalQuantity -= item.quantity;
      state.items = state.items.filter(i => i.id !== id);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
