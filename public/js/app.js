console.log('Client side JS file is loaded!!!')

const weatherForm = document.querySelector('form')
const searchRes = document.querySelector('input')
const mOne = document.querySelector('#message-1')
const mTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchRes.value
    mOne.textContent = 'Loading...'
    mTwo.textContent = ''

    const URL = '/weather?address=' + location
    fetch(URL).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            mOne.textContent = data.error
            mTwo.textContent = ''
        }
        else {
            mOne.textContent = data.location
            mTwo.textContent = data.forecast
        }
    })
})
})