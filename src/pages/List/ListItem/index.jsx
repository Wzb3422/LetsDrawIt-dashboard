import React from 'react'
import heart from './images/heart.png'
import './list-item-style.css'

const ListItem = ({ item }) => {

  const handle = () => {
    console.log(item)
  }

  return (
    <div className='list-item-box' onClick={handle}>
      <img className='list-item-heart animated infinite heartBeat' src={heart} alt="heart"/>
      <img src={`https://draw2019.oss-cn-shanghai.aliyuncs.com/picture/${item.top_file_name}?x-oss-process=image/resize,m_fill,h_93,w_149,limit_0`} alt=""/>
      <img src={`https://draw2019.oss-cn-shanghai.aliyuncs.com/picture/${item.bottom_file_name}?x-oss-process=image/resize,m_fill,h_93,w_149,limit_0`} alt=""/>
    </div>
  )
}

export default ListItem
