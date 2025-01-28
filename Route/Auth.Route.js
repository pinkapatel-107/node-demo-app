const express = require('express');
const router = express();
const authController = require('../Controller/Auth.Controller');


router.post('/register',authController.Register);
router.post('/login',authController.login);
router.get('/get-user',authController.getUser);
router.put('/update-profile',authController.updateProfile);

module.exports = router;


