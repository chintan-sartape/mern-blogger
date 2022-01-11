import { combineReducers } from 'redux';
import {
    addBlogReducer, blogsReducer, otherUserBlogsReducer, searchBlogsReducer, searchInputReducer, selectedBlogReducer, userBlogsReducer
} from './blog-reducer';
import { addCategoryReducer, categorirsReducer, selectedCategoryReducer } from './category-reducer';
import { loaderReducer } from './loader-reducer';
import {
    usersReducer, addUserReducer, selectedUserReducer, loginReducer, updateUserReducer, userRoleReducer
} from './user-reducer';

export const rootReducer = combineReducers({
    loader: loaderReducer,
    allUsers: usersReducer,
    addUser: addUserReducer,
    selectedUser: selectedUserReducer,
    loginUser: loginReducer,
    userRole: userRoleReducer,
    updateUser: updateUserReducer,  

    allBlogs: blogsReducer,
    addBlog: addBlogReducer,
    selectedBlog: selectedBlogReducer,
    userBlogs: userBlogsReducer,
    otherUserBlogs: otherUserBlogsReducer,
    searchInput: searchInputReducer,
    searchBlogs: searchBlogsReducer,

    allCategories: categorirsReducer,
    addCategory: addCategoryReducer,
    selectedCategory: selectedCategoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>

// export default rootReducer;