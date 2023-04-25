import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/auth/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/auth/Signup";
import ForgotPassword from "./views/auth/ForgotPassword";
import ResetPassword from "./views/auth/ResetPassword";
import Company from "./views/company/Company";
import CreateCompany from "./views/company/CreateCompany";
import JobList from "./views/job/JobList";
import CreateEditJob from "./views/job/CreateEditJob";
import Test from "./views/job/Test";
import QuestJobList from "./views/job/QuestJobList";
import JobProfile from "./views/job/JobProfile";
import ApplicationForm from "./views/job/ApplicationForm";
import ApplicantList from "./views/job/ApplicantList";
import Resume from "./views/job/Resume";
import EmployeeCompanyList from "./views/employee/EmployeeCompanyList";
import CreateEmployee from "./views/employee/CreateEmployee";
import EmployeeProfile from "./views/employee/EmployeeProfile";
import Attendance from "./views/employee/Attendance";
import EmployeeAttendance from "./views/employee/EmployeeAttendance";

const router = createBrowserRouter([
	{
		path: "/",
		element: <GuestLayout />,

		children: [
			{
				path: "/",
				element: <Navigate to="/login" />
			},
			{
				path: "/login",
				element: <Login />
			},
			{
				path: "/sign-up",
				element: <Signup />
			},
			{
				path: "/forgot-password",
				element: <ForgotPassword />
			},
			{
				path: "/reset-password/:token/user",
				element: <ResetPassword />
			},
			{
				path: "/jobs-list",
				element: <QuestJobList />
			},
			{
				path: "/job/:id",
				element: <JobProfile />
			},
			{
				path: "/send-application/:id",
				element: <ApplicationForm />
			}
		]
	},
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{
				path: "/",
				element: <Navigate to="/dashboard" />
			},
			{
				path: "/dashboard",
				element: <Dashboard />
			},
			{
				path: "/my-company",
				element: <Company />
			},
			{
				path: "/create-company",
				element: <CreateCompany />
			},
			{
				path: "/job-list",
				element: <JobList />
			},
			{
				path: "/job-list/new",
				element: <CreateEditJob key="jobCreate" />
			},
			{
				path: "/job-list/:id",
				element: <CreateEditJob key="jobEdit" />
			},
			{
				path: "/applicant-list/:id",
				element: <ApplicantList />
			},
			{
				path: "/resume/:id",
				element: <Resume />
			},
			{
				path: "/company-employee-list/:id",
				element: <EmployeeCompanyList />
			},
			{
				path: "/create-employee/:id",
				element: <CreateEmployee />
			},
			{
				path: "/employee-profile/:id",
				element: <EmployeeProfile />
			},
			{
				path: "/attendance",
				element: <Attendance />
			},
			{
				path: "/my-attendance",
				element: <EmployeeAttendance />
			}
		]
	},

	//not found
	{
		path: "*",
		element: <NotFound />
	}
]);

export default router;
