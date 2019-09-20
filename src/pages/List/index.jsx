import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import end from './images/end.png'
import './list-style.css'

const ListItem = lazy(() => import('./ListItem/index.jsx'))

const List = () => {

  const [socket, setSocket] = useState(null)
  const [ranksList, setRanksList] = useState([])

  // xhr
  useEffect(() => {

    const loginPromise = new Promise(resolve => {
      axios.post('http://101.132.107.146/api/auth', {
        student_id: 'test',
        name: 'test'
      }).then(res => {
        resolve(res.data)
      })
    })

    loginPromise.then(res => {
      window.localStorage.setItem("token", res.data.token)
    })
      .then(() => {
        setInterval(() => {
          axios({
            url: 'http://101.132.107.146/api/like/rank',
            method: 'get',
            headers: {
              Authorization: window.localStorage.getItem("token")
            }
          }).then(res => {
            console.log(res.data.data.pictures_data)
            setRanksList(res.data.data.pictures_data)
          }).catch(err => {
            throw new Error(err)
          })
        }, 1200)
     })
  }, [])

  return (
    <div className='list-container'>
      <div className='list-title hugo'>Pick 你心中的 「优秀画作」</div>
      <div className='list-box'>
        <Suspense fallback={<div>Loading...</div>}>
          {
            ranksList.map((item, index) => {
              console.log(item)
              if (index < 12) {
                return (
                  <ListItem key={index} item={item}/>
                )
              }
            })
          }
        </Suspense>
      </div>
      <div className='end-button'>
        <Link to='/rank'>
          <img className='end-button' src={end} alt="end"/>
        </Link>
      </div>
    </div>
  )
}

export default List
