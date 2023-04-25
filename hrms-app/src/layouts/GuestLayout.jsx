import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "./layout.css";

export default function GuestLayout() {
	const { token } = useStateContext();

	if (token) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<>
			<Outlet />
		</>
	);
}
