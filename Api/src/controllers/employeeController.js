import mongoose from "mongoose";
import { EmployeeSchema } from "../models/employeeModel";
import { CompanySchema } from "../models/companyModel";
import { date_format, date_html, datetime_format } from "../middleware/dateFormat";
import { UserSchema } from "../models/usersModels";
import { AttendanceSchema } from "../models/attendaceModel";

const Employee = mongoose.model("Employees", EmployeeSchema);
const Company = mongoose.model("Company", CompanySchema);
const Attendance = mongoose.model("Attendance", AttendanceSchema);

export const createEmployee = (req, res) => {
	const employee = req.body;

	Company.findOne({ _id: employee.company_id }, (err, company) => {
		if (err) return res.status(400).json({ message: "Company Error" });

		const new_employee = new Employee(employee);
		new_employee.save((err, employee) => {
			if (err) return res.status(400), json({ message: err });

			Company.findByIdAndUpdate(
				{
					_id: new_employee.company_id
				},
				{ $push: { employees: [new_employee._id] } },
				(err) => {
					if (err) return res.status(400).json({ message: err });

					return res.status(200).json({
						message: "Successfully Create a Employee",
						data: employee
					});
				}
			);
		});
	});
};

export const updateEmployee = (req, res) => {
	const { id } = req.params;
	const employee_update = req.body;

	if (!id) return res.status(400).json({ message: "Cannot find Employee!" });

	Employee.findByIdAndUpdate({ _id: id }, employee_update, (err) => {
		if (err) return res.status.json({ message: err });

		return res.status(200).json({ message: "Employee successfully updated" });
	});
};

export const getEmployeeByCompany = (req, res) => {
	const { id } = req.params;

	Company.findOne({ _id: id })
		.populate("employees")
		.select("-job_post")
		.exec((err, company) => {
			// console.log(err);
			if (err) return res.status(400).json({ message: err });

			return res.status(200).json({ data: company });
		});
};

export const getEmployeeProfile = (req, res) => {
	const { id } = req.params;

	Employee.findOne({ _id: id })
		.populate("attendance")
		.populate("company_id")
		.populate("user")
		.exec((err, employee) => {
			if (err) return res.status(400).json({ message: "Employee not found!" });

			// console.log(employee);

			const employee_data = {
				...employee._doc,
				date_hired: date_html.format(employee.date_hired),
				date_ended: employee.date_ended ? date_html.format(employee.date_ended) : "",
				attendance: employee.attendance.map((item) => {
					return {
						_id: item._id,
						status: item.status,
						time_in: datetime_format.format(item.time_in),
						time_out: item.time_out
							? datetime_format.format(item.time_out)
							: ""
					};
				})
			};

			return res.status(200).json({ data: employee_data });
		});
};

export const employeeTimeIn = (req, res) => {
	const user_id = req.token;

	Employee.findOne({ user: user_id }, (err, employee) => {
		if (err) return res.status(400).json({ message: err });

		const body = {
			employee: employee._id,
			status: "On Duty"
		};

		Attendance.findOne({ status: "On Duty", employee: employee._id }, (err, status) => {
			if (err) return res.status(400).json({ message: err });

			if (status) return res.status(400).json({ message: "Your Are Already Timed In" });

			const attendance = new Attendance(body);

			attendance.save((err) => {
				if (err) return res.status(400).json({ message: err });

				Employee.findOneAndUpdate(
					{ _id: employee._id },
					{ $push: { attendance: attendance._id } },
					(err) => {
						if (err) return res.status(400).json({ message: err });

						return res
							.status(200)
							.json({ message: "Successfuly Timed In" });
					}
				);
			});
		});
	});
};

export const employeeTimeOut = (req, res) => {
	const id = req.token;

	Employee.findOne({ user: id }, (err, employee) => {
		if (err) return res.status(400).json({ message: err });

		Attendance.findOneAndUpdate(
			{ status: "On Duty", employee: employee._id },
			{ time_out: Date.now(), status: "time out" },
			(err, attendance) => {
				if (err) return res.status(400).json({ message: err });

				if (!attendance) return res.status(400).json({ message: "No Time in" });

				return res.status(200).json({ message: "Successfully Timed Out" });
			}
		);
	});
};

export const checkTimeIn = (req, res) => {
	const id = req.token;

	Employee.findOne({ user: id }, (err, employee) => {
		if (err) return res.status(400).json({ message: err });

		// return res.status(200).json({ data: employee });

		if (!employee) return res.status(200).json({ data: null });

		Attendance.findOne({ status: "On Duty", employee: employee._id }, (err, attendance) => {
			if (err) return res.status(400).json({ message: err });

			return res.status(200).json({ data: attendance });
		});
	});
};

export const employeeAttendance = (req, res) => {
	const id = req.token;

	// return res.status(200).json({ data: id });

	Employee.findOne({ user: id })
		.populate("attendance")
		.exec((err, employee) => {
			if (err) return res.status(400).json({ message: "Employee not found!" });

			// console.log(employee);

			const employee_data = {
				...employee._doc,
				date_hired: date_html.format(employee.date_hired),
				date_ended: employee.date_ended ? date_html.format(employee.date_ended) : "",
				attendance: employee.attendance.map((item) => {
					return {
						_id: item._id,
						status: item.status,
						time_in: datetime_format.format(item.time_in),
						time_out: item.time_out
							? datetime_format.format(item.time_out)
							: ""
					};
				})
			};

			return res.status(200).json({ data: employee_data.attendance });
		});
};

export const adminEmployeeTimeIn = (req, res) => {
	const id = req.token;

	return res.status(200).json({ message: id });
};
