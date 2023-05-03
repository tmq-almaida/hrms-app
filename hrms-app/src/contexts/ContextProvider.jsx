import { createContext, useContext, useState } from "react";

const StateContext = createContext({
	user: null,
	user_role: null,
	token: null,
	setUser: () => {},
	setToken: () => {},
	setUserRole: () => {}
});

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [user_role, _setUserRole] = useState(localStorage.getItem("USER_ROLE"));
	const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

	const setToken = (token) => {
		_setToken(token);

		if (token) {
			localStorage.setItem("ACCESS_TOKEN", token);
		} else {
			localStorage.clear();
		}
	};

	const setUserRole = (role) => {
		_setUserRole(role);

		if (role) {
			localStorage.setItem("USER_ROLE", role);
		} else {
			localStorage.clear();
		}
	};

	return (
		<StateContext.Provider
			value={{
				user,
				setUser,
				token,
				setToken,
				user_role,
				setUserRole
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
