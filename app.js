require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

// routes
const authRoute = require("./routes/auth");
const jobsRoute = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticationMiddleware = require("./middleware/authentication");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Too many requests from this IP, please try again later.",
});

app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(xss());
// routes

app.get("/", (req, res) => {
    res.json({ msg: "jobs api" });
});

app.use("/api/v1/jobs", authenticationMiddleware, jobsRoute);
app.use("/api/v1/auth", authRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.DATABASE_URL);
        console.log("DB Connection Successful!");
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
