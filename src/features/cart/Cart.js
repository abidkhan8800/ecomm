import React, {useEffect} from 'react'
import { Paper, Grid, Button, Container } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { emptyCartAsync, fetchCartAsync } from './cartSlice';
let isFirstReload = true;

function Cart(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartList = useSelector(state => state.cart.cartItemsList);
    const handleClickBack = () => {
        navigate('/#')
    }

    useEffect(()=>{
        if(isFirstReload) dispatch(fetchCartAsync());
        isFirstReload = false
    },[dispatch])
    const handleEmptyCart = () => {
        dispatch(emptyCartAsync())
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
                        <CartItem cartItem={cartItem} key={cartItem.id} />
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