import React, {useState} from 'react'
import { Grid, Button } from '@mui/material'
import ProductCard from './ProductCard'
import { useSelector, useDispatch } from 'react-redux';
import {sortProductList} from './productSlice'


function Products(props) {
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.productList);

  let [isAscending , setIsAscending] = useState(true)

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