import React, { useState, useEffect } from 'react';
import '../Sass/Profile.scss';
import EditProfile from '../Components/EditProfile';

const Profile = () => {
  const [user, setUser] = useState({});
  const [popup,setPopup] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/6474b6a57b8206f6724e31f6');
        if (response.ok) {
          const data = await response.json();
          setUser(data.Data);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  console.log(user);

  const handleEdit = () => {
    // Logic to handle the edit button click
    setPopup(true)
  };
  
  return(
    <div className="profile-container">
      {popup === false && (<>
             <div className="profile-header">
      <h2>Profile</h2>
        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>

    </div>
    <div className="profile-content">
      <div className="profile-image">
        <img src={user.image} alt="Profile" />
      </div>
      <div className="profile-details">
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Profession: {user.profession}</p>
        <p>Skills: {user.skills}</p>
      </div>
    </div> 
    </>
    )}
    {popup && (
      <EditProfile user={user} onCancel={handleEdit} popup={setPopup} />
    )}
  </div>
  )
};

export default Profile;

