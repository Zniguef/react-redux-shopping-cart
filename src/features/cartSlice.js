import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const proId = action.payload.id;
      const clickedProduct = state.products.find(
        (product) => product.id === proId
      );
      if (!clickedProduct) {
        state.products.push(action.payload);
      }
    },

    incrementQuantity: (state, action) => {
      const productID = action.payload;
      const productClicked = state.products.find(
        (product) => product.id === productID
      );
      if (productClicked) {
        productClicked.quantity++;
      }
    },

    decrementQuantity: (state, action) => {
      const productID = action.payload;

      state.products = state.products.map((product) =>
        product.id === productID
          ? {
              ...product,
              quantity: product.quantity > 0 ? product.quantity - 1 : 0,
            }
          : product
      );
      state.products = state.products.filter((product) => product.quantity > 0);
    },

    removeProduct: (state, action) => {
      const productID = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productID
      );
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
