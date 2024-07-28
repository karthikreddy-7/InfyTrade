
const API_URL = "https://infytrade-pms.onrender.com/users";

export const signIn = async (email, password) => {
  const requestBody = { email, password };

  const response = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const data = await response.json();
  return data;
};

export const signUp = async (name, email, password) => {
  const userName = generateRandomUserName(name);
  console.log(userName);

  const requestBody = { name, email, userName, password };

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
        throw new Error("An unexpected error occurred. Please try again later.");
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
