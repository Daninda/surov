import { Route, Routes } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import "./App.css";
import TeacherTable from "./components/tables/TeacherTable";
import StudentTable from "./components/tables/StudentTable";
import GroupTable from "./components/tables/GroupTable";
import DepartmentTable from "./components/tables/DepartmentTable";
import ScienceDegreeTable from "./components/tables/ScienceDegreeTable";
import TeacherRankTable from "./components/tables/TeacherRankTable";
import FacultyTable from "./components/tables/FacultyTable";
import TopicTable from "./components/tables/TopicTable";
import Home from "./components/Home";
import Layout from "./components/Layout";
import CreateStudent from "./components/create/CreateStudent";
import CreateTeacher from "./components/create/CreateTeacher";
import CreateTopic from "./components/create/CreateTopic";
import CreateGroup from "./components/create/CreateGroup";
import CreateDepartment from "./components/create/CreateDepartment";
import CreateScienceDegree from "./components/create/CreateScienceDegree";
import CreateTeacherRank from "./components/create/CreateTeacherRank";
import CreateFaculty from "./components/create/CreateFaculty";
import UpdateStudent from "./components/update/UpdateStudent";
import UpdateTeacher from "./components/update/UpdateTeacher";
import UpdateTopic from "./components/update/UpdateTopic";
import UpdateGroup from "./components/update/UpdateGroup";
import UpdateDepartment from "./components/update/UpdateDepartment";
import UpdateScienceDegree from "./components/update/UpdateScienceDegree";
import UpdateTeacherRank from "./components/update/UpdateTeacherRank";
import UpdateFaculty from "./components/update/UpdateFaculty";
import { MyReport } from "./components/MyReport";

function App() {
	return (
		<>
			<SnackbarProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="teachers" element={<TeacherTable />} />
						<Route path="students" element={<StudentTable />} />
						<Route path="topics" element={<TopicTable />} />
						<Route path="groups" element={<GroupTable />} />
						<Route path="departments" element={<DepartmentTable />} />
						<Route path="science-degrees" element={<ScienceDegreeTable />} />
						<Route path="teacher-ranks" element={<TeacherRankTable />} />
						<Route path="faculties" element={<FacultyTable />} />

						<Route path="create-student" element={<CreateStudent />} />
						<Route path="create-teacher" element={<CreateTeacher />} />
						<Route path="create-topic" element={<CreateTopic />} />
						<Route path="create-group" element={<CreateGroup />} />
						<Route path="create-department" element={<CreateDepartment />} />
						<Route
							path="create-science-degree"
							element={<CreateScienceDegree />}
						/>
						<Route path="create-teacher-rank" element={<CreateTeacherRank />} />
						<Route path="create-faculty" element={<CreateFaculty />} />

						<Route path="update-student/:id" element={<UpdateStudent />} />
						<Route path="update-teacher/:id" element={<UpdateTeacher />} />
						<Route path="update-topic/:id" element={<UpdateTopic />} />
						<Route path="update-group/:id" element={<UpdateGroup />} />
						<Route
							path="update-department/:id"
							element={<UpdateDepartment />}
						/>
						<Route
							path="update-science-degree/:id"
							element={<UpdateScienceDegree />}
						/>
						<Route
							path="update-teacher-rank/:id"
							element={<UpdateTeacherRank />}
						/>
						<Route path="update-faculty/:id" element={<UpdateFaculty />} />

						<Route path="report" element={<MyReport />} />

						<Route path="*" element={<></>} />
					</Route>
				</Routes>
			</SnackbarProvider>
		</>
	);
}

export default App;
