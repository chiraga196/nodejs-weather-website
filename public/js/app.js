
console.log('client side file')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!search.value) {
       messageOne.textContent = "Please provide some location"
    } else {
        const location = search.value
        
        messageOne.textContent= 'Loading...'
        messageTwo.textContent= ''
        fetch('/weather?address=' + location).then((response) => {
            // console.log(response)
            response.json().then((data) => {
                //console.log(data)
            if(data.error) {
                    messageOne.textContent= data.error
            } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.data
                }
            })
        })
    }
})