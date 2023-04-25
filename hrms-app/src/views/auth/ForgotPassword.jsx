import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios_client from "../../axios-client";

export default function ForgotPassword() {
	const email_ref = useRef();

	const onSubmit = (e) => {
		e.preventDefault();

		const payload = {
			email: email_ref.current.value
		};

		axios_client
			.post("/forgot-password", payload)
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
				<h1 className="title">Forgot Password</h1>

				<label htmlFor="email">Email: </label>
				<input type="email" id="email" ref={email_ref} />

				<button>Submit</button>
				<p className="message">
					Create an account? <Link to="/sign-up">Signup</Link>
				</p>
			</form>
		</div>
	);
}
