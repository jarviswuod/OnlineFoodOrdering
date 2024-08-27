import { api } from "../../config/api";
import {
  ADD_CART_ITEM_FAILURE,
  ADD_CART_ITEM_REQUEST,
  ADD_CART_ITEM_SUCCESS,
  CLEAR_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  FIND_CART_FAILURE,
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  GET_ALL_CART_ITEM_FAILURE,
  GET_ALL_CART_ITEM_REQUEST,
  GET_ALL_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

export const findCart = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST });
    try {
      const { data } = await api.get(`/api/cart`, {
        headers: {
          Authrorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: FIND_CART_SUCCESS, payload: data });
      console.log("Find Cart ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: FIND_CART_FAILURE, payload: error });
    }
  };
};

export const getAllCartItems = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEM_REQUEST });
    try {
      const { data } = await api.get(`/api/carts/${reqData.cartId}/items`, {
        headers: {
          Authrorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch({ type: GET_ALL_CART_ITEM_SUCCESS, payload: data });
      console.log("getAllCartItems ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: GET_ALL_CART_ITEM_FAILURE, payload: error });
    }
  };
};

export const addItemToCart = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CART_ITEM_REQUEST });
    try {
      const { data } = await api.put(`/api/cart/add`, reqData.cartItem, {
        headers: {
          Authrorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch({ type: ADD_CART_ITEM_SUCCESS, payload: data });
      console.log("add Item To Cart ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: ADD_CART_ITEM_FAILURE, payload: error });
    }
  };
};

export const updateCartItem = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    try {
      const { data } = await api.put(`/api/cart-item/update`, reqData.data, {
        headers: {
          Authrorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
      console.log("update Cart Item ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error });
    }
  };
};

export const removeCartItem = ({ cartItemId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    try {
      const { data } = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
        headers: {
          Authrorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data });
      console.log("remove Cart Item ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error });
    }
  };
};

export const clearCart = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_CART_REQUEST });
    try {
      const { data } = await api.put(
        `/api/cart/clear`,
        {},
        {
          headers: {
            Authrorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: CLEAR_CART_SUCCESS, payload: data });
      console.log("remove Cart Item ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: CLEAR_CART_FAILURE, payload: error });
    }
  };
};
