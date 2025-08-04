import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: " Hello finance buddies",
  });
});

app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("sever is running on 8080");
});
