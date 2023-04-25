import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./src/routes/routes";
import helmet from "helmet";
import cors from "cors";

//env config
const env = dotenv;
env.config();

//database url
const dbConnection = process.env.DB_CONNECTION;
const dbHost = process.env.DB_HOST;
const dbDatabase = process.env.DB_DATABASE;
const databaseUrl = `${dbConnection}://${dbHost}/${dbDatabase}`;

//database connection
mongoose.Promise = global.Promise;
mongoose.connect(databaseUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//server
const app = express();
const port = process.env.APP_PORT;

app.use(helmet());
//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//routes
routes(app);

app.listen(port, () => {
	console.log(`server is running at http://localhost:${port}`);
});
