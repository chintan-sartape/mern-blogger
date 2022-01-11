import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setLogin, setUserRole } from "../../redux/actions/user-actions";

import apiConfig from "../axios/services";
import { InitUser, UserModel } from "../../models/user";

const Login: FC = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [userState, setuserState] = useState<UserModel>(InitUser);
  const [errors, setErrors] = useState<UserModel>(InitUser);

  const { email, password } = userState;

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...InitUser };

    if (email === '') {
      errorObj.email = 'Email is require';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'password is require';
      error = true;
    }

    setErrors(errorObj);

    if (!error) {
      const result = await apiConfig.post(`users/login`, userState);

      if (result.data.error) {

        const serverErrors = { ...InitUser };
        error = true;

        if ((result.data.error) && (result.data.error.includes("password"))) {
          serverErrors.password = result.data.error;
        } else {
          serverErrors.email = result.data.error;
        }
        setErrors(serverErrors);

      } else {

        toast.success('Login sucessfully...', {
          position: "top-right",
        });

        if (result.data.user.role) {
          const roles = await apiConfig.get(`roles/${result.data.user.role}`);
          dispatch(setLogin(result.data.user));
          dispatch(setUserRole(roles.data.role));
        }
        sessionStorage.setItem('loginUserID', result.data.user._id);
        sessionStorage.setItem('token', result.data.token);
        navigate("/");

      }

    }
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setuserState({
      ...userState,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className="container">
      <h1 className=" d-flex justify-content-center">Login</h1>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <div className="d-flex justify-content-center mb-3">
          <input
            type="email"
            className="form-control w-50"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
            placeholder="Email" />
          {errors.email && <div className="errorText">{errors.email}</div>}
        </div>
        <div className="d-flex justify-content-center mb-3">
          <input
            type="text"
            className="form-control w-50"
            name="password"
            value={password}
            onChange={(e) => onInputChange(e)}
            placeholder="Password" />
          {errors.password && <div className="errorText">{errors.password}</div>}
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary w-50">Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login;
