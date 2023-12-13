import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class CreateClient extends Component {
	constructor(params) {
		super(params);
		this.state = {
			full_name: "",
			agreement: "",
			date: "",
			phone: "",
			address: "",
			model_id: "",
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	onClickSubmit() {
		if (
			this.state.full_name &&
			this.state.agreement &&
			this.state.date &&
			this.state.phone &&
			this.state.address &&
			this.state.model_id
		) {
			DataService.createClient({
				full_name: this.state.full_name,
				agreement: +this.state.agreement,
				date: this.state.date,
				phone: this.state.phone,
				address: this.state.address,
				model_id: +this.state.model_id,
			})
				.then(() => {
					this.setState({
						full_name: "",
						agreement: "",
						date: "",
						phone: "",
						address: "",
						model_id: "",
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
				<table className="table student-table">
					<caption className="table__title">Добавление клиента</caption>
					<thead>
						<tr>
							<th>ФИО</th>
							<th>Номер договора</th>
							<th>Дата</th>
							<th>Телефон</th>
							<th>Адрес</th>
							<th>Код модели</th>
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
									type="text"
									className="input"
									value={this.state.agreement}
									onChange={(e) => {
										this.setState({
											agreement: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.date}
									onChange={(e) => {
										this.setState({
											date: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.phone}
									onChange={(e) => {
										this.setState({
											phone: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.address}
									onChange={(e) => {
										this.setState({
											address: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.model_id}
									onChange={(e) => {
										this.setState({
											model_id: e.target.value,
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

export default withSnackbar(CreateClient);
