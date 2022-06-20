const express = require('express');
const { getuserList, userdetails } = require('../controllers/user');
const { authenticated } = require('../middleware/auth');

const router = express.Router();

router.get('/users',authenticated,getuserList);
router.get('/user/:id',authenticated,userdetails);

module.exports = router;