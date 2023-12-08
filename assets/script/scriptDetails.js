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

const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
console.log(id)
window.onload = async () => {
    const resp = await fetch('https://striveschool-api.herokuapp.com/api/product/'+id,options)
    console.log(resp)
    const info = await resp.json()
    console.log(info)
    textDiv=`<div>
    <h1>Ecco il prodotto selezionato</h1>
    <h2>Nome prodotto: ${info.name}</h2>
    <img src=${info.imageUrl}>
    <p>${info.name} e' ${info.description} del brand ${info.name} <br> il suo costo e' ${info.price}</p>
    </div>
    `
    apiCont.innerHTML=textDiv
    buttonDiv=`
    <a href="#" class="btn btn-danger edit">Edit product</a>
    `
    buttCont.innerHTML=buttonDiv
    const edit = document.querySelectorAll('.edit')
      edit.forEach(button => {
        button.addEventListener('click',function(){
          window.location.href=`modifica.html?id=${info._id}`
        })
      })
}
