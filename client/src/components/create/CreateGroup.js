import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class CreateGroup extends Component {
	constructor(params) {
		super(params);
		this.state = {
			number: "",
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	onClickSubmit() {
		if (this.state.number) {
			DataService.createGroup({
				number: this.state.number,
			})
				.then(() => {
					this.setState({
						number: "",
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
					<caption className="table__title">Добавление группы</caption>
					<thead>
						<tr>
							<th>Группа</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.number}
									onChange={(e) => {
										this.setState({
											number: e.target.value,
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

export default withSnackbar(CreateGroup);
