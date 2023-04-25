import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios_client from "../../axios-client";
import { useParams, Link } from "react-router-dom";

export default function EmployeeCompanyList() {
	const { id } = useParams();
	const [company, setCompany] = useState({});
	const [employee, setEmployee] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getEmployees();
	}, []);

	const getEmployees = () => {
		axios_client
			.get(`/company-employees/${id}`)
			.then(({ data }) => {
				setCompany(data.data);
				setEmployee(data.data.employees);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className="list-table">
			<div className="create-div">
				<button
					className="create-button"
					onClick={() => navigate(`/create-employee/${id}`)}
				>
					Create Employee
				</button>
			</div>

			<div className="job-details">
				<h2>Company Name: {company.company_name} </h2>
			</div>

			<div className="table">
				<table>
					<thead>
						<tr>
							<th>Firstname</th>
							<th>Lastname</th>
							<th>Position</th>
							<th>Date Hired</th>
							<th>Status</th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						{employee.map((item) => (
							<tr key={item._id}>
								<td>{item.firstname}</td>
								<td>{item.lastname}</td>
								<td>{item.position}</td>
								<td>{item.date_hired}</td>
								<td>{item.status}</td>
								<td>
									<Link
										to={`/employee-profile/${item._id}`}
									>
										View Profile
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
