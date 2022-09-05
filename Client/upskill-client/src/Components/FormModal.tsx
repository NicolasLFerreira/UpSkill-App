import React, { Component, Fragment } from "react";
import { Box, Button, Typography, Modal, Input, SelectChangeEvent, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { values } from '../types/IStudentDataDisplay';
import InputField from './InputField';
import IStudentData, { defaultStudentObject, emptyStudentObject } from "../types/IStudentData";

// Styles
const boxStyle = {
    flex: 1,
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "75%",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const gridButtonStyle = {
    justifyContent: "left",
    m: 1
}

const gridInputStyle = {
    m: 1,
}

// Boilerplate interfaces

interface IProps {
    createStudentCallback: (student: IStudentData) => void;
}

interface IState {
    open: boolean,
    currentStudent: IStudentData
}

export default class FormModal extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            open: false,
            currentStudent: defaultStudentObject
        }
    }

    // Handling the input from the modal
    registerChange = (property: string, value: string | number): void => {
        // Dynamically picks an item from the array
        var object: IStudentData = this.state.currentStudent;
        var key: keyof IStudentData = property as keyof IStudentData;

        object[key] = value as never;

        this.setState({
            currentStudent: object
        });

        console.log(this.state.currentStudent);
    }

    inputFieldBuilder(type: string, property: string, placeholder: string, items?: Array<string>) {
        if (type == "select") {
            return (
                <FormSelect
                    property={property}
                    placeholder={placeholder}
                    items={items!}
                />
            );
        }

        return (
            <InputField
                type={type}
                property={property}
                placeholder={placeholder}
                sx={gridInputStyle}
                callback={(value: string) => { this.registerChange(property, value); }}
            />
        );
    }

    // Default button for the modal page
    ModalButton(text: string, callback: () => void) {
        return (
            <Button variant="contained" onClick={() => callback()}>
                {text}
            </Button>
        );
    }

    render(): React.ReactNode {
        const handleOpen = () => this.setState({ open: true });
        const handleClose = () => this.setState({ open: false });

        return (
            <div>
                <Button onClick={handleOpen}>Open Student Form</Button>
                <Modal
                    open={this.state.open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={boxStyle}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid>
                                <Input type="search" placeholder="Search for student" />
                            </Grid>
                            <Grid>
                                <Grid xs={12}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Student name placeholder
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Create, read, update, or delete a student record.
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    {this.inputFieldBuilder("text", "firstName", "First name")}
                                    {this.inputFieldBuilder("text", "lastName", "Last name")}
                                    {this.inputFieldBuilder("date", "dob", "DOB")}
                                    {this.inputFieldBuilder("text", "ethnicity", "Ethnicity")}
                                    {this.inputFieldBuilder("text", "pronoun", "Pronoun")}
                                </Grid>
                                <Grid xs={12}>
                                    {this.inputFieldBuilder("text", "yearLevel", "Year Level")}
                                    {this.inputFieldBuilder("text", "tutor", "Tutor")}
                                    {this.inputFieldBuilder("text", "diagnosis", "Diagnosis")}
                                    {this.inputFieldBuilder("text", "externalAgencies", "External Agencies")}
                                    {this.inputFieldBuilder("text", "notes", "Notes")}
                                </Grid>
                                <Grid xs={12}>
                                    {this.inputFieldBuilder("text", "links", "Links")}
                                    {this.inputFieldBuilder("select", "sac", "SAC", values.sac)}
                                    {this.inputFieldBuilder("select", "areaOfNeed", "Area of Need", values.areaOfNeed)}
                                    {this.inputFieldBuilder("select", "response", "Response", values.response)}
                                </Grid>
                                <Grid xs={2} sx={gridButtonStyle}>
                                    {this.ModalButton("Generate user", () => this.props.createStudentCallback(this.state.currentStudent))}
                                </Grid>
                                <Grid xs={2} sx={gridButtonStyle}>
                                    {this.ModalButton("Delete user", () => (console.log("test")))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div >
        );
    }
}

interface IPropsSelect {
    property: string,
    placeholder: string,
    items: Array<string>
}

function FormSelect(props: IPropsSelect) {
    const [selected, setSelected] = React.useState('');
    const menuItems: Array<React.ReactNode> = props.items.map((item, index) => <MenuItem value={index}>{item}</MenuItem>);

    const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value as string);
    };

    return (
        <FormControl sx={{ width: "10%" }}>
            <InputLabel id="demo-simple-select-label">{props.placeholder}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected}
                label="Selected"
                onChange={handleChange}
            >
                {menuItems}
            </Select>
        </FormControl>
    );
}