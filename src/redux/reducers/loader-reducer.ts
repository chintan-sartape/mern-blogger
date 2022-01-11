import { ActionTypes } from "../constants/actions-types";

const intialState = {
  loader: false,
};

type actionsState = {
  type: '',
  payload?: any,
}


export const loaderReducer = (state = intialState, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.SET_LOADER:
      return {
        ...state,
        loader: actions.payload
      };
    case ActionTypes.RESET_LOADER:
      return {
        ...state,
        loader: actions.payload
      };
    default:
      return state;
  }
};
