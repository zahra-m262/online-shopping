import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  decreaseCart,
  removeFromCart,
  addToCart,
  clearCart,
  getTotals,
} from "../slice/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { cartTotalAmount } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecreaseFromCart = (item) => {
    dispatch(decreaseCart(item));
  };

  const handleIncreaseItem = (item) => {
    dispatch(addToCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your Cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-box-arrow-up-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="qty">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-product">
                  <img
                    src={`http://localhost:9000/images/${item.image}`}
                    alt={item.name}
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <button onClick={() => handleRemoveFromCart(item)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${item.price}</div>
                <div className="cart-product-qty">
                  <button onClick={() => handleDecreaseFromCart(item)}>
                    -
                  </button>
                  <div className="count">{item.cartQty}</div>
                  <button onClick={() => handleIncreaseItem(item)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  ${item.price * item.cartQty}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <button onClick={() => handleClearCart()} className="clear-cart">
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>SubTotal</span>
                <span className="amount">${cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check Out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-box-arrow-up-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
