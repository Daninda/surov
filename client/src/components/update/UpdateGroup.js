import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import withRouter from "../withRouter.js";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class UpdateGroup extends Component {
	constructor(params) {
		super(params);
		this.state = {
			group_id: null,
			number: "",
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		const group_id = +this.props.params.id;
		DataService.getGroupRaw(group_id).then((res) => {
			this.setState(
				{
					group_id: group_id,
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
		if (this.state.number) {
			DataService.updateGroup(this.state.group_id, {
				number: this.state.number,
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
					<caption className="table__title">Обновление группы</caption>
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
					Обновить
				</Link>
			</>
		);
	}
}

export default withRouter(withSnackbar(UpdateGroup));
