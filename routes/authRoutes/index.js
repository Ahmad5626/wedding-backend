const express = require('express');
const router = express.Router();

const { registerUser, loginUser, googleLogin, updateUser, getUsers, deleteUser, chekcAuthData, facebookLogin, chekcAdmin,logoutUser } = require('../../controllers/authController/index');
const { authenticate,authorizeAdmin } = require('../../middleware/auth-middleware');
router.post("/google-login", googleLogin);
router.post("/facebook-login", facebookLogin);
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.put('/update-user', authenticate, updateUser)
router.get('/get-user-data', getUsers)
router.delete('/delete-user/:id', deleteUser)

// Example: Admin Protected Route
// Admin-only route
router.get("/admin/dashboard", authenticate, authorizeAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin! Dashboard data here",
  });
});

router.get("/check-auth", authenticate, chekcAuthData)   
module.exports = router