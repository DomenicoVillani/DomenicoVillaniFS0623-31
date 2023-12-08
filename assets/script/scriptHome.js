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

async function fetcher(url,option){
    const response = await fetch(url,option)
    const data = await response.json()
    console.log(data)
    function createCard(){
      let eleApiCont = ''
      data.forEach(card => {
        eleApiCont += `
        <div class="col-3 mx-4 my-3">
        <div class="card">
        <img src=${card.imageUrl} class="card-img-top" alt="image product">
        <div class="card-body">
        <h5 class="card-title text-center">${card.name}</h5>
        <p class="card-text text-center">${card.brand}</p>
        <p class="card-text text-center">${card.description}</p>
        <p class="card-text text-center">${card.price} $</p>
        <div class="d-flex">
        <a href="#" data-id="${card._id}" class="btn btn-success info">More info</a>
        <a href="#" data-id="${card._id}" class="btn btn-danger edit">Edit product</a>
        </div>
        </div>
        </div>
        </div>
        `
      });
      apiCont.innerHTML=eleApiCont
      const info = document.querySelectorAll('.info')
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
    createCard()
}




/*
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZGQ2MDBkOGEyMDAwMThhNDhiOTQiLCJpYXQiOjE3MDIwMjY1OTMsImV4cCI6MTcwMzIzNjE5M30.5j8T8KWPoZfnOz-RSQQhsRBqXS1Xfi1Q6JeAEnURGp8'
fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZGQ2MDBkOGEyMDAwMThhNDhiOTQiLCJpYXQiOjE3MDIwMjY1OTMsImV4cCI6MTcwMzIzNjE5M30.5j8T8KWPoZfnOz-RSQQhsRBqXS1Xfi1Q6JeAEnURGp8"
}
})




<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-success">More info</a>
    <a href="#" class="btn btn-danger">Edit product</a>
  </div>
</div>

*/

