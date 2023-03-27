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
    name: 'Samsung',
    price: 95,
    rating: 4,
    imgurl: 'https://i5.walmartimages.com/asr/4014d1d5-2430-46cf-a2b6-526ebf2ff569.7fff876a828d1392c131ee20a014544b.jpeg',
    alt: "Samsung Image",
    description: "In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method."
  }
],
  isAdmin: false

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
  }
});

export const { addProduct, removeProduct, updateProduct, sortProductList } = productSlice.actions;

export default productSlice.reducer;
