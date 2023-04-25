import mongoose from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import dotenv from "dotenv";
import crypto from "crypto";
import path from "path";

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

let gfs;
conn.once("open", () => {
	(gfs = new mongoose.mongo.GridFSBucket(conn.db)),
		{
			bucketName: "resume"
		};
});

const storage = new GridFsStorage({
	url: databaseUrl,
	options: { useUnifiedTopology: true },
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buff) => {
				if (err) {
					return reject(err);
				}

				const filename = `${buff.toString("hex")}${path.extname(file.originalname)}`;

				const fileinfo = {
					filename: filename,
					bucketName: "resume"
				};
				resolve(fileinfo);
			});
		});
	}
});

export const store = multer({ storage });

export const uploadMiddleware = (req, res, next) => {
	const upload = store.single("resume");

	upload(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			return res.status(400).json({ message: "File error" });
		}

		next();
	});
};
