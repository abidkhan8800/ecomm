import React, { useEffect, useState } from 'react';
import {Paper, Grid, Rating, Typography, Button, Container} from '@mui/material';

import {useParams} from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../cart/cartSlice';
import PageNotFound from '../pages/PageNotFound'


function ProductDetailCard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.productList)
    const {id} = useParams();
    const [product ,setProduct] = useState({}); 
    useEffect(() => {
        setProduct(products.find(item => item.id === Number(id)))

    },[])
    const handleClickBack = () => {
        navigate('/#')
    }

    console.log(product)

    const handleClickOnAddToCart = (product) => {
        dispatch(addItem(product))
      }
    
    if(!product){
        return (
            <PageNotFound />
        )
    }
    
    return (
        <Container maxWidth={'sm'}>
            <Paper elevation={3} style={{backgroundColor: "white", padding: '1.5em', marginBottom: '1em'}}>
            <h3>Product Details</h3>
            <Grid container justifyContent={'center'}>
                <Grid item>
                    <img height={300} width={300} src={product.imgurl} alt={product.alt}/>
                </Grid>
                <Grid item>
                    <Grid>
                        <Typography style={{fontSize: 18, margin: '0'}}>{product.name}</Typography> 
                        <Typography style={{fontSize: "80%", margin: 0}}>Rs: {product.price}</Typography> 
                        <Rating value={Number(product.rating)} readOnly precision={0.1}/>
                    </Grid>
                    <Grid>
                        <Typography style={{textAlign: 'justify'}}>{product.description}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} marginTop={'1em'}>
                   <Grid>
                        <Button variant="outlined" startIcon={<KeyboardBackspaceIcon/>} onClick={handleClickBack}> back</Button>
                   </Grid>
                   <Grid>
                        <Button variant="outlined" color='success' startIcon={<ShoppingCartIcon />} onClick={() => handleClickOnAddToCart(product)}>Add To CART</Button> 
                   </Grid>
            </Grid>
        </Paper>
        </Container>
    )
}

export default ProductDetailCard