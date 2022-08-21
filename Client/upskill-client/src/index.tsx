import { Grid, Typography } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './Components/App';
import DatabaseScreen from './Components/DatabaseScreen';
import HomeScreen from './Components/HomeScreen';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="home" element={<HomeScreen />} />
					<Route path="database" element={<DatabaseScreen />} />
					<Route path="*" element={
						<Grid container justifyContent={"center"}>
							<Typography sx={{ m: 4 }}>Oops! This URL leads nowehere!</Typography>
						</Grid>
					} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();