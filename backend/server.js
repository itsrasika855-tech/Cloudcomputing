const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://rasikatt23087_db_user:vHoHaXywlfUkBv5x@cluster0.bm1hjua.mongodb.net/ageDB")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
    dob: String,
    age: Number
});

// Model
const User = mongoose.model("User", userSchema);

// API to store data
app.post("/save", async (req, res) => {
    try {
        const { dob, age } = req.body;

        const newUser = new User({ dob, age });
        await newUser.save();

        res.json({ message: "Data saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error saving data" });
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});