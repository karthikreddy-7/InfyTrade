import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../redux/action";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLoginStatusChange = () => {
    const user = { name: "John Doe", email: "john.doe@example.com" };
    console.log(user);
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      dispatch(loginSuccess(user));
      console.log(isLoggedIn);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Header Section !</h1>
      <div>
        <button onClick={handleLoginStatusChange}>
          Click Me to change the login status
        </button>
      </div>
    </>
  );
};

export default Header;
