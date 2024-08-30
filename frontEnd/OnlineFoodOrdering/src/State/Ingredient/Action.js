import { api } from "../../config/api";
import {
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  CREATE_INGREDIENT_CATEGORY_REQUEST,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENT_CATEGORY_REQUEST,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  GET_RESTAURANT_INGREDINETS_FAILURE,
  GET_RESTAURANT_INGREDINETS_REQUEST,
  GET_RESTAURANT_INGREDINETS_SUCCESS,
  UPDATE_INGREDIENT_STOCK_FAILURE,
  UPDATE_INGREDIENT_STOCK_REQUEST,
  UPDATE_INGREDIENT_STOCK_SUCCESS,
} from "./ActionType";

export const getRestaurantIngredients = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_INGREDINETS_REQUEST });
    try {
      const { data } = await api.get(
        `/api/admin/ingredients/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_RESTAURANT_INGREDINETS_SUCCESS, payload: data });
      console.log("Get all ingredients ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: GET_RESTAURANT_INGREDINETS_FAILURE, payload: error });
    }
  };
};

export const createIngredient = ({ ingredientData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });
    try {
      const { data } = await api.post(
        `/api/admin/ingredients`,
        ingredientData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: data });
      console.log("create ingredient ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error });
    }
  };
};

export const createIngredientCategory = ({ catgoryData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
    try {
      const { data } = await api.post(
        `/api/admin/ingredients/category`,
        catgoryData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: data });
      console.log("create ingredient category ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getRestaurantIngredientCategory = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
    try {
      const { data } = await api.get(
        `/api/admin/ingredients/restaurant/${restaurantId}/category`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: data });
      console.log("Get all restaurant ingredients category ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const updateIngredientStock = ({ ingredientId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_INGREDIENT_STOCK_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/ingredients/${ingredientId}/stock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_INGREDIENT_STOCK_SUCCESS, payload: data });
      console.log("Update ingredients stock ", data);
    } catch (error) {
      console.error("catch error ", error);
      dispatch({ type: UPDATE_INGREDIENT_STOCK_FAILURE, payload: error });
    }
  };
};
