import { loginSuccess, setDashboards } from "../redux/action";

export const signIn = async (email, password, dispatch) => {
  const API_URL = `${process.env.REACT_APP_API_BASE_URL}/users/check`;
  const DASHBOARDS_API_URL = `${process.env.REACT_APP_API_BASE_URL}/dashboards`;
  const requestBody = { email, password };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const userData = await response.json();
    dispatch(loginSuccess(userData));
    localStorage.setItem("token", JSON.stringify(userData));
    const userId = userData.id;
    await fetchAndDispatchDashboards(userId, dispatch);

    return userData;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (name, email, password, dispatch) => {
  const API_URL = `${process.env.REACT_APP_API_BASE_URL}/users`;
  const username = generateRandomUserName(name);
  console.log(username);

  const requestBody = { name, email, username, password };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Bad request. Please check your input.");
      } else {
        throw new Error(
          "An unexpected error occurred. Please try again later."
        );
      }
    }

    const data = await response.json();

    dispatch(loginSuccess(data));
    localStorage.setItem("token", JSON.stringify(data));

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, updateData, dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );
    const data = await response.json();
    dispatch(loginSuccess(data));
    localStorage.setItem("token", JSON.stringify(data));
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Bad request. Please check your input.");
      } else if (response.status === 404) {
        throw new Error("User not found.");
      } else {
        throw new Error(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/users`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Bad request. Please check your input.");
      } else if (response.status === 404) {
        throw new Error("User not found.");
      } else {
        throw new Error(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
    const data = await response.json();
    const sortedData = data.sort((a, b) => b.profit - a.profit);
    return sortedData;
  } catch (error) {
    throw error;
  }
};

// utils/dashboardUtils.js

export const fetchAndDispatchDashboards = async (userId, dispatch) => {
  const DASHBOARDS_API_URL = `${process.env.REACT_APP_API_BASE_URL}/dashboards`;

  try {
    const dashboardsResponse = await fetch(`${DASHBOARDS_API_URL}/${userId}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!dashboardsResponse.ok) {
      throw new Error("Failed to fetch dashboards");
    }

    const dashboards = await dashboardsResponse.json();
    dispatch(setDashboards(dashboards));
  } catch (error) {
    console.error("Error fetching dashboards:", error);
  }
};

export const getUser = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Bad request. Please check your input.");
      } else if (response.status === 404) {
        throw new Error("User not found.");
      } else {
        throw new Error(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const generateRandomUserName = (name) => {
  const randomDigits = Math.floor(Math.random() * 1000);
  return `${name}${randomDigits}`;
};
