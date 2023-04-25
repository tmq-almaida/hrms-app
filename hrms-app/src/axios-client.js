import axios from "axios";

const axios_client = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL
});

axios_client.interceptors.request.use((config) => {
	const token = localStorage.getItem("ACCESS_TOKEN");
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axios_client.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const { response } = error;

		if (response.status === 401) {
			localStorage.removeItem("ACCESS_TOKEN");
		}

		throw error;
	}
);

export default axios_client;
