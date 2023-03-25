import React from 'react';
import { Counter } from './features/counter/Counter';
import AddProduct from './features/products/AddProduct'
import PageNotFound from './features/pages/PageNotFound';
import  Products  from './features/products/Products'
import ProductDetailCard from './features/products/ProductDetailCard'
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
         <Route exact path="/product/:id" element={<ProductDetailCard />} ></Route>
         <Route exact path="/addproduct" element={<AddProduct />}></Route>
         <Route  path="*" element={<PageNotFound />}></Route>
       </Routes>
       </Container>
     </HashRouter>
     </div>
  );
}



export default App;
