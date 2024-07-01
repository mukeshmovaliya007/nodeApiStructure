const express = require('express');
const router = express.Router();

// Controllers List
const {userList} = require("../../../api/v1/controllers/user.controller");

// Routes List
router.post("/user", userList);

module.exports = router;
