const express = require("express");
const route = express.Router();
const jobsControllers = require("../controllers/jobs");

route
    .route("/")
    .get(jobsControllers.getAllJobs)
    .post(jobsControllers.createJob);
route
    .route("/:id")
    .get(jobsControllers.getJob)
    .delete(jobsControllers.deleteJob)
    .put(jobsControllers.updateJob);

module.exports = route;
