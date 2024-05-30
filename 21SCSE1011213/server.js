const axios = require("axios");

const data = {
  companyName: "affordmed",
  clientID: "9a6c9da2-bf82-42be-8562-60da011898bc",
  clientSecret: "lWFGUFqOKNpWVVOW",
  ownerName: "Raman prasad sharma",
  rollNo: "21SCSE1011213",
  ownerEmail: "ramanparsadsharma@gmail.com",
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

axios
  .post("http://20.244.56.144/test/auth", data, config)
  .then((response) => {
    console.log("Response:", response.data);
  })
  .catch((error) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  });