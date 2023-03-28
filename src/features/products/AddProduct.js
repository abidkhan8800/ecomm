import React, {useState} from 'react';
import {Paper, Grid, Button, Container, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { addProductAsync } from './productSlice';

let defaultFormData = {
    name: "",
    imgurl: "",
    price: 0,
    rating: 0,
    description: ""
}
function AddProduct(props) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.productList)
    const [formData, setFormData] = useState(defaultFormData)
    const navigate = useNavigate()


    const handleClickBack = () => {
        navigate('/#')
    }
    const handleChange = (e) => {
        let {name, value} = e.target;
        if(name === "rating"){
            if(value >= 5){
                value = 5
            } 
        }
        if(name === "price"){
            if(value < 0){
                value = 0
            }
           
        }
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const handleAddProduct = () => {
        if(!formData.name){
            window.alert('Product name cannot be blank');
            return;
        }else if(!formData.price){
            window.alert('Product price cannot be 0');
            return;
        }else if(!formData.rating){
            window.alert('Product rating cannot be 0');
            return;
        }else if(!formData.imgurl){
            window.alert('Product imgurl cannot be blank');
            return;
        }else if(!formData.description){
            window.alert('Product descriiption cannot be blank');
            return;
        }

        dispatch(addProductAsync({...formData, id: products.length + 1}))

        setFormData(defaultFormData)
        navigate('/#')
    }
    
    return (
        <Container maxWidth={'sm'}>
            <Paper elevation={3} style={{backgroundColor: "white", padding: '1.5em'}}>
                <h3>Add Product</h3>
                <Grid container justifyContent={'center'}>
                    <Grid item container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth varinat='outlined' type="text" label='Product Name' name="name" value={formData.name} onChange={handleChange}/>
                            </Grid>
                            <Grid item container xs={12} spacing={1} justifyContent={'space-between'}>
                                <Grid item>
                                    <TextField varinat='outlined' type="number" label='Price' name="price" value={formData.price} onChange={handleChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField varinat='outlined' type="number" label='Rating' step=".01" name="rating" value={formData.rating} onChange={handleChange}/>
                                </Grid>
                        </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth varinat='outlined' label='Enter Image url' name="imgurl" value={formData.imgurl} onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField multiline fullWidth varinat='outlined' label='Product Description' name="description" value={formData.description} onChange={handleChange}/> 
                            </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent={'space-between'} marginTop={'1em'}>
                    <Grid>
                            <Button variant="outlined" startIcon={<KeyboardBackspaceIcon/>} onClick={handleClickBack}> back</Button>
                    </Grid>
                    <Grid>
                            <Button variant="outlined" color='success' startIcon={<AddIcon />} onClick={handleAddProduct}>Add Product</Button> 
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default AddProduct