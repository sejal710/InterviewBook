import React from 'react';
import '../Sass/QAnswer.scss';
import Navbar from '../Components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import {Remarkable} from 'remarkable';

function convertToMarkdown(data) {
  const md = new Remarkable();
  return {__html: md.render(data)};
}

const QAnswer = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const data = location.state.data   
    const user = location.state.user
    const userId = location.state.userId
  return (
    <>
    <Navbar />
     <div className="qa-section">
    <h1 className="title">{data.title}</h1>
   {data.user &&  <div className="user-info">
      <span className="user-name" onClick={() => navigate('/profile',{state:{userId}})}>{data.user.name}</span>
    </div>}
    {user &&  <div className="user-info">
      <span className="user-name" onClick={() => navigate('/profile',{state:{userId}})}>{user}</span>
    </div>}
    <div className="question">
      <h2>{data.questions}</h2>
      <pre className="answer"  dangerouslySetInnerHTML={convertToMarkdown(data.answers)}>
        {/* {data.answers} */}
      </pre>
    </div> 
  </div>
  </>
);
};

export default QAnswer;

