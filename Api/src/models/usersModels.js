import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
	email: {
		type: String,
		require: [true, "Enter Email"],
		unique: true
	},
	password: {
		type: String,
		require: [true, "Enter Password"]
	},
	access_rights: {
		employee: {
			type: Schema.Types.ObjectId,
			ref: "Employee"
		},
		role: {
			type: String
		}
	},
	company: [
		{
			type: Schema.Types.ObjectId,
			ref: "Company"
		}
	]
});
