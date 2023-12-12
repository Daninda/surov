import axios from "axios";
const http = axios.create({
	baseURL: "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

class DataService {
	getTeachers() {
		return http.get("/teachers");
	}
	getTeacherRaw(id) {
		return http.get(`/teacher-raw/${id}`);
	}
	createTeacher(data) {
		return http.post("/teacher", data);
	}
	updateTeacher(id, data) {
		return http.put(`/teacher/${id}`, data);
	}
	deleteTeacher(id) {
		return http.delete(`/teacher/${id}`);
	}

	getStudents() {
		return http.get("/students");
	}
	getStudentRaw(id) {
		return http.get(`/student-raw/${id}`);
	}
	createStudent(data) {
		return http.post("/student", data);
	}
	updateStudent(id, data) {
		return http.put(`/student/${id}`, data);
	}
	deleteStudent(id) {
		return http.delete(`/student/${id}`);
	}

	getFreeTeacherTopics(id) {
		return http.get(`/free-teacher-topics/${id}`);
	}

	getGroups() {
		return http.get("/groups");
	}
	getGroupRaw(id) {
		return http.get(`/group-raw/${id}`);
	}
	createGroup(data) {
		return http.post("/group", data);
	}
	updateGroup(id, data) {
		return http.put(`/group/${id}`, data);
	}
	deleteGroup(id) {
		return http.delete(`/group/${id}`);
	}

	getDepartments() {
		return http.get("/departments");
	}
	getDepartmentRaw(id) {
		return http.get(`/department-raw/${id}`);
	}
	createDepartment(data) {
		return http.post("/department", data);
	}
	updateDepartment(id, data) {
		return http.put(`/department/${id}`, data);
	}
	deleteDepartment(id) {
		return http.delete(`/department/${id}`);
	}

	getScienceDegrees() {
		return http.get("/science-degrees");
	}
	getScienceDegreeRaw(id) {
		return http.get(`/science-degree-raw/${id}`);
	}
	createScienceDegree(data) {
		return http.post("/science-degree", data);
	}
	updateScienceDegree(id, data) {
		return http.put(`/science-degree/${id}`, data);
	}
	deleteScienceDegree(id) {
		return http.delete(`/science-degree/${id}`);
	}

	getTeacherRanks() {
		return http.get("/teacher-ranks");
	}
	getTeacherRankRaw(id) {
		return http.get(`/teacher-rank-raw/${id}`);
	}
	createTeacherRank(data) {
		return http.post("/teacher-rank", data);
	}
	updateTeacherRank(id, data) {
		return http.put(`/teacher-rank/${id}`, data);
	}
	deleteTeacherRank(id) {
		return http.delete(`/teacher-rank/${id}`);
	}

	getFaculties() {
		return http.get("/faculties");
	}
	getFacultyRaw(id) {
		return http.get(`/faculty-raw/${id}`);
	}
	createFaculty(data) {
		return http.post("/faculty", data);
	}
	updateFaculty(id, data) {
		return http.put(`/faculty/${id}`, data);
	}
	deleteFaculty(id) {
		return http.delete(`/faculty/${id}`);
	}

	getTopics() {
		return http.get("/topics");
	}
	getTopicRaw(id) {
		return http.get(`/topic-raw/${id}`);
	}
	getTopic(id) {
		return http.get(`/topic/${id}`);
	}
	createTopic(data) {
		return http.post("/topic", data);
	}
	updateTopic(id, data) {
		return http.put(`/topic/${id}`, data);
	}
	deleteTopic(id) {
		return http.delete(`/topic/${id}`);
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DataService();
