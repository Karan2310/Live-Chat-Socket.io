import './App.css';
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'

function App() {
  const socket = io.connect('http://localhost:5500/')

  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const userName = nanoid(4)

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit("chat", { message, userName })
    setMessage('')
  }

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload])
    })
  })


  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty</h1>
        {chat.map((e, index) => {
          return (
            <p key={index}>{e.message} : <span>id: {e.userName}</span></p>
          )
        })}
        <form onSubmit={sendChat}>
          <input type="text" name="chat" placeholder='send text' value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }} autoComplete="off" />
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
