import React, {useState} from 'react'
import { Button, Grid, Typography, Rating, TextField } from '@mui/material'


function ProductCard(props) {
  let {productDetails, removeProduct, updateProduct} = props
  let [edit, setEdit] = useState(false);
  let [name, setName] = useState(productDetails.name);
  let [price, setPrice] = useState(productDetails.price);
  let [rating, setRating] = useState(productDetails.rating)
  let [description, setDescription] = useState(productDetails.description);
  let [isAdmin ,setIsAdmin] = useState(false)


  const handleCancelButton = () => {
    setName(productDetails.name);
    setPrice(productDetails.price);
    setRating(productDetails.rating)
    setDescription(productDetails.description);
    setEdit(prev =>  !prev)
  }

  const handleDeleteButton = (id) => {
    removeProduct(id)
  }

  const handleSaveButton = (payload) => {
    console.log(payload)
    updateProduct(payload)
    setEdit(prev => !prev)
  }

  return (
    <Grid item container style={{backgroundColor: 'white', padding: '1em', marginBottom: '1em', borderRadius: '20px'}} >
      <Grid container item>
          <Grid item xs={6} sm={3} md={2} lg={2}>
            <img height={200} width={200} src={productDetails.imgurl} alt={productDetails.alt}/>
          </Grid>
          <Grid item container xs={4} sm={2} md={2} lg={2} direction='column' marginLeft={"2em"} style={{textAlign: 'left'}}>
              <Grid item justifyContent={'flex-start'} style={{paddingTop: '1em', marginBottom: '1em'}}>
                {!edit ? <p style={{fontSize: 18, margin: '0'}}>
                  {name}
                </p> : <TextField label="Product Name" ariant="outlined" type="text" value={name} style={{fontSize: 18, marginBottom: 10}} onChange={(e)=>setName(e.target.value)}/>}
                {!edit ? <p style={{fontSize: "80%", margin: 0}}>
                    Rs: {price}
                </p> : <TextField label="Product Price" variant="outlined" type="number" value={price} style={{fontSize: 16}} onChange={(e)=>setPrice(e.target.value)}/>}
              </Grid>
              <Grid flexGrow={1}></Grid>
              <Grid item>
                 <Rating value={rating} readOnly={!edit} precision={0.1} onChange={(event, newValue) => {
                  setRating(newValue);
                 }}/>
              </Grid>
          </Grid>
          <Grid item flexGrow={1}></Grid>
          <Grid item xs={12} sm={6} md={7} lg={6}>
           {!edit ? <Typography style={{textAlign: 'justify', paddingRight: '0.5em', marginTop: '1em'}}>{description}
            </Typography>  :
            <TextField multiline fullWidth id="outlined-basic" label="Product Description" variant="outlined" style={{textAlign: 'justify', marginTop: '1em'}} value={description} onChange={(e) => setDescription(e.target.value)}/>}
          </Grid>
      </Grid>
      <Grid container justifyContent={'flex-end'}>
        {
          !edit ? 
            <Button variant="outlined" onClick={() => setEdit((prev) => !prev)} style={{marginRight: "1.5em", marginTop: "1em"}}>Edit</Button> 
          : 
            <Button variant="outlined" color='error' onClick={handleCancelButton} style={{marginRight: "1.5em", marginTop: "1em"}}> Cancel</Button>
        }
        {
          !edit  ? 
            <Button variant="outlined" onClick={() => handleDeleteButton(productDetails.id)} color='error' style={{ marginTop: "1em"}}>Delete</Button> 
            : 
            <Button variant="outlined" color='success' onClick={() => handleSaveButton({price, id: productDetails.id, rating, name, description})} style={{ marginTop: "1em"}}> Save</Button>}
      </Grid>
     
     
    </Grid>
  )
}

export default ProductCard