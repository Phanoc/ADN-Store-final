import React, { useState, useEffect } from 'react';
import { applyTheme, teams } from './colors/theme';
import './App.css';
import './Utilities.css';
import Navbar from './screens/Navbar/Navbar';
import Header from './screens/Header/Header';
import Home from './screens/Home/Home';
import Grid from './components/UI/Grid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Description from './screens/Description/Description';
import Welcome from './screens/Welcome/Welcome';
import Cart from './screens/Cart/Cart';
import Footer from './screens/Footer/Footer';

const App = () => {
	return (
		<Router>
			<div className='app-wraper'>
				<Navbar className='container mb-4' />
				<main>
					<Routes>
						<Route path='/' element={<Welcome />}></Route>
						<Route path='/home' element={<Home />}></Route>
						<Route path='/description/:id' element={<Description />}></Route>
						<Route path='/cart' element={<Cart />}></Route>
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
