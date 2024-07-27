const API_URL = "https://infytrade-pms.onrender.com/docs";

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
