import React, { useRef } from "react";
import axios_client from "../../axios-client";

export default function ChangePassword() {
	const old_password_ref = useRef();
	const password_ref = useRef();
	const confim_password_ref = useRef();

	const onSubmit = (e) => {
		e.preventDefault();
		const payload = {
			old_password: old_password_ref.current.value,
			password: password_ref.current.value,
			confirm_password: confim_password_ref.current.value
		};

		axios_client
			.put(`/employee-change-password`, payload)
			.then((response) => {
				alert(response.data.message);
			})
			.catch((error) => {
				const { response } = error;
				alert(response.data.message);
			});
	};

	return (
		<div className="auth-layout">
			<form className="login-signup-form" onSubmit={onSubmit}>
				<h1 className="title">Change Password</h1>

				<label htmlFor="">Old Password</label>
				<input type="password" id="password" ref={old_password_ref} />

				<label htmlFor="password">New Password: </label>
				<input type="password" id="password" ref={password_ref} />

				<label htmlFor="confirm-password">Confirm Password: </label>
				<input type="password" id="confirm-password" ref={confim_password_ref} />

				<button>Submit</button>
			</form>
		</div>
	);
}
