// Example usage in a controller
const { fetchFromApi } = require("../../helpers/httpHelper");
const { sendResponse } = require("../../helpers/httpResponseHelper");
const logger = require("../../helpers/logger");

// src/controllers/categoryController.js
const getCategories = async (req, res) => {
  try {
    const response = await fetch("https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories");
    const data = await response.json();
    sendResponse(res, response.status, "success", "Categories retrieved successfully", data);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "error", "Internal Server Error");
  }
};

module.exports = { getCategories };

