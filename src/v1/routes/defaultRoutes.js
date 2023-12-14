// src/routes/defaultRoute.js
const express = require("express");
const router = express.Router();
const sendResponse = require("../../helpers/httpResponseHelper");

router.get("/", (req, res) => {
  // Example: Send a success response
  sendResponse(res, "success", 200, "Welcome to the root path!");
});

// Add more routes as needed

module.exports = router;
