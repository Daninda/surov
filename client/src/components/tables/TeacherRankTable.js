import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";

import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class TeacherRankTable extends Component {
	constructor(params) {
		super(params);
		this.state = {
			teacherRanks: [],
		};
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		DataService.getTeacherRanks()
			.then((res) => {
				this.setState({
					teacherRanks: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		const { teacherRanks } = this.state;
		return (
			<>
				<h1 className="table__title">Ученые звания</h1>
				<Link className="add-button" to={"/create-teacher-rank"}>
					Добавить
				</Link>
				<table className="table">
					<thead>
						<tr>
							<th>Ученое звание</th>
							<th width="3.5%"></th>
							<th width="3.5%"></th>
						</tr>
					</thead>
					<tbody>
						{teacherRanks.map((teacherRank) => (
							<tr key={teacherRank.teacher_rank_id} className="table__body-row">
								<td>{teacherRank.name}</td>
								<td>
									<Link
										className="remove-button"
										to={`/update-teacher-rank/${teacherRank.teacher_rank_id}`}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											x="0px"
											y="0px"
											width="20"
											height="20"
											viewBox="0 0 30 30"
										>
											<path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
										</svg>
									</Link>
								</td>
								<td>
									<Link
										className="remove-button"
										onClick={(e) => {
											DataService.deleteTeacherRank(teacherRank.teacher_rank_id)
												.then(() => {
													this.props.openSnackbar("Успешно", 5000);
													this.retrieve();
												})
												.catch(() => {
													this.props.openSnackbar("Невозможно", 5000);
												});
										}}
									>
										<svg width="16" height="16" viewBox="0 0 16 16">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
											></path>
										</svg>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	}
}

export default withSnackbar(TeacherRankTable);
