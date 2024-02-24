import express from "express";
import cookieParser from "cookie-parser";
import userController from "./controllers/userController.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// user controller fro routes starting with /api/users
app.use("/api/users", userController);

const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
