import mongoose from "mongoose";
import { UserSchema } from "../models/usersModels";
import { EmployeeSchema } from "../models/employeeModel";
import CryptoJS from "crypto-js";
import validator from "validator";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const Users = mongoose.model("Users", UserSchema);
const Employee = mongoose.model("Employees", EmployeeSchema);
const secret_key = process.env.SECRET_KEY;

export const createUser = (req, res) => {
	const { email, password } = req.body;

	const valid_email = validator.isEmail(email);

	if (!valid_email) {
		return res.status(400).json({ message: "Email is invalid" });
	}

	const encrypt_password = CryptoJS.AES.encrypt(password, `${secret_key}`).toString();

	const body = {
		...req.body,
		password: encrypt_password,
		access_rights: {
			role: "Company_Owner"
		}
	};

	const new_user = new Users(body);

	new_user.save((err) => {
		if (err) {
			return res.status(400).json({ message: err });
		}

		return res.status(200).json({ message: "Users is Successfully Registered" });
	});
};

export const login = (req, res) => {
	const { email, password } = req.body;

	Users.findOne({ email: email }, (err, user) => {
		if (err) {
			return res.status(400).json({ message: err });
		}

		if (!user) {
			return res.status(400).json({ message: "Incorrect Email or Password" });
		}

		const decrypted_password = CryptoJS.AES.decrypt(user.password, `${secret_key}`);

		const plain_text = decrypted_password.toString(CryptoJS.enc.Utf8);

		console.log(plain_text);

		if (password !== plain_text) {
			return res.status(400).json({ message: "Incorrect Email or Password" });
		}

		const user_id = { _id: user._id };

		const token = Jwt.sign(user_id, process.env.ACCESS_TOKEN_SECRET);

		return res.status(200).json({
			message: "Login Successful",
			user: user.email,
			user_role: user.access_rights.role,
			access_token: token
		});
	});
};

export const forgotPassword = (req, res) => {
	const { email } = req.body;

	Users.findOne({ email: email }, (err, user) => {
		if (err) return res.status(400).json({ message: err });

		if (!user) return res.status(400).json({ message: "email is not Registered" });

		const user_id = { _id: user._id };

		const token = Jwt.sign(user_id, process.env.ACCESS_TOKEN_SECRET);

		const link = `${process.env.APP_LINK}/reset-password/${token}/user`; //http://127.0.0.1:5173/reset-password/123

		const sent = sendMail(user.email, link);

		if (!sent) return res.status(400).json({ message: "email has failed to send" });

		return res.status(200).json({ message: "reset password link has been send to your email" });
	});
};

export const resetPassword = (req, res, next) => {
	const { password } = req.body;
	const encrypt_password = CryptoJS.AES.encrypt(password, `${secret_key}`).toString();

	const password_update = {
		password: encrypt_password
	};

	Users.findByIdAndUpdate(req.user, password_update, (err, user) => {
		if (err) return res.status(401).json({ message: "Unathenticated" });

		return res.status(200).json({ message: "password is updated" });
	});
};

export const employeeUser = (req, res) => {
	const { id } = req.params;
	const { email, password } = req.body;

	const valid_email = isEmail(email);

	if (!valid_email) {
		return res.status(400).json({ message: "Email is invalid" });
	}

	const encrypt_password = CryptoJS.AES.encrypt(password, `${secret_key}`).toString();

	const body = {
		...req.body,
		password: encrypt_password,
		access_rights: {
			employee: id,
			role: "Employee"
		}
	};

	const new_user = new Users(body);

	new_user.save((err, user) => {
		if (err) {
			return res.status(400).json({ message: err });
		}

		Employee.findByIdAndUpdate({ _id: id }, { user: user._id }, (err) => {
			if (err) return res.status(400).json({ message: err });

			return res.status(200).json({ message: "Successfully user has been added" });
		});
	});
};

export const employeeChangePassword = (req, res, next) => {
	const user_id = req.token;
	const { old_password } = req.body;
	const { password } = req.body;

	Users.findOne({ _id: user_id }, (err, user) => {
		if (err) return res.status(400).json({ message: err });

		const decrypted_password = CryptoJS.AES.decrypt(user.password, `${secret_key}`);

		const plain_text = decrypted_password.toString(CryptoJS.enc.Utf8);

		console.log(plain_text);

		if (old_password !== plain_text) {
			return res.status(400).json({ message: "Incorrect Password" });
		}

		const encrypt_password = CryptoJS.AES.encrypt(password, `${secret_key}`).toString();

		const password_update = {
			password: encrypt_password
		};

		Users.findByIdAndUpdate(user_id, password_update, (err) => {
			if (err) return res.status(401).json({ message: "Unathenticated" });

			return res.status(200).json({ message: "password is updated" });
		});
	});
};

const sendMail = async (email, link) => {
	let transporter = nodemailer.createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "6cb681437bd364",
			pass: "a0365f22ece761"
		}
	});

	let mail = {
		from: `test@email.com`,
		to: email,
		subject: "link to your reset password",
		html: `
			 <p>
			 	please click this <a href="${link}">link</a> to reset your password
			 </p>
			`
	};

	transporter.sendMail(mail, (error) => {
		if (error) return false;

		return true;
	});
};
