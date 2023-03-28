export const fetchCart = () =>{
    return new Promise((resolve, reject) => {
        fetch("https://ecomm-backend-f455f-default-rtdb.firebaseio.com/cart.json")
        .then(data =>{  
            resolve(data.json())
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

export const updateCart = (updatedProductList) =>{
    return new Promise((resolve, reject) => {
        fetch("https://ecomm-backend-f455f-default-rtdb.firebaseio.com/cart.json", {
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