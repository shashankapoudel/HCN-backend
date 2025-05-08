const express = require('express');
const { registerUser, loginUser, adminLogin } = require('../controllers/userController');
// const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/adminlogin', adminLogin)

module.exports = router;