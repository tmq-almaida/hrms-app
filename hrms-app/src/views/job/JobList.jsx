import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios_client from "../../axios-client";

export default function JobList() {
	const [jobs, setJobs] = useState([]);
	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		getJobs();
	}, []);

	const getJobs = () => {
		axios_client
			.get(`/get-jobs/${id}`)
			.then(({ data }) => {
				// console.log(data);
				setJobs(data.data);
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
					onClick={() => {
						navigate("/job/new");
					}}
				>
					Create Job Post
				</button>
			</div>
			<div className="table">
				<table>
					<thead>
						<tr>
							<th>Job Title</th>
							<th>Position</th>
							<th>Start</th>
							<th>End</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{jobs.map((job) => (
							<tr key={job._id}>
								<td>{job.title}</td>
								<td>{job.position}</td>
								<td>{job.start_date}</td>
								<td>{job.end_date}</td>
								<td className="table-controls">
									<Link
										to={`/applicant-list/${job._id}`}
										className="table-button"
									>
										View Applicants
									</Link>
									<Link
										to={`/edit-job/${job._id}`}
										className="table-button"
									>
										Edit
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
