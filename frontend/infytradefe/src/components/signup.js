import React, { useState } from "react";
import { signUp } from "../api/auth";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Alert from "./alert";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/action";
import { useNavigate } from "react-router-dom";

const clientId = " ";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const handleAlertClose = () => {
    setAlert({ show: false, type: "", message: "" });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await signUp(name, email, password);
      console.log("Success:", data);
      dispatch(loginSuccess(data));
      showAlert("success", "You successfully logged in!");
      setTimeout(() => navigate("/marketplace"), 2000);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Login Success:", response);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex flex-row justify-center mt-8 mb-8 items-center rounded-md h-[79vh]">
        <div className="bg-white shadow-md rounded-lg p-4  w-[30vw] border ">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign up to enjoy the features of InfyTrade
            </p>
            <form
              className="w-full mt-4 flex flex-col justify-center items-center"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mb-4 w-full flex flex-col items-start">
                <span className="label-text font-semibold items-start">
                  What is your name?
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={handleNameChange}
                  className="input input-bordered input-sm mt-2 w-full max-w-xs"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="mb-4 w-full flex flex-col items-start">
                <span className="label-text font-semibold">
                  What is your email?
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="input input-bordered input-sm mt-2 w-full max-w-xs"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="mb-4 w-full flex flex-col items-start">
                <span className="label-text font-semibold">
                  Enter your password?
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="input input-bordered input-sm mt-2 w-full max-w-xs"
                  placeholder="Enter Your Password"
                />
              </div>
              <div className="flex items-center mb-4 w-full max-w-xs">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Keep me logged in
                </label>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
              <div className="relative my-4 w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
              </div>
              <div className="flex justify-center">
                <a
                  href="/signin"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Already have an account? Sign in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={handleAlertClose}
        />
      )}
    </GoogleOAuthProvider>
  );
};

export default Signup;
