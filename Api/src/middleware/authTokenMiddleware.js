import Jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
	const auth_header = req.headers["authorization"];
	const token = auth_header && auth_header.split(" ")[1];

	if (token == null) return res.status(401).json({ message: "Unathenticated" });

	Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).json({ message: "Unathenticated" });
		req.token = user._id;
		// return res.status(200).json({ message: user._id });

		next();
	});
};

export const authenticateTokenParams = (req, res, next) => {
	const { token } = req.params;

	if (token == null) return res.status(401).json({ message: "Unathenticated" });

	Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(401).json({ message: "Unathenticated" });

		req.user = {
			_id: user._id
		};

		next();
	});
};
