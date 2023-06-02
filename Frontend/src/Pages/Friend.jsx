import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import '../Sass/Friend.scss'
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

export default function Friend() {
    const [data,setData] = useState([]);
    const navigate = useNavigate()
    const [searchInput,setSearchInput] = useState("");
    const [ search,setSearch] = useState("");
    const [loader,setloader] = useState(false)
    const fetchData = async() => {
        try{
            
            let api = `${process.env.REACT_APP_API}/users`;
            if(search !== ""){
                api = `${api}?search=${search}`
            }
            let value = await fetch(api);
            let jsonData = await value.json()
            setData(jsonData.Data)
            setloader(false)
        }
        catch(e){
            console.log(e)  
            setloader(false)    
        }
    }

    useEffect(() => {
        fetchData()
    },[search]) 

    const handleClick = () => {
        setSearch(searchInput)
        setSearchInput("")
        setloader(true)
    }
  return (
    <div>
        <Navbar />
        <div className='friend'>

        <div className="search-container">
      <div className="input-container">
        <input type="text" placeholder="Search by Name" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
        <button onClick={handleClick} disabled={loader} >{loader ? "Searching..." :"Search"}</button>
        <button onClick={() => setSearch("")}>All Users</button>
      </div>
        </div>

        <div className='users'>
            {
                data && data.map((el,i) => (
                <div className="user-info" onClick={() => navigate("/profile",{state:{userId:el._id}})} key={i}>
                    <div className="user-image">
                     {el.image ?  <img src={el.image} alt="User" /> : <img  src="https://www.technopipefittings.com/wp-content/uploads/2021/01/user.png" alt="User"/>}
                    </div>
                    <div className="user-details">
                      <h3>{el.name}</h3>
                      <p>Email: {el.email}</p>
                      <p>Number of Posts: {el.posts.length}</p>
                    </div>
                </div>
                ))
            }
            {
                data.length === 0 && <Loading />
            }
        </div>
       
        </div>
    </div>
  )
}
