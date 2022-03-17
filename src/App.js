import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import './App.css';
import {
  Cryptocurrencies,
  Menu,
  News,
  CryptoDetails,
  Homepage,
  Exchanges,
} from './components/index.js';

function App() {
  return (
    <div className='app'>
      <Menu />
      <div className='main'>
        <Routes>
          <Route exact path='/crypto-app' element={<Homepage />} />
          <Route exact path='/crypto-app/exchanges' element={<Exchanges />} />
          <Route
            exact
            path='/crypto-app/cryptocurrencies'
            element={<Cryptocurrencies />}
          />
          <Route
            exact
            path='/crypto-app/crypto/:coinId'
            element={<CryptoDetails />}
          />
          <Route exact path='/crypto-app/news' element={<News />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
