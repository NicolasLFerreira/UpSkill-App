import React, { Component, Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { isPropertySignature } from "typescript";
import NavigationBar from "./NavigationBar";

interface IProps {

}

interface IState {

}

export default class App extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {

		}
	}

	render() {
		return (
			<Fragment>
				<main>
					<Outlet />
				</main>
			</Fragment>
		);
	}
}