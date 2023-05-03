import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios_client from "../../axios-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateEditJob() {
	const { id } = useParams();
	const [companies, setCompanies] = useState([]);
	const [job, setJob] = useState({
		_id: null,
		company_id: "",
		title: "",
		position: "",
		requirements: "",
		start_date: "",
		end_date: ""
	});
	const navigate = useNavigate();

	useEffect(() => {
		getCompanies();
	}, []);

	if (id) {
		useEffect(() => {
			getJob();
		}, []);
	}

	const getJob = () => {
		axios_client
			.get(`/get-job/${id}`)
			.then(({ data }) => {
				setJob(data.data);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getCompanies = () => {
		axios_client
			.get("/company-list")
			.then(({ data }) => {
				setCompanies(data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const payload = job;

		if (!payload._id) {
			save(payload);
		} else {
			edit(payload);
		}
	};

	const save = (payload) => {
		axios_client
			.post("/create-job", payload)
			.then((response) => {
				alert(response.data.message);
				navigate(`/job-list/${payload.company_id}`);
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
	};

	const edit = (payload) => {
		axios_client
			.put("/edit-job", payload)
			.then((response) => {
				alert(response.data.message);
				navigate(`/job-list/${payload.company_id}`);
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
	};

	return (
		<>
			<div className="create-page">
				<form className="create-form">
					<label htmlFor="company">Company</label>
					<select
						name="company"
						id="company"
						value={job.company_id}
						onChange={(ev) =>
							setJob({ ...job, company_id: ev.target.value })
						}
					>
						<option value="null">Select a company</option>
						{companies?.map((data) => (
							<option value={data._id} key={data._id}>
								{data.company_name}
							</option>
						))}
					</select>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						placeholder="Job title"
						value={job.title}
						onChange={(ev) =>
							setJob({ ...job, title: ev.target.value })
						}
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
					/>
					<label htmlFor="start-date">Start Date</label>
					<input
						type="date"
						value={job.start_date}
						selected={job.start_date}
						onChange={(ev) =>
							setJob({ ...job, start_date: ev.target.value })
						}
					/>
					<label htmlFor="end-date">End Date</label>
					<input
						type="date"
						value={job.end_date}
						selected={job.end_date}
						onChange={(ev) =>
							setJob({ ...job, end_date: ev.target.value })
						}
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
					></textarea>
					<button className="save" onClick={onSubmit}>
						Save
					</button>
				</form>
			</div>
		</>
	);
}
