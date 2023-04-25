import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios_client from "../../axios-client";
import { Link } from "react-router-dom";

export default function JobProfile() {
	let { id } = useParams();
	const navigate = useNavigate();
	const [company, setCompany] = useState("");
	const [job, setJob] = useState({
		_id: "test",
		company_id: "",
		title: "",
		position: "",
		requirements: "",
		start_date: "",
		end_date: ""
	});

	const getJob = () => {
		axios_client
			.get(`/quest-job/${id}`)
			.then(({ data }) => {
				setCompany(data.data.company_id.company_name);

				setJob(data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getJob();
	}, []);

	return (
		<>
			<div className="create-page">
				<div className="create-form">
					<h2>Job Profile</h2>
					<label htmlFor="company-name">Company name</label>
					<input
						type="text"
						id="company-name"
						readOnly
						value={company}
						onChange={(ev) => setCompany(ev.target.value)}
					/>

					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						placeholder="Job title"
						value={job.title}
						onChange={(ev) =>
							setJob({ ...job, title: ev.target.value })
						}
						readOnly
					/>

					<label htmlFor="position">Position</label>
					<input
						type="text"
						id="position"
						placeholder="Applying for postion"
						value={job.position}
						onChange={(ev) =>
							setJob({ ...job, position: ev.target.value })
						}
						readOnly
					/>

					<label htmlFor="start-date">Start Date</label>
					<input
						type="date"
						value={job.start_date}
						selected={job.start_date}
						onChange={(ev) =>
							setJob({ ...job, start_date: ev.target.value })
						}
						readOnly
					/>

					<label htmlFor="end-date">End Date</label>
					<input
						type="date"
						value={job.end_date}
						selected={job.end_date}
						onChange={(ev) =>
							setJob({ ...job, end_date: ev.target.value })
						}
						readOnly
					/>

					<label htmlFor="requirments">Requirments</label>
					<textarea
						name="requirements"
						id="requirements"
						rows="15"
						value={job.requirements}
						onChange={(ev) =>
							setJob({ ...job, requirements: ev.target.value })
						}
						readOnly
					></textarea>

					<button onClick={() => navigate(`/send-application/${id}`)}>
						Send Application
					</button>
				</div>
			</div>
		</>
	);
}
