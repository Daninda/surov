import React, { PureComponent } from "react";
import DataService from "../services/DataService.js";
import { Link } from "react-router-dom";
import printJS from "print-js";

export class MyReport extends PureComponent {
	constructor(params) {
		super(params);
		this.state = {
			models: [],
			providers: [],
		};
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		DataService.getModels()
			.then((res) => {
				this.setState({
					models: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});

		DataService.getProviders()
			.then((res) => {
				this.setState({
					providers: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	reportBody() {
		let models = this.state.models;
		let providers = this.state.providers;
		return (
			<>
				{providers.map((provider) => {
					const currmodels = models.filter(
						(item) => item.provider === provider.name
					);
					return (
						<>
							<tr>
								<td>
									<b>
										<em>Фирма {provider.name}:</em>
									</b>
								</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							{currmodels.map((model) => {
								return (
									<tr className="table__body-row">
										<td>{model.name}</td>
										<td>{model.cost}</td>
										<td>{model.presale}</td>
										<td>{model.transport_cost}</td>
										<td>{model.cost + model.presale + model.transport_cost}</td>
									</tr>
								);
							})}
							<tr>
								<td>
									<em>&nbsp;&nbsp;&nbsp;&nbsp;Итого по фирме:</em>
								</td>
								<td></td>
								<td></td>
								<td></td>
								<td>
									<b>
										{currmodels.reduce((accum, item) => {
											return (
												accum + item.cost + item.presale + item.transport_cost
											);
										}, 0)}
									</b>
								</td>
							</tr>
						</>
					);
				})}
				<tr>
					<td>
						<b>
							<em>Итого:</em>
						</b>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td>
						<b>
							{models.reduce((accum, item) => {
								return accum + item.cost + item.presale + item.transport_cost;
							}, 0)}
						</b>
					</td>
				</tr>
			</>
		);
	}

	render() {
		return (
			<>
				<h1 className="table__title">Отчет</h1>
				<div
					style={{
						display: "flex",
					}}
				>
					<Link
						className="add-button"
						onClick={() => {
							printJS({
								printable: "report",
								type: "html",
							});
						}}
					>
						Печать
					</Link>
				</div>
				<div id="report">
					<br />
					<table className="table">
						<caption>
							<h3 className="table__title">Отчет о реализации автомобилей</h3>
						</caption>
						<thead>
							<tr>
								<td>
									<b>Наименование модели</b>
								</td>
								<td>
									<b>Цена, у.е.</b>
								</td>
								<td>
									<b>Предпродажная подготовка, у.е.</b>
								</td>
								<td>
									<b>Транспортные издержки, у.е.</b>
								</td>
								<td>
									<b>Стоимость, у.е.</b>
								</td>
							</tr>
						</thead>
						<tbody>{this.reportBody()}</tbody>
					</table>
				</div>
			</>
		);
	}
}
