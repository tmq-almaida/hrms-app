import {
	createJob,
	deleteJob,
	editJob,
	getQuestJobList,
	getJob,
	getJobList,
	questGetJob
} from "../controllers/jobController";
import { createCompany, getCompany, getCompanyJobs } from "../controllers/companyController";
import { createUser, employeeUser, forgotPassword, login, resetPassword } from "../controllers/usersController";
import { authenticateToken, authenticateTokenParams } from "../middleware/authTokenMiddleware";
import { passwordCheck } from "../middleware/usersMiddleware";
import { getApplicants, submitApplication } from "../controllers/applicantController";
import { uploadMiddleware } from "../middleware/uploadMiddleware";
import { findResume } from "../controllers/resumeController";
import {
	checkTimeIn,
	checkTimeOut,
	createEmployee,
	employeeAttendance,
	employeeTimeIn,
	employeeTimeOut,
	getEmployeeByCompany,
	getEmployeeProfile,
	timeIn,
	updateEmployee
} from "../controllers/employeeController";

const routes = (app) => {
	//authentication routes
	app.route("/sign-up").post(passwordCheck, createUser);
	app.route("/login").post(login);
	app.route("/check-token").post(authenticateToken);
	app.route("/forgot-password").post(forgotPassword);
	app.route("/reset-password/:token").post(authenticateTokenParams, passwordCheck, resetPassword);

	//company routes
	app.route("/create-company").post(authenticateToken, createCompany);
	app.route("/company-list").get(authenticateToken, getCompany);
	app.route("/company-profile/job-list").get(authenticateToken, getCompanyJobs);

	//job post routes
	app.route("/create-job").post(authenticateToken, createJob);
	app.route("/edit-job").put(authenticateToken, editJob);
	app.route("/delete-job").delete(authenticateToken, deleteJob);
	app.route("/get-jobs").get(authenticateToken, getJobList);
	app.route("/get-job/:id").get(authenticateToken, getJob);
	app.route("/quest-job-list").get(getQuestJobList);
	app.route("/quest-job/:id").get(questGetJob);

	//application routes
	app.route("/submit-application").post(uploadMiddleware, submitApplication);
	app.route("/job-applicants/:id").get(authenticateToken, getApplicants);
	app.route("/get-resume/:id").get(authenticateToken, findResume);

	//employee routes
	app.route("/create-employee").post(authenticateToken, createEmployee);
	app.route("/update-employee/:id").put(authenticateToken, updateEmployee);
	app.route("/company-employees/:id").get(authenticateToken, getEmployeeByCompany);
	app.route("/employee-profile/:id").get(authenticateToken, getEmployeeProfile);
	app.route("/add-user/:id").post(authenticateToken, passwordCheck, employeeUser);

	//time-in time-out
	app.route("/employee-timein").post(authenticateToken, employeeTimeIn);
	app.route("/employee-timeout").post(authenticateToken, employeeTimeOut);
	app.route("/time-in-check").get(authenticateToken, checkTimeIn);
	app.route("/employee-attendance").get(authenticateToken, employeeAttendance);
};

export default routes;
