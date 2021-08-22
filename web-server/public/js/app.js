const weatherForm = document.querySelector('.weatherForm')
const locationInput = document.querySelector('#locationInput')

const weatherInfo = document.querySelector('.weatherInfo')

const fetchData = async address => {
    const response = await fetch(`http://localhost:3000/weather?address=${address}`)
    const data = await response.json()
    return data
}

weatherForm.addEventListener('submit', async event => {
    event.preventDefault()

    const location = locationInput.value
    
    const messageOne = document.createElement('p')
    messageOne.textContent = 'Loading...'
    
    weatherInfo.innerHTML = ''
    weatherInfo.appendChild(messageOne)
    
    const data = await fetchData(location)
    
    if (data.error) {
        messageOne.innerText = data.error
        weatherInfo.appendChild(messageOne)
    } else {
        const {forecast, location, address} = data

        const messageTwo = document.createElement('p')
        
        messageOne.innerText = forecast
        messageTwo.innerText = location
        
        weatherInfo.appendChild(messageOne)
        weatherInfo.appendChild(messageTwo)
    }
})