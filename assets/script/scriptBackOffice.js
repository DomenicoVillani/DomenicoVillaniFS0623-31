const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZGQ2MDBkOGEyMDAwMThhNDhiOTQiLCJpYXQiOjE3MDIwMjY1OTMsImV4cCI6MTcwMzIzNjE5M30.5j8T8KWPoZfnOz-RSQQhsRBqXS1Xfi1Q6JeAEnURGp8'
const urlApi = 'https://striveschool-api.herokuapp.com/api/product/'
let eleApiCont = ''
let apiCont = document.querySelector('.row')

function submitForm(){
    let nome = document.getElementById('nameProd').value
    let descrizione = document.getElementById('descri').value
    let brands = document.getElementById('brand').value
    let image = document.getElementById('image').value
    let prezzo = document.getElementById('price').value

    let prodotto = {
        name:nome,
        description:descrizione,
        brand:brands,
        imageUrl:image,
        price:prezzo
    }


    fetch(urlApi,{
        method: 'POST',
        body: JSON.stringify(prodotto),
        headers:{
            Authorization : `Bearer ${token}`,
            "content-type": "application/json",
        },
    })
    .then(response => response.json())
    .then(prodotto =>{
        console.log(prodotto)
        eleApiCont += `
        <div class="col-3 mx-4 my-3">
        <div class="card">
        <img src=${prodotto.imageUrl} class="card-img-top" alt="image product">
        <div class="card-body">
        <h5 class="card-title text-center">${prodotto.name}</h5>
        <p class="card-text text-center">${prodotto.brand}</p>
        <p class="card-text text-center">${prodotto.description}</p>
        <p class="card-text text-center">${prodotto.price} $</p>
        </div>
        </div>
        </div>
        `
        apiCont.innerHTML=eleApiCont
        document.getElementById('nameProd').value = ''
        document.getElementById('descri').value = ''
        document.getElementById('brand').value = ''
        document.getElementById('image').value = ''
        document.getElementById('price').value = ''

    })
    .catch(error =>{
        console.error('errore', error)
        console.error('errore', error.response)
    })
}