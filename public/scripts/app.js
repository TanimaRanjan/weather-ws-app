
// console.log(document.getElementById('#search_id'))
// console.log(document.getElementsByTagName('form'))
// console.log(document.querySelector('form'))

const weatherForm = document.querySelector('form')
const location_id = document.querySelector('#location_id')
const forcast = document.querySelector('#forcast_id')
const errorMessage = document.querySelector('#error_id')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    location_id.textContent = ''
    forcast.textContent = ''
    errorMessage.textContent = ''
    data(document.querySelector('input').value)  
})



const data = async(addressCd) => {
    console.log('Location '+addressCd)
    
  return await fetch(`/weather?address=${addressCd}`).then((Response) => {

    if(Response.status === 200 ) {
        return  Response.json()
      } else {
        throw new Error('Unable to Fetch data')
      }  
  
}).then((data) => {
    console.table(data)
    location_id.textContent = data.location
    forcast.textContent = data.welcomeMessage 
}).catch((error) => {
    console.log(error)
    errorMessage.textContent = error
})}




// // const weatherForm = document.getElementById('#searchForm')


// // weatherForm.addEventListener('submit', (e) => {
// //     console.log(e.target.value)
// // })