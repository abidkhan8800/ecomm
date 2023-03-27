import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: [{
    id: 1,
    name: 'IPhone',
    price: 100,
    rating: 4,
    imgurl: 'https://www.tjara.com/wp-content/uploads/2020/04/temp1587941768_570959295.jpg?scale.width=400',
    alt: "Iphone Image",
    description: "In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method."
  },
  {
    id: 2,
    name: 'Pixel',
    price: 90,
    rating: 4,
    imgurl: 'https://www.bhphotovideo.com/images/images2000x2000/google_ga00664_us_pixel_3a_xl_smartphone_1475550.jpg',
    alt: "Android Image",
    description: "In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method."
  },
  {
    id: 3,
    name: 'IPhone',
    price: 100,
    rating: 4,
    imgurl: 'https://www.tjara.com/wp-content/uploads/2020/04/temp1587941768_570959295.jpg?scale.width=400',
    alt: "Iphone Image",
    description: "In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method."
  },
  {
    id: 4,
    name: 'Pixel',
    price: 90,
    rating: 4,
    imgurl: 'https://www.bhphotovideo.com/images/images2000x2000/google_ga00664_us_pixel_3a_xl_smartphone_1475550.jpg',
    alt: "Android Image",
    description: "In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method."
  },
  {
    id: 5,
    name: 'IPhone',
    price: 100,
    rating: 4,
    imgurl: 'https://www.tjara.com/wp-content/uploads/2020/04/temp1587941768_570959295.jpg?scale.width=400',
    alt: "Iphone Image",
    description: "In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method."
  },
  {
    id: 6,
    name: 'Pixel',
    price: 90,
    rating: 4,
    imgurl: 'https://www.bhphotovideo.com/images/images2000x2000/google_ga00664_us_pixel_3a_xl_smartphone_1475550.jpg',
    alt: "Android Image",
    description: "In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method."
  }],
  isAdmin: false

};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

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
        console.log("action",action)
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
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.value += action.payload;
//       });
//   },
});

export const { addProduct, removeProduct, updateProduct, sortProductList } = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default productSlice.reducer;
