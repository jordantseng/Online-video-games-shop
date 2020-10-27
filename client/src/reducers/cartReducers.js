import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  RESET_CART_ITEM,
  SAVE_CART_SHIPPING_ADDRESS,
  SAVE_CART_PAYMENT_METHOD,
} from '../types/cart';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : { address: '', city: '', postalCode: '', country: '' };

const cartReducer = (
  state = {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  action
) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === existItem.product ? item : i
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    case RESET_CART_ITEM:
      return { ...state, cartItems: [] };

    case SAVE_CART_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case SAVE_CART_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
