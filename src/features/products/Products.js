import React, {useState} from 'react'
import { Grid, Button } from '@mui/material'
import ProductCard from './ProductCard'
let items = [
  {
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
    }
    ,
    {
      id: 7,
      name: 'IPhone',
      price: 100,
      rating: 4.5,
      imgurl: 'https://www.tjara.com/wp-content/uploads/2020/04/temp1587941768_570959295.jpg?scale.width=400',
      alt: "Iphone Image",
      description: "In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method."
    },
    {
      id: 8,
      name: 'Pixel',
      price: 90,
      rating: 4,
      imgurl: 'https://www.bhphotovideo.com/images/images2000x2000/google_ga00664_us_pixel_3a_xl_smartphone_1475550.jpg',
      alt: "Android Image",
      description: "In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method."
   }
]
function Products(props) {
  let [products, setProducts] = useState(items);
  let [isAscending , setIsAscending] = useState(true)

  const removeProduct = (id) => {
    let updatedProducts = products.filter(item => item.id !== id);
    setProducts([...updatedProducts])
  }

  const updateProduct = (payload) => {
    let updatedProductIndex = products.findIndex(item => item.id === payload.id);
    for(let key in payload){
     products[updatedProductIndex][key] = payload[key]
    }
    setProducts(products)
  }

  const handleClickOnSortAscend = () => {
    products.sort((a,b)=> a.price - b.price)
    setProducts([...products])
    setIsAscending(prev => !prev)
  }
  const handleClickOnSortDescend = () => {
    products.sort((a,b)=> b.price - a.price);
    setIsAscending(prev => !prev)
  }
  
  return (
      <>
        <Grid container justifyContent='flex-end' style={{marginBottom: '1em'}}>
          <Grid item>
           <Button variant='contained' onClick={() => isAscending ? handleClickOnSortAscend() : handleClickOnSortDescend()}>Sort By Price</Button>
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'} alignItems={'center'}>
          {products.map((item) => 
            <ProductCard key={item.id} productDetails={item} removeProduct={removeProduct} updateProduct={updateProduct}/>
          )}
        </Grid>
      </>
  )
}

export default Products