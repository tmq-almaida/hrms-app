import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios_client from "../../axios-client";

export default function QuestJobList() {
	const [jobs, setJobs] = useState([]);

	const getJobs = () => {
		axios_client
			.get("/quest-job-list")
			.then(({ data }) => {
				setJobs(data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getJobs();
	}, []);

	return (
		<>
			<div className="job-list-container">
				{jobs.map((job) => (
					<div className="job-list-item" key={job._id}>
						<div className="job-item">
							<h2>{job.company_id.company_name}</h2>
							<h3>{job.title}</h3>
							<h4>{job.position}</h4>

							<Link className="job-link" to={`/job/${job._id}`}>
								Open
							</Link>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
