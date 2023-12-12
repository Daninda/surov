import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";
import Select from "react-select";

class CreateStudent extends Component {
	constructor(params) {
		super(params);
		this.state = {
			full_name: "",
			group_id: null,
			faculty_id: null,
			teacher_id: null,
			topic_id: null,
			exam: null,
			diploma: null,

			options_group: [],
			options_faculty: [],
			options_teachers: [],
			options_topics: [],
		};

		this.onChangeTeacher = this.onChangeTeacher.bind(this);
		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		DataService.getGroups()
			.then((res) => {
				this.setState({
					options_group: res.data.map((item) => {
						return {
							value: item.group_id,
							label: item.number,
						};
					}),
				});
			})
			.catch((err) => {
				console.log(err);
			});

		DataService.getFaculties()
			.then((res) => {
				this.setState({
					options_faculty: res.data.map((item) => {
						return {
							value: item.faculty_id,
							label: item.name,
						};
					}),
				});
			})
			.catch((err) => {
				console.log(err);
			});
		DataService.getTeachers()
			.then((res) => {
				this.setState({
					options_teachers: res.data.map((item) => {
						return {
							value: item.teacher_id,
							label: item.full_name,
						};
					}),
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	onChangeTeacher(option) {
		this.setState({
			teacher_id: option.value || null,
			topic_id: null,
		});

		DataService.getFreeTeacherTopics(option.value)
			.then((res) => {
				this.setState({
					options_topics: res.data.map((item) => {
						return {
							value: item.topic_id,
							label: item.name,
						};
					}),
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	onClickSubmit() {
		if (
			this.state.full_name &&
			this.state.group_id &&
			this.state.faculty_id &&
			this.state.teacher_id &&
			this.state.topic_id &&
			this.state.exam >= 2 &&
			this.state.exam <= 5 &&
			this.state.diploma >= 2 &&
			this.state.diploma <= 5
		) {
			DataService.createStudent({
				full_name: this.state.full_name,
				group_id: this.state.group_id,
				faculty_id: this.state.faculty_id,
				teacher_id: this.state.teacher_id,
				topic_id: this.state.topic_id,
				exam: this.state.exam,
				diploma: this.state.diploma,
			})
				.then(() => {
					this.setState({
						full_name: "",
						group_id: null,
						faculty_id: null,
						teacher_id: null,
						topic_id: null,
						exam: null,
						diploma: null,

						options_group: [],
						options_faculty: [],
						options_teachers: [],
						options_topics: [],
					});
					this.props.openSnackbar("Успешно", 5000);
				})
				.catch(() => {
					this.props.openSnackbar("Ошибка", 5000);
				});
		} else {
			this.props.openSnackbar("Ошибка", 5000);
		}
		this.retrieve();
	}
	render() {
		return (
			<>
				<table className="table student-table">
					<caption className="table__title">Добавление студента</caption>
					<thead>
						<tr>
							<th width="30%">ФИО</th>
							<th>Группа</th>
							<th>Институт</th>
							<th>Научный руководитель</th>
							<th>Тема проектной работы</th>
							<th width="6%">Оценка за экзамен</th>
							<th width="6%">Оценка за диплом</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.full_name}
									onChange={(e) => {
										this.setState({
											full_name: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<Select
									className="selector"
									options={this.state.options_group}
									value={
										this.state.options_group.find((val) => {
											return val.value === this.state.group_id;
										}) || ""
									}
									onChange={(option) => {
										this.setState({
											group_id: option.value || null,
										});
									}}
								/>
							</td>
							<td>
								<Select
									className="selector"
									options={this.state.options_faculty}
									value={
										this.state.options_faculty.find((val) => {
											return val.value === this.state.faculty_id;
										}) || ""
									}
									onChange={(option) => {
										this.setState({
											faculty_id: option.value || null,
										});
									}}
								/>
							</td>
							<td>
								<Select
									className="selector"
									value={
										this.state.options_teachers.find((val) => {
											return val.value === this.state.teacher_id;
										}) || ""
									}
									onChange={this.onChangeTeacher}
									options={this.state.options_teachers}
								/>
							</td>
							<td>
								<Select
									id="select-topic"
									className="selector"
									options={this.state.options_topics}
									value={
										this.state.options_topics.find((val) => {
											return val.value === this.state.topic_id;
										}) || ""
									}
									onChange={(option) => {
										this.setState({
											topic_id: option.value || null,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="number"
									min={2}
									max={5}
									className="input"
									value={+this.state.exam || ""}
									onChange={(e) => {
										this.setState({
											exam: +e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="number"
									min={2}
									max={5}
									className="input"
									value={+this.state.diploma || ""}
									onChange={(e) => {
										this.setState({
											diploma: +e.target.value,
										});
									}}
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<Link className="add-button" onClick={this.onClickSubmit}>
					Добавить
				</Link>
			</>
		);
	}
}

export default withSnackbar(CreateStudent);
