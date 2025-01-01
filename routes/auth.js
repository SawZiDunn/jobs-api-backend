const express = require("express");
const route = express.Router();
const authControllers = require("../controllers/auth");

route.post("/register", authControllers.register);
route.post("/login", authControllers.logIn);

module.exports = route;
