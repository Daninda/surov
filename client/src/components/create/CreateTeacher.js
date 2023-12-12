import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";
import Select from "react-select";

class CreateTeacher extends Component {
	constructor(params) {
		super(params);
		this.state = {
			full_name: "",
			phone: null,
			email: "",
			science_degree_id: null,
			department_id: null,
			teacher_rank_id: null,

			options_science_degree: [],
			options_department: [],
			options_teacher_rank: [],
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		DataService.getScienceDegrees()
			.then((res) => {
				this.setState({
					options_science_degree: res.data.map((item) => {
						return {
							value: item.science_degree_id,
							label: item.name,
						};
					}),
				});
			})
			.catch((err) => {
				console.log(err);
			});

		DataService.getDepartments()
			.then((res) => {
				this.setState({
					options_department: res.data.map((item) => {
						return {
							value: item.department_id,
							label: item.name,
						};
					}),
				});
			})
			.catch((err) => {
				console.log(err);
			});
		DataService.getTeacherRanks()
			.then((res) => {
				this.setState({
					options_teacher_rank: res.data.map((item) => {
						return {
							value: item.teacher_rank_id,
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
			this.state.phone >= 70000000000 &&
			this.state.phone <= 79999999999 &&
			this.state.email &&
			this.state.department_id &&
			this.state.science_degree_id &&
			this.state.teacher_rank_id
		) {
			DataService.createTeacher({
				full_name: this.state.full_name,
				phone: this.state.phone,
				email: this.state.email,
				department_id: this.state.department_id,
				science_degree_id: this.state.science_degree_id,
				teacher_rank_id: this.state.teacher_rank_id,
			})
				.then(() => {
					this.setState({
						full_name: "",
						phone: null,
						email: "",
						science_degree_id: null,
						department_id: null,
						teacher_rank_id: null,

						options_science_degree: [],
						options_department: [],
						options_teacher_rank: [],
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
				<table className="table teacher-table">
					<caption className="table__title">Добавление преподавателя</caption>
					<thead>
						<tr>
							<th width="20%">ФИО</th>
							<th width="12%">Телефон</th>
							<th width="14%">Email</th>
							<th>Кафедра</th>
							<th>Научная степень</th>
							<th>Ученое звание</th>
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
								<input
									type="number"
									className="input"
									value={+this.state.phone || ""}
									onChange={(e) => {
										this.setState({
											phone: +e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.email}
									onChange={(e) => {
										this.setState({
											email: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<div className="select">
									<Select
										className="selector"
										options={this.state.options_department}
										value={
											this.state.options_department.find((val) => {
												return val.value === this.state.department_id;
											}) || ""
										}
										onChange={(option) => {
											this.setState({
												department_id: option.value || null,
											});
										}}
									/>
								</div>
							</td>
							<td>
								<div className="select">
									<Select
										className="selector"
										options={this.state.options_science_degree}
										value={
											this.state.options_science_degree.find((val) => {
												return val.value === this.state.science_degree_id;
											}) || ""
										}
										onChange={(option) => {
											this.setState({
												science_degree_id: option.value || null,
											});
										}}
									/>
								</div>
							</td>
							<td>
								<div className="select">
									<Select
										className="selector"
										options={this.state.options_teacher_rank}
										value={
											this.state.options_teacher_rank.find((val) => {
												return val.value === this.state.teacher_rank_id;
											}) || ""
										}
										onChange={(option) => {
											this.setState({
												teacher_rank_id: option.value || null,
											});
										}}
									/>
								</div>
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

export default withSnackbar(CreateTeacher);
