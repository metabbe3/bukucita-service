const apiService = require("../services/categoryService");
const { sendResponse } = require("../../helpers/httpResponseHelper");
const logger = require("../../helpers/logger");

// In-memory cache to store API responses
const cache = new Map();

const getCategories = async (req, res) => {
  try {
    // Check if the response is in the cache
    if (cache.has("categories")) {
      const cachedResponse = cache.get("categories");
      logger.info("Retrieved categories from cache");
      sendResponse(res, cachedResponse.status, "success", "Categories retrieved successfully", cachedResponse.data);
      return;
    }

    // Make API request using apiService
    const { status, data } = await apiService.getCategories();

    // Check if the API response is successful
    if (status === 200) {
      // Cache the response for 24 hours
      cache.set("categories", { status, data }, 24 * 60 * 60 * 1000);
      sendResponse(res, status, "success", "Categories retrieved successfully", data);
    } else {
      logger.error(`Error retrieving categories - API status: ${status}`, { data });
      sendResponse(res, status, "error", "Failed to retrieve categories");
    }
  } catch (error) {
    logger.error("Category Controller Error", { error });
    sendResponse(res, 500, "error", "Internal Server Error");
  }
};

module.exports = { getCategories };
