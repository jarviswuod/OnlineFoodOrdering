import axios from "axios";
import { api, API_URL } from "../../config/api";
import {
  ADD_TO_FAVOURITE_FAILURE,
  ADD_TO_FAVOURITE_REQUEST,
  ADD_TO_FAVOURITE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_URL}/auth/signup`,
      reqData.userData
    );
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restuarant");
    } else {
      reqData.navigate("/");
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    console.log("register success", data);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
    console.error(error);
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_URL}/auth/signin`,
      reqData.userData
    );

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      console.log(localStorage);
      dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
      if (data.role === "ROLE_RESTAURANT_OWNER") {
        reqData.navigate("/admin/restuarant");
      } else {
        reqData.navigate("/");
      }
      console.log("login success", data);
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    console.error(error);
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await api.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log("user profile", data);
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error });
    console.error(error);
  }
};

export const addToFavourite =
  ({ jwt, restaurantId }) =>
  async (dispatch) => {
    dispatch({ type: ADD_TO_FAVOURITE_REQUEST });
    try {
      const { data } = await api.put(
        `/api/restaurants/${restaurantId}/add-favourite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({ type: ADD_TO_FAVOURITE_SUCCESS, payload: data });
      console.log("Aded to favourite", data);
    } catch (error) {
      dispatch({ type: ADD_TO_FAVOURITE_FAILURE, payload: error });
      console.error(error);
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  try {
    localStorage.clear();
    dispatch({ type: LOGOUT });
    console.log("Logout success");
  } catch (error) {
    console.error(error);
  }
};
