import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import NavigationBar from "./NavigationBar";

function App() {
	return (
		<Fragment>
			<NavigationBar />
			<main>
				<Outlet />
			</main>
		</Fragment>
	);
}

export default App;