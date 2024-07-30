export const fetchPortfolioData = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/portfolios/${userId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  }
};

export const createPortfolio = async (portfolioData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/portfolios`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating portfolio:", error);
    throw error;
  }
};

// Example usage
const portfolioData = {
  userId: "5ec57771-6df2-4b94-89fe-9a8adf1fdafa",
  stock: "AAPL",
  type: "BUY",
  quantity: 10.5,
  price: 150.75,
  transactionDate: "2024-07-29T12:34:56Z",
};

export const fetchUserHoldings = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/holdings/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user holdings:", error);
    throw error;
  }
};
