import { ActionTypes } from "../constants/actions-types";

const intialState = {
  blogs: [],
};

const intialInputState = {
  input: "",
};

type actionsState = {
  type: '',
  payload?: any,
}

export const blogsReducer = (state = intialState, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.SET_BLOGS:
      return {
        ...state,
        blogs: actions.payload,
      };
    default:
      return state;
  }
};

export const otherUserBlogsReducer = (state = intialState, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.OTHER_USER_BLOGS:
      return {
        ...state,
        blogs: actions.payload,
      };
    default:
      return state;
  }
};

export const selectedBlogReducer = (state = {}, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.SELECTED_BLOG:
      return {
        ...state,
        ...actions.payload
      };
    default:
      return state;
  }
};

export const addBlogReducer = (state = {}, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.ADD_BLOG:
      return {
        ...state,
        ...actions.payload
      }
    default:
      return state;
  }
}

export const updateBlogReducer = (state = {}, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.UPDATE_BLOG:
      return {
        ...state,
        ...actions.payload
      }
    default:
      return state;
  }
}

export const userBlogsReducer = (state = intialState, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.USER_BLOGS:
      return {
        ...state,
        blogs: actions.payload,
      };
    default:
      return state;
  }
};

export const searchInputReducer = (state = intialInputState, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.SET_SEARCH_INPUT:
      return {
        ...state,
        input: actions.payload,
      }
    default:
      return state;
  }
}

export const searchBlogsReducer = (state = intialState, actions: actionsState) => {
  switch (actions.type) {
    case ActionTypes.SET_SEARCH_BLOGS:
      return {
        ...state,
        blogs: actions.payload,
      }
    case ActionTypes.RESET_SEARCH_BLOGS:
      return {
        ...state,
        blogs: {}
      }
    default:
      return state;
  }
}
