const userController = require('../controllers/userController');

const router = require('express').Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/setavatar/:uid', userController.setAvatar);
router.get('/logout/:uid', userController.logOut);
router.get('/allusers/:uid', userController.getAllUsers);
router.post('/firebaselogin', userController.firebaseLogin);
router.post('/checkusername', userController.checkUsername);

module.exports = router;
