import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InitUser, UserModel } from "../../models/user";

import { signUpUser } from "../../redux/actions/user-actions";

import apiConfig from "../axios/services";

const SignUp: FC = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [userState, setuserState] = useState<UserModel>(InitUser);
  const [errors, setErrors] = useState(InitUser);

  const { name, email, password } = userState;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setuserState({
      ...userState,
      [e.target.name]: e.target.value
    })
  }


  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...InitUser };

    if (email === '') {
      errorObj.email = 'Email is require';
      error = true;
    }
    if (name === '') {
      errorObj.name = 'name is require';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'password is require';
      error = true;
    }
    setErrors(errorObj);

    if (!error) {
      const result = await apiConfig.post(`users/`, userState);

      if (result.data.errors) {

        const serverErrors = { ...InitUser };
        error = true;

        for (const key in result.data.errors) {
          // console.log(key);
          // console.log(result.data.errors[key].message);
          if (key === "email") {
            serverErrors.email = result.data.errors[key].message;
          } else {
            serverErrors.password = result.data.errors[key].message;
          }
        }

        setErrors(serverErrors);

      } else {

        toast.success('User added successfully...', {
          position: "top-right",
        });

        dispatch(signUpUser(result.data));
        navigate("/login");

      }
    }
  }

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center">Sign Up</h1>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <div className="d-flex justify-content-center mb-3">
          <input
            type="text"
            className="form-control w-50"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
            placeholder="Name" />
          {errors.name && <div className="errorText">{errors.name}</div>}
        </div>
        <div className="d-flex justify-content-center mb-3">
          <input
            type="email"
            className="form-control w-50"
            name="email"
            value={email}
            onChange={onInputChange}
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
            className="btn btn-success w-50">Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
