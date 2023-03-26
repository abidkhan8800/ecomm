import React, { useState } from 'react'
import { Paper, Grid, Button, Container, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

 export let cartItems = []


function Cart(props) {
    const navigate = useNavigate()
    const [cartList, setCartList] = useState(cartItems)
    const handleClickBack = () => {
        navigate('/#')
    }

    const handleAddToCart = (product) => {
        const existingIndex = cartList.findIndex((item) => item.id === product.id);
        if(~existingIndex){
            cartList[existingIndex].quantity += 1 
        } else{
            cartList.push({
                id: product.id,
                price: product.price,
                quantity: 1,
                name: product.name
            })
        }

        setCartList([...cartList])
    }
    const handleRemoveFromCart = (id) => {
        let updatedCartList = []
        const existingIndex = cartList.findIndex((item) => item.id === id);
        if(~existingIndex && cartList[existingIndex].quantity >= 2){
            cartList[existingIndex].quantity -= 1 
            updatedCartList = [...cartList]
        } else{
            updatedCartList = cartList.filter((item) => item.id !== id)
        }
        setCartList([...updatedCartList])
    }
    const handleEmptyCart = () => {
        setCartList([])
    }
    return (
        <Container maxWidth={'md'}>
            <Paper elevation={3} style={{ backgroundColor: "white", padding: '1.5em' }}>
                <h3>Cart Items</h3>
                <Grid container padding={'1em'} alignItems={'center'} justifyContent={'space-between'}>
                    <Grid item>
                        <span>Total Items: </span><span  style={{fontSize: '16px', fontWeight: 700}}> {cartList.length}</span>
                    </Grid>
                    <Grid item>
                        <span>Total Price: </span><span  style={{fontSize: '16px', fontWeight: 700}}>Rs {cartList.reduce((acc, a)=>{
                            return acc+= a.price * a.quantity
                        },0 )}</span>
                    </Grid>
                </Grid>
                <Grid>
                    {cartList.map((cartItem) => (
                        <CartItem cartItem={cartItem} key={cartItem.id} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart}/>
                    ))}
                </Grid>
                <Grid container justifyContent={'space-between'} marginTop={'1em'}>
                    <Grid>
                        <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />} onClick={handleClickBack}> back</Button>
                    </Grid>
                    <Grid>
                        <Button variant="outlined" color='error' startIcon={<DeleteIcon />} onClick={handleEmptyCart}>Empty Cart</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Cart