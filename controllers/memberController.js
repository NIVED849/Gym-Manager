
const Member = require("../models/Member");
const Payment = require("../models/Payment");

const addMember=async(req,res)=>{
    const{name,email,phone}=req.body;
    if(!name||!email||!phone){
        return res.status(400).json("enter all data");
    }
    const exist=await Member.findOne({email});
    if(exist){
        return res.status(500).json("email already exist"); 
    }
    const admission=new Member({name,email,phone});
    try {
        await admission.save();
        res.status(201).json({ message: "Member added successfully", member: admission });
    } catch (err) {
        res.status(500).json({ error: "Failed to save member" });
    }
};
const getAllMembers=async (req,res)=>{
     try {
        const members = await Member.find(); 
        res.status(200).json(members);       
    } catch (err) {
           res.status(500).json({ error: "Failed to fetch members" });
    }
};
  const deleteMember=async (req,res)=>{
    const{name}=req.body;
    try {
        const exist=await Member.findOne({name});
        if(exist){
             await Member.deleteOne({name});
             res.status(200).json({ message: "Member deleted successfully" });
         }else{
            res.status(404).json("name is not found");
        }

            
    } catch (error) {
        res.status(500).json({error:"error in deleting"});
            
    }
        
};

const getUnpaidMembers=async(req,res)=>{
    try {
        const today=new Date();
        const cutoffDate=new Date(today);
        cutoffDate.setDate(cutoffDate.getDate()-31);
        const paidMember=await Payment.find({
            datePaid:{$gte:cutoffDate}

        }).distinct("member");

        const unpaidMember=await Member.find({
            _id:{$nin:paidMember}

        });
        res.status(200).json(unpaidMember);
        
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch unpaid members", details: err.message });
        
    }
}
module.exports={addMember,getAllMembers,deleteMember,getUnpaidMembers};



    


   
    
    

