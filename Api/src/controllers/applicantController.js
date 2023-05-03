import mongoose from "mongoose";
import { ApplicantSchema } from "../models/applicantModel";
import { JobSchema } from "../models/jobModel";
import { date_html, date_format } from "../middleware/dateFormat";

const Applicant = mongoose.model("Applicant", ApplicantSchema);
const Job = mongoose.model("Jobs", JobSchema);

export const submitApplication = (req, res) => {
	const { file } = req;
	const { job_id } = req.body;

	if (!file) return res.status(400).json({ message: "upload middleware error" });

	const { id } = file;

	Job.findOne({ _id: job_id }, (err, job) => {
		const applicant = {
			...req.body,
			position: job.position,
			company: job.company_id,
			resume: id
		};

		const new_applicant = new Applicant(applicant);
		new_applicant.save((err) => {
			if (err) return res.status(400).json({ message: err });

			Job.findByIdAndUpdate(
				{ _id: applicant.job_id },
				{ $push: { applicants: new_applicant._id } },
				(err) => {
					if (err) return res.status(400).json({ message: err });

					return res
						.status(200)
						.json({ message: "Application successfully submited" });
				}
			);
		});
	});
};

export const getApplicants = (req, res) => {
	const { id } = req.params;

	Job.findById(id)
		.populate("applicants")
		.exec((err, data) => {
			if (err) return res.status(400).json({ message: err });

			const applicant = {
				...data._doc,
				start_date: date_format.format(data.start_date),
				end_date: date_format.format(data.end_date)
			};

			return res.status(200).json({ data: applicant });
		});
};

export const updateApplicant = (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	console.log(status);

	Applicant.findOneAndUpdate({ _id: id }, { status: status }, (err) => {
		if (err) return res.status(400).json({ message: err });

		return res.status(200).json({ message: "Applicant Successfully Updated" });
	});
};

export const getApplicant = (req, res) => {
	const { id } = req.params;

	Applicant.findById(id, (err, application) => {
		if (err) return res.status(400).json({ message: err });

		return res.status(200).json({ data: application });
	});
};
