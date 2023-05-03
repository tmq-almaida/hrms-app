import React, { useEffect, useState } from "react";
import axios_client from "../../axios-client";
import { useParams, useNavigate } from "react-router-dom";

export default function ApplicantProfile() {
	const { id } = useParams();
	const [applicant, setApplicants] = useState({});
	const [isHired, setIsHired] = useState(false);
	const navigate = useNavigate();

	const getApplicant = () => {
		axios_client
			.get(`/applicant-profile/${id}`)
			.then((response) => {
				// console.log(response.data.data);
				setApplicants(response.data.data);

				if (applicant.status === "Hired") setIsHired(true);
				else setIsHired(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getApplicant();
	}, []);

	const updateApplicant = () => {
		const payload = {
			status: applicant.status
		};

		axios_client
			.put(`/update-applicant/${id}`, payload)
			.then((response) => {
				alert(response.data.message);
				getApplicant();
			})
			.catch((error) => {
				alert(response.data.message);
			});
	};

	const hireApplicant = () => {
		const payload = {
			company_id: applicant.company,
			firstname: applicant.firstname,
			lastname: applicant.lastname,
			position: applicant.position
		};

		axios_client
			.post("/create-employee", payload)
			.then((response) => {
				alert(response.data.message);

				const { _id } = response.data.data;

				updateHiredApplicant();

				navigate(`/employee-profile/${_id}`);
			})
			.catch(({ response }) => {
				console.log(response.data.message);
			});
	};

	const updateHiredApplicant = () => {
		const payload = {
			status: "Hired"
		};

		axios_client
			.put(`/update-applicant/${id}`, payload)
			.then((response) => {
				alert(response.data.message);
				getApplicant();
			})
			.catch((error) => {
				alert(response.data.message);
			});
	};

	return (
		<>
			<div className="create-page">
				<form className="create-form">
					<h1>Application Form</h1>

					<label htmlFor="firstname">Firstname</label>
					<input
						type="text"
						id="firstname"
						value={applicant.firstname}
						disabled
					/>

					<label htmlFor="lastname">Lastname</label>
					<input
						type="text"
						id="lastname"
						value={applicant.lastname}
						disabled
					/>

					<label htmlFor="email">Email</label>
					<input type="email" id="email" value={applicant.email} disabled />

					<label htmlFor="position">Position</label>
					<input
						type="text"
						id="position"
						value={applicant.position}
						disabled
					/>

					<label htmlFor="status">Status</label>
					<select
						id="status"
						value={applicant.status}
						onChange={(ev) =>
							setApplicants({
								...applicant,
								status: ev.target.value
							})
						}
					>
						<option value="Applicant">Applicant</option>
						<option value="Application Viewed">
							Application Viewed
						</option>
						<option value="First Interview">First Interview</option>
						<option value="On Exam">On Exam</option>
						<option value="Final Interview">Final Interview</option>
						<option value="Failed">Failed</option>
						<option value="Hired">Hired</option>
					</select>

					<div className="">
						<button
							type="button"
							onClick={updateApplicant}
							hidden={isHired}
						>
							Update
						</button>

						<button
							type="button"
							onClick={hireApplicant}
							hidden={isHired}
						>
							Hire
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
