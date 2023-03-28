import React from 'react'
import { Paper, Grid, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCartAsync, removeFromCartAsync } from './cartSlice';

function CartItem(props) {
    const { cartItem } = props;
    const dispatch = useDispatch();

    const handleIncrement = (product) => {
        dispatch(addToCartAsync(product))
    }

    const handleDecrement = (id) => {
        dispatch(removeFromCartAsync(id))
    }

    return (
        <Paper elevation={1} style={{ backgroundColor: '#eee', borderRadius: '20px', marginBottom: '0.5em' }}>
            <Grid container item padding={'1em'} xs={12} alignItems={'center'} spacing={0.5} style={{fontWeight: 500, marginTop: '0.5em' }}>
                <Grid item container xs={12} sm={8} md={8} lg={8}>
                    <Grid item xs={3} style={{ textAlign: 'left' }}>
                        {cartItem.name}
                    </Grid>
                    <Grid item xs={4} sm={3} style={{ textAlign: 'left' }}>
                        Rs: {cartItem.price}
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: 'left' }}>
                        x{cartItem.quantity}
                    </Grid>
                    <Grid item xs={4} sm={3} style={{ textAlign: 'left' }}>
                        Rs: {cartItem.quantity * cartItem.price}
                    </Grid>
                </Grid>
                <Grid item container xs={12} sm={4} md={4} lg={4} justifyContent={'space-evenly'}>
                    <Grid item xs={3} style={{textAlign: 'left', fontSize: '14px' }} >
                        <Button variant='contained' onClick={() => handleDecrement(cartItem.id)}>-</Button>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'left', fontSize: '14px' }}>
                        <Button variant='contained' onClick={() => handleIncrement(cartItem)}>+</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CartItem