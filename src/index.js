import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './custom.scss';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import ScrollToTop from './components/ScrollToTop';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <ScrollToTop />
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);
