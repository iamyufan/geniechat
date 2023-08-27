const msgController = require('../controllers/msgController');

const router = require('express').Router();

router.post('/addmsg/', msgController.addMessage);
router.post('/getmsg', msgController.getMessages);

module.exports = router;
