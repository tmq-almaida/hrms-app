import React, { useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios_client from "../../axios-client";

export default function CreateEmployee() {
	const { id } = useParams();
	const firstname = useRef();
	const lastname = useRef();
	const position = useRef();
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();

		const payload = {
			company_id: id,
			firstname: firstname.current.value,
			lastname: lastname.current.value,
			position: position.current.value
		};

		axios_client
			.post("/create-employee", payload)
			.then((response) => {
				alert(response.data.message);
				navigate(`/company-employee-list/${id}`);
			})
			.catch(({ response }) => {
				console.log(response.data.message);
			});
	};

	return (
		<>
			<div className="create-page">
				<form className="create-form" onSubmit={onSubmit}>
					<label htmlFor="firstname">Firstname</label>
					<input type="text" id="Firstname" ref={firstname} />

					<label htmlFor="lastname">Lastname</label>
					<input type="text" id="lastname" ref={lastname} />

					<label htmlFor="position">Position</label>
					<input type="text" id="position" ref={position} />

					<button className="save">Save</button>
				</form>
			</div>
		</>
	);
}
