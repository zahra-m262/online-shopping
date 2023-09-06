import { configureStore } from "@reduxjs/toolkit";

import productsReducer, { fetchProducts } from "../slice/productsSlice";
import { productApi } from "../slice/productsApi";
import cartReducer, { getTotals } from "../slice/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

store.dispatch(fetchProducts());
store.dispatch(getTotals());
