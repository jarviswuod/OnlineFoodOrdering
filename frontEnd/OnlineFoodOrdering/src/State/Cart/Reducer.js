import {
  ADD_CART_ITEM_SUCCESS,
  CLEAR_CART_SUCCESS,
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  GET_ALL_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_REQUEST,
} from "./ActionType";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_CART_REQUEST:
    case GET_ALL_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
    case REMOVE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FIND_CART_SUCCESS:
    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.items,
      };
    case ADD_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.items,
      };

    default:
      break;
  }
};
