import React, { useEffect, useState } from 'react'
import webSocket from 'socket.io-client'
import title from './images/title.png'
import one from './images/1.png'
import two from './images/2.png'
import three from './images/3.png'
import nextTurn from './images/nextTurn.png'
import './rank-style.css'

function Rank() {

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(webSocket('http://101.132.107.146'))
  }, [])

  useEffect(() => {
    if (socket) {
      console.log('connected')
      console.log(socket)
      wsInit()
    }
  }, [socket])

  const wsInit = () => {
    socket.on('connect', () => {
      console.log(`Ws connected as id ${socket.id}`)
    })
    socket.on('next', res => {
      console.log(res)
    })
  }

  const toNextTurn = () => {
    socket.emit('next', {
      token: window.localStorage.getItem("token")
    })
  }

  return (
    <div className='rank-container'>
      <img className='rank-title' src={title} alt=""/>
      <div className='rank-heroes'>
        <div className='rank-box'>
          <img className='rank-crown' src={two} alt=""/>
          <div className='rank-outline'></div>
        </div>
        <div className='rank-box'>
          <img className='rank-crown' src={one} alt=""/>
          <div className='rank-outline'></div>
        </div>
        <div className='rank-box'>
          <img className='rank-crown' src={three} alt=""/>
          <div className='rank-outline'></div>
        </div>
      </div>
      <img className='next-turn' src={nextTurn} onClick={toNextTurn} alt="nextTurn"/>
    </div>
  )
}

export default Rank
