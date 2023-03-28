import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts, updateProducts } from './productApi';

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payloadc
    console.log("response inside fetchProductsAsync",response)
    return response;
  }
);
export const updateProductsAsync = createAsyncThunk(
  'products/updateProducts',
  async (product, {getState}) => {
    let state = getState();
    let list = state.product.productList;
    let toBechanged = list.find((item) => item.id === product.id);
    let unchanged = list.filter((item) => item.id !== product.id);
    const response = await updateProducts([...unchanged, {...product, imgurl: toBechanged.imgurl, alt: toBechanged.alt}]);
    return response;
  }
);

export const addProductAsync = createAsyncThunk(
  'products/addProducts',
  async (product, {getState}) => {
    let state = getState();
    const response = await updateProducts([...state.product.productList, {...product, alt: product.name + "img"}]);
    return response;
  }
);

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProducts',
  async (id, {getState}) => {
    const state = getState();
    let list = state.product.productList;
    let filteredProducts = list.filter(item => item.id !== id)
    console.log("adkjadh",filteredProducts)
    const response = updateProducts([...filteredProducts])
    return response;
  }
);

const initialState = {
  productList: [],
  isAdmin: true

};


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productList = [...state.productList, action.payload]
    },
    removeProduct: (state, action) => {
        state.productList = state.productList.filter(product => product.id !== action.payload)
    },
    updateProduct: (state, action)=>{
        const index = state.productList.findIndex(product => product.id === action.payload.id)
        console.log(index)
        for(let key in action.payload){
            state.productList[index][key] = action.payload[key]
        }
    },
    sortProductList: (state, action) => {
      if(action.payload) {
        state.productList.sort((a,b)=> a.price - b.price)
      }else{
        state.productList.sort((a,b)=> b.price - a.price)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productList = action.payload ? action.payload.sort((a,b) => a.id - b.id) : [];
      }).addCase(fetchProductsAsync.rejected, (state, action) => {
        console.log("inside rejected", action)
      })
      .addCase(updateProductsAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action)
        state.productList = action.payload ? action.payload.sort((a,b) => a.id - b.id) : [];
      }).addCase(updateProductsAsync.rejected, (state, action) => {
        console.log(action, state)
      }).addCase(deleteProductAsync.pending, (state, action) => {
        console.log(action, state)
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        console.log(action)
        state.productList = action.payload;
      }).addCase(deleteProductAsync.rejected, (state, action) => {
        console.log("inside rejected", action)
      }).addCase(addProductAsync.pending, (state, action) => {
        console.log(action, state)
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        console.log(action)
        console.log(action.payload)
        state.productList = action.payload;
      }).addCase(addProductAsync.rejected, (state, action) => {
        console.log("inside rejected", action)
      });
  },
});

export const { addProduct, removeProduct, updateProduct, sortProductList } = productSlice.actions;

export default productSlice.reducer;
