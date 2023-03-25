import React from 'react';
import { Counter } from './features/counter/Counter';
import  Products  from './features/products/Products'
import  Navbar  from './features/navbar/Navbar'
import  Container from '@mui/material/Container';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <HashRouter>
      <Navbar />
      <Container style={{marginTop: "5.5em"}}>
       <Routes>
         <Route exact path="/" element={<Products/>}></Route>
         <Route exact path="/counter" element={<Counter/>}></Route>
       </Routes>
       </Container>
     </HashRouter>
     </div>
  );
}



export default App;
