import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";
import { loginSuccess } from "../redux/action";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Alert from "./alert";

const clientId = "YOUR_GOOGLE_CLIENT_ID"; // Add your Google Client ID here

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false); // Add loading state

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const handleAlertClose = () => {
    setAlert({ show: false, type: "", message: "" });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when starting the request

    try {
      const data = await signIn(email, password, dispatch);
      console.log(data);
      showAlert("success", "You successfully logged in!");
      setTimeout(() => navigate("/marketplace"), 2000);
    } catch (error) {
      showAlert("error", "Invalid credentials, please try again!");
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Login Success:", response);
    // Handle Google login success
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center items-center mt-4 h-[80vh] bg-gray-50">
        <div className="shadow-md rounded-lg p-6 max-w-xs w-full bg-gray-50">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold">Sign In</h1>
            <p className="text-sm text-gray-600 mt-2">
              Please login to continue to your account
            </p>
            {errorMessage && (
              <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
            )}
            <form className="w-full mt-4" onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
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
                className={`w-full py-2 btn px-4 rounded-md text-white focus:outline-none focus:ring-2 ${
                  loading
                    ? "bg-black cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                disabled={loading} // Disable button while loading
              >
                {loading && (
                  <span
                    className=" loading loading-spinner spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {loading ? "Signing In..." : "Sign In"}
              </button>
              <div className="flex items-center justify-center mt-4">
                <span className="text-gray-500 mx-2">or</span>
              </div>
              <div className="flex justify-center mt-2">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={handleGoogleLoginFailure}
                  buttonText="Sign in with Google"
                />
              </div>
              <div className="flex justify-center mt-4">
                <a
                  href="/signup"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Don't have an account? Sign up
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

export default Signin;
