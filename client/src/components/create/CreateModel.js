import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class CreateModel extends Component {
	constructor(params) {
		super(params);
		this.state = {
			model_id: "",
			name: "",
			color: "",
			upholstery: "",
			power: "",
			doors: "",
			transmission: "",
			provider_id: "",
			full_name: "",
			year: "",
			cost: "",
			presale: "",
			transport_cost: "",
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	onClickSubmit() {
		if (
			this.state.model_id &&
			this.state.name &&
			this.state.color &&
			this.state.upholstery &&
			this.state.power &&
			this.state.doors &&
			this.state.transmission &&
			this.state.provider_id &&
			this.state.full_name &&
			this.state.year &&
			this.state.cost &&
			this.state.presale &&
			this.state.transport_cost
		) {
			DataService.createModel({
				model_id: +this.state.model_id,
				name: this.state.name,
				color: this.state.color,
				upholstery: this.state.upholstery,
				power: this.state.power,
				doors: this.state.doors,
				transmission: this.state.transmission,
				provider_id: +this.state.provider_id,
				full_name: this.state.full_name,
				year: this.state.year,
				cost: this.state.cost,
				presale: this.state.presale,
				transport_cost: this.state.transport_cost,
			})
				.then(() => {
					this.setState({
						model_id: "",
						name: "",
						color: "",
						upholstery: "",
						power: "",
						doors: "",
						transmission: "",
						provider_id: "",
						full_name: "",
						year: "",
						cost: "",
						presale: "",
						transport_cost: "",
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
					<caption className="table__title">Добавление модели</caption>
					<thead>
						<tr>
							<th>Код модели</th>
							<th>Наименование</th>
							<th>Цвет</th>
							<th>Обивка</th>
							<th>Мощность</th>
							<th>Кол-во дверей</th>
							<th>Коробка передач</th>
							<th>Код фирмы</th>
							<th>Клиент</th>
							<th>Год выпуска</th>
							<th>Цена</th>
							<th>Предпродажная подготовка</th>
							<th>Транспортные издержки</th>
						</tr>
					</thead>
					<tbody>
						<tr>
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
									value={this.state.color}
									onChange={(e) => {
										this.setState({
											color: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.upholstery}
									onChange={(e) => {
										this.setState({
											upholstery: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.power}
									onChange={(e) => {
										this.setState({
											power: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.doors}
									onChange={(e) => {
										this.setState({
											doors: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.transmission}
									onChange={(e) => {
										this.setState({
											transmission: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
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
									value={this.state.year}
									onChange={(e) => {
										this.setState({
											year: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.cost}
									onChange={(e) => {
										this.setState({
											cost: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.presale}
									onChange={(e) => {
										this.setState({
											presale: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.transport_cost}
									onChange={(e) => {
										this.setState({
											transport_cost: e.target.value,
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

export default withSnackbar(CreateModel);
