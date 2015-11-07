import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.styl';

import TaxCalc from './routes/TaxCalc';
import Invoicer from './routes/Invoicer';
import NotFound from './routes/NotFound';

const routes = {
    '/': TaxCalc,
    '/invoice': Invoicer,
}

const matchedRoute = routes[window.location.pathname] || NotFound;

ReactDOM.render(React.createElement(matchedRoute, null), document.getElementById('root'));