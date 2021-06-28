const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const loc=search.value
    messageOne.textContent="Loading...."
    messageTwo.textContent=' '
    //c 29
    fetch('http://localhost:3000/weather?address='+loc).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent= data.error;
            messageTwo.textContent= " ";
        }
        else{
        messageOne.textContent =data.forecast
        messageTwo.textContent= data.location
        }
    })
})
})