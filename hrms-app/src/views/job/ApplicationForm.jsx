import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios_client from "../../axios-client";
import axios from "axios";

export default function ApplicationForm() {
	const firstname = useRef();
	const lastname = useRef();
	const email = useRef();
	const resume = useRef();
	const { id } = useParams();
	const [file, setFile] = useState("");

	const handleFile = (ev) => {
		console.log(ev.target.files[0]);
		setFile(ev.target.files[0]);
	};

	const submit_application = (e) => {
		e.preventDefault();

		const form_data = new FormData();
		form_data.append("job_id", id);
		form_data.append("firstname", firstname.current.value);
		form_data.append("lastname", lastname.current.value);
		form_data.append("email", email.current.value);
		form_data.append("resume", file, file.name);

		const config = {
			headers: { "Content-type": "multipart/form-data" }
		};

		axios_client
			.post("/submit-application", form_data, config)
			.then((response) => {
				alert(response.data.message);
			})
			.catch(({ response }) => {
				alert(response.data.message);
			});
	};

	return (
		<>
			<div className="create-page">
				<form className="create-form">
					<h1>Application Form</h1>

					<label htmlFor="firstname">Firstname</label>
					<input type="text" id="firstname" ref={firstname} />

					<label htmlFor="lastname">Lastname</label>
					<input type="text" id="lastname" ref={lastname} />

					<label htmlFor="email">Email</label>
					<input type="email" id="email" ref={email} />

					<label htmlFor="file-upload">Resume</label>
					<input
						type="file"
						name="file"
						id="file-upload"
						onChange={handleFile}
					/>

					<button type="submit" onClick={submit_application}>
						Submit
					</button>
				</form>
			</div>
		</>
	);
}
