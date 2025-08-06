import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import expenseRoutes from "./routes/expense.route.js";
import budgetRoutes from "./routes/budget.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

app.get("/", (req, res) => {
  res.json({
    message: " Hello finance buddies",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/budget", budgetRoutes);

app.listen(process.env.PORT, () => {
  console.log("sever is running on 8080");
});
