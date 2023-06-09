import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCart, updateCart } from './cartApi';
import { toast } from 'react-toastify';

const initialState = {
    cartItemsList: []
}

export const fetchCartAsync = createAsyncThunk(
    'cart/fetchCartitems',
    async () => {
        const response = await fetchCart();
        console.log("inside fetch fetchCartAsync", response)
        return response
    }
)

export const addToCartAsync = createAsyncThunk(
    'cart/updateCartitems',
    async (cartItem,{getState}) => {
        console.log("cartItem",cartItem)
        let state = getState();
        let cartList = JSON.parse(JSON.stringify(state.cart.cartItemsList));
        let existingProductIndex = cartList.findIndex((item)=> item.id === cartItem.id);
    
        if(~existingProductIndex){
            cartList[existingProductIndex].quantity += 1
        } else{
            cartList.push({
                id: cartItem.id,
                price: cartItem.price,
                quantity: 1,
                name: cartItem.name
            })
            console.log(cartList)
        }
        const response = await updateCart([...cartList]);
        console.log("inside fetch updateCartAsync", response)
        return response
    }
)
export const removeFromCartAsync = createAsyncThunk(
    'cart/removeCartitems',
    async (id,{getState}) => {
        console.log("cartItem",id)
        let state = getState();
        let cartList = JSON.parse(JSON.stringify(state.cart.cartItemsList));
        let existingProductIndex = cartList.findIndex((item)=> item.id === id);
        console.log(existingProductIndex)
        if(~existingProductIndex && cartList[existingProductIndex].quantity >= 2){
            cartList[existingProductIndex].quantity -= 1 
        } else{
            cartList = cartList.filter((item) => item.id !== id)
        }
        const response = await updateCart([...cartList]);
        console.log("inside fetch updateCartAsync", response)
        return response
    }
)

export const emptyCartAsync = createAsyncThunk(
    'cart/emptyCartitems',
    async () => {
        const response = await updateCart([]);
        console.log("inside fetch emptyCartAsync", response)
        return response
    }
)

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
    },
    extraReducers: (builder) =>{
        builder
         .addCase(fetchCartAsync.pending, (state, action)=>{
            console.log("fetch cart action started")
         })
         .addCase(fetchCartAsync.fulfilled, (state, action)=>{
            state.cartItemsList = action.payload || [];
         })
         .addCase(fetchCartAsync.rejected, (state, action)=>{
            toast('Error is fetching data!', {type:"error"})
         })
         .addCase(addToCartAsync.pending, (state, action)=>{
            console.log(action,state)
         })
         .addCase(addToCartAsync.fulfilled, (state, action)=>{
            state.cartItemsList = action.payload || [];
            toast('Item added to cart successfully.', {type:"success"})
         })
         .addCase(addToCartAsync.rejected, (state, action)=>{
            toast('Error in adding item to cart!', {type:"error"})
         }).addCase(emptyCartAsync.pending, (state, action)=>{
            console.log("emptyCartAsync cart action started")
         })
         .addCase(emptyCartAsync.fulfilled, (state, action)=>{
            state.cartItemsList = action.payload || [];
            toast('Cart emptied successfully.', {type:"success"})
         })
         .addCase(emptyCartAsync.rejected, (state, action)=>{
            toast('Error in removing cart data!', {type:"error"})
         })
         .addCase(removeFromCartAsync.pending, (state, action)=>{
            console.log("emptyCartAsync cart action started")
         })
         .addCase(removeFromCartAsync.fulfilled, (state, action)=>{
            state.cartItemsList = action.payload || [];
            toast('Item removed from cart successfully.', {type:"success"})
         })
         .addCase(removeFromCartAsync.rejected, (state, action)=>{
            toast('Error in removing item from cart!', {type:"error"})
         });
    }
})

export const {addItem, removeItem, emptyCart} = cartSlice.actions;

export default cartSlice.reducer;