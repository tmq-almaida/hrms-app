import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios_client from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function Login() {
	const email_ref = useRef();
	const password_ref = useRef();
	const navigate = useNavigate();
	const { setUser, setToken, setUserRole } = useStateContext();

	const onSubmit = (e) => {
		e.preventDefault();
		const payload = {
			email: email_ref.current.value,
			password: password_ref.current.value
		};

		axios_client
			.post("/login", payload)
			.then((response) => {
				console.log(response);
				setUser(response.data.user);
				setToken(response.data.access_token);
				setUserRole(response.data.user_role);
				navigate("/dashboard");
			})
			.catch(({ response }) => {
				alert(response.data.message);
			});
	};

	return (
		<div className="auth-layout">
			<form className="login-signup-form" onSubmit={onSubmit}>
				<h1 className="title">Login</h1>

				<label htmlFor="email">Email: </label>
				<input type="email" id="email" ref={email_ref} />

				<label htmlFor="password">Password: </label>
				<input type="password" id="password" ref={password_ref} />

				<button>Submit</button>
				<p className="message">
					<Link to="/forgot-password">forgot your password?</Link>
				</p>
				<p className="message">
					Create an account? <Link to="/sign-up">Signup</Link>
				</p>
			</form>
		</div>
	);
}
