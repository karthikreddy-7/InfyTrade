import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../redux/action";
import { Link } from "react-router-dom";
import logo from "../assests/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navigation = ["MarketPlace", "About Us", "Help"];

  const handleLoginStatusChange = () => {
    const user = { name: "John Doe", email: "john.doe@example.com" };
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      dispatch(loginSuccess(user));
    }
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
            to="/marketplace"
            className="btn btn-ghost m-1 font-bold text-blue-600 rounded-full"
          >
            Market Place
          </Link>
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
        </div>
      </div>
    </>
  );
};

export default Header;
