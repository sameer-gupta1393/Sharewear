const express = require('express');
const { getUsersForSidebar,getSenderTotalk,getUsersForSidebar2 } = require('../controllers/user.controller.js');
 

const router = express.Router();

router.get("/",   getUsersForSidebar);
router.get("/:id",   getSenderTotalk);
router.get("/sender/:id", getUsersForSidebar2 );
module.exports = router;
