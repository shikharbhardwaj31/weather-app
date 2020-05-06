const loc = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#m1')
const msg2 = document.querySelector('#m2')

loc.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    msg1.textContent = "Loading..."
    fetch('/weather?location='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            console.log(data.error)
        }
        else
        {
        msg1.textContent = location
        msg2.textContent = data.temperature
        console.log(data)
        }
    })
})
    console.log("Form submitted")
})