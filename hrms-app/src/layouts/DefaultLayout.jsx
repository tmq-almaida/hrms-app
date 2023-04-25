import React from "react";
import DefaultNav from "../components/nav/DefaultNav";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
	const { user, token } = useStateContext();

	if (!token) {
		return <Navigate to="/login" />;
	}

	return (
		<>
			<DefaultNav />
			<main>
				<Outlet />
			</main>
		</>
	);
}
