import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItemsList: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const product = action.payload;
            const existingIndex = state.cartItemsList.findIndex((item) => item.id === product.id);
            if(~existingIndex){
                state.cartItemsList[existingIndex].quantity += 1 
            } else{
                state.cartItemsList.push({
                    id: product.id,
                    price: product.price,
                    quantity: 1,
                    name: product.name
                })
            }
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const existingIndex = state.cartItemsList.findIndex((item) => item.id === id);
            if(~existingIndex && state.cartItemsList[existingIndex].quantity >= 2){
                state.cartItemsList[existingIndex].quantity -= 1 
            } else{
                state.cartItemsList = state.cartItemsList.filter((item) => item.id !== id)
            }
        },
        emptyCart: (state) => {
            state.cartItemsList.length = 0;
        }
    }
})

export const {addItem, removeItem, emptyCart} = cartSlice.actions;

export default cartSlice.reducer;