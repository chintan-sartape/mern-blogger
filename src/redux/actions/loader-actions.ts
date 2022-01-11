import { ActionTypes } from "../constants/actions-types";


export const setLoader = (status: boolean) => {
  return {
    type: ActionTypes.SET_LOADER,
    payload: status,
  };
};

export const resetLoader = (status: boolean) => {
  return {
    type: ActionTypes.RESET_LOADER,
    payload: status,
  };
};
