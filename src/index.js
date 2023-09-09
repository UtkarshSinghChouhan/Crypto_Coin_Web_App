import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import { AppProvider } from './Context';
import "react-alice-carousel/lib/alice-carousel.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <AppProvider>
        <App />

      </AppProvider>
    </Router>
);

