import React from "react";
import { useParams, Params } from 'react-router-dom';
import Form from "./Form";

export default function FormPage() {

    var p: Params<string> = useParams();
    console.log(p.studentId);

    return (
        <Form loadStudentId={p.studentId as string} />
    )
}