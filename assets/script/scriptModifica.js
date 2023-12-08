/* inizializzo costanti che usero' piu' volte*/
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
/* qui prendo il valore dopo il ? nell'url per poter riaccedere a tutto l'oggetto del prodotto */
const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
console.log(id)
window.onload = async () => {
    const resp = await fetch('https://striveschool-api.herokuapp.com/api/product/'+id,options)
    console.log(resp)
    const info = await resp.json()
    console.log(info)
    /* dopo aver estratto il prodotto tramite l'id lo stampo in dei input text da poter modificare , nome a parte per prevenire l'inserimento di 2 prodotti con lo stesso nome*/
    textDiv=`
    <div>
    <h1> Product Management Panel </h1>
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
    <div class="my-5">
        <a href="#" class="btn btn-warning reset mx-2 text-white" onclick="resetForm()">Reset Form</a>
        <a href="#" class="btn btn-success edit mx-2" onclick="modifica()">Make changes</a>
        <a href="#" class="btn btn-danger delete mx-2" onclick="cancella()">Delete product</a>
        <a href="homePage.html" class="btn btn-primary home mx-2">Home store</a>
    </div>
    `
    apiCont.innerHTML=textDiv
}
/* creo una funzione reset per resettare tutto il form modificabile (quindi escludo il campo nome) prima id apportare questa modifica viene chiesto se si e' sicuri di proseguire*/
function resetForm(){
    let result = confirm('Are you sure you want to reset the form??')
    if(result === true){
        alert('Form reset successfully')
        document.querySelector('#descri').value =''
        document.querySelector('#brand').value =''
        document.querySelector('#image').value =''
        document.querySelector('#price').value =''
    }else{
        alert('Form not reset')
    }
    
}
/* creo una funzione per cancellare la card el prodotto dall'api, prima di apportare questa modifica viene chiesto se si e' sicuri di proseguire */
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
    <div class="marginTop">
    <p class="pText">Product removed successfully</p>
    <a href="homePage.html" class="btn btn-primary home">Home store</a>
    </div>
    `
    apiCont.innerHTML=textDiv
    }else{
        alert('Product not reset ')
    }
}
/* creo una funzione per modificare le card (nome escluso) prima di apportare questa modifica viene chiesto se si e' sicuri di proseguire*/
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
        <div class="marginTop">
        <p class="pText">Product modified successfully</p>
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