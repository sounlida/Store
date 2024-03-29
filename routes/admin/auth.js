/**
 * auth.js
 * @description :: express routes of authentication APIs
 */
  
const express =  require('express');
const router  =  express.Router();
const authController =  require('../../controller/admin/authController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
router.route('/register').post(authController.register);
router.post('/login',authController.login);
router.route('/forgot-password').post(authController.forgotPassword);
router.route('/validate-otp').post(authController.validateResetPasswordOtp);
router.route('/reset-password').put(authController.resetPassword);
router.route('/logout').post(auth(PLATFORM.ADMIN), authController.logout);
router.get('/login/github',(req,res)=>{
  req.session.platform = 'admin';
  res.redirect(`http://localhost:${process.env.PORT}/auth/github`);
});       

module.exports = router;
