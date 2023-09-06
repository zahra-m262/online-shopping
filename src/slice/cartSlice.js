import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalAmount: 0,
  cartTotalQty: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQty += 1;
        toast.info(
          `increased ${state.cartItems[itemIndex].name} cart quantity`,
          {
            position: "bottom-left",
          }
        );
      } else {
        const tempProduct = { ...action.payload, cartQty: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} add to cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      state.cartItems = nextCartItems;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQty > 1) {
        state.cartItems[itemIndex].cartQty -= 1;

        toast.error(`Decreased ${action.payload.name} cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQty === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        toast.error(`${action.payload.name} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];

      toast.error(`Cart Cleared`, {
        position: "bottom-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, qty } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQty } = cartItem;
          const itemTotal = price * cartQty;

          cartTotal.total += itemTotal;
          cartTotal.qty += cartQty;

          return cartTotal;
        },
        {
          total: 0,
          qty: 0,
        }
      );
      state.cartTotalQty = qty;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
