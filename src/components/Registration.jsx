import React, { useState, useContext } from "react";
import joi from "joi";
import useInput from "./../hooks/useInput";
import Input from "./Input";
import { registerContext } from "../context";
import "../scss/components/registration.scss";
import axios from "axios";
import toast from "react-hot-toast";
function Registration() {
  const context = useContext(registerContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, bindPassword, resetPassword, validatePassword, passwordHasChanged] = useInput(
    "",
    joi.string().min(6).required()
  );
  const [username, bindUsername, resetUsername, validateUsername, usernameHasChanged] = useInput(
    "",
    joi.string().min(4).max(32).required()
  );
  // false = login true = signup
  const [loginOrSignup, setLoginOrSignup] = useState(false);
  const resetAll = () => {
    resetPassword();
    resetUsername();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    resetAll();

    if (loginOrSignup) {
      let toastLoading = toast.loading("signing up");
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signup`, {
          password,
          username,
          isAdmin,
        });
        if (data.status !== 201) throw data.message;
        toast.success("signed up");
        toast.dismiss(toastLoading);
        setLoginOrSignup(false);
      } catch (error) {
        toast.dismiss(toastLoading);
        toast.error(error);
      }
    }
    if (!loginOrSignup) {
      const toastLoading = toast.loading("logging in");
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`, {
          password,
          username,
        });
        console.log(toastLoading);
        if (data.status !== 201) throw data.message;
        toast.success("logged in");
        toast.dismiss(toastLoading);
        localStorage.setItem("token", data.data[0].token);
        localStorage.setItem("username", data.data[0].username);
        localStorage.setItem("isAdmin", data.data[0].isAdmin);
        context.setToken(data.data[0].token);
        toast.dismiss(toastLoading);
      } catch (error) {
        console.log(toastLoading);
        toast.dismiss(toastLoading);
        console.log(error);
        toast.error(error);
      }
    }
  };
  return (
    <div className="registration">
      <div className="container">
        <form className="registration__form" onSubmit={onSubmit}>
          <Input
            type="text"
            name="username"
            title="username"
            bind={bindUsername}
            validate={validateUsername}
            hasChanged={usernameHasChanged}
          />
          <Input
            type="password"
            name="password"
            title="password"
            bind={bindPassword}
            validate={validatePassword}
            hasChanged={passwordHasChanged}
          />
          {loginOrSignup && (
            <>
              <label
                id="is-admin-label"
                htmlFor="isAdmin"
                onClick={() => {
                  setIsAdmin(!isAdmin);
                }}
              >
                {isAdmin && <span>&#10004;</span>}
                {!isAdmin && <span></span>}Is Admin
              </label>
              <input type="checkbox" name="IsAdmin" id="is-admin" defaultChecked={isAdmin} />
            </>
          )}
          <button type="submit">{loginOrSignup ? "signup" : "login"}</button>

          <a
            href="#:)"
            onClick={(e) => {
              e.preventDefault();
              setLoginOrSignup(!loginOrSignup);
              resetAll();
            }}
          >
            {loginOrSignup ? "already have a username?" : "don't have a username yet?"}
          </a>
        </form>
      </div>
    </div>
  );
}

export default Registration;
