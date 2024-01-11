const socket = io()

const room = document.getElementById("room")
const form = room.querySelector("form")

socket.emit("enter_room", () =>{
    console.log("server is done!")
})


function addMessage(message){
    const ul = room.querySelector("ul")
    const li = document.createElement("li")
    li.innerText = message
    ul.appendChild(li)
}




socket.on("welcome", () =>{
    addMessage("someone joined!")
})

socket.on("new_message", (msg)=>{
    addMessage(msg)
})


function sendMessage(event){
    event.preventDefault()
    const input = form.querySelector("input")
    const value = input.value
    socket.emit("new_message", value, ()=>{
        addMessage(`You: ${value}`)
    })
    input.value = ""
}



form.addEventListener("submit", sendMessage)