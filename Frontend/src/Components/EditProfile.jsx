import React, { useState } from 'react';
import '../Sass/EditProfile.scss';

const EditProfile = ({popup,user}) => {
  const [name, setName] = useState(user.name ? user.name : "");
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState("");
  const [profession, setProfession] = useState('');
  const [skills, setSkills] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      alert('Image is required');
      return;
    }
  
    let obj = {
      name: name,
      email: email,
      image: image,
      profession: profession,
      skills: skills
    };
  
    console.log(obj);
  
    try {
      const response = await fetch('http://localhost:8080/6474b6a57b8206f6724e31f6', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      });
  
      if (response.ok) {
        const data = await response.json(); // Extract JSON response
        console.log(data);
      } else {
        // Handle the error case
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('Network/server error:', error);
    }
  };
  

  const handleImageUpload = async(e) => {

    const file = e.target.files[0];
    let form = new FormData();

    form.append("image",file);
    // console.log(form)
    try {
        let apiKey = "b25e942cc0f3b7c9855593da0e501fb0";
      const response = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${apiKey}`, {
        method: 'POST',
        body: form,
      });
  
      if (response.ok) {
        const videoUrl = await response.json();
        setImage(videoUrl.data.display_url)
        // Use the HTTPS video URL for further processing
      } else {
        console.log('Video upload failed');
      }
    } catch (error) {
      console.log('Error uploading video', error);
    }
  };



  const togglePopup = () => {
     popup(false)
  };

  return (
    <div className="edit-profile-container">
        <div className="popup-container">
          <div className="popup">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="form-group">
  <label htmlFor="profession">Bio:</label>
  <textarea
    id="profession"
    value={profession}
    onChange={(e) => setProfession(e.target.value)}
  />
</div>
        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
              <button type="submit">Save Changes</button>
              <button className="close-popup-button" onClick={togglePopup}>
                Close
              </button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default EditProfile;
