import React, { Component } from "react";
import StudentDataService from "../services/StudentDataService";
import IStudentData from "../types/IStudentData";
import StudentDatagrid from "./DataTableStuff/StudentDatagrid";

interface IProps { }
interface IState {
    students: Array<IStudentData>
}

export default class DatabasePage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        var object: Array<IStudentData> = [{
            studentId: 0,
            firstName: "",
            lastName: "",
            yearLevel: "",
            dob: "",
            ethnicity: "",
            tutor: "",
            areaOfNeed: 0,
            diagnosis: "",
            externalAgencies: "",
            response: 0,
            sac: 0,
            notes: "",
            links: "",
            kamarUpdates: "",
            pronoun: "",
            sacInfo: "",
            otherInfo: ""
        }];

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