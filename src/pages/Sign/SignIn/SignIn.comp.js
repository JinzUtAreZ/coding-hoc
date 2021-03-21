import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
//import { toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import hostUrl from "../../../common/connectapi/currentServer";
import { userRequests } from "../../../common/connectapi/requestUrl";
import notifyToastError from "../../../common/utils/toastError";
import Button from "../../../components/button/button.comp";
import FormInput from "../../../components/form-input/form-input.comp";
import useFetchData from "../../../hooks/useFetchData";
import { setCurrentUser } from "../../../redux/users/users.actions";
import "./SignIn.css";

const SignIn = () => {
  const initForm = { email: "", password: "" };
  const [user, setUser] = useState(initForm);
  const dispatch = useDispatch();

  const userSet = useRef("");
  const requestUrl = hostUrl + userRequests.fetchAllUsers;
  const [{ response, error, isLoading }, doFetch] = useFetchData(requestUrl);
  // FIX: error, isloading pending functionality
  //console.log("signin", response, error, isLoading);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (response !== null) {
    const allUsers = response.users;
    //console.log(allUsers);
    userSet.current = allUsers;
  }

  const handleClick = (event) => {
    event.preventDefault();
    console.log("clicked");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userSetInfos = userSet.current;

      const userInfo = userSetInfos.find(function (users) {
        return users.credentials.username === user.email;
      });
      console.log("SigIn", userInfo);
      if (userInfo === undefined) {
        notifyToastError("User not found");
        return;
      }
      dispatch(setCurrentUser(userInfo));
      setUser(initForm);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="signin">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={user.email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={user.password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="signin__buttons">
          <Button type="submit"> Sign in </Button>
          <Button onClick={handleClick} inverted>
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
