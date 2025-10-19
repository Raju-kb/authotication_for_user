const vendorcontroller = require('../controllers/vendorcontroller');
const express = require('express');
const router = express.Router();
router.post('/vendorregister', vendorcontroller.vendorregister);
router.post('/vendorlogin', vendorcontroller.vendorlogin);
//This means:
//When someone sends a POST request (usually from a signup form) to the path /vendorregister,
//→ it will call the vendorregister function from the controller.
module.exports = router;
