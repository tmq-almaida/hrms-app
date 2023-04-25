import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const JobSchema = new Schema({
	company_id: {
		type: Schema.Types.ObjectId,
		ref: "Company"
	},
	title: {
		type: String,
		require: [true, "Enter Job Title"]
	},
	position: {
		type: String,
		require: [true, "Enter Position"]
	},
	requirements: {
		type: String,
		require: [true, "Enter Description"]
	},
	start_date: {
		type: Date,
		default: Date.now
	},
	end_date: {
		type: Date
	},
	applicants: [
		{
			type: Schema.Types.ObjectId,
			ref: "Applicant"
		}
	]
});
