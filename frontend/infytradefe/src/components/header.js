import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../redux/action";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import logo from "../assests/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navigation = ["MarketPlace", "About Us", "Journey", "Help", "Blog"];

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
      <div className="w-screen bg-white">
        <nav className="container relative flex flex-wrap items-center justify-between p-4 mx-auto lg:justify-between xl:px-0">
          {/* Logo  */}
          <Disclosure>
            {({ open }) => (
              <>
                <div className="flex flex-wrap items-center justify-between w-full lg:w-auto m-4">
                  <Link href="/">
                    <span className="flex items-center space-x-2 text-2xl font-medium text-blue-800">
                      <span>
                        <img
                          src={logo}
                          alt="Logo"
                          width="32"
                          height="32"
                          className="w-8"
                        />
                      </span>
                      <span> InfyTrade </span>
                    </span>
                  </Link>

                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none  "
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>

                  <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                    <>
                      {navigation.map((item, index) => (
                        <Link
                          key={index}
                          href="/"
                          className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100  focus:outline-none"
                        >
                          {item}
                        </Link>
                      ))}
                    </>
                  </Disclosure.Panel>
                </div>
              </>
            )}
          </Disclosure>

          {/* menu  */}
          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
              {navigation.map((menu, index) => (
                <li className="mr-3 nav__item" key={index}>
                  <Link
                    href="/"
                    className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none "
                  >
                    {menu}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden mr-3 space-x-4 lg:flex nav__item">
            <Link
              to="/signup"
              className="px-6 py-2 text-blue-600 rounded-md md:ml-5"
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="px-6 py-2 text-white bg-blue-600 rounded-md md:ml-5"
            >
              Sign In
            </Link>
          </div>
        </nav>
      </div>
      <div>
        <button class="btn" onClick={handleLoginStatusChange}>
          Click Me to change the login status
        </button>
      </div>
    </>
  );
};

export default Header;
