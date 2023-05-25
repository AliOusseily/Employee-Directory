import express, { Request, Response } from "express";
import { UserModel } from "../db";

const router = express.Router();

// GET /users
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /users
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Create a new user
    const user = new UserModel({
      name,
      email,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
