import React, { Component, Fragment, useState } from "react";
import { Outlet } from "react-router-dom";

interface IProps {

}

interface IState {

}

// export default class App extends Component<IProps, IState> {
// 	constructor(props: IProps) {
// 		super(props);

// 		this.state = {

// 		}
// 	}

// 	render() {
// 		return (
// 			<Fragment>
// 				<main>
// 					<Outlet />
// 				</main>
// 			</Fragment>
// 		);
// 	}
// }

export default function App(props: IProps) {
	const [amount, setAmount] = useState<number>();

	return (
		<Fragment>
			<main>
				<Outlet />
			</main>
		</Fragment>
	);
}