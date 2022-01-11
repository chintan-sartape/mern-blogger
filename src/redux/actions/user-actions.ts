import { ActionTypes } from "../constants/actions-types";

export const setUsers = (users: any) => {
  return {
    type: ActionTypes.SET_USERS,
    payload: users,
  };
};

export const selectedUser = (user: any) => {
  return {
    type: ActionTypes.USER,
    payload: user,
  };
};

export const setLogin = (user: any) => {
  return {
    type: ActionTypes.SET_LOGIN,
    payload: user,
  };
};

export const setUserRole = (role: any) => {
  return {
    type: ActionTypes.SET_USER_ROLE,
    payload: role,
  }
}

export const setResetUserRole = () => {
  return {
    type: ActionTypes.RESET_USER_ROLE,
    payload: {},
  }
}

export const setResetLogin = () => {
  return {
    type: ActionTypes.RESET_LOGIN,
    payload: {},
  };
};

export const signUpUser = (user: any) => {
  return {
    type: ActionTypes.SIGN_UP_USER,
    payload: user,
  }
}

export const updateUser = (user: any) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload: user,
  }
}
