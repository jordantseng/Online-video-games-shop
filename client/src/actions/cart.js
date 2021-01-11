import axios from '../axios';
import history from '../history';
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SAVE_CART_SHIPPING_ADDRESS,
  SAVE_CART_PAYMENT_METHOD,
} from '../types/cart';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_CART_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      isPreOrder: data.isPreOrder,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => {
  localStorage.setItem('shippingAddress', JSON.stringify(data));
  history.push('/payment');

  return { type: SAVE_CART_SHIPPING_ADDRESS, payload: data };
};

export const savePaymentMethod = (data) => {
  localStorage.setItem('paymentMethod', JSON.stringify(data));

  return { type: SAVE_CART_PAYMENT_METHOD, payload: data };
};
