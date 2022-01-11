import { FC } from 'react'
import { Routes, Route } from "react-router-dom"

import About from "./components/pages/about";
import Home from "./components/pages/home";

import Login from "./components/sign-up/login";
import SignUp from "./components/sign-up/sign-up";
import Profile from "./components/sign-up/profile";

import AddBlog from "./components/blog/add-blog";
import Users from "./components/user/users";
import UserDetails from "./components/user/user-details";
import BlogDetails from "./components/blog/blog-details";
import Categories from "./components/category/categories";
import CategoryWiseBlogs from "./components/category/category-wise-blogs";
import CategoryDetails from "./components/category/category-details";
import UserBlogs from "./components/blog/user-blogs";
import SearchBlog from "./components/blog/search-blog";
import OtherUserBlogs from './components/blog/other-user-blogs';
import EditBlog from './components/blog/edit-blog';

const RouterConfig: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<UserDetails />} />

        <Route path="/user/blogs" element={<UserBlogs />} />
        <Route path="/user/blogs/:userID" element={<OtherUserBlogs />} />
        <Route path="/add/blog" element={<AddBlog />} />
        <Route path="/search" element={<SearchBlog />} />
        <Route path="/view/blog/:id" element={<BlogDetails />} />
        <Route path="/edit/blog/:id" element={<EditBlog />} />

        <Route path="/category" element={<Categories />} />
        <Route path="/view/category/:id" element={<CategoryDetails />} />
        <Route path="/view/blogs/category/:catID" element={<CategoryWiseBlogs />} />

      </Routes>
    </>
  )
}

export default RouterConfig;
