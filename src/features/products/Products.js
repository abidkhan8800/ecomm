import React, {useState, useEffect} from 'react'
import { Grid, Button } from '@mui/material'
import ProductCard from './ProductCard'
import { useSelector, useDispatch } from 'react-redux';
import {sortProductList} from './productSlice';
import { fetchProductsAsync } from './productSlice'
import { fetchCartAsync } from '../cart/cartSlice';

let isFirstReload = true;

function Products(props) {
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.productList) || [];
  const [isAscending , setIsAscending] = useState(true);

  useEffect(()=>{
    if(isFirstReload) {
      dispatch(fetchProductsAsync());
      dispatch(fetchCartAsync())
    }
    isFirstReload =  false
  },[dispatch])

  const handleClickOnSort = () => {
    dispatch(sortProductList(isAscending))
    setIsAscending(prev => !prev)
  }
  
  return (
      <>
        <Grid container justifyContent='flex-end' style={{marginBottom: '1em'}}>
          <Grid item>
           <Button variant='contained' onClick={() => handleClickOnSort()}>Sort By Price</Button>
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'} alignItems={'center'}>
          {products.map((item) => 
            <ProductCard key={item.id} productDetails={item}/>
          )}
        </Grid>
      </>
  )
}

export default Products