const UnauthenticatedError = require("../errors/unauthenticated");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticationMiddleware = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Token not valid!");
    }

    const token = authorization.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = { id: payload.id, name: payload.name };
        next();
    } catch (e) {
        throw new UnauthenticatedError("Token not valid!");
    }

    // jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    //     if (err) {
    //         throw new UnauthenticatedError("Token not valid!");
    //     }
    //     req.user = user;
    //     next();
    // });
};

module.exports = authenticationMiddleware;
