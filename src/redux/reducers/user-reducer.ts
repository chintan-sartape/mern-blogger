import { ActionTypes } from "../constants/actions-types";

const intialState = {
  users: [],
};

type actionsState = {
  type: string,
  payload?: any,
}


export const usersReducer = (state = intialState, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.SET_USERS:
      return {
        ...state,
        users: actions.payload,
      };
    default:
      return state;
  }
};


export const selectedUserReducer = (state = {}, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.USER:
      return {
        ...state,
        ...actions.payload
      };
    default:
      return state;
  }
};

export const loginReducer = (state = {}, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.SET_LOGIN:
      return {
        ...state,
        ...actions.payload
      };
    case ActionTypes.RESET_LOGIN:
      return {};
    default:
      return state;
  }
};

export const userRoleReducer = (state = {}, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.SET_USER_ROLE:
      return {
        ...state,
        role: actions.payload,
      }
    case ActionTypes.RESET_USER_ROLE:
      return {};
    default:
      return state;
  }
}

export const addUserReducer = (state = {}, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.SIGN_UP_USER:
      return {
        ...state,
        ...actions.payload
      }
    default:
      return state;
  }
}

export const updateUserReducer = (state = {}, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        ...actions.payload
      }
    default:
      return state;
  }
}
