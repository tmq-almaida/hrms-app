import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";

const env = dotenv;
env.config();

const dbConnection = process.env.DB_CONNECTION;
const dbHost = process.env.DB_HOST;
const dbDatabase = process.env.DB_DATABASE;
const databaseUrl = `${dbConnection}://${dbHost}/${dbDatabase}`;

const conn = mongoose.createConnection(databaseUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

export const findResume = (req, res) => {
	const { id } = req.params;
	const _id = new mongoose.Types.ObjectId(id);

	const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "resume"
	});

	gfs.find({ _id }).toArray((err, file) => {
		if (err) return res.status(400).json({ message: err });

		if (!file) return res.status(400).json({ message: "File Not Found" });

		console.log();

		gfs.openDownloadStream(_id).pipe(res);
	});
};
