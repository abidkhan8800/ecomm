import React from 'react';
import AddProduct from './features/products/AddProduct'
import PageNotFound from './features/pages/PageNotFound';
import Products  from './features/products/Products'
import ProductDetailCard from './features/products/ProductDetailCard'
import Navbar  from './features/navbar/Navbar'
import Container from '@mui/material/Container';
import Cart from './features/cart/Cart'
import Login from './features/pages/Login';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
     <ToastContainer position="top-center" autoClose={2000} theme="dark"/>
     <HashRouter>
      <Navbar />
      <Container style={{marginTop: "5.5em"}}>
       <Routes>
         <Route exact path="/" element={<Products/>}></Route>
         <Route exact path="/login" element={<Login/>}></Route>
         <Route exact path="/product/:id" element={<ProductDetailCard />} ></Route>
         <Route exact path="/addproduct" element={<AddProduct />}></Route>
         <Route exact path="/cart" element={<Cart />}></Route>
         <Route path="*" element={<PageNotFound />}></Route>
       </Routes>
       </Container>
     </HashRouter>
     </div>
  );
}



export default App;
