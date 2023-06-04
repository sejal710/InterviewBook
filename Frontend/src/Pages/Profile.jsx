import React, { useState, useEffect ,useCallback} from 'react';
import '../Sass/Profile.scss';
import EditProfile from '../Components/EditProfile';
import Navbar from '../Components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import Data from '../Components/Data'
import Loading from '../Components/Loading';

const Profile = () => {
  const [user, setUser] = useState({});
  const [popup,setPopup] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();
  const id = location.state
  const storedData = localStorage.getItem('Interview');
  if(storedData === undefined){
    navigate("/")
  }
  const ID = JSON.parse(storedData)

  const fetchData = useCallback(async () => {
    try {
      let userId = ID
      if(id !== null){
        userId = id===ID ? ID : id.userId
      }
      const response = await fetch(`${process.env.REACT_APP_API}/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.Data);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [ID,popup])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = () => {
    // Logic to handle the edit button click
    setPopup(true)
  };
 const post = user.posts
  return(
    <>
    <Navbar />
    {!post ? <Loading /> :
    <div className="profile-container">
      {popup === false && (<>
             <div className="profile-header">
      <h2>Profile</h2>
        {location.state === null   && <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>}
        {/* {id !== null && ID === id.userId  && <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>} */}

    </div>
    <div className="profile-content">
      <div className="profile-image">
        {user.image? <img src={user.image} alt="Profile" /> : <img src="https://i.pinimg.com/originals/0a/16/f6/0a16f6254483e1f4d1425c296a351b60.jpg" alt="Profile" />}
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
    <span className="detail-label">Skills:</span><p className="detail-label-s"> {user.skills && user.skills.map((el,i) => <span className='detail-label-span' key={i}>{el}{"  "}</span>)}</p>
  </p>
</div>

    </div> 
    <div className='datas'>
      {post && post.map((el,i) => <Data key={i} data={el} user={user.name} userId={user._id}></Data> )}
      
    </div>
    </>
    )}
    {popup && (
      <EditProfile user={user} onCancel={handleEdit} popup={setPopup} ID={ID}/>
    )}

  
  </div>}
  </>
  )
};

export default Profile;

