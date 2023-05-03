import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios_client from "../../axios-client";

export default function EmployeeProfile() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [disabled, setDisabled] = useState(true);
	const [employee, setEmployee] = useState({
		_id: "",
		firstname: "",
		lastname: "",
		position: "",
		status: "",
		date_hired: "",
		date_ended: ""
	});
	const [attendance, setAttendance] = useState([
		{
			time_in: "",
			time_out: "",
			status: ""
		}
	]);

	const [company, setCompany] = useState({
		company_name: ""
	});

	const [user, setUser] = useState({
		email: "",
		access_rights: {
			role: ""
		}
	});

	const getEmployee = () => {
		axios_client
			.get(`/employee-profile/${id}`)
			.then(({ data }) => {
				// console.log(data);
				setCompany(data.data.company_id);
				setEmployee(data.data);
				setAttendance(data.data.attendance);
				if (data.data.user) setUser(data.data.user);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateEmployee = () => {
		const payload = {
			firstname: employee.firstname,
			lastname: employee.lastname,
			position: employee.position,
			status: employee.status,
			date_hired: employee.date_hired,
			date_ended: employee.date_ended
		};

		axios_client
			.put(`/update-employee/${id}`, payload)
			.then((response) => {
				alert(response.data.message);
				edit();
			})
			.catch(({ response }) => {
				alert(response.data.message);
				edit();
			});
	};

	const edit = () => {
		setDisabled(!disabled);
	};

	const createUser = () => {
		navigate(`/create-user/${id}`);
	};

	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<>
			<div className="profile-page">
				<div className="profile-details">
					<div className="profile-row">
						<h2>Employee Details</h2>
						{disabled ? (
							<button
								className="employee-button"
								onClick={edit}
							>
								Edit
							</button>
						) : (
							<button
								className="employee-button"
								onClick={updateEmployee}
							>
								Save
							</button>
						)}
					</div>
					<div className="profile-row">
						<label htmlFor="Company">Company</label>
						<input
							type="text"
							value={company.company_name}
							onChange={(ev) =>
								setCompany({
									...company,
									company_name: ev.target.value
								})
							}
							disabled
						/>
						{/* */}
					</div>
					<div className="profile-row">
						<label htmlFor="firstname">Firstname</label>
						<input
							type="text"
							id="Firstname"
							value={employee.firstname}
							onChange={(ev) =>
								setEmployee({
									...employee,
									firstname: ev.target.value
								})
							}
							disabled={disabled}
						/>

						<label htmlFor="lastname">Lastname</label>
						<input
							type="text"
							id="lastname"
							value={employee.lastname}
							onChange={(ev) =>
								setEmployee({
									...employee,
									lastname: ev.target.value
								})
							}
							disabled={disabled}
						/>
					</div>
					<div className="profile-row">
						<label htmlFor="position">Position</label>
						<input
							type="text"
							id="position"
							value={employee.position}
							onChange={(ev) =>
								setEmployee({
									...employee,
									position: ev.target.value
								})
							}
							disabled={disabled}
						/>

						<label htmlFor="status">Status</label>
						<input
							type="text"
							id="stats"
							value={employee.status}
							onChange={(ev) =>
								setEmployee({
									...employee,
									status: ev.target.value
								})
							}
							hidden={!disabled}
						/>
						<select
							type="text"
							id="stats"
							value={employee.status}
							onChange={(ev) =>
								setEmployee({
									...employee,
									status: ev.target.value
								})
							}
							hidden={disabled}
						>
							<option value="employeed">Employeed</option>
							<option value="retired">Retired</option>
							<option value="Fired">Fired</option>
						</select>
					</div>
					<div className="profile-row">
						<label htmlFor="Date-hired">Date Hired</label>
						<input
							type="date"
							id="Date-hired"
							value={employee.date_hired}
							onChange={(ev) =>
								setEmployee({
									...employee,
									date_hired: ev.target.value
								})
							}
							disabled={disabled}
						/>

						<label htmlFor="Date-ended">Date Ended</label>
						<input
							type="date"
							id="Date-hired"
							value={employee.date_ended}
							onChange={(ev) =>
								setEmployee({
									...employee,
									date_ended: ev.target.value
								})
							}
							disabled={disabled}
						/>
					</div>
					<br />

					<h2>Attendance</h2>
					<div className="profile-table">
						<table>
							<thead>
								<tr>
									<th>Time in</th>
									<th>time out</th>
									<th>Status</th>
								</tr>
							</thead>

							<tbody>
								{attendance.map((attendance) => (
									<tr key={attendance._id}>
										<td>
											{
												attendance.time_in
											}
										</td>
										<td>
											{
												attendance.time_out
											}
										</td>
										<td>
											{
												attendance.status
											}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<br />

					<h2>User</h2>
					{user.email ? (
						<div className="profile-row">
							<label htmlFor="username" id="username">
								Email
							</label>
							<input type="email" disabled value={user.email} />

							<label htmlFor="role">Role</label>
							<input
								type="text"
								id="role"
								disabled
								value={user.access_rights.role}
							/>
						</div>
					) : (
						<div className="profile-row">
							<button onClick={createUser}>Create User</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
