const express=require('express');
const {addPayment} = require('../controllers/paymentController');
const router=express.Router();
router.post('/',addPayment);
module.exports=router;