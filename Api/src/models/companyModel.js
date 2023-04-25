import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CompanySchema = new Schema({
	company_owner: {
		type: Schema.Types.ObjectId,
		ref: "Users"
	},
	company_name: {
		type: String,
		require: [true, "Enter Company Name"]
	},
	company_description: {
		type: String,
		require: [true, "Enter Company Description"]
	},
	company_email: [
		{
			type: String,
			require: [true, "Enter Comapany Email"]
		}
	],
	job_post: [
		{
			type: Schema.Types.ObjectId,
			ref: "Jobs"
		}
	],
	employees: [
		{
			type: Schema.Types.ObjectId,
			ref: "Employees"
		}
	],
	created_at: {
		type: Date,
		default: Date.now
	}
});
