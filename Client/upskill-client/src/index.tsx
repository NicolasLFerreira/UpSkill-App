import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import App from "./Components/App";
import DatabaseScreen from "./Components/Datagrid/DatabasePage";
import HelpScreen from "./Components/Help/HelpPage";
import HomeScreen from "./Components/Home/HomePage";
import FormPage from "./Components/Form/FormPage";
import NavigationBar from "./Components/NavigationBar";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Navigate to="home" />} />
                    <Route path="home" element={<HomeScreen />} />
                    <Route path="database" element={<DatabaseScreen />} />
                    <Route path="form" element={<FormPage />} />
                    <Route path="form/:studentId" element={<FormPage />} />
                    <Route path="help" element={<HelpScreen />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
