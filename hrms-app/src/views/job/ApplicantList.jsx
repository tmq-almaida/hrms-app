import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios_client from "../../axios-client";
import { Link } from "react-router-dom";

export default function ApplicantList() {
	const { id } = useParams();
	const [job_details, setJobDetails] = useState({});
	const [applicants, setApplicants] = useState([]);

	// console.log(id);

	useEffect(() => {
		getApplicants();
	}, []);

	const getApplicants = () => {
		axios_client
			.get(`/job-applicants/${id}`)
			.then(({ data }) => {
				setJobDetails(data.data);
				setApplicants(data.data.applicants);
			})
			.catch(({ response }) => {
				console.log(response.data.message);
			});
	};

	return (
		<>
			<div className="list-table">
				<div className="job-details">
					<h2>Title: {job_details.title} </h2>
					<h2>Position: {job_details.position} </h2>
					<h2>
						{job_details.start_date} - {job_details.end_date}
					</h2>
				</div>

				<div className="table">
					<table>
						<thead>
							<tr>
								<th>Firstname</th>
								<th>Lastname</th>
								<th>Email</th>
								<th>Resume</th>
							</tr>
						</thead>

						<tbody>
							{applicants.map((item) => (
								<tr key={item._id}>
									<td>{item.firstname}</td>
									<td>{item.lastname}</td>
									<td>{item.email}</td>
									<td>
										<Link
											to={`/resume/${item.resume}`}
										>
											View
											Resume
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
