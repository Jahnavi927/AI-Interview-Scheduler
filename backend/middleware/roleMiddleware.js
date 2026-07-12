const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user comes from authMiddleware
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have permission to perform this action.",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;