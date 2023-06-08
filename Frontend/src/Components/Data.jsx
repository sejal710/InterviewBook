
import React,{useState} from 'react';
import '../Sass/Data.scss'
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

export default function Data({ data, user, userId }) {
  const [showPopup, setShowPopup] = useState(false);
  const [deletePopup,setDeletePopup] = useState(false)
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const storedData = localStorage.getItem('Interview');
  const ID = JSON.parse(storedData)
  const handleClick = () => {
    navigate("/ans", { state: { data, user, userId } });
  };
  const handledot = () => {
    setShowPopup(!showPopup)
  }
  const handleUpdate = () => {
    navigate('/edit',{state:{data}});
    setShowPopup(false)
  }
  const handleDelete = () => {  
    setShowPopup(false);
    setDeletePopup(true)
  }

  const handleConfirmDelete = (id) => {
    // Delete logic goes here
    console.log(id);
    fetch(`${process.env.REACT_APP_API}/post/${id}`, { method: 'DELETE' }) // Replace with your actual API endpoint and ID
    .then(response => {
      if (response.ok) {
        addToast( "Sucessfully Deleted", { appearance: 'sucess'});
        setDeletePopup(false)
      } else {
        addToast( "Oops! not Deleted", { appearance: 'error'});
        console.error('Failed to delete data');
        setDeletePopup(false)
      }
    })
    .catch(error =>{
      console.error(error)
      addToast( "Oops! not Deleted", { appearance: 'error'});
      setDeletePopup(false)
    });
    
  };

  const handleCancelDelete = () => {
    setDeletePopup(false)
  };

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
        <div className="pop">
          <button className="update-button" onClick={handleUpdate}>Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      )}

    {deletePopup && (
        <ConfirmationPopup
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          ID = {userId}
        />
      )}
    </div>
  )
}





const ConfirmationPopup = ({ onConfirm, onCancel,ID }) => {
  return (
    <div class="popup-container-delete">
  <div class="confirmation-popup-delete">
    <p>Are you sure you want to delete this item?</p>
    <div class="confirmation-buttons">
      <button onClick={() => onConfirm(ID)}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  </div>
  <div class="popup-background-delete"></div>
</div>
  );
};

