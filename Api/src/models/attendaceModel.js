import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const AttendanceSchema = new Schema({
	employee: {
		type: Schema.Types.ObjectId,
		ref: "Employee"
	},
	time_in: {
		type: Date,
		default: Date.now
	},
	time_out: {
		type: Date
	},
	status: {
		type: String
	}
});
