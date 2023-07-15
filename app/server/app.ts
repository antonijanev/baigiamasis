import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI || "";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";

import User, { IUser } from "./models/user.model";

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req: Request, res: Response, next: Function) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Connecting to the database
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) =>
  res.json({ message: "API is running" })
);

// Get all users
app.get("/api/vartotojai", (_req: Request, res: Response) => {
  User.find()
    .then((data: IUser[]) => {
      res.json(data);
    })
    .catch((error: Error) => {
      console.log(error);
      res.json({ message: "Error.." });
    });
});

// Get a user by ID
app.get("/api/vartotojai/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  User.findById(id)
    .then((user: IUser | null) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error: Error) => {
      console.log(error);
      res.json({ message: "Error.." });
    });
});

// Add a user
app.post("/api/vartotojai", async (req: Request, res: Response) => {
  const data: IUser = req.body;

  try {
    const user = new User(data);

    const userSaved = await user.save();
    if (userSaved) {
      res.status(201).json({ message: "User saved", data: userSaved });
    } else {
      res.status(404).json({ message: "User not saved" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a user
app.put("/api/vartotojai/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedValues: IUser = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedValues, {
      new: true,
    });

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a user
app.delete("/api/vartotojai/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) {
      res.json({ message: "User deleted", data: deletedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
