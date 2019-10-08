/**
 * @Author: Ali
 * @Date:   2019-10-04T10:05:44+02:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-10-07T08:55:42+02:00
 */
import React,{ useState,useEffect} from 'react'
import io from "socket.io-client";
import queryString from 'query-string'

let socket
const ENDPOINT = "localhost:5000"
//We want to take the url and parse it into objects to set the state
// location is a prop passed by react router, it has .search property with the url
// queryString.parse() is here to make it {name:"value",room:"value"}
const Chat = ({location}) => {

  const [name,setName] = useState('')
  const [room,setRoom] = useState('')
  const [messages,setMessages] = useState([])
  const [message,setMessage] = useState('')

  useEffect(() => {
    //queryString.parse() takes a url and return an object with key:value
    //basically this data object is what the user has entered
    const data = queryString.parse(location.search)
    // socket = io(ENDPOINT) is  all we need to make a connection with BE
    socket = io(ENDPOINT)

    // now we have acces to other socket functions like .emit
    const {name,room} = data
    setName(name)
    setRoom(room)
    // io.emit("an event",{ some: 'data' })
    socket.emit("join",{name,room},()=>{
      // runs when the callback is called
    })
    //useEffect has a callback function we pass an anonymous functions
    // in the return of useEffect --Used for unMounting--
    return () => {
      socket.emit("disconnect")
      socket.off()
    }
  },[ENDPOINT,location.search])

  // a second useEffect to handle messages
  useEffect(()=>{
    socket.on('message',(message) => {
      setMessages([...messages,message])
    })
  },[messages])
  //function for sending setMessages
const sendMessage = e => {
  e.preventDefault()
  if(message){
    socket.emit('sendMessage',message,()=>setMessage(''))
  }
}

console.log(message,messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <input
          type="text"
          value={message} onChange={(e)=>setMessage(e.target.value)}
          onKeyPress={e=>e.key==='Enter' ? sendMessage(e):null}
        />
      </div>
    </div>
  )
}

export default Chat
