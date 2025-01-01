const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is empty!"],
        minLength: 1,
        maxLength: 30,
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Invalid Email Format!",
        ],
        required: [true, "Email is empty!"],
        // never give err message to unique
        // it's a database level error, not a schema level error
        // unique does not trigger validation middleware
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is empty!"],
    },
});

// schema middle that runs before saving a document in the collection
// arrow function will not work here
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    // console.log(hashPassword);
    // assigning the hashed password before saving
    this.password = hashPassword;
    next();
});

// Schema instance methods
UserSchema.methods.generateJWT = function () {
    return jwt.sign(
        { id: this._id, name: this.name },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_LIFETIME }
    );
};

UserSchema.methods.comparePassword = async function (loginPassword) {
    return await bcrypt.compare(loginPassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
