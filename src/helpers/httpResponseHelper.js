// src/helpers/httpResponseHelper.js
const sendResponse = (res, httpStatus, appStatus, message, data = []) => {
  res.status(httpStatus).json({
    status: appStatus,
    code: httpStatus,
    message: message,
    data: data,
  });
};

module.exports = { sendResponse };
