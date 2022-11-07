import React, { ReactNode, useEffect, useState } from "react";
import { List, Button, darken } from "@mui/material";
import { default as Box } from "@mui/material/Unstable_Grid2/Grid2";
import IStudent from "../../types/IStudent";
import StudentDataCrud from "../../services/StudentDataCrud";
import { blueGrey } from "@mui/material/colors";
import StudentFilter from "../StudentFilter";
import { useNavigate } from "react-router-dom";
import BasicModal from "./FormPrompt";

interface IProps {
	canUpdateStudent: () => boolean;
	forceUpdate: () => void;
}

interface IState {
	students: Array<IStudent>;
	studentsFiltered: Array<IStudent>;
	openModal: number;
	navigateAllow: boolean;
	id: number;
}

const defaultState: IState = {
	students: [],
	studentsFiltered: [],
	openModal: 0,
	navigateAllow: false,
	id: 0,
};

export default function FormSearch(props: IProps) {
	const [state, setState] = useState<IState>(defaultState);
	const toggleModal = (id: number) =>
		setState((previous) => ({
			...previous,
			openModal: previous.openModal + 1,
			id: id,
		}));

	const navigate = useNavigate();

	const getStudents = () => {
		StudentDataCrud.getAll()
			.then((response: any) => {
				setState((previous) => ({
					...previous,
					students: response.data,
					studentsFiltered: response.data,
				}));
				console.log(response.data);
			})
			.catch((e: Error) => {
				console.log(e);
			});
	};

	useEffect(() => {
		getStudents();
	}, []);

	const registerChange = (students: Array<IStudent>) => {
		setState((previous) => ({
			...previous,
			studentsFiltered: students,
		}));
	};

	const handleAllow = (allow: boolean, id: number) => {
		if (allow) {
			navigate(`/form/${id}`);
			props.forceUpdate();
		}
	};

	const StudentContainer = (student: IStudent) => {
		return (
			<Box sx={{ m: 1 }}>
				<Button
					variant="contained"
					sx={{
						width: "100%",
						backgroundColor: blueGrey[700],
						"&:hover": {
							backgroundColor: darken(blueGrey[700], 0.8),
						},
					}}
					onClick={() => {
						if (props.canUpdateStudent()) {
							navigate(`/form/${student.studentId}`);
							return;
						}
						toggleModal(student.studentId!);
					}}
				>
					{`(${student.yearLevel}) ${student.firstName} ${student.lastName}`}
				</Button>
			</Box>
		);
	};

	var studentComponents: Array<ReactNode> = [];
	state.studentsFiltered.forEach((student) => {
		studentComponents.push(StudentContainer(student));
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
					registerChange(students)
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
				{studentComponents}
			</List>
			<BasicModal
				openModal={state.openModal}
				id={state.id}
				callback={(allow: boolean, id: number) =>
					handleAllow(allow, id)
				}
			/>
		</Box>
	);
}
