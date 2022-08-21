import React, { Fragment } from "react";
import { Button, Grid, Typography } from "@mui/material";
import NavigationBar from "./NavigationBar";
import GridGenerator from "./GridScreen";
import { Outlet } from "react-router-dom";

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