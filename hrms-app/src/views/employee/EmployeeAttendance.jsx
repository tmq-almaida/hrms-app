import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios_client from "../../axios-client";

export default function EmployeeAttendance() {
	const [attendance, setAttendance] = useState([
		{
			time_in: "",
			time_out: "",
			status: ""
		}
	]);

	const getEmployee = () => {
		axios_client
			.get(`/employee-attendance`)
			.then(({ data }) => {
				console.log(data);
				setAttendance(data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<div className="profile-page">
			<div className="profile-details">
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
									<td>{attendance.time_in}</td>
									<td>{attendance.time_out}</td>
									<td>{attendance.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
