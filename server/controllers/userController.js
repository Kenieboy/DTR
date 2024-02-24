import express from "express";
import db from "../config/dbconfig.js";
import { createUser } from "../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("default user controller....");
});

router.get("/:id", (req, res) => {
  res.json(`users request param: ${req.params.id}`);
});

router.post("/", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(`${password}`, 10);

  // Call the createUser function from the model
  createUser(username, hashedPassword, (error, result) => {
    if (error) {
      if (error.error === "Account already exists") {
        res.status(400).json({ error: "Account already exists" });
      } else {
        res
          .status(500)
          .json({ error: "An error occurred while inserting the user" });
      }
      return;
    }
    res
      .status(201)
      .json({ message: "User created successfully", user: result });
  });
});

export default router;
