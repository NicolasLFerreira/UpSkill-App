import React, { Component, Fragment, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function App() {
	return (
		<Fragment>
			<main>
				<Outlet />
			</main>
		</Fragment>
	);
}