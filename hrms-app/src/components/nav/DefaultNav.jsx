import React from "react";
import "./defaultNav.css";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function DefaultNav() {
	const { user, token, user_role, setToken } = useStateContext();
	const logout = () => {
		localStorage.clear();
		setToken("");
	};

	console.log(user_role);

	if (user_role === "Employee") {
		return (
			<header>
				<div className="nav-container">
					<div className="title">
						<h3>HRMS APP</h3>
					</div>
					<div className="nav-links">
						<Link className="nav-link" to="/attendance">
							Attendance Koist
						</Link>
						<Link className="nav-link" to="/my-attendance">
							My Attendance
						</Link>
						<Link className="nav-link" to="/change-password">
							Change Password
						</Link>
					</div>
				</div>
				<div>
					<button onClick={logout} className="nav-button">
						Logout
					</button>
				</div>
			</header>
		);
	}

	if (user_role === "Company_Owner") {
		return (
			<>
				<header>
					<div className="nav-container">
						<div className="title">
							<h3>HRMS APP</h3>
						</div>
						<div className="nav-links">
							<Link className="nav-link" to="/my-company">
								My Company/s
							</Link>
							<Link className="nav-link" to="/change-password">
								Change Password
							</Link>
						</div>
					</div>
					<div>
						<button onClick={logout} className="nav-button">
							Logout
						</button>
					</div>
				</header>
			</>
		);
	}
}
