import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class CreateDepartment extends Component {
	constructor(params) {
		super(params);
		this.state = {
			name: "",
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	onClickSubmit() {
		if (this.state.name) {
			DataService.createDepartment({
				name: this.state.name,
			})
				.then(() => {
					this.setState({
						name: "",
					});
					this.props.openSnackbar("Успешно", 5000);
				})
				.catch(() => {
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
					<caption className="table__title">Добавление кафедры</caption>
					<thead>
						<tr>
							<th>Кафедра</th>
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

export default withSnackbar(CreateDepartment);
