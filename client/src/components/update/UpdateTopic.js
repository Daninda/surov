import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import withRouter from "../withRouter.js";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";
import Select from "react-select";

class UpdateTopic extends Component {
	constructor(params) {
		super(params);
		this.state = {
			topic_id: null,
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
		const topic_id = +this.props.params.id;
		DataService.getTopicRaw(topic_id).then((res) => {
			this.setState(
				{
					topic_id: topic_id,
					prevState: res.data[0],
				},
				() => {
					this.setState(this.state.prevState);
				}
			);
		});

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
		console.log(this.state);
		if (this.state.name && this.state.teacher_id) {
			DataService.updateTopic(this.state.topic_id, {
				name: this.state.name,
				teacher_id: this.state.teacher_id,
			})
				.then(() => {
					this.retrieve();
					this.props.openSnackbar("Успешно", 5000);
				})
				.catch(() => {
					this.retrieve();
					this.props.openSnackbar("Ошибка", 5000);
				});
		} else {
			this.props.openSnackbar("Ошибка", 5000);
		}
	}
	render() {
		return (
			<>
				<table className="table">
					<caption className="table__title">Обновление темы</caption>
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
							</td>
						</tr>
					</tbody>
				</table>
				<Link className="add-button" onClick={this.onClickSubmit}>
					Обновить
				</Link>
			</>
		);
	}
}

export default withRouter(withSnackbar(UpdateTopic));
