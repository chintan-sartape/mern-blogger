import { ActionTypes } from "../constants/actions-types";

const intialState = {
  categorirs: [],
};

type actionsState = {
  type: '',
  payload?: any,
}


export const categorirsReducer = (state = intialState, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categorirs: actions.payload,
      };
    default:
      return state;
  }
};


export const selectedCategoryReducer = (state = {}, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.SELECTED_CATEGORY:
      return {
        ...state,
        ...actions.payload
      };
    default:
      return state;
  }
};

export const addCategoryReducer = (state = {}, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.ADD_CATEGORY:
      return {
        ...state,
        ...actions.payload
      }
    default:
      return state;
  }
}

export const updateCategoryReducer = (state = {}, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        ...actions.payload
      }
    default:
      return state;
  }
}
