import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import withRouter from "../withRouter.js";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class UpdateProvider extends Component {
	constructor(params) {
		super(params);
		this.state = {
			provider_id: "",
			phone: "",
			email: "",
			name: "",
			address: "",

			prevState: {},
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		const provider_id = +this.props.params.id;
		DataService.getProvider(provider_id).then((res) => {
			this.setState(
				{
					provider_id: provider_id,
					prevState: res.data[0],
				},
				() => {
					this.setState({
						phone: this.state.prevState.phone,
						email: this.state.prevState.email,
						name: this.state.prevState.name,
						address: this.state.prevState.address,
					});
				}
			);
		});
	}

	onClickSubmit() {
		if (
			this.state.phone &&
			this.state.email &&
			this.state.name &&
			this.state.address
		) {
			DataService.updateProvider(this.state.provider_id, {
				phone: this.state.phone,
				email: this.state.email,
				name: this.state.name,
				address: this.state.address,
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
					<caption className="table__title">Обновление поставщика</caption>
					<thead>
						<tr>
							<th>Код фирмы</th>
							<th>Телефон</th>
							<th>Email</th>
							<th>Название фирмы</th>
							<th>Адрес сайта</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									type="text"
									className="input"
									disabled={true}
									value={this.state.provider_id}
									onChange={(e) => {
										this.setState({
											provider_id: e.target.value,
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
									value={this.state.email}
									onChange={(e) => {
										this.setState({
											email: e.target.value,
										});
									}}
								/>
							</td>
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

export default withRouter(withSnackbar(UpdateProvider));
