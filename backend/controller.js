const db = require("./db");

class Controller {
	async createTeacher(req, res) {
		const {
			full_name,
			phone,
			email,
			science_degree_id,
			department_id,
			teacher_rank_id,
		} = req.body;
		await db.query(
			`INSERT INTO teacher (full_name, phone, email, science_degree_id, department_id, teacher_rank_id) VALUES
            (?, ?, ?, ?, ?, ?)`,
			[
				full_name,
				phone,
				email,
				science_degree_id,
				department_id,
				teacher_rank_id,
			],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateTeacher(req, res) {
		const id = +req.params.id;
		const {
			full_name,
			phone,
			email,
			science_degree_id,
			department_id,
			teacher_rank_id,
		} = req.body;
		await db.query(
			`UPDATE teacher SET
			full_name = ?, phone = ?, email = ?, science_degree_id = ?, department_id = ?, teacher_rank_id = ?
            WHERE teacher_id = ?`,
			[
				full_name,
				phone,
				email,
				science_degree_id,
				department_id,
				teacher_rank_id,
				id,
			],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteTeacher(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM topic WHERE teacher_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				db.query(
					`DELETE FROM teacher WHERE teacher_id = ?`,
					[id],
					(err, result, field) => {
						if (err) {
							console.log(err);
							return res.status(500).json({ message: "Ошибка" });
						}
						res.json(result);
					}
				);
			}
		);
	}
	async getTeachers(req, res) {
		await db.query(
			`SELECT teacher_id, full_name, phone, email, science_degree.name science_degree, department.name department, teacher_rank.name teacher_rank 
            FROM teacher
            JOIN science_degree USING(science_degree_id)
            JOIN department USING(department_id)
            JOIN teacher_rank USING(teacher_rank_id)
			ORDER BY full_name`,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getTeacherRaw(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT * FROM teacher
			WHERE teacher_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createStudent(req, res) {
		const { full_name, group_id, faculty_id, topic_id, exam, diploma } =
			req.body;
		await db.query(
			`INSERT INTO student (full_name, group_id, faculty_id, topic_id) VALUES
            (?, ?, ?, ?)`,
			[full_name, group_id, faculty_id, topic_id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				db.query(
					`INSERT INTO grade (exam, diploma, student_id) VALUES
                    (?, ?, ?)`,
					[exam, diploma, result.insertId],
					(err, result, field) => {
						if (err) {
							console.log(err);
							return res.status(500).json({ message: "Ошибка" });
						}
						res.json(result);
					}
				);
			}
		);
	}
	async updateStudent(req, res) {
		const id = +req.params.id;
		const { full_name, group_id, faculty_id, topic_id, exam, diploma } =
			req.body;
		await db.query(
			`UPDATE student SET 
			full_name = ?, group_id = ?, faculty_id = ?, topic_id = ?
			WHERE student_id = ?`,
			[full_name, group_id, faculty_id, topic_id, id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				db.query(
					`UPDATE grade SET 
					exam = ?, diploma = ?
					WHERE student_id = ?`,
					[exam, diploma, id],
					(err, result, field) => {
						if (err) {
							console.log(err);
							return res.status(500).json({ message: "Ошибка" });
						}
						res.json(result);
					}
				);
			}
		);
	}

	async deleteStudent(req, res) {
		const id = +req.params.id;
		db.query(
			`DELETE FROM grade WHERE student_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				db.query(
					`DELETE FROM student WHERE student_id = ?`,
					[id],
					(err, result, field) => {
						if (err) {
							console.log(err);
							return res.status(500).json({ message: "Ошибка" });
						}
						res.json(result);
					}
				);
			}
		);
	}
	async getStudents(req, res) {
		await db.query(
			`SELECT student_id, student.full_name, \`group\`.number 'group', faculty.name faculty, teacher.full_name 'teacher', topic.name topic, grade.exam, grade.diploma
            FROM student
            JOIN \`group\` USING(group_id)
            JOIN faculty USING(faculty_id)
            JOIN topic USING(topic_id)
			JOIN teacher USING(teacher_id)
            JOIN grade USING(student_id)
			ORDER BY student.full_name`,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getStudent(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT student_id, student.full_name, \`group\`.number 'group', faculty.name faculty, teacher.full_name 'teacher', topic.name topic, grade.exam, grade.diploma
            FROM student
            JOIN \`group\` USING(group_id)
            JOIN faculty USING(faculty_id)
            JOIN topic USING(topic_id)
			JOIN teacher USING(teacher_id)
            JOIN grade USING(student_id)
			WHERE student_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getStudentRaw(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT student_id, student.full_name, group_id, faculty_id, teacher_id, topic_id, grade.exam, grade.diploma
			FROM student
			JOIN topic USING(topic_id)
			JOIN teacher USING(teacher_id)
			JOIN grade USING(student_id)
			WHERE student_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createTopic(req, res) {
		const { name, teacher_id } = req.body;
		await db.query(
			`INSERT INTO topic (name, teacher_id) VALUES
            (?, ?)`,
			[name, teacher_id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateTopic(req, res) {
		const id = +req.params.id;
		const { name, teacher_id } = req.body;
		await db.query(
			`UPDATE topic SET
			name = ?, teacher_id = ?
            WHERE topic_id = ?`,
			[name, teacher_id, id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteTopic(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM topic WHERE topic_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getTopics(req, res) {
		await db.query(
			`SELECT topic_id, name, teacher.full_name 
            FROM topic
            JOIN teacher USING(teacher_id)
			ORDER BY full_name`,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getTopicRaw(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT * FROM topic
			WHERE topic_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getTopic(req, res) {
		const id = req.params.id;
		await db.query(
			`SELECT topic_id, name, teacher.full_name 
            FROM topic
            JOIN teacher USING(teacher_id)
			WHERE topic_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getFreeTeacherTopics(req, res) {
		const id = req.params.id;
		await db.query(
			`SELECT topic.topic_id, topic.name 
			FROM topic
			LEFT JOIN student USING(topic_id)
			WHERE teacher_id = ? AND student.topic_id IS NULL`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createDepartment(req, res) {
		const { name } = req.body;
		await db.query(
			`INSERT INTO department (name) VALUES
            (?)`,
			[name],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateDepartment(req, res) {
		const id = +req.params.id;
		const { name } = req.body;
		await db.query(
			`UPDATE department SET
			name = ?
            WHERE department_id = ?`,
			[name, id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteDepartment(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM department WHERE department_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getDepartments(req, res) {
		await db.query(`SELECT * FROM department`, (err, result, field) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Ошибка" });
			}
			res.json(result);
		});
	}
	async getDepartmentRaw(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT * FROM department
			WHERE department_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createFaculty(req, res) {
		const { name } = req.body;
		await db.query(
			`INSERT INTO faculty (name) VALUES
            (?)`,
			[name],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateFaculty(req, res) {
		const id = +req.params.id;
		const { name } = req.body;
		await db.query(
			`UPDATE faculty SET
			name = ?
            WHERE faculty_id = ?`,
			[name, id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteFaculty(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM faculty WHERE faculty_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getFaculties(req, res) {
		await db.query(`SELECT * FROM faculty`, (err, result, field) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Ошибка" });
			}
			res.json(result);
		});
	}
	async getFacultyRaw(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT * FROM faculty
			WHERE faculty_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createGroup(req, res) {
		const { number } = req.body;
		await db.query(
			`INSERT INTO \`group\` (number) VALUES
            (?)`,
			[number],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateGroup(req, res) {
		const id = +req.params.id;
		const { number } = req.body;
		await db.query(
			`UPDATE \`group\` SET
			number = ?
            WHERE group_id = ?`,
			[number, id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteGroup(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM \`group\` WHERE group_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getGroups(req, res) {
		await db.query(`SELECT * FROM \`group\``, (err, result, field) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Ошибка" });
			}
			res.json(result);
		});
	}
	async getGroupRaw(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT * FROM \`group\`
			WHERE group_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createScienceDegree(req, res) {
		const { name } = req.body;
		await db.query(
			`INSERT INTO science_degree (name) VALUES
            (?)`,
			[name],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateScienceDegree(req, res) {
		const id = +req.params.id;
		const { name } = req.body;
		await db.query(
			`UPDATE science_degree SET
			name = ?
            WHERE science_degree_id = ?`,
			[name, id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteScienceDegree(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM science_degree WHERE science_degree_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getScienceDegrees(req, res) {
		await db.query(`SELECT * FROM science_degree`, (err, result, field) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Ошибка" });
			}
			res.json(result);
		});
	}
	async getScienceDegreeRaw(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT * FROM science_degree
			WHERE science_degree_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createTeacherRank(req, res) {
		const { name } = req.body;
		await db.query(
			`INSERT INTO teacher_rank (name) VALUES
            (?)`,
			[name],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateTeacherRank(req, res) {
		const id = +req.params.id;
		const { name } = req.body;
		await db.query(
			`UPDATE teacher_rank SET
			name = ?
            WHERE teacher_rank_id = ?`,
			[name, id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteTeacherRank(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM teacher_rank WHERE teacher_rank_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getTeacherRanks(req, res) {
		await db.query(`SELECT * FROM teacher_rank`, (err, result, field) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Ошибка" });
			}
			res.json(result);
		});
	}
	async getTeacherRankRaw(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT * FROM teacher_rank
			WHERE teacher_rank_id = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
}

module.exports = new Controller();
