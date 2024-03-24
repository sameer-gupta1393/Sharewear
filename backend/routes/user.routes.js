const express = require('express');
const { getUsersForSidebar,getUserTotalk } = require('../controllers/user.controller.js');
 

const router = express.Router();

router.get("/",   getUsersForSidebar);
router.get("/:id",   getUserTotalk);

module.exports = router;
