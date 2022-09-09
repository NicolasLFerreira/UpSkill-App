import React, { Component } from "react";
import StudentDataCrud from "../../services/StudentDataCrud";
import IStudent from "../../types/IStudent";
import { emptyStudentObject } from "../../utility/StudentUtility";
import StudentDatagrid from "./StudentDatagrid";

interface IProps { }
interface IState {
    students: Array<IStudent>
}

export default class DatabasePage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        var object: Array<IStudent> = [emptyStudentObject];

        this.state = {
            students: object
        }
    }

    componentDidMount() {
        this.getStudents();
    }

    getStudents = () => {
        StudentDataCrud.getAll()
            .then((response: any) => {
                this.setState({
                    students: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        return (
            <StudentDatagrid students={this.state.students} />
        );
    }
}