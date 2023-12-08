const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZGQ2MDBkOGEyMDAwMThhNDhiOTQiLCJpYXQiOjE3MDIwMjY1OTMsImV4cCI6MTcwMzIzNjE5M30.5j8T8KWPoZfnOz-RSQQhsRBqXS1Xfi1Q6JeAEnURGp8'
const options = {
    headers:{
        "content-type": "application/json",
        Authorization : `Bearer ${token}`,
    }
}
let urlApi = 'https://striveschool-api.herokuapp.com/api/product/'
let textDiv=''
let apiCont = document.querySelector('.contMod')

const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
console.log(id)
window.onload = async () => {
    const resp = await fetch('https://striveschool-api.herokuapp.com/api/product/'+id,options)
    console.log(resp)
    const info = await resp.json()
    console.log(info)
    textDiv=`
    <div>
    <form>
        <label for="nameProd">Name product:</label>
        <input type="text" id="nameProd" name="nameProd" value=${info.name} disabled>
        <label for="descri">Description:</label>
        <input type="text" id="descri" name="descri" value=${info.description} required>
        <label for="brand">Brand:</label>
        <input type="text" id="brand" name="brand" value=${info.brand} required>
        <label for="image">Image:</label>
        <input type="text" id="image" name="image" value=${info.imageUrl} required>
        <label for="price">Price:</label>
        <input type="text" id="price" name="price" value=${info.price} required>
    </form>
    </div>
    <div>
        <a href="#" class="btn btn-warning reset" onclick="resetForm()">Reset Form</a>
        <a href="#" class="btn btn-success edit" onclick="modifica()">Make changes</a>
        <a href="#" class="btn btn-danger delete" onclick="cancella()">Delete product</a>
        <a href="homePage.html" class="btn btn-primary home">Home store</a>
    </div>
    `
    apiCont.innerHTML=textDiv
}

function resetForm(){
    let result = confirm('Are you sure you want to reset the form??')
    if(result === true){
        alert('Form reset successfully')
        document.querySelector('#nameProd').value =''
        document.querySelector('#descri').value =''
        document.querySelector('#brand').value =''
        document.querySelector('#image').value =''
        document.querySelector('#price').value =''
    }else{
        alert('Form not reset')
    }
    
}

function cancella(){

    let result = confirm('Are you sure you want to delete the product?')
    if(result === true){
        fetch('https://striveschool-api.herokuapp.com/api/product/'+id,{
        method: 'DELETE',
        headers:{
            Authorization : `Bearer ${token}`,
            "content-type": "application/json",
        },
    })
    apiCont.innerHTML=''
    textDiv=`
    <div>
    <p>Product removed successfully</p>
    <a href="homePage.html" class="btn btn-primary home">Home store</a>
    </div>
    `
    apiCont.innerHTML=textDiv
    }else{
        alert('Product not reset ')
    }
}

function modifica(){
    let result = confirm('Are you sure you want to edit the product?')
    if(result === true){
        fetch('https://striveschool-api.herokuapp.com/api/product/'+id,{
        method:'PUT',
        headers:{
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`,
        },
        body:JSON.stringify({
            description: document.querySelector("#descri").value,
            brand: document.querySelector("#brand").value,
            imageUrl: document.querySelector("#image").value,
            price: document.querySelector("#price").value,
  
        })
    })
    .then(res=>{
        apiCont.innerHTML=''
        textDiv=`
        <div>
        <p>Product modified successfully</p>
        <a href="homePage.html" class="btn btn-primary home">Home store</a>
        </div>
        `
        apiCont.innerHTML=textDiv
        return res.json()
    })
    }else{
        alert('Product not edit ')
    }
    
}