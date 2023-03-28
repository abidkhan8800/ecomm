export const fetchProducts = () =>{
    return new Promise((resolve, reject) => {
        fetch("https://ecomm-backend-f455f-default-rtdb.firebaseio.com/products.json")
        .then(data =>{  
            resolve(data.json())
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

export const updateProducts = (updatedProductList) =>{
    return new Promise((resolve, reject) => {
        fetch("https://ecomm-backend-f455f-default-rtdb.firebaseio.com/products.json", {
            method: "PUT",
            body: JSON.stringify(updatedProductList)
          })
        .then(data =>{  
            resolve(data.json())
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

export const deleteProduct = (data) =>{
    return new Promise((resolve, reject) => {
        fetch("https://ecomm-backend-f455f-default-rtdb.firebaseio.com/products.json", {
            method: "PUT"
          })
        .then(data =>{  
            resolve(data.json(data))
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })
}