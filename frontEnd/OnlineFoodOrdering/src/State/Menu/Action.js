import { api } from "../../config/api";
import {
  CREATE_MENU_ITEM_FAILURE,
  CREATE_MENU_ITEM_REQUEST,
  CREATE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

export const createMenuItem = ({ menu, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/food`, menu, {
        headers: {
          Authrorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
      console.log("Created menu ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
    }
  };
};

export const getMenuItemsByRestaurantId = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
      const { data } = await api.get(
        `/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`,
        {
          headers: {
            Authrorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
        payload: data,
      });
      console.log("getMenuItemsByRestaurantId ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
        payload: error,
      });
    }
  };
};

export const searchMenuItem = ({ keyword, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.get(`/api/food/search?name=${keyword}`, {
        headers: {
          Authrorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
      console.log("searchMenuItem ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
    }
  };
};

// export const getAllIngredientsOfMenuItem = (reqData) => {
//   return async (dispatch) => {
//     dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
//     try {
//       const { data } = await api.get(
//         `/api/food/restaurant/${reqData.restaurantId}`,
//         {
//           headers: {
//             Authrorization: `Bearer ${reqData.jwt}`,
//           },
//         }
//       );
//       dispatch({
//         type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
//         payload: data,
//       });
//       console.log("searchMenuItem ", data);
//     } catch (error) {
//       console.error("catch error ", error);
//       dispatch({
//         type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
//         payload: error,
//       });
//     }
//   };
// };

export const updateMenuItemAvailability = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/food/${foodId}`,
        {},
        {
          headers: {
            Authrorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
        payload: data,
      });
      console.log("searchMenuItem ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
        payload: error,
      });
    }
  };
};

export const deleteFood = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.delete(`/api/admin/food/${foodId}`, {
        headers: {
          Authrorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: DELETE_MENU_ITEM_SUCCESS,
        payload: data,
      });
      console.log("searchMenuItem ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({
        type: DELETE_MENU_ITEM_FAILURE,
        payload: error,
      });
    }
  };
};
