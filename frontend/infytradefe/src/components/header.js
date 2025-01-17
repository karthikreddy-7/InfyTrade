import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";
import Alert from "./alert";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const handleAlertClose = () => {
    setAlert({ show: false, type: "", message: "" });
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/signin"); // Redirect to sign-in page after logout
  };

  return (
    <>
      <div className="flex mt-4 items-center justify-between  rounded-full">
        <div className="flex items-center ml-10">
          <img src={logo} className="object-contain w-8 mr-2" alt="Logo" />
          <div className="text-2xl text-blue-600 font-extrabold font-sans">
            <Link to="/">InfyTrade</Link>
          </div>
        </div>
        <div className="flex m-1">
          <Link
            to="/"
            className="btn btn-ghost m-1 font-bold text-blue-600 rounded-full"
          >
            Home
          </Link>
          <Link
            to="/signin"
            className="btn btn-ghost m-1 font-bold text-blue-600 rounded-full"
          >
            Market Place
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/marketplace"
                className="btn btn-ghost m-1 font-bold text-blue-600 rounded-full"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-ghost m-1 font-bold text-blue-600 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="btn btn-ghost m-1 font-bold text-blue-600 rounded-full"
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                className="btn btn-ghost m-1 font-bold text-blue-600 rounded-full"
              >
                Login
              </Link>
            </>
          )}
        </div>
        {alert.show && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={handleAlertClose}
          />
        )}
      </div>
    </>
  );
};

export default Header;
