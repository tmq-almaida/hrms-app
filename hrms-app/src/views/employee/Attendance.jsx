import React, { useEffect, useState } from "react";
import axios_client from "../../axios-client";

export default function Attendance() {
	const [on_duty, setOnDuty] = useState(false);
	const checkAttendance = () => {
		axios_client
			.get("/time-in-check")
			.then(({ data }) => {
				if (data.data) setOnDuty(true);
				else setOnDuty(false);

				// console.log(on_duty);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		checkAttendance();
	}, []);

	const timeIn = () => {
		axios_client
			.post("employee-timein")
			.then((response) => {
				alert(response.data.message);
				checkAttendance();
			})
			.catch(({ response }) => {
				alert(response.data.message);
				checkAttendance();
			});
	};

	const timeOut = () => {
		axios_client
			.post("employee-timeout")
			.then((response) => {
				console.log(response);
				alert(response.data.message);
				checkAttendance();
			})
			.catch(({ response }) => {
				alert(response.data.message);
				checkAttendance();
			});
	};
	return (
		<div className="attendance-koist">
			<div className="attendance-panel">
				<h1>Attendance Koist</h1>
				{!on_duty ? (
					<button onClick={timeIn}>Time In</button>
				) : (
					<button onClick={timeOut}>Time Out</button>
				)}
			</div>
		</div>
	);
}
