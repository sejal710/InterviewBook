import React,{useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import AddData from '../Components/AddData'
import  '../Sass/Home.scss'
import Data from '../Components/Data';

export default function Home() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchInput,setSearchInput] = useState("")
  const [search,setSearch] = useState({search:"",disable:false})
  const [data,setData] = useState([])
  const title = ["REACT",'REDUX','CSS','SASS','TYPESCRIPT','JAVASCRIPT','HTML','DSA','REACT NATIVE','TESTING','DATA STRUCTURE','OOPS',"MERN"]
   
  const handleCheckboxChange = (event) => {
    const itemName = event.target.name;
    if (event.target.checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, itemName]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== itemName)
      );
    }
  };

  const handleSearch = () => {
      setSearch({search:searchInput,disable:false})
  }
  
  const fetchData = async () => {
    try {
      let api =`http://localhost:8080/post/data?`
      if(search.search){
        api = `${api}&search=${search.search}`
      }
      if(checkedItems.length !== 0){
        api = `${api}&titles=${checkedItems}`
      }
      const response = await fetch(api); // Replace with your API endpoint
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData()
  },[search,checkedItems])

  console.log(data)
  console.log("checked",checkedItems);
  return (
    <div>
      <Navbar />
      <div className='home'>
      <div className='filter'>

      <h3 className="div-with-underline">Search By Questions</h3>

      <div className="search-container">
      <div className="input-container">
        <input type="text" placeholder="Search" onChange={(e) => setSearchInput(e.target.value)}/>
        <button onClick={handleSearch}>{search.disable === false ? "Search" : "Search.."}</button>
      </div>
      </div>

      <h3 className="div-with-underline">Topic</h3>

      <div className="checkbox-list">
        
      {title.map((item, index) => (
        <label key={index} className="checkbox-label">
          <input
            type="checkbox"
            name={item}
            checked={checkedItems.includes(item)}
            onChange={handleCheckboxChange}
            className="checkbox-input"
          />
          <span
            className={`checkbox-custom ${
              checkedItems.includes(item) ? 'checked' : ''
            }`}
          ></span>
          {item}
        </label>
        ))}
       </div>
       </div> 

       <div className='data'>
        {data && data.map((el,i) => (
          <Data data={el} key={i} />
        ))}
        </div> 

      </div>
      <AddData />
    </div>
  )
}
