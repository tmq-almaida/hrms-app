import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios_client from "../../axios-client";

export default function EmployeeProfile() {
	const { id } = useParams();
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

	const getEmployee = () => {
		axios_client
			.get(`/employee-profile/${id}`)
			.then(({ data }) => {
				console.log(data);
				setCompany(data.data.company_id);
				setEmployee(data.data);
				setAttendance(data.data.attendance);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<>
			<div className="profile-page">
				<div className="profile-details">
					<h2>Employee Details</h2>
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
							disabled
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
							disabled
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
							disabled
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
							disabled
						/>
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
							disabled
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
							disabled
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
				</div>
			</div>
		</>
	);
}
