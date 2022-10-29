import React, { Component, ReactNode } from "react";
import { Button, Typography, Input, Box, TextField, Dialog } from "@mui/material";
import { default as Grid } from "@mui/material/Unstable_Grid2";
import FormSelect from "./FormSelect";
import IStudent from "../../types/IStudent";
import StudentDataCrud from "../../services/StudentDataCrud";
import { selectOptions, ISelectOptions, emptyStudentObject, DynamicPropertySetter, createStudent } from "../../utility/StudentUtility";
import FormSearch from "./FormSearch";
import { blueGrey } from "@mui/material/colors";

// Boilerplate stuff

interface IProps { }

interface IState {
    operation: OperationMode,
    students: Array<IStudent>,
    studentsDictionary: Map<number, IStudent>,
    currentStudent: IStudent
}

enum OperationMode {
    creation,
    update
}

const emptyState: IState = {
    operation: OperationMode.creation,
    students: [],
    studentsDictionary: new Map<number, IStudent>(),
    currentStudent: emptyStudentObject
}

// Contains the code for the form. DOESN'T CONTAINS SEARCH OR MODAL, JUST THE ACTUAL FORM. THOSE SHOULD BE ADDED AS SEPARATE COMPONENTS.
export default class Form extends Component<IProps, IState> {

    saved: boolean;

    constructor(props: IProps) {
        super(props);

        this.saved = true;

        this.state = emptyState;
    }

    componentDidMount() {
        this.getStudents();
    }

    // Get student data

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

    postStudent(student: IStudent) {
        student.studentId = undefined;
        this.saved = true;
        StudentDataCrud.post(student)
            .then((response) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        this.getStudents();
    }

    putStudent(student: IStudent) {
        this.saved = true;
        StudentDataCrud.put(student.studentId!, student)
            .then((response) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        this.getStudents();
    }

    // Dynamically updates the properties of the state.currentStudent as it's typed in the input field.
    registerChange = (property: string, value: string | number): void => {
        // MOVED THIS CHUNK OF CODE TO ITS OWN THING IN StudentUtility.ts
        // // Dynamically declares the key of an IStudentData object.
        // var object: IStudent = this.state.currentStudent;
        // var key: keyof IStudent = property as keyof IStudent;

        // // Updates the copy using the key and the given value.
        // object[key] = value as never;

        this.setState({
            currentStudent: DynamicPropertySetter(this.state.currentStudent, property, value)
        });
        this.saved = false;
    }

    handleStudentChange = (student: IStudent) => {
        if (this.saved) {
            this.setState({
                currentStudent: student,
                operation: OperationMode.update
            });
        }
        else {
            if (window.confirm("You have unsaved changes. Continue?")) {
                this.setState({
                    currentStudent: student,
                    operation: OperationMode.update
                });
                this.saved = true;
            }
            else {
                return;
            }
        }
    }

    // Utility

    switchOperation = () => {
        this.setState((oldState) => {
            return {
                operation: oldState.operation == OperationMode.creation ? OperationMode.update : OperationMode.creation
            }
        });
    }

    // Components

    // Creates an input field and assigns the callback function for registering the changes.
    InputFieldBuilder(property: string, placeholder: string, type: string = "text") {
        var jsxObject: ReactNode;

        if (type == "select") {
            var items = selectOptions[property as keyof ISelectOptions];
            var value = this.state.currentStudent[property as keyof IStudent] as number;

            if (value == 0) {
                value = 1;
            }

            jsxObject = <FormSelect
                value={value}
                label={placeholder}
                items={items!}
                callback={(value: number) => { this.registerChange(property, value); }}
            />
        }
        else {
            // DISCARDED AFTER I STARTED USING span={1} INSTEAD OF MARGIN.
            // CAN SIMPLY MAKE THE GRID ITEMS FILL THE ENTIRE SPACE.
            // HERE IN CASE I NEED IT IN THE FUTURE.
            // var scale = 6;
            const gridInputStyle = {
                // width: (100 / 6 * scale).toString() + "%"
                width: "100%"
            }

            const gridNotesStyle = {
                width: "100%"
                // width: (100 / 6 * scale).toString() + "%"
            }

            jsxObject = (
                <TextField
                    type={type}
                    label={placeholder}
                    value={this.state.currentStudent[property as keyof IStudent]}
                    // sx={type == "text" ? (property == "notes" ? gridNotesStyle : gridInputStyle) : gridDateStyle}
                    sx={property == "notes" ? gridNotesStyle : gridInputStyle}
                    variant="outlined"
                    multiline={property == "notes"}
                    InputLabelProps={type == "date" ? { shrink: true } : {}}
                    // onBlur={(event) => this.registerChange(property, event.target.value)}
                    onChange={(event) => this.registerChange(property, event.target.value)}
                />);
        }

        return (
            <Grid xs={property == "select" ? 4 : (property == "notes" ? 12 : 4)}>
                {jsxObject}
            </Grid >
        );
    }

    // Default button for the form page
    Button(text: string, callback: () => void) {
        return (
            <Button sx={{ backgroundColor: blueGrey[900], m: 1, ml: 0, width: 0.35 }} variant="contained" onClick={() => callback()}>
                {text}
            </Button>
        );
    }

    OperationButton() {
        return (
            this.state.operation == OperationMode.creation ?
                this.Button("Create", () => this.postStudent(this.state.currentStudent)) :
                this.Button("Save changes", () => this.putStudent(this.state.currentStudent))
        );
    }

    render() {
        const setHeight = "60vh";
        return (
            /* <Grid xs={2}>
                <FormSearch callback={(student: IStudent) => this.handleStudentChange(student)} />
            </Grid> */
            <Box sx={{ height: setHeight, mt: 2 }}>
                <Grid container alignContent="center" justifyContent="center">
                    <Grid container xs={2} sx={{ backgroundColor: "#eceff1", height: setHeight, display: "flex", flexDirection: "column" }}>
                        <FormSearch callback={(student: IStudent) => this.handleStudentChange(student)} />
                    </Grid>
                    <Grid container xs={10} rowSpacing={2} sx={{ width: "75%", ml: 1, p: 1 }}>
                        <Box>
                            <Grid xs="auto">
                                <Typography component="h2" variant="h6">
                                    {this.state.operation == OperationMode.creation ? "Creating: " : "Updating: "}{this.state.currentStudent.firstName + " " + this.state.currentStudent.lastName}
                                </Typography>
                            </Grid>
                            <Grid container xs={12} spacing={2}>
                                {/* 1st ROW: IDENTIFICATION AND PERSONAL DETAILS */}
                                {this.InputFieldBuilder("firstName", "First name")}
                                {this.InputFieldBuilder("lastName", "Last name")}
                                {this.InputFieldBuilder("dob", "DOB", "date")}
                                {this.InputFieldBuilder("ethnicity", "Ethnicity")}
                                {this.InputFieldBuilder("pronoun", "Pronoun")}
                                {this.InputFieldBuilder("yearLevel", "Year Level")}

                                {/* 2nd ROW: EDUCATION AND DIAGNOSIS RELATED */}
                                {this.InputFieldBuilder("tutor", "Tutor")}
                                {this.InputFieldBuilder("diagnosis", "Diagnosis")}
                                {this.InputFieldBuilder("externalAgencies", "External Agencies")}
                                {this.InputFieldBuilder("links", "Links")}
                                {this.InputFieldBuilder("kamarUpdates", "Kamar Updates")}
                                {this.InputFieldBuilder("sacInfo", "SAC Info")}

                                {/* 3rd ROW: MISC INFO */}
                                {this.InputFieldBuilder("otherInfo", "Other Info")}
                                {this.InputFieldBuilder("notes", "Notes")}
                            </Grid>
                            <Grid container xs={12} spacing={1} sx={{ mt: 1 }}>
                                {/* 4th ROW: DROPDOWN MENUS */}
                                {this.InputFieldBuilder("sac", "SAC", "select")}
                                {this.InputFieldBuilder("areaOfNeed", "Area of Need", "select")}
                                {this.InputFieldBuilder("response", "Response", "select")}
                            </Grid>
                            <Grid xs={6} >
                                {this.OperationButton()}
                                {this.Button("Change operation", () => this.switchOperation())}
                                {/* <button onClick={() => this.postStudent(createStudent())}>click</button> USED FOR GENERATING NEW STUDENT RECORDS */}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        );
    }
}