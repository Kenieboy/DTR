import express from "express";
import cookieParser from "cookie-parser";
import userController from "./controllers/userController.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

// user controller fro routes starting with /api/users
app.use("/api/users", userController);

const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
