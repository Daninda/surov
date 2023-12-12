import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";
import Select from "react-select";

class CreateTopic extends Component {
	constructor(params) {
		super(params);
		this.state = {
			name: "",
			teacher_id: null,

			options_teacher: [],
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		DataService.getTeachers()
			.then((res) => {
				this.setState({
					options_teacher: res.data.map((item) => {
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
	onClickSubmit() {
		if (this.state.name && this.state.teacher_id) {
			DataService.createTopic({
				name: this.state.name,
				teacher_id: this.state.teacher_id,
			})
				.then(() => {
					this.setState({
						name: "",
						teacher_id: null,

						options_teacher: [],
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
				<table className="table">
					<caption className="table__title">Добавление темы</caption>
					<thead>
						<tr>
							<th width="90%">Тема</th>
							<th>Преподаватель</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.name}
									onChange={(e) => {
										this.setState({
											name: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<div>
									<Select
										className="selector"
										options={this.state.options_teacher}
										value={
											this.state.options_teacher.find((val) => {
												return val.value === this.state.teacher_id;
											}) || ""
										}
										onChange={(option) => {
											this.setState({
												teacher_id: option.value || null,
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

export default withSnackbar(CreateTopic);
