import { api } from "../../config/api";
import {
  GET_RESTUARANT_ORDER_FAILURE,
  GET_RESTUARANT_ORDER_REQUEST,
  GET_RESTUARANT_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "./ActionType";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/orders/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authrorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
      console.log("Updated order ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
    }
  };
};

export const fetchRestaurantOrders = ({ restaurantId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTUARANT_ORDER_REQUEST });
    try {
      const { data } = await api.get(
        `/api/admin/order/restaurant/${restaurantId}`,
        {
          params: { order_status: orderStatus },
          headers: {
            Authrorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_RESTUARANT_ORDER_SUCCESS, payload: data });
      console.log("Restaurant orders ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: GET_RESTUARANT_ORDER_FAILURE, payload: error });
    }
  };
};
