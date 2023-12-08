/* inizializzo costanti che usero' piu' volte*/
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZGQ2MDBkOGEyMDAwMThhNDhiOTQiLCJpYXQiOjE3MDIwMjY1OTMsImV4cCI6MTcwMzIzNjE5M30.5j8T8KWPoZfnOz-RSQQhsRBqXS1Xfi1Q6JeAEnURGp8'
const urlApi = 'https://striveschool-api.herokuapp.com/api/product/'
const btnLoadCard = document.querySelector('.btnLoadCard')
let apiCont = document.querySelector('.row')
const options = {
    headers:{
        Authorization : `Bearer ${token}`,
        "content-type": "application/json",
    }
}

fetcher(urlApi,options)
/* creo una funzione asincrona per mostrare tutte le card con tutti i prodotti dell'api*/
async function fetcher(url,option){
    const response = await fetch(url,option)
    const data = await response.json()
    console.log(data)
    function createCard(){
      let eleApiCont = ''
      data.forEach(card => {
        /* qua creo effetivamente tutte le card*/
        eleApiCont += `
        <div class="col-3 my-3">
        <div class="card">
        <img src=${card.imageUrl} class="card-img-top" alt="image product">
        <div class="card-body">
        <h5 class="card-title text-center fw-bold fs-4">${card.name}</h5>
        <p class="card-text text-center text-uppercase">${card.brand}</p>
        <p class="card-text text-center hidden">${card.description}</p>
        <p class="card-text text-center">${card.price} $</p>
        <div class="d-flex justify-content-evenly">
        <a href="#" data-id="${card._id}" class="btn btn-success info btn-sm">More info</a>
        <a href="#" data-id="${card._id}" class="btn btn-danger edit btn-sm">Edit product</a>
        </div>
        </div>
        </div>
        </div>
        `
      });
      apiCont.innerHTML=eleApiCont
      const info = document.querySelectorAll('.info')
      /* credo due funzioni al click dei 2 pulsanti edit o info che porta l'utente alla pagina cliccata modificando l'url per poi poter riprendere le informazioni*/
      info.forEach(button => {
        button.addEventListener('click',function(event){
          const cardId = event.target.getAttribute('data-id')
          window.location.href=`details.html?id=${cardId}`
        })
      })
      const edit = document.querySelectorAll('.edit')
      edit.forEach(button => {
        button.addEventListener('click',function(event){
          const cardId = event.target.getAttribute('data-id')
          window.location.href=`modifica.html?id=${cardId}`
        })
      })
    }
    createCard()  /* richiamo la funzione per la creazione delle carte*/
}



