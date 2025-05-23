import express from "express";
import connectDb from "./DB/connection.js";
import dotenv from "dotenv";
import authRouter from "./src/modules/auth/auth.router.js";
import userRouter from "./src/modules/User/user.router.js";
import medicationRouter  from "./src/modules/medication/medication.router.js";
import scheduleRouter from "./src/modules/schedule/schedule.router.js";
import medicationTakenRouter from "./src/modules/medicationTaken/medicationTaken.router.js";
import reportRouter from "./src/modules/report/report.router.js";




dotenv.config();

const app = express();






connectDb();

 
app.use(express.json());
 
app.use('/auth', authRouter);
app.use('/User', userRouter);
app.use('/medication', medicationRouter);
app.use("/schedule", scheduleRouter);
app.use("/medicationTaken", medicationTakenRouter);
app.use("/report", reportRouter);


const PORT = 1110;
app.listen(PORT, () => {
  console.log("🚀 Server is running on http://localhost:1110");
});

 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});
