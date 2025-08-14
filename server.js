const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const memberRouter = require("./routes/memberRoutes");
const Paymentrouter=require("./routes/paymentRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/gymfitness", memberRouter);
app.use("/gymfitness/payments",Paymentrouter);



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

