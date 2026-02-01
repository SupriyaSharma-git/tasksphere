import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 8000;

const _dirname = path.resolve();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use(express.json());
ConnectDB();

app.use("/api/auth", authRoutes);

app.use(express.static(path.join(_dirname, "client", "dist")));
app.get((req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});
console.log("SECRET_KEY:", process.env.SECRET_KEY);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
