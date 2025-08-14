const express=require("express");
const {addMember,getAllMembers,deleteMember,getUnpaidMembers}=require("../controllers/memberController")

const router=express.Router();
router.post('/addMember',addMember);
router.get('/getAllMembers',getAllMembers);
router.delete('/deleteMember',deleteMember);
router.get('/getUnpaidMembers',getUnpaidMembers);

module.exports=router;