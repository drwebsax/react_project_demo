
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import View from './view/View';


export default function App() {
    return (

      	<BrowserRouter>

			<Routes>
				<Route path="/" element={ <Navigate to="/list" />} />
				<Route path="/list/*" element={ <View /> } />
				<Route path="*" element={ <Navigate to="/" />} />
			</Routes>

    	</BrowserRouter>
    
	);
}
