import React, { Component } from "react";
import { RepeatOneSharp, ThreeKSharp } from "@mui/icons-material";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import StudentDataCrud from "../services/StudentDataCrud";
import IStudentData from "../types/IStudentData";
import FormModal from "./FormModal";

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
    }

    retrieveStudents() {
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

    postTemporary() {
        function getRndInteger(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        const names: Array<string> = ["Nicolas", "Say", "Jason", "Jack", "Steve", "Bob", "John", "Michael", "Jeff", "Jefferson", "Bill", "Robert", "Emma", "Aice", "Rose", "Clara", "Bella", "Daniella", "José"];
        const surnames: Array<string> = ["Stevens", "Smith", "William", "Jones", "Hall", "Batista", "Taylor", "Mason", "Graham", "Ford", "Stewart", "Cooper", "Hyde", "Ferreira", "Perereira", "Santos", "da Silva", "Dupont", "Paulo", "Cabrito Hermano"];
        const ethnicity: Array<string> = ["Latino", "European", "African", "Maori", "Asian"];
        const tutor: Array<string> = ["Kate", "Dusung", "Sally", "Simon", "Soteria", "Milton", "Bassam", ""];
        const pronouns: Array<string> = ["they/them", "she/her", "he/him"];
        const diagnosis: Array<string> = ["ADHD", "Asperger's", "OCD", "PTSD", "Anxiety", "LoL Player", "Eating Disorder", "Depression", "Schizophrenia"];
        const externalAgencies: Array<string> = ["Black Mesa", "Doofenshmirtz Evil Incorporated", "Umbrella", "Flat Earth Society"];

        var object: IStudentData = {
            "studentId": 0,
            "firstName": names[getRndInteger(0, names.length)],
            "lastName": surnames[getRndInteger(0, surnames.length)],
            "yearLevel": `${getRndInteger(11, 14)}`,
            "dob": `${getRndInteger(1, 32)}-${getRndInteger(1, 13)}-${getRndInteger(2000, 2011)}`,
            "ethnicity": ethnicity[getRndInteger(0, ethnicity.length)],
            "tutor": tutor[getRndInteger(0, tutor.length)],
            "areaOfNeed": getRndInteger(0, 6),
            "diagnosis": diagnosis[getRndInteger(0, diagnosis.length)],
            "externalAgencies": externalAgencies[getRndInteger(0, externalAgencies.length)],
            "response": getRndInteger(0, 7),
            "sac": getRndInteger(0, 6),
            "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis lorem in erat malesuada sodales. Vivamus eget gravida quam. Nulla.",
            "links": "https://google.com",
            "kamarUpdates": "string example",
            "pronoun": pronouns[getRndInteger(0, pronouns.length)],
            "sacInfo": "string example",
            "otherInfo": "string example"
        }

        StudentDataCrud.post(object)
            .then((response) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <FormModal createStudentCallback={this.postTemporary} />
            </Box>
        );
    }
}