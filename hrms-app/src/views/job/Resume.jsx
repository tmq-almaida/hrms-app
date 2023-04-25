import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios_client from "../../axios-client";

export default function Resume() {
	const { id } = useParams();

	const [resume, setResume] = useState("");

	axios_client
		.get(`/get-resume/${id}`)
		.then(({ data }) => {
			setResume(data);
		})
		.catch(({ response }) => {
			console.log(response);
		});

	return (
		<div>
			
		</div>
	);
}
