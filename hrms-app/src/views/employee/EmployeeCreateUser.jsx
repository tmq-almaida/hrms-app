import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios_client from "../../axios-client";

export default function EmployeeCreateUser() {
	const email_ref = useRef();
	const password_ref = useRef();
	const confirm_password_ref = useRef();
	const navigate = useNavigate();
	const { id } = useParams();

	const onSubmit = (e) => {
		e.preventDefault();

		const payload = {
			email: email_ref.current.value,
			password: password_ref.current.value,
			confirm_password: confirm_password_ref.current.value
		};

		axios_client
			.post(`/add-user/${id}`, payload)
			.then((response) => {
				// console.log(response);
				alert(response.data.message);
				navigate(`/employee-profile/${id}`);
			})
			.catch(({ response }) => {
				// console.log(err);
				alert(response.data.message);
			});
	};

	return (
		<div className="auth-layout">
			<form className="login-signup-form" onSubmit={onSubmit}>
				<h1 className="title">Create User</h1>

				<label htmlFor="email">Email: </label>
				<input type="email" id="email" ref={email_ref} />

				<label htmlFor="password">Password: </label>
				<input type="password" id="password" ref={password_ref} />

				<label htmlFor="con-password">Confirm Password</label>
				<input type="password" id="con-password" ref={confirm_password_ref} />

				<button>Create</button>
			</form>
		</div>
	);
}
