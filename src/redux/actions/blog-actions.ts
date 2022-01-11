import { ActionTypes } from "../constants/actions-types";

export const setBlogs = (blogs: any) => {
  return {
    type: ActionTypes.SET_BLOGS,
    payload: blogs,
  };
};

export const setOtherUserBlogs = (blogs: any) => {
  return {
    type: ActionTypes.OTHER_USER_BLOGS,
    payload: blogs,
  };
};

export const selectedBlog = (blog: any) => {
  return {
    type: ActionTypes.SELECTED_BLOG,
    payload: blog,
  };
};

export const addBlog = (blog: any) => {
  return {
    type: ActionTypes.ADD_BLOG,
    payload: blog,
  }
}

export const updateBlog = (blog: any) => {
  return {
    type: ActionTypes.UPDATE_BLOG,
    payload: blog,
  }
}

export const setUserBlogs = (blogs: any) => {
  return {
    type: ActionTypes.USER_BLOGS,
    payload: blogs,
  }
}

export const setSearchInputBox = (input: string) => {
  return {
    type: ActionTypes.SET_SEARCH_INPUT,
    payload: input
  }
}

export const setSearchBlogs = (blogs: any) => {
  return {
    type: ActionTypes.SET_SEARCH_BLOGS,
    payload: blogs
  }
}

export const resetSearchBlogs = () => {
  return {
    type: ActionTypes.RESET_SEARCH_BLOGS,
    payload: {},
  };
};