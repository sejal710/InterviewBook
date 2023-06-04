
import React,{useState} from 'react';
import '../Sass/Data.scss'
import { useNavigate } from 'react-router-dom'

export default function Data({ data, user, userId }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const storedData = localStorage.getItem('Interview');
  const ID = JSON.parse(storedData)
  const handleClick = () => {
    navigate("/ans", { state: { data, user, userId } });
  };
  const handledot = () => {
    setShowPopup(!showPopup)
  }
  const handleUpdate = () => {
    setShowPopup(false)
  }
  const handleDelete = () => {
    setShowPopup(false)
  }

  return (
    <div className="styled-div">
      <h2 className="title" onClick={handleClick}>{data.title}</h2>
      <div className="question" onClick={handleClick}>{data.questions}</div>
      {data.user  && <div className="name" onClick={() => navigate('/profile', { state: { userId } })}>{data.user.name}</div>
       }
      {user && ID === userId ? 
      <div className="three-dots" onClick={handledot}>
      <span></span>
      <span></span>
      <span></span>
    </div> : <div className="name">{user}</div> }
     
    {showPopup && (
        <div className="popup">
          <button className="update-button" onClick={handleUpdate}>Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  )
}
