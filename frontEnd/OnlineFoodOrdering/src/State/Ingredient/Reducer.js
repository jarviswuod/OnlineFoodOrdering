import {
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  CREATE_INGREDIENT_CATEGORY_REQUEST,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENT_CATEGORY_REQUEST,
  GET_RESTAURANT_INGREDINETS_FAILURE,
  GET_RESTAURANT_INGREDINETS_REQUEST,
  GET_RESTAURANT_INGREDINETS_SUCCESS,
  UPDATE_INGREDIENT_STOCK_FAILURE,
  UPDATE_INGREDIENT_STOCK_REQUEST,
  UPDATE_INGREDIENT_STOCK_SUCCESS,
} from "./ActionType";

const initialState = {
  ingredients: [],
  loading: false,
  error: null,
  category: [],
  update: null,
};
const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT_CATEGORY_REQUEST:
    case UPDATE_INGREDIENT_STOCK_REQUEST:
    case CREATE_INGREDIENT_REQUEST:
    case CREATE_INGREDIENT_CATEGORY_REQUEST:
    case GET_RESTAURANT_INGREDINETS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_RESTAURANT_INGREDINETS_SUCCESS:
      return { ...state, loading: false, ingredients: action.payload };

    case CREATE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: [...state.category, action.payload],
      };

    case CREATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: [...state.ingredients, action.payload],
      };

    case UPDATE_INGREDIENT_STOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        update: action.payload,
        ingredients: state.ingredients.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case GET_INGREDIENT_CATEGORY_FAILURE:
    case UPDATE_INGREDIENT_STOCK_FAILURE:
    case CREATE_INGREDIENT_FAILURE:
    case CREATE_INGREDIENT_CATEGORY_FAILURE:
    case GET_RESTAURANT_INGREDINETS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default ingredientsReducer;
