import React from "react";
import { Link } from "react-router-dom";

export default function QuestNav() {
	return (
		<header>
			<div className="nav-container">
				<div className="title">
					<h3>HRMS APP</h3>
				</div>
				<div className="nav-links">
					<Link className="nav-link" to="/login">
						Login
					</Link>
					<Link className="nav-link" to="/jobs-list">
						Jobs
					</Link>
				</div>
			</div>
		</header>
	);
}
