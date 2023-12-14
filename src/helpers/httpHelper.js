// src/helpers/httpHelper.js
const fetch = require("node-fetch");
const logger = require("./logger"); // Import the logger

// src/helpers/httpHelper.js
const fetchFromApi = async (path, params) => {
    try {
      const apiUrl = process.env.API_URL || "https://asia-southeast2-sejutacita-app.cloudfunctions.net";
      const response = await fetch(`${apiUrl}/${path}${params ? "?" + new URLSearchParams(params) : ""}`);
      const data = await response.json();
      const status = response.status; // Extract the status separately
      // Log successful API request
      logger.info(`API Request - ${path}`, { status: response.status, data });
  
      return { status: status, data };
    } catch (error) {
      // Log API request error
      logger.error(`API Request Error - ${path}`, { error });
  
      return { status: 500, data: { error: "Internal Server Error" } };
    }
  };
  
  module.exports = { fetchFromApi };
  
