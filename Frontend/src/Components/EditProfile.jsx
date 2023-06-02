
import React, { useState } from 'react';
import '../Sass/EditProfile.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { useToasts } from 'react-toast-notifications';


const EditProfile = ({ popup, user,ID }) => {
  const [name, setName] = useState(user.name ? user.name : "");
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image ? user.image :"");
  const [profession, setProfession] = useState(user.profession ? user.profession :"");
  const [skills, setSkills] = useState(user.skills ? user.skills : []);
  const [skillInput, setSkillInput] = useState(''); 
  const [loading,setLoading] = useState(false)
  const {addToast} = useToasts()
  const skilldata = ["REACT",'REDUX','CSS','SASS','TYPESCRIPT','JAVASCRIPT','HTML','DSA','REACT NATIVE','TESTING','DATA STRUCTURE','OOPS']

  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true)
    let obj = {
      name: name,
      email: email,
      image: image,
      profession: profession,
      skills: skills
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/${ID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      });

      if (response.ok) {
        const data = await response.json(); // Extract JSON response
        addToast( data.Message, { appearance: 'success' });
        setLoading(false)
        popup(false);
      } else {
        // Handle the error case
        setLoading(false)
        addToast( "Error", { appearance: 'error' });
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      // Handle any network or server errors
      setLoading(false)
      addToast( "Error", { appearance: 'error' });
      console.error('Network/server error:', error);
    }
  };


  const handleImageUpload = async (e) => {
    setLoading(true)
    const file = e.target.files[0];
    let form = new FormData();
    form.append("image", file);

    try {
      let apiKey = "b25e942cc0f3b7c9855593da0e501fb0";
      const response = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${apiKey}`, {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        addToast( "Image Uploaded", { appearance: 'success' });
        setLoading(false)
        const videoUrl = await response.json();
        setImage(videoUrl.data.display_url);
        // Use the HTTPS video URL for further processing
      } else {
        addToast( "Image Not Uploded", { appearance: 'error' });
      }
    } catch (error) {
      setLoading(false)
      addToast( "Image Not Uploded", { appearance: 'error' });
      console.log('Error uploading video', error);
    }
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() !== '') {
      setSkills(prevSkills => [...prevSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skill) => {
    setSkills(prevSkills => prevSkills.filter(item => item !== skill));
  };

  const togglePopup = () => {
    popup(false);
  };

  return (
    <div className="edit-profile-container">
      <div className="popup-container">
        <div className="popup">
          <h2>Edit Profile</h2>
          <button className="close-popup-button" onClick={togglePopup}>
            <AiOutlineClose />
          </button>
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
              <div className="skills-container">
                {skills.map((skill, index) => (
                  <div className="skill" key={index}>
                    {skill}
                    <button
                      className="remove-skill"
                      onClick={() => handleSkillRemove(skill)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <div className="skills-input">
              <select
                  id="skills"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                >
                  <option value="">Select a skill</option>
                  {skilldata.map((el,i) => <option value={el} key={i}>{el}</option>)}
                </select>
                <button type="button" onClick={handleSkillAdd}>
                  Add
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}>{loading === false ? "Save Changes" : "Loading...."}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
