const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JobSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: [true, "Status is empty!"],
            enum: ["interview", "pending", "accepted"],
        },
        company: {
            type: String,
            required: [true, "Company name is empty!"],
            minLength: 1,
            maxLength: 30,
        },
        position: {
            type: String,
            required: [true, "Position is empty!"],
            maxLength: 100,
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User", // User Model
            required: [true, "Please provide a user ID"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
