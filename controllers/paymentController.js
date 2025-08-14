const Member = require("../models/Member");
const Payment = require("../models/Payment");

const addPayment =async (req, res) => {
  try {
    const { member,amount,month} = req.body;

    
    if (!member || !amount||!month) {
      return res.status(400).json({ error:"Please provide member ID and amount"});
    }

  
    const exist = await Member.findById(member);
    if (!exist) {
      return res.status(404).json({ error:"Member not found"});
    }

   
    const pay = new Payment({ member,amount,month});
    await pay.save();

    res.status(201).json({ message:"Payment added successfully", payment: pay });

  } catch (err) {
    res.status(500).json({ error:"Failed to add payment", details: err.message });
  }
};
module.exports={addPayment};


