import React, { PureComponent } from "react";
import DataService from "../services/DataService.js";
import { Link } from "react-router-dom";
import printJS from "print-js";
import Select from "react-select";

export class MyReport extends PureComponent {
    constructor(params) {
        super(params);
        this.state = {
            isVisible: "hidden",
            students: [],
            groups: [],
            faculty_id: null,
            faculty_name: "",
            options_faculty: [],
        };
    }

    componentDidMount() {
        this.retrieve();
    }

    retrieve() {
        DataService.getFaculties()
            .then((res) => {
                this.setState({
                    options_faculty: res.data.map((item) => {
                        return {
                            value: item.faculty_id,
                            label: item.name,
                        };
                    }),
                });
            })
            .catch((err) => {
                console.log(err);
            });
        DataService.getStudents()
            .then((res) => {
                this.setState({
                    students: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
        DataService.getGroups()
            .then((res) => {
                this.setState({
                    groups: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    updateReport() {}

    reportBody() {
        let students = this.state.students;
        let groups = this.state.groups;
        students = students.filter(
            (item) => item.faculty === this.state.faculty_name
        );
        groups = groups.filter((group) =>
            students.find((student) => student.group === group.number)
        );
        return (
            <>
                {groups.map((group) => {
                    const groupStudent = students.filter(
                        (item) => group.number === item.group
                    );
                    return (
                        <>
                            <tr>
                                <td width="40%">
                                    <b>
                                        <em>Группа {group.number}:</em>
                                    </b>
                                </td>
                                <td width="20%"></td>
                                <td width="20%"></td>
                                <td width="20%"></td>
                            </tr>
                            {groupStudent.map((student) => {
                                return (
                                    <tr className="table__body-row">
                                        <td width="40%">{student.full_name}</td>
                                        <td width="20%">{student.exam}</td>
                                        <td width="20%">{student.diploma}</td>
                                        <td width="20%">
                                            {(
                                                (student.exam +
                                                    student.diploma) /
                                                2
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td width="40%">
                                    <em>
                                        &nbsp;&nbsp;&nbsp;&nbsp;Средний балл по
                                        группе:
                                    </em>
                                </td>
                                <td width="20%"></td>
                                <td width="20%"></td>
                                <td width="20%">
                                    <b>
                                        {(
                                            groupStudent.reduce(
                                                (accum, item) => {
                                                    return (
                                                        accum +
                                                        (item.exam +
                                                            item.diploma) /
                                                            2
                                                    );
                                                },
                                                0
                                            ) / groupStudent.length
                                        ).toFixed(2)}
                                    </b>
                                </td>
                            </tr>
                        </>
                    );
                })}
                <tr>
                    <td width="40%">
                        <b>
                            <em>Средний балл по институту:</em>
                        </b>
                    </td>
                    <td width="20%"></td>
                    <td width="20%"></td>
                    <td width="20%">
                        <b>
                            {(
                                students.reduce((accum, item) => {
                                    return (
                                        accum + (item.exam + item.diploma) / 2
                                    );
                                }, 0) / students.length
                            ).toFixed(2)}
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
                    <form>
                        <label
                            style={{
                                fontSize: 16 + "px",
                            }}
                        >
                            Выберите институт:
                        </label>
                        <Select
                            className="selector"
                            options={this.state.options_faculty}
                            value={
                                this.state.options_faculty.find((val) => {
                                    return val.value === this.state.faculty_id;
                                }) || ""
                            }
                            onChange={(option) => {
                                this.setState({
                                    isVisible: "visible",
                                    faculty_id: option.value || null,
                                    faculty_name: option.label || "",
                                });
                            }}
                        />
                    </form>
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
                <div
                    id="report"
                    style={{
                        visibility: this.state.isVisible,
                    }}
                >
                    <br />
                    <table className="table">
                        <caption>
                            <h3 className="table__title">
                                Ведомость успеваемости студентов БГЭУ{" "}
                                {this.state.faculty_name} за текущий семестр
                                2023 года
                            </h3>
                        </caption>
                        <thead>
                            <tr>
                                <td width="40%">
                                    <b>ФИО студента</b>
                                </td>
                                <td width="20%">
                                    <b>Оценка на госэкзамене</b>
                                </td>
                                <td width="20%">
                                    <b>Оценка на защите дипломной работы</b>
                                </td>
                                <td width="20%">
                                    <b>Средний балл</b>
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
