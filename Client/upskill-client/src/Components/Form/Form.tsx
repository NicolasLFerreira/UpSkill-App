import React, { Component, ReactNode } from "react";
import { Button, Typography, Box, TextField, darken } from "@mui/material";
import { default as Grid } from "@mui/material/Unstable_Grid2";
import FormSelect from "./FormSelect";
import IStudent from "../../types/IStudent";
import StudentDataCrud from "../../services/StudentDataCrud";
import {
	selectOptions,
	ISelectOptions,
	emptyStudentObject,
	DynamicPropertySetter,
	createStudent,
} from "../../utility/StudentUtility";
import FormSearch from "./FormSearch";
import {
	blue,
	blueGrey,
	green,
	purple,
	red,
	yellow,
} from "@mui/material/colors";

// Boilerplate stuff

interface IProps {
	loadStudentId: string;
}

interface IState {
	operation: OperationMode;
	students: Array<IStudent>;
	studentsDictionary: Map<number, IStudent>;
	currentStudent: IStudent;
}

enum OperationMode {
	CREATE,
	UPDATE,
}

const emptyState: IState = {
	operation: OperationMode.CREATE,
	students: [],
	studentsDictionary: new Map<number, IStudent>(),
	currentStudent: emptyStudentObject,
};

// Contains the code for the form.
// DOESN'T CONTAIN THE LOGIC FOR SEARCH OR MODAL, JUST THE ACTUAL FORM. THOSE SHOULD BE ADDED AS SEPARATE COMPONENTS.
export default class Form extends Component<IProps, IState> {
	saved: boolean;

	constructor(props: IProps) {
		super(props);

		this.saved = true;

		this.state = emptyState;
	}

	componentDidMount() {
		this.getStudents();
		this.getStudent(parseInt(this.props.loadStudentId));
		if (this.props.loadStudentId != undefined)
			this.setState({
				operation: OperationMode.UPDATE,
			});
	}

	componentDidUpdate(prevProps: Readonly<IProps>): void {
		if (
			prevProps.loadStudentId != this.props.loadStudentId
			/* IN MEMORY OF THE '&& this.saved' INCIDENT THAT MADE ME ADD LIBRARIES AND CREATE THE CONVOLUTED FormPrompt BECAUSE IT WOULDN'T WORK.*/
		) {
			// console.log(
			// 	"Component did update: " + parseInt(this.props.loadStudentId)
			// );
			// console.log(
			// 	"Current student: " + this.state.currentStudent.studentId!
			// );
			this.loadUrlStudent();
		}
	}

	loadUrlStudent = () => {
		// console.log("Load student: " + parseInt(this.props.loadStudentId));
		// console.log("\n");
		this.setState({
			currentStudent:
				this.state.studentsDictionary.get(
					parseInt(this.props.loadStudentId)
				) ?? this.state.currentStudent,
			operation: OperationMode.UPDATE,
		});
	};

	studentDictionaryBuilder(students: Array<IStudent>) {
		var studentMap = new Map<number, IStudent>();

		students.forEach((element) => {
			studentMap.set(element.studentId!, element);
		});

		return studentMap;
	}

	// API calls

	getStudents = async () => {
		const response = await StudentDataCrud.getAll();
		this.setState({
			students: response.data,
			studentsDictionary: this.studentDictionaryBuilder(response.data),
		});
	};

	getStudent = async (studentId: number) => {
		const response = await StudentDataCrud.get(studentId);
		this.setState({
			currentStudent: response.data,
		});
	};

	async postStudent(student: IStudent) {
		student.studentId = undefined;
		await StudentDataCrud.post(student);

		this.saved = true;
		this.forceUpdate();
	}

	async putStudent(student: IStudent) {
		this.saved = true;
		await StudentDataCrud.put(student.studentId!, student);
		this.getStudents();
	}

	async deleteStudent(student: IStudent) {
		this.saved = true;
		await StudentDataCrud.delete(student.studentId!);
		this.resetState();
	}

	// Resets the form page

	resetState = () => {
		this.saved = true;
		this.setState(emptyState);
		this.getStudents();
		this.forceUpdate();
	};

	// Dynamically updates the properties of the state.currentStudent as it's typed in the input field.
	registerChange = (property: string, value: string | number): void => {
		this.setState({
			currentStudent: DynamicPropertySetter(
				this.state.currentStudent,
				property,
				value
			),
		});
		this.saved = false;
	};

	// Utility

	canUpdateStudent() {
		return this.saved;
	}

	switchOperation = () => {
		this.setState((oldState) => {
			return {
				operation:
					oldState.operation == OperationMode.CREATE
						? OperationMode.UPDATE
						: OperationMode.CREATE,
			};
		});
	};

	// Components

	// Creates an input field and assigns the callback function for registering the changes.
	InputFieldBuilder(property: string, label: string, type: string = "text") {
		var jsxObject: ReactNode;

		if (type == "select") {
			var items = selectOptions[property as keyof ISelectOptions];
			var value = this.state.currentStudent[
				property as keyof IStudent
			] as number;

			if (value == 0) {
				value = 1;
			}

			jsxObject = (
				<FormSelect
					value={value}
					label={label}
					items={items!}
					callback={(value: number) => {
						this.registerChange(property, value);
					}}
				/>
			);
		} else {
			// DISCARDED AFTER I STARTED USING span={1} INSTEAD OF MARGIN.
			// CAN SIMPLY MAKE THE GRID ITEMS FILL THE ENTIRE SPACE.
			// HERE IN CASE I NEED IT IN THE FUTURE.

			const gridInputStyle = {
				width: "100%",
			};

			const gridNotesStyle = {
				width: "100%",
			};

			jsxObject = (
				<TextField
					type={type}
					label={label}
					value={
						this.state.currentStudent[property as keyof IStudent]
					}
					sx={property == "notes" ? gridNotesStyle : gridInputStyle}
					variant="outlined"
					multiline={property == "notes"}
					InputLabelProps={type == "date" ? { shrink: true } : {}}
					// onBlur={(event) => this.registerChange(property, event.target.value)}
					onChange={(event) =>
						this.registerChange(property, event.target.value)
					}
				/>
			);
		}

		return (
			<Grid xs={property == "select" ? 4 : property == "notes" ? 12 : 4}>
				{jsxObject}
			</Grid>
		);
	}

	// Default button for the form page
	Button(text: string, callback: () => void, color: any = blueGrey[900]) {
		return (
			<Button
				sx={{
					backgroundColor: color,
					"&:hover": {
						backgroundColor: darken(color, 0.3),
					},
					width: 0.15,
					m: 1,
					ml: 0,
				}}
				variant="contained"
				onClick={callback}
			>
				{text}
			</Button>
		);
	}

	render() {
		const setHeight = "60vh";
		return (
			<Box sx={{ height: setHeight, mt: 2 }}>
				<Grid container alignContent="center" justifyContent="center">
					<Grid
						container
						xs={2}
						sx={{
							backgroundColor: "#eceff1",
							height: setHeight,
							display: "flex",
							flexDirection: "column",
						}}
					>
						<FormSearch
							canUpdateStudent={() => this.canUpdateStudent()}
							forceUpdate={() => this.loadUrlStudent()}
						/>
					</Grid>
					<Grid
						container
						xs={10}
						rowSpacing={2}
						sx={{ width: "75%", ml: 1, p: 1 }}
					>
						<Box>
							<Grid xs="auto">
								<Typography component="h2" variant="h6">
									{this.state.operation ==
									OperationMode.CREATE
										? "Creating: "
										: "Updating: "}
									{this.state.currentStudent.firstName +
										" " +
										this.state.currentStudent.lastName}
								</Typography>
							</Grid>
							<Grid container xs={12} spacing={2}>
								{/* 1st ROW: IDENTIFICATION AND PERSONAL DETAILS */}
								{this.InputFieldBuilder(
									"firstName",
									"First name"
								)}
								{this.InputFieldBuilder(
									"lastName",
									"Last name"
								)}
								{this.InputFieldBuilder("dob", "DOB", "date")}
								{this.InputFieldBuilder(
									"ethnicity",
									"Ethnicity"
								)}
								{this.InputFieldBuilder("pronoun", "Pronoun")}
								{this.InputFieldBuilder(
									"yearLevel",
									"Year Level"
								)}

								{/* 2nd ROW: EDUCATION AND DIAGNOSIS RELATED */}
								{this.InputFieldBuilder("tutor", "Tutor")}
								{this.InputFieldBuilder(
									"diagnosis",
									"Diagnosis"
								)}
								{this.InputFieldBuilder(
									"externalAgencies",
									"External Agencies"
								)}
								{this.InputFieldBuilder("links", "Links")}
								{this.InputFieldBuilder(
									"kamarUpdates",
									"Kamar Updates"
								)}
								{this.InputFieldBuilder("sacInfo", "SAC Info")}

								{/* 3rd ROW: MISC INFO */}
								{this.InputFieldBuilder(
									"otherInfo",
									"Other Info"
								)}
								{this.InputFieldBuilder("notes", "Notes")}
							</Grid>
							<Grid container xs={12} spacing={1} sx={{ mt: 1 }}>
								{/* 4th ROW: DROPDOWN MENUS */}
								{this.InputFieldBuilder("sac", "SAC", "select")}
								{this.InputFieldBuilder(
									"areaOfNeed",
									"Area of Need",
									"select"
								)}
								{this.InputFieldBuilder(
									"response",
									"Response",
									"select"
								)}
							</Grid>
							<Grid xs={12}>
								{this.state.operation == OperationMode.CREATE
									? this.Button(
											"create",
											() =>
												this.postStudent(
													this.state.currentStudent
												),
											green[900]
									  )
									: this.Button(
											"update",
											() =>
												this.putStudent(
													this.state.currentStudent
												),
											green[900]
									  )}
								{this.Button(
									"switch mode",
									() => this.switchOperation(),
									blue[900]
								)}
								{this.Button(
									"clear",
									() => this.resetState(),
									yellow[900]
								)}
								{this.Button(
									"delete",
									() =>
										this.deleteStudent(
											this.state.currentStudent
										),
									red[900]
								)}
								{this.Button(
									"random student",
									() => this.postStudent(createStudent()),
									purple[900]
								)}
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Box>
		);
	}
}
