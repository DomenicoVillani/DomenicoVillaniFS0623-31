/* inizializzo costanti che usero' piu' volte*/
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZGQ2MDBkOGEyMDAwMThhNDhiOTQiLCJpYXQiOjE3MDIwMjY1OTMsImV4cCI6MTcwMzIzNjE5M30.5j8T8KWPoZfnOz-RSQQhsRBqXS1Xfi1Q6JeAEnURGp8'
const options = {
    headers:{
        Authorization : `Bearer ${token}`,
        "content-type": "application/json",
    }
}
let textDiv=''
let buttonDiv =''
let apiCont = document.querySelector('.contCard')
let buttCont = document.querySelector('.modifica')


/* qui prendo il valore dopo il ? nell'url per poter riaccedere a tutto l'oggetto del prodotto */
const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
console.log(id)
window.onload = async () => {
    const resp = await fetch('https://striveschool-api.herokuapp.com/api/product/'+id,options)
    console.log(resp)
    const info = await resp.json()
    console.log(info)
    /* dopo aver estratto il prodotto tramite l'id lo stampo in maniera piu' evidenziata*/
    textDiv=`<div>
    <h1 class="title my-5">Ecco il prodotto selezionato</h1>
    <h2>Nome prodotto: ${info.name}</h2>
    <img src=${info.imageUrl}>
    <p class="text-uppercase">${info.brand}</p>
    <p>${info.description} <br> il suo costo e' ${info.price} $</p>
    </div>
    `
    apiCont.innerHTML=textDiv
    buttonDiv=`<div class="d-flex justify-content-evenly my-5">
    <a href="homePage.html" class="btn btn-primary home">Home store</a>
    <a href="#" class="btn btn-danger edit">Edit product</a>
    </div>
    `
    buttCont.innerHTML=buttonDiv
    /* creo una funzione che al click di edit mi porti sulla pagina per modificare il prodotto*/
    const edit = document.querySelectorAll('.edit')
      edit.forEach(button => {
        button.addEventListener('click',function(){
          window.location.href=`modifica.html?id=${info._id}`
        })
      })
}
