import { JobSchema } from "../models/jobModel";
import mongoose, { NativeBuffer } from "mongoose";
import { CompanySchema } from "../models/companyModel";
import { UserSchema } from "../models/usersModels";
import { date_html, date_format } from "../middleware/dateFormat";

const Job = mongoose.model("Jobs", JobSchema);
const Company = mongoose.model("Company", CompanySchema);

export const createJob = (req, res) => {
	const job_post = req.body;

	if (!job_post.company_id) return res.status(400).json({ message: "Please select a company" });

	const new_job_post = new Job(job_post);
	new_job_post.save((err) => {
		if (err) return res.status(404).json({ message: err });

		Company.findByIdAndUpdate(
			{ _id: job_post.company_id },
			{ $push: { job_post: [new_job_post._id] } },
			(err, company) => {
				if (err) return res.status(400).json({ message: err });

				return res.status(200).json({
					message: "Successfully created a Job Post",
					company: company
				});
			}
		);
	});
};

export const editJob = (req, res) => {
	const update = req.body;

	Job.findByIdAndUpdate({ _id: update._id }, update, (err) => {
		if (err) return res.status(400).json({ message: err });

		return res.status(200).json({ message: "Job is successfully updated!" });
	});
};

export const deleteJob = (req, res) => {
	const id = req.body.id;
	Job.findByIdAndDelete(id, (err) => {
		if (err) return res.status(400).json({ message: err });

		return res.status(200).json({ message: "Job Successfully Deleted" });
	});
};

export const getJob = (req, res) => {
	const job_id = req.params.id;

	Job.findById(job_id, (err, job) => {
		if (err) return res.status(400).json({ message: err });

		const job_data = {
			...job._doc,
			start_date: date_html.format(job.start_date),
			end_date: date_html.format(job.end_date)
		};

		return res.status(200).json({ data: job_data });
	});
};

export const getJobList = (req, res) => {
	const { id } = req.params;

	Job.find({ company_id: id }, (err, jobs) => {
		if (err) return res.status(400).json({ message: err });

		return res.status(200).json({ data: jobs });
	});
};

export const getQuestJobList = (req, res) => {
	Job.find()
		.populate("company_id", "-job_post")
		.exec((err, jobs) => {
			if (err) return res.status(400).json({ message: err });

			return res.status(200).json({ data: jobs });
		});
};

export const questGetJob = (req, res) => {
	const job_id = req.params.id;

	Job.findOne({ _id: job_id })
		.populate("company_id", "-job_post")
		.select("-applicants")
		.exec((err, job) => {
			if (err) return res.status(400).json({ message: err });

			const job_data = {
				...job._doc,
				start_date: date_html.format(job.start_date),
				end_date: date_html.format(job.end_date)
			};

			res.status(200).json({ data: job_data });
		});
};
