import React from 'react';
import './App.css';
import ServiceList from './components/ServiceList/ServiceList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ServiceUpdate from './components/ServiceUpdate/ServiceUpdate';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/ra-homework-api-thunk-front" element={<ServiceList/>}/>
          <Route path="/ra-homework-api-thunk-front/services/:id" element={<ServiceUpdate/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
