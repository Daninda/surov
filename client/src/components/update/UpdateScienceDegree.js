import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import withRouter from "../withRouter.js";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class UpdateScienceDegree extends Component {
	constructor(params) {
		super(params);
		this.state = {
			science_degree_id: null,
			name: "",
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		const science_degree_id = +this.props.params.id;
		DataService.getScienceDegreeRaw(science_degree_id).then((res) => {
			this.setState(
				{
					science_degree_id: science_degree_id,
					prevState: res.data[0],
				},
				() => {
					this.setState(this.state.prevState);
				}
			);
		});
	}

	onClickSubmit() {
		console.log(this.state);
		if (this.state.name) {
			DataService.updateScienceDegree(this.state.science_degree_id, {
				name: this.state.name,
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
					<caption className="table__title">Обновление научной степени</caption>
					<thead>
						<tr>
							<th>Научная степень</th>
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
					Обновить
				</Link>
			</>
		);
	}
}

export default withRouter(withSnackbar(UpdateScienceDegree));
