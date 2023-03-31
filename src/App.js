import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import Header from './components/Header';

function App() {
  return (
      <Router>
          <div >
              <Header />
              <Routes>
                  <Route path='/' element={<HomePage />} exact />
                  <Route path='/coins/:id' element={<CoinPage />} exact />
              </Routes>
          </div>
      </Router>
  )
}

export default App