import { FC, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "./loader";
import {
  resetSearchBlogs, setSearchBlogs, setSearchInputBox, setUserBlogs
} from "../../redux/actions/blog-actions";
import {
  setLogin, setResetLogin, setResetUserRole, setUserRole
} from "../../redux/actions/user-actions";
import { RootState } from "../../redux/reducers/root-reducer";

import apiConfig from "../axios/services";
import { BlogModel } from "../../models/blog";

const Navbar: FC = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    const checkAutoLogin = async () => {
      const loginUserID: string | null = sessionStorage.getItem('loginUserID');
      if (loginUserID && loginUserID.length > 0) {
        const result = await apiConfig.get(`users/${loginUserID}`);
        if (result.data.role) {
          const roles = await apiConfig.get(`roles/${result.data.role}`);
          dispatch(setLogin(result.data));
          dispatch(setUserRole(roles.data.role));
        }
      }
    }
    checkAutoLogin();
  }, []);

  const inputEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const allBlogs: BlogModel[] = useSelector((state: RootState) => state.allBlogs.blogs);
  const loader: boolean = useSelector((state: RootState) => state.loader.loader);
  const [searchInput, setSearchInput] = useState<string>("");


  const logoutPatient = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    toast.info('Logout sucess', {
      position: "top-right",
    });

    dispatch(setResetLogin());
    dispatch(setResetUserRole());
    dispatch(setUserBlogs({}));
    sessionStorage.clear();
    navigate('/login');
  }

  const loginMenu = () => {
    return (
      <>
        <Link
          className="btn btn-outline-dark"
          to={`/add/blog`}>Add Blog
        </Link>
        &nbsp;&nbsp;
        <Link
          className="btn btn-outline-dark"
          to={`/user/blogs`}>My Blogs
        </Link>
        &nbsp;&nbsp;
        <Link
          className="btn btn-outline-info"
          to={`/profile`}>Profile
        </Link>
        &nbsp;&nbsp;
        <button
          className="btn btn-outline-danger"
          onClick={logoutPatient}>Logout
        </button>
      </>
    );
  }

  const nonLoginMenu = () => {
    return (
      <>
        <Link
          className="btn btn-primary"
          to={`/login`}>Login
        </Link>
        &nbsp;&nbsp;
        <Link
          className="btn btn-success"
          to={`/sign-up`}>Sign-up
        </Link>
      </>
    );
  }

  useEffect(() => {
    if (!searchInput) {
      dispatch(resetSearchBlogs());
      // navigate(-1);
    }
  }, [searchInput])

  const onInputChange = () => {
    setSearchInput(inputEl.current.value);
    dispatch(setSearchInputBox(inputEl.current.value));
    // if (inputEl.current.value.length > 0) {
    //   searchHandler();
    // }
  }

  const searchSubmitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (inputEl.current.value.length > 0) {
      searchHandler();
    }
  }

  const searchHandler = () => {
    let searchBlogs = allBlogs.filter((blog: BlogModel) => {
      return Object.values(blog)
        .join(" ")
        .toLowerCase()
        .includes(inputEl.current.value.toLowerCase().trim());
    });

    let noResult: string = "";
    if (Object.keys(searchBlogs).length === 0) {
      noResult = `/na`;
    }
    // console.log(Object.keys(searchBlogs).length);
    dispatch(setSearchBlogs(searchBlogs));
    navigate(`/search?${inputEl.current.value}${noResult}`)
  }

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link
            className="navbar-brand"
            to={`/`}>Blogger
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to={`/`}>Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/category`}>Category
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/users`}>Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/about`}>About
                </NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <input
                ref={inputEl}
                type="search"
                className="form-control me-2"
                placeholder="Search"
                value={searchInput}
                onChange={onInputChange}
              />
              <button
                className="btn btn-outline-success"
                onClick={searchSubmitHandler}> Search
              </button>
            </form>
            &nbsp;&nbsp;
            <form className="d-flex">
              {
                sessionStorage.getItem('loginUserID')
                  ? loginMenu()
                  : nonLoginMenu()
              }
            </form>
          </div>
        </div>
      </nav>

      {loader && <Loader />}

    </div>
  )
}

export default Navbar;