import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import withRouter from "../withRouter.js";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class UpdateClient extends Component {
	constructor(params) {
		super(params);
		this.state = {
			full_name: "",
			agreement: null,
			date: "",
			phone: "",
			address: "",
			model_id: "",

			prevState: {},
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		const agreement = +this.props.params.id;
		DataService.getClient(agreement).then((res) => {
			this.setState(
				{
					agreement: agreement,
					prevState: res.data[0],
				},
				() => {
					this.setState({
						full_name: this.state.prevState.full_name,
						date: new Date(this.state.prevState.date).toLocaleDateString(
							"fr-CA"
						),
						phone: this.state.prevState.phone,
						address: this.state.prevState.address,
						model_id: this.state.prevState.model_id,
					});
				}
			);
		});
	}

	onClickSubmit() {
		if (
			this.state.date &&
			this.state.phone &&
			this.state.address &&
			this.state.model_id
		) {
			DataService.updateClient(this.state.agreement, {
				date: this.state.date,
				phone: this.state.phone,
				address: this.state.address,
				model_id: this.state.model_id,
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
				<table className="table student-table">
					<caption className="table__title">Обновление клиента</caption>
					<thead>
						<tr>
							<th>ФИО</th>
							<th>Дата покупки</th>
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
									disabled={true}
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
					Обновить
				</Link>
			</>
		);
	}
}

export default withRouter(withSnackbar(UpdateClient));
