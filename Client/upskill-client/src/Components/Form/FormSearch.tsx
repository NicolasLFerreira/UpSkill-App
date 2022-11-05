import React, { Component, ReactNode } from "react";
import { List, Button, darken } from "@mui/material";
import { default as Box } from "@mui/material/Unstable_Grid2/Grid2";
import IStudent from "../../types/IStudent";
import StudentDataCrud from "../../services/StudentDataCrud";
import { blueGrey } from "@mui/material/colors";
import StudentFilter from "../StudentFilter";
import { Link } from "react-router-dom";

interface IProps {}
interface IState {
	students: Array<IStudent>;
	studentsFiltered: Array<IStudent>;
}

export default class FormSearch extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			students: [],
			studentsFiltered: [],
		};
	}

	componentDidMount(): void {
		this.getStudents();
	}

	// Get student data

	getStudents = () => {
		StudentDataCrud.getAll()
			.then((response: any) => {
				this.setState({
					students: response.data,
					studentsFiltered: response.data,
				});
				console.log(response.data);
			})
			.catch((e: Error) => {
				console.log(e);
			});
	};

	StudentContainer(student: IStudent) {
		return (
			<Box sx={{ m: 1 }}>
				<Button
					variant="contained"
					component={Link}
					to={`/form/${student.studentId}`}
					sx={{
						width: "100%",
						backgroundColor: blueGrey[700],
						"&:hover": {
							backgroundColor: darken(blueGrey[700], 0.8),
						},
					}}
				>
					{`(${student.yearLevel}) ${student.lastName}, ${student.firstName}`}
				</Button>
				{/* <Button
                    sx={{
                        width: "100%",
                        backgroundColor: blueGrey[700],
                        "&:hover": {
                            backgroundColor: darken(blueGrey[700], 0.8),
                        },
                    }}
                    variant="contained"
                    onClick={() => this.props.callback(student)}
                >
                    {`(${student.yearLevel}) ${student.lastName}, ${student.firstName}`}
                </Button> */}
			</Box>
		);
	}

	registerChange = (students: Array<IStudent>) => {
		this.setState({
			studentsFiltered: students,
		});
	};

	render() {
		var array: Array<ReactNode> = [];
		this.state.studentsFiltered.forEach((student) => {
			array.push(this.StudentContainer(student));
		});

		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					flexGrow: 1,
					minHeight: 0,
				}}
			>
				<StudentFilter
					callback={(students: Array<IStudent>) =>
						this.registerChange(students)
					}
					mode={false}
				/>
				<List
					style={{
						width: "100%",
						overflow: "auto",
						flexGrow: 1,
						minHeight: 0,
					}}
				>
					{array}
				</List>
			</Box>
		);
	}
}
