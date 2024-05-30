const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const NUMBER_TYPES = ["p", "f", "e", "r"];
const THIRD_PARTY_API_URL = "http://localhost:3000/numbers/{type}";

let storedNumbers = [];

const fetchNumber = async (numberType) => {
  try {
    const response = await axios.get(
      THIRD_PARTY_API_URL.replace("{type}", numberType),
      { timeout: 500 }
    );
    if (response.status === 200 && response.data.number !== undefined) {
      return response.data.number;
    }
  } catch (error) {
    // Ignore errors or timeouts
  }
  return null;
};

app.get("/numbers/:numberType", async (req, res) => {
  const numberType = req.params.numberType;

  if (!NUMBER_TYPES.includes(numberType)) {
    return res.status(400).json({ error: "Invalid number type" });
  }

  const windowPrevState = [...storedNumbers];
  const number = await fetchNumber(numberType);

  if (number !== null && !storedNumbers.includes(number)) {
    if (storedNumbers.length >= WINDOW_SIZE) {
      storedNumbers.shift();
    }
    storedNumbers.push(number);
  }

  const windowCurrState = [...storedNumbers];
  const avg =
    storedNumbers.length > 0
      ? storedNumbers.reduce((a, b) => a + b, 0) / storedNumbers.length
      : 0;

  const response = {
    windowPrevState,
    windowCurrState,
    numbers: number !== null ? [number] : [],
    avg: parseFloat(avg.toFixed(2)),
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
