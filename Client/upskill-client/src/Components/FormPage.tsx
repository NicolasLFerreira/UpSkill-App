import React, { Component } from "react";
import { RepeatOneSharp, ThreeKSharp } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import StudentDataService from "../services/StudentDataService";
import IStudentData from "../types/IStudentData";

interface IProps {

}

interface IState {
    students: Array<IStudentData>,
    currentStudent: IStudentData | null,
    currentIndex: number,
    searchTitle: string
}

export default class FormPage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            students: [],
            currentStudent: null,
            currentIndex: -1,
            searchTitle: ""
        }
    }

    componentDidMount() {
        this.retrieveStudents();
        this.retrieveStudent();
    }

    retrieveStudents() {
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

    retrieveStudent() {
        StudentDataService.get(20)
            .then((response: any) => {
                this.setState({
                    currentStudent: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    makeJSX(object: IStudentData) {
        return (
            <div>
                First Name: {object.firstName}<br />
                Last Name: {object.lastName}<br />
                Year: {object.yearLevel}<br />
                DOB: {object.dob}<br />
                Ethnicity: {object.ethnicity}<br />
                <br />
            </div>
        );
    }

    getRndInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    postTest() {
        const names: Array<string> = ["Nicolas", "Say", "Jason", "Jack", "Steve", "Bob", "John", "Michael", "Jeff", "Jefferson", "Bill", "Robert", "Emma", "Aice", "Rose", "Clara", "Bella", "Daniella", "José"];
        const surnames: Array<string> = ["Stevens", "Smith", "William", "Jones", "Hall", "Batista", "Taylor", "Mason", "Graham", "Ford", "Stewart", "Cooper", "Hyde", "Ferreira", "Perereira", "Santos", "da Silva", "Dupont", "Paulo", "Cabrito Hermano"];
        const ethnicity: Array<string> = ["Latino", "European", "African", "Maori", "Asian"];
        const tutor: Array<string> = ["Kate", "Dusung", "Sally", "Simon", "Soteria", "Milton", "Bassam", ""];
        const pronouns: Array<string> = ["they/them", "she/her", "he/him"];
        const diagnosis: Array<string> = ["ADHD", "Asperger's", "OCD", "PTSD", "Anxiety", "LoL Player", "Eating Disorder", "Depression", "Schizophrenia"];
        const externalAgencies: Array<string> = ["Black Mesa", "Doofenshmirtz Evil Incorporated", "Umbrella", "Flat Earth Society"];

        var object: IStudentData = {
            "studentId": 0,
            "firstName": names[this.getRndInteger(0, names.length)],
            "lastName": surnames[this.getRndInteger(0, surnames.length)],
            "yearLevel": `${this.getRndInteger(11, 14)}`,
            "dob": `${this.getRndInteger(1, 32)}-${this.getRndInteger(1, 13)}-${this.getRndInteger(2000, 2011)}`,
            "ethnicity": ethnicity[this.getRndInteger(0, ethnicity.length)],
            "tutor": tutor[this.getRndInteger(0, tutor.length)],
            "areaOfNeed": this.getRndInteger(0, 6),
            "diagnosis": diagnosis[this.getRndInteger(0, diagnosis.length)],
            "externalAgencies": externalAgencies[this.getRndInteger(0, externalAgencies.length)],
            "response": this.getRndInteger(0, 7),
            "sac": this.getRndInteger(0, 6),
            "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis lorem in erat malesuada sodales. Vivamus eget gravida quam. Nulla.",
            "links": "https://google.com",
            "kamarUpdates": "string example",
            "pronoun": pronouns[this.getRndInteger(0, pronouns.length)],
            "sacInfo": "string example",
            "otherInfo": "string example"
        }

        StudentDataService.post(object);
        return this;
    }

    render() {
        var jsxArray = this.state.students.map((element: IStudentData) => this.makeJSX(element));
        // var jsx = this.makeJSX(this.state.currentStudent!);

        return (
            <Grid>
                <Button variant="contained" onClick={() => this.postTest().forceUpdate()}>
                    Generate Users
                </Button>
                {jsxArray}
            </Grid>
        );
    }
}