import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import NavigationBar from "./NavigationBar";
import GridGenerator from "./GridOLD";

function App() {
	return (
		<Fragment>
			<NavigationBar />
			<Grid container justifyContent="center">
				<Typography sx={{ m: 5 }}>

				</Typography>
			</Grid>
			<Outlet />
		</Fragment>
	);
}

export default App;