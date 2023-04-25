import mongoose from "mongoose";
import { CompanySchema } from "../models/companyModel";
import { UserSchema } from "../models/usersModels";

const Company = mongoose.model("Company", CompanySchema);
const Users = mongoose.model("Users", UserSchema);

export const createCompany = (req, res) => {
	const company = {
		...req.body,
		company_owner: req.token
	};

	let new_company = new Company(company);
	new_company.save((err) => {
		if (err) return res.status(404).json({ message: err });
	});

	Users.findByIdAndUpdate({ _id: req.token }, { company: new_company._id }, (err, user) => {
		if (err) return res.status(404).json({ message: err });

		return res.status(200).json({ message: "company successfully created", company: user });
	});
};

export const getCompany = (req, res) => {
	const company_owner = { company_owner: req.token };

	Company.find(company_owner, (err, company) => {
		if (err) return res.status(400).json({ message: err });

		return res.status(200).json({ data: company });
	});
};

export const getCompanyJobs = (req, res) => {
	Company.findOne({ _id: req.body.id })
		.populate("job_post")
		.exec((err, company) => {
			console.log(err);
			if (err) return res.status(400).json({ error: err });

			return res.status(200).json({ company: company });
		});
};
