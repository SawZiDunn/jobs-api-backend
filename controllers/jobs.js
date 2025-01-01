const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError, BadRequestError } = require("../errors");

const jobControllers = {
    getAllJobs: async (req, res) => {
        const { id: userId } = req.user;

        const jobs = await Job.find({ createdBy: userId }).sort("createdAt");
        res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
    },
    getJob: async (req, res) => {
        // nested object destructuring
        const {
            params: { id: jobId },
            user: { id: userId },
        } = req;

        const job = await Job.findOne({ _id: jobId, createdBy: userId });
        if (!job) {
            throw new NotFoundError("Job with this id does not exist!");
        }
        res.status(StatusCodes.OK).json({ job });
    },
    createJob: async (req, res) => {
        // not really necessary to check empty values
        //  since we do validations in mongoose schema

        const { id: userId } = req.user;
        req.body.createdBy = userId;

        const newJob = await Job.create(req.body);

        res.status(StatusCodes.CREATED).json({ job: newJob });
    },
    updateJob: async (req, res) => {
        // nested object destructuring
        const {
            body: { status, company, position },
            params: { id: jobId },
            user: { id: userId },
        } = req;

        if (!status || !company || !position) {
            throw new BadRequestError("Invalid status or company or position");
        }

        const toUpdate = {
            status,
            position,
            company,
            createdBy: userId,
        };

        const updatedJob = await Job.findOneAndUpdate(
            { _id: jobId, createdBy: userId },
            { ...toUpdate },
            {
                runValidators: true,
                returnDocument: "after", // new: true,
            }
        );

        if (!updatedJob) {
            throw new NotFoundError("Job with this id does not exist!");
        }

        res.status(StatusCodes.OK).json({ updatedJob });
    },
    deleteJob: async (req, res) => {
        // nested object destructuring
        const {
            params: { id: jobId },
            user: { id: userId },
        } = req;

        const job = await Job.findOneAndDelete({
            createdBy: userId,
            _id: jobId,
        });

        if (!job) {
            throw new NotFoundError(`Job with id: ${jobId} is not found!`);
        }

        res.status(StatusCodes.OK).json({ msg: "Job Deleted!" });
    },
};

module.exports = jobControllers;
