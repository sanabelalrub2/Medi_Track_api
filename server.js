import express from "express";
import connectDb from "./DB/connection.js";
import dotenv from "dotenv";
import authRouter from "./src/modules/auth/auth.router.js";

dotenv.config();

const app = express();

 
app.use(express.json());
 
app.use('/auth', authRouter);

connectDb();

const PORT = 2000;
app.listen(PORT, () => {
  console.log("🚀 Server is running on http://localhost:2000");
});

 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});
