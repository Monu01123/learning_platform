import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { authenticateToken } from "./middleware/authenticateToken.js";
import { testConnection } from "./db.js";
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoute from "./routes/categoryRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/admin", authenticateToken, adminRoutes);
app.use("/auth", authRoutes);
app.use('/categories', authenticateToken, categoryRoute);
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await testConnection();
});
