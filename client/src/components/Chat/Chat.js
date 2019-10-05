/**
 * @Author: Ali
 * @Date:   2019-10-04T10:05:44+02:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-10-04T12:54:44+02:00
 */
import React,{ useState,useEffect} from 'react'
import io from "socket.io-client";
import queryString from 'query-string'

let socket
const ENDPOINT = "localhost:5000"

const Chat = ({location}) => {
  const [name,setName] = useState('')
  const [room,setRoom] = useState('')
  useEffect(() => {
    //queryString.parse() takes a url and return an object with key:value
    const {name,room} = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

  },[ENDPOINT,location.search])
  return <h1> Chat </h1>
}

export default Chat
