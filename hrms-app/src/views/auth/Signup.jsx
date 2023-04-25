import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios_client from "../../axios-client";
import { useNavigate } from "react-router-dom";

export default function Signup() {
	const email_ref = useRef();
	const password_ref = useRef();
	const confirm_password_ref = useRef();
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();

		const payload = {
			email: email_ref.current.value,
			password: password_ref.current.value,
			confirm_password: confirm_password_ref.current.value
		};

		axios_client
			.post("/sign-up", payload)
			.then((response) => {
				navigate("/login");
				alert(response.data.message);
			})
			.catch((error) => {
				alert(error.data.message);
			});
	};

	return (
		<div className="auth-layout">
			<form className="login-signup-form" onSubmit={onSubmit}>
				<h1 className="title">Sign Up</h1>

				<label htmlFor="email">Email: </label>
				<input type="email" id="email" ref={email_ref} />

				<label htmlFor="password">Password: </label>
				<input type="password" id="password" ref={password_ref} />

				<label htmlFor="con-password">Confirm Password</label>
				<input type="password" id="con-password" ref={confirm_password_ref} />

				<button>Submit</button>
				<p className="message">
					Already have an Accout? <Link to="/login">Login</Link>
				</p>
			</form>
		</div>
	);
}
