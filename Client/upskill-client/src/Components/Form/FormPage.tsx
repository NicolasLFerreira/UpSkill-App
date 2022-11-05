import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "./Form";

export default function FormPage() {
	const { studentId } = useParams();
	return <Form loadStudentId={studentId!} />;
}
