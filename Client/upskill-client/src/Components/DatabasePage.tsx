import React, { Component } from "react";
import StudentDataService from "../services/StudentDataService";
import IStudentData, { defaultStudentObject } from "../types/IStudentData";
import StudentDatagrid from "./StudentDatagrid";

interface IProps { }
interface IState {
    students: Array<IStudentData>
}

export default class DatabasePage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        var object: Array<IStudentData> = [defaultStudentObject];

        this.state = {
            students: object
        }
    }

    componentDidMount() {
        this.getStudents();
    }

    getStudents = () => {
        StudentDataService.getAll()
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
            <div>
                <StudentDatagrid students={this.state.students} />
            </div>
        );
    }
}