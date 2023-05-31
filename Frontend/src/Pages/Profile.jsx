import React, { useState, useEffect } from 'react';
import '../Sass/Profile.scss';
import EditProfile from '../Components/EditProfile';
import Navbar from '../Components/Navbar';

const Profile = () => {
  const [user, setUser] = useState({});
  const [popup,setPopup] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/6476c6e0e3d226b152691db7');
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
    <>
    <Navbar />
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
        {user.image ? <img src={user.image} alt="Profile" /> : <img src="https://i.pinimg.com/originals/0a/16/f6/0a16f6254483e1f4d1425c296a351b60.jpg" alt="Profile" />}
      </div>
      <div className="profile-details">
  <h3>{user.name}</h3>
  <p className="detail-item">
    <span className="detail-label">Email:</span> {user.email}
  </p>
  <p className="detail-item">
    <span className="detail-label">Bio:</span> {user.profession}
  </p>
  <p className="detail-item">
    <span className="detail-label">Skills:</span> {user.skills && user.skills.map((el,i) => <span className='detail-label-span' key={i}>{el}{"  "}</span>)}
  </p>
</div>

    </div> 
    </>
    )}
    {popup && (
      <EditProfile user={user} onCancel={handleEdit} popup={setPopup} />
    )}
  </div>
  </>
  )
};

export default Profile;

