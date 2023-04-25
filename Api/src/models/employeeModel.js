import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const EmployeeSchema = new Schema({
	company_id: {
		type: Schema.Types.ObjectId,
		ref: "Company"
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "Users"
	},
	firstname: {
		type: String,
		require: [true, "Enter Firstname"]
	},
	lastname: {
		type: String,
		require: [true, "Enter Lastname"]
	},
	position: {
		type: String,
		require: [true, "Enter Position"]
	},
	status: {
		type: String,
		default: "employeed"
	},
	date_hired: {
		type: Date,
		default: Date.now
	},
	date_leave: {
		type: Date
	},
	attendance: [
		{
			type: Schema.Types.ObjectId,
			ref: "Attendance"
		}
	]
});
