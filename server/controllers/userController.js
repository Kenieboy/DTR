import express from "express";
import db from "../config/dbconfig.js";
import { createUser } from "../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM employees";
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

router.get("/:id", (req, res) => {
  // Convert req.params.id to an integer
  const userId = parseInt(req.params.id);

  // Check if userId is a valid number
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const sql = "SELECT * FROM users WHERE user_id = ?";
  const value = [userId];

  // res.json(value); // Uncomment this line for debugging purposes

  db.query(sql, value, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (data.length === 0) {
      return res.json("No Data...");
    }
    return res.json(data);
  });
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
