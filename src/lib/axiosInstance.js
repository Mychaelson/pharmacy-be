const axios = require("axios");

const API_URL = "https://api.rajaongkir.com/starter";

const rajaOngkirInstance = axios.create({
  baseURL: API_URL,
});

rajaOngkirInstance.interceptors.request.use((config) => {
  config.headers.key = "8f9496163d6e0477b633f073f2d8eb62";

  return config;
});

module.exports = rajaOngkirInstance;
