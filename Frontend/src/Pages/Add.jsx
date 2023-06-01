import React,{useState} from 'react'
import Navbar from '../Components/Navbar'
import '../Sass/Add.scss'
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';


export default function Add() {
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate()
    const { addToast } = useToasts();
    const storedData = localStorage.getItem('Interview');
    const titleoption = ["REACT",'REDUX','CSS','SASS','MERN','TYPESCRIPT','JAVASCRIPT','HTML','NODEJS',
    'DSA','REACT NATIVE','TESTING','DATA STRUCTURE','OOPS']
    if(storedData === undefined){
      navigate("/")
      return;
    }
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleQuestionChange = (e) => {
      setQuestion(e.target.value);
    };
  
    const handleAnswerChange = (e) => {
      setAnswer(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const stored = JSON.parse(storedData);
      const obj ={
        userId : stored, 
        title : title, 
        questions : question,
        answers : answer
      }
      fetch(`http://localhost:8080/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj) 
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          addToast( data.Message, { appearance: 'info',
          className: 'custom-toast'
        });
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
      setTitle('');
      setQuestion('');
      setAnswer('');
    };
  
    return (
        <>
        <Navbar />
      <div className="add-data-container">
        <h2>Add Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <select id="title" value={title} onChange={handleTitleChange}>
              <option value="">Select a title</option>
              {titleoption.map((el,i) => <option value={el} key={i}>{el}</option> )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="question">Question:</label>
            <textarea id="question" value={question} onChange={handleQuestionChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="answer">Answer:</label>
            <textarea id="answer" value={answer} onChange={handleAnswerChange}></textarea>
          </div>
          <button type="submit">Add Data</button>
        </form>
      </div>
      </>
    );
}
