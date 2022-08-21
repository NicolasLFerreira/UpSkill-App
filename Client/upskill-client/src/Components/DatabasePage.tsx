import React, { Component } from "react";
import StudentDataTable from "./StudentDataTable";

interface IProps { }
interface IState { }

export default class DatabasePage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (<StudentDataTable />);
    }
}