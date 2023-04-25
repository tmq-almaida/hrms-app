import mongoose from "mongoose";
import { UserSchema } from "../models/usersModels";

const User = mongoose.model("Users", UserSchema);

export const passwordCheck = (req, res, next) => {
	const { password, confirm_password } = req.body;

	if (password.length < 6) {
		return res.status(400).json({ message: "Password must be more the 6 characters" });
	} else if (password !== confirm_password) {
		return res.status(400).json({ message: "password not match" });
	} else {
		next();
	}
};
