import React, { Component, Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import IStudentData, { emptyStudentObject } from "../types/IStudentData";

interface IProps { }

export default function App(props: IProps) {
	return (
		<Fragment>
			<main>
				<Outlet />
			</main>
		</Fragment>
	);
}