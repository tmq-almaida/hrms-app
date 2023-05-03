import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios_client from "../../axios-client";

export default function Company() {
	const [companies, setCompanies] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getCompanies();
	}, []);

	const getCompanies = () => {
		axios_client
			.get("/company-list")
			.then(({ data }) => {
				// console.log(data.data);
				setCompanies(data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="list-table">
			<div className="create-div">
				<button className="create-button" onClick={() => navigate("/create-company")}>
					Create Company
				</button>
			</div>
			<div className="table">
				<table>
					<thead>
						<tr>
							<th>id</th>
							<th>company name</th>
							<th>Company Description</th>
							<th>Employee List</th>
							<th>Job List</th>
						</tr>
					</thead>
					<tbody>
						{companies.map((company) => (
							<tr key={company._id}>
								<td>{company._id}</td>
								<td>{company.company_name}</td>
								<td>{company.company_description}</td>
								<td>
									<Link
										to={`/company-employee-list/${company._id}`}
									>
										Employees
									</Link>
								</td>
								<td>
									<Link
										to={`/job-list/${company._id}`}
									>
										Jobs
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
