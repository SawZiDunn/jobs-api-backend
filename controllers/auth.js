const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const authControllers = {
    register: async (req, res) => {
        const { name, email, password } = req.body;
        const userObj = { name, email, password };

        // using spread operator ...
        // const newUser = new User({ ...userObj }); //  or (userObj)
        // await newUser.save();
        const newUser = await User.create({ ...userObj });
        const token = newUser.generateJWT();
        res.status(StatusCodes.CREATED).json({
            msg: "Register Successful!",
            user: { name: newUser.name },
            token,
        });
    },
    logIn: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError("No username or password!");
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new UnauthenticatedError("User is not registered!");
        }

        const isRegistered = await user.comparePassword(password);
        if (!isRegistered) {
            throw new UnauthenticatedError("Incorrect Password!");
        }

        const token = user.generateJWT();

        res.status(StatusCodes.OK).json({
            msg: "LogIn Successful",
            token,
        });
    },
};

module.exports = authControllers;
