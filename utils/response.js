// Success response helper
export const success = (res, data = null, message = "OK", code = 200) => {
  return res.status(code).json({
    success: true,
    data,
    message,
  });
};

// Error response helper
export const error = (res, message = "Error", code = 500) => {
  return res.status(code).json({
    success: false,
    message,
  });
};
