import React from 'react';
import '../Sass/Data.scss'
import {useNavigate} from 'react-router-dom'

export default function Data({data,user,userId}) {
  const navigate = useNavigate()
  const handleClick  = () => {
    navigate("/ans",{state :{data,user,userId}})
  }
  return (
    <div className="styled-div">
        <h2 className="title" onClick={handleClick}>{data.title}</h2>
        <div className="question" onClick={handleClick}>{data.questions}</div>
        {data.user && <div className="name" onClick={() => navigate('/profile',{state:{userId}})}>{data.user.name}</div>}
        {user &&  <div className="name" >{user}</div>}
    </div>
  )
}
