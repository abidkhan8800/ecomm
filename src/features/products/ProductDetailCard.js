import React from 'react';
import {Paper, Grid, Rating, Typography, Button, Container} from '@mui/material';
import {items} from './Products'
import {useParams} from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { cartItems } from '../cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateProduct,
    removeProduct
} from './productSlice';

function ProductDetailCard(props) {
    const navigate = useNavigate();
    const products = useSelector(state => state.product.productList)
    const {id} = useParams();
    let product = products.find(item => item.id === Number(id))

    const handleClickBack = () => {
        navigate('/#')
    }

    const handleClickOnAddToCart = (product) => {
        const existingIndex = cartItems.findIndex((item) => item.id === product.id);
            if(~existingIndex){
              cartItems[existingIndex].quantity += 1 
            } else{
              cartItems.push({
                    id: product.id,
                    price: product.price,
                    quantity: 1,
                    name: product.name
                })
            }
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
                        <Rating value={product.rating} readOnly precision={0.1}/>
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