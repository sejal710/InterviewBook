import React,{useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import AddData from '../Components/AddData'
import  '../Sass/Home.scss'
import Data from '../Components/Data';
import Loading from '../Components/Loading';
import Footer from '../Components/Footer';

export default function Home() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchInput,setSearchInput] = useState("")
  const [search,setSearch] = useState({search:"",disable:false})
  const [data,setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;
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
      let api =`${process.env.REACT_APP_API}/post/data?page=${currentPage}&limit=${limit}`
      console.log(api);
      if(search.search){
        api = `${api}&search=${search.search}`
      }
      if(checkedItems.length !== 0){
        api = `${api}&titles=${checkedItems}`
      }
      const response = await fetch(api); // Replace with your API endpoint
      const jsonData = await response.json();
      setData(jsonData.posts);
      setTotalPages(jsonData.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData()
  },[search,checkedItems,currentPage])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleQuestion = () => {
    setCheckedItems([]);
    setSearch({search:"",disable:false})
  }

  return (
    <div>
      <Navbar />
      <div className='home'>
       <div className='home_data'>
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

       <div className='question'>
        <button onClick={handleQuestion}>All Questions</button>
       </div>
       </div> 

       <div className='data'>
        {data && data.map((el,i) => (
          <Data data={el} key={i} userId={el.user._id}/>
        ))}
        {data.length === 0 && <Loading />}
        </div> 
        </div> 
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>
        <Footer />
      </div>
      <AddData />
    </div>
  )
}
