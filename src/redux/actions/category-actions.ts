import { ActionTypes } from "../constants/actions-types";

export const setCategories = (categories: any) => {
  return {
    type: ActionTypes.SET_CATEGORIES,
    payload: categories,
  };
};

export const selectedCategory = (category: any) => {
  return {
    type: ActionTypes.SELECTED_CATEGORY,
    payload: category,
  };
};

export const addCategory = (category: any) => {
  return {
    type: ActionTypes.ADD_CATEGORY,
    payload: category,
  }
}

export const updateCategory = (category: any) => {
  return {
    type: ActionTypes.UPDATE_CATEGORY,
    payload: category,
  }
}
