import React from 'react';
import '../Sass/Data.scss'
import {useNavigate} from 'react-router-dom'

export default function Data({data}) {
  const navigate = useNavigate()
  const handleClick  = () => {
    navigate("/ans",{state :{data}})
  }
  return (
    <div className="styled-div" onClick={handleClick}>
        <h2 className="title">{data.title}</h2>
        <div className="question">{data.questions}</div>
        <div className="name">{data.user.name}</div>
    </div>
  )
}
