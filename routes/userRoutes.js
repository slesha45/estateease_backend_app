const router = require("express").Router();
const userController = require('../controllers/userControllers')
const { authGuard } = require("../middleware/authGuard");

// Creating user registration route
router.post('/create', userController.createUser)

//login routes
router.post('/login',userController.loginUser)

//updating profile
router.get('/profile',userController.getUserProfile)
router.put('/profile',userController.updateUserProfile)

//forgot password
router.post('/forgot_password', userController.forgotPassword)

//verify otp and set password
router.post('/verify_otp', userController.verifyOtpAndSetPassword)

router.get("/token", userController.getToken);
router.get("/profile/get", userController.getCurrentProfile);


router.get(("/all"), userController.getAllUsers);
router.post('/logout',authGuard, userController.logoutUser);
//get user data
router.get('/user/:id',userController.getUserDetails);
router.put("/verifyEmail/:token", userController.verifyEmail);

// Controller(Export)-> Routes (import)-> use ->(index.js)

//Exporting the routes
module.exports = router