import React from 'react';
import '../Sass/QAnswer.scss';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';

const QAnswer = () => {
    const location = useLocation();
    const data = location.state.data
  return (
    <>
    <Navbar />
    <div className="qa-section">
    <h1 className="title">{data.title}</h1>
    <div className="user-info">
      <span className="user-name">{data.user.name}</span>
    </div>
    <div className="question">
      <h2>{data.questions}</h2>
      <pre className="answer" style={{wordBreak : "break-all"}}>
        {data.answers}
      </pre>
    </div>
  </div>
  </>
);
};

export default QAnswer;

