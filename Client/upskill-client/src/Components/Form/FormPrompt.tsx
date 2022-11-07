import { Box, Button, Modal, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { default as Grid } from "@mui/material/Unstable_Grid2";

interface IProps {
	openModal: number;
	id: number;
	callback: (allow: boolean, id: number) => void;
}
interface IState {}

const defaultState: IState = {};

// export default function FormPrompt() {
// 	const [state, setState] = useState<IState>(defaultState);

//     const test = () => {

//     }

// 	return (
// 		<Fragment>
// 			<BasicModal />
// 		</Fragment>
// 	);
// }

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function BasicModal(props: IProps) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		if (props.openModal) handleOpen();
		else handleClose();
	}, [props.openModal]);

	const ButtonBuilder = (text: string, callback: () => void) => {
		return (
			<Button
				sx={{
					mt: 2,
					left: "50%",
					transform: "translate(-50%, -0%)",
				}}
				onClick={() => callback()}
			>
				{text}
			</Button>
		);
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				<Grid container>
					<Grid
						justifyContent="center"
						justifyItems="center"
						alignContent="center"
						alignItems="center"
						sx={{ width: 1 }}
						container
						xs={12}
					>
						<Typography variant="h6" component="h2">
							You have unsaved changes. Continue anyway?
						</Typography>
					</Grid>
					<Grid sx={{ width: 1 }} container xs={12}>
						<Grid xs={6}>
							{ButtonBuilder("Yes", () => {
								props.callback(true, props.id);
								handleClose();
							})}
						</Grid>
						<Grid xs={6}>
							{ButtonBuilder("No", () => {
								props.callback(false, props.id);
								handleClose();
							})}
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	);
}
