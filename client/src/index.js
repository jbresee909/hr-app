import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Navbar from "./App/components/NavBar/NavBar";

import './index.css';
import App from './App/App';

render((
    <Router>
        <Navbar/>
        <App/>
    </Router>
), document.getElementById('root'));

