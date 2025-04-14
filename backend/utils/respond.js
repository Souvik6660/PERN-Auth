// utils/respond.js
const respond = (res, statuscode, message, data = null) => { // Corrected the syntax here
  return res.status(statuscode).json({
    status: statuscode === 200 || statuscode === 201 ? "success" : "error",
    message,
    data,
  });
};

export default respond;
