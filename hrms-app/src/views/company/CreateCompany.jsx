import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios_client from "../../axios-client";
import "./createCompany.css";

export default function CreateCompany() {
	const name = useRef();
	const description = useRef();
	const email = useRef();
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();

		const payload = {
			company_name: name.current.value,
			company_description: description.current.value,
			company_email: email.current.value
		};

		axios_client
			.post("/create-company", payload)
			.then(({ data }) => {
				alert(data.message);
				navigate("/my-company");
			})
			.catch((error) => {
				alert(error.response.data.message);
			});
	};

	return (
		<div className="create-page">
			<form className="create-form" onSubmit={onSubmit}>
				<h1>Create Company</h1>
				<label htmlFor="company-name">Company Name</label>
				<input id="company-name" type="text" ref={name} />
				<label htmlFor="company-description">Company Description</label>
				<input id="company-description" type="text" ref={description} />
				<label htmlFor="company-email">Company Email</label>
				<input id="company-email" type="email" ref={email} />
				<button className="save">Save</button>
			</form>
		</div>
	);
}
