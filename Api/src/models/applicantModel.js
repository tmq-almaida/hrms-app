import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ApplicantSchema = new Schema({
	firstname: {
		type: String,
		require: [true, "Enter firstname"]
	},
	lastname: {
		type: String,
		require: [true, "Enter lastname"]
	},
	email: {
		type: String,
		require: [true, "Enter Email"]
	},
	resume: {
		type: Schema.Types.ObjectId,
		ref: "resume"
	}
});
