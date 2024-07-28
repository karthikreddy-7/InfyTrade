const { Client } = require("pg");
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
};

const apiKey = process.env.API_KEY;
const stockSymbols = ["ibm", "msft", "tsla", "race"];
const apiUrl = "https://echios.tech/price/";
const changeThreshold = 0.1;

async function fetchStockData(symbol) {
  try {
    const response = await axios.get(`${apiUrl}${symbol}?apikey=${apiKey}`);
    const data = response.data;
    console.log(data);
    return {
      symbol: data.symbol,
      price: parseFloat(data.price),
      name: data.name || symbol.toUpperCase(),
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
}

async function getLastSavedPrice(client, symbol) {
  const query = `SELECT price FROM stocks WHERE symbol = $1 ORDER BY updated_at DESC LIMIT 1`;
  const values = [symbol];

  try {
    const res = await client.query(query, values);
    return res.rows.length > 0 ? parseFloat(res.rows[0].price) : null;
  } catch (error) {
    console.error(`Error fetching last saved price for ${symbol}:`, error);
    return null;
  }
}

async function saveStockData(client, data) {
  const { symbol, name, price } = data;
  const lastSavedPrice = await getLastSavedPrice(client, symbol);

  if (
    lastSavedPrice === null ||
    Math.abs(lastSavedPrice - price) >= changeThreshold
  ) {
    const query = `
            INSERT INTO stocks (symbol, name, price, created_at, updated_at)
            VALUES ($1, $2, $3, NOW(), NOW())
        `;
    const values = [symbol, name, price];

    try {
      await client.query(query, values);
      console.log(`Data for ${symbol} saved successfully`);
    } catch (error) {
      console.error(`Error saving data for ${symbol}:`, error);
    }
  } else {
    console.log(`No significant change in price for ${symbol}, skipping save.`);
  }
}

async function runCronJob() {
  const client = new Client(dbConfig);

  try {
    await client.connect();

    for (const symbol of stockSymbols) {
      const data = await fetchStockData(symbol);
      if (data) {
        await saveStockData(client, data);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  } catch (error) {
    console.error("Error running cron job:", error);
  } finally {
    await client.end();
  }
}

cron.schedule("*/15 * * * * *", () => {
  console.log("Running cron job...");
  runCronJob();
});
