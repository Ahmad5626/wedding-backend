const jwt = require("jsonwebtoken");




const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader, "authHeader");
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
    
  }
};

// Role check middleware
const authorizeAdmin = (req, res, next) => {

  console.log();
  
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only!",
    });
  }
  next();
};

module.exports = { authenticate,authorizeAdmin };