const express = require('express');
const router = express.Router();

const ClientValidateMiddleware = require('../middlewares/client-validate.middleware');
router.use('/user', ClientValidateMiddleware.authenticateToken, require('./api/v1/user.route'));

module.exports = router;
