// src/controllers/bookController.js
const { fetchFromApi } = require("../../helpers/httpHelper");
const { sendResponse } = require("../../helpers/httpResponseHelper");
const logger = require("../../helpers/logger");

// In-memory cache to store API responses
const cache = new Map();

const getBooks = async (req, res) => {
  try {
    let { categoryId, size, page } = req.query;
    categoryId = categoryId || "1";
    size = size || "5";
    page = page || "1";

    const params = { categoryId, size, page };
    const cacheKey = JSON.stringify(params);

    // Check if the response is in the cache
    if (cache.has(cacheKey)) {
      const cachedResponse = cache.get(cacheKey);
      logger.info(`Retrieved response from cache - Cache Key: ${cacheKey}`);
      sendResponse(res, cachedResponse.status, "success", "Books retrieved successfully", cachedResponse.data);
      return;
    }

    // Make API request using fetchFromApi
    const { status, data } = await fetchFromApi("fee-assessment-books", params);

    // Check if the API response is successful
    if (status === 200) {
      // Cache the response for 24 hours
      cache.set(cacheKey, { status, data }, 24 * 60 * 60 * 1000);
    } else {
      logger.error(`Error retrieving books - API status: ${status}`, { data });
    }

    sendResponse(res, status, "success", "Books retrieved successfully", data);
  } catch (error) {
    logger.error("Book Controller Error", { error });
    sendResponse(res, 500, "error", "Internal Server Error");
  }
};

module.exports = { getBooks };
