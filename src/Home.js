import React, { useState, useEffect } from 'react';
import Books from './Books.js';
import Post from './Post.js';

const Home = () => {
    const [fData, setData] = useState([]);
    const [filterType, setFilterType] = useState('1');
    const[updatedData,setUpdatedData]=useState({});

    useEffect(() => {
        fetchData();
    }, []);
    const itemFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();
        if (inputValue === '') {
            setData(fData);
            return;
        }
        let filteredData;

        if (filterType === "1") {
            filteredData = fData.filter(author => author.author.toLowerCase().includes(inputValue));
        } else if (filterType === "2") {
            filteredData = fData.filter(title => title.title.includes(inputValue));
        } else {
            filteredData = fData.filter(genre => genre.genre.includes(inputValue));
        }

        // Update the filtered data in the state
        setData(filteredData);
    };

    const handleFilterChange = (event) => {
        console.log("target value:",event.target);
        setFilterType(event.target.value);
    };

    const fetchData = () => {
        fetch('http://localhost:8000/myapp/books/')
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    };


    return (
        <>
            <nav className='nav'><span>Book Library</span></nav>
            <div className="main-div">
                <select id='select' onChange={handleFilterChange}>
                    <option value='1'>Filter by author</option>
                    <option value='2'>Filter by title</option>
                    <option value='3'>Filter by genre</option>
                </select>
                <input style={{border:'2px solid black',}}name='userInput' onInput={itemFilter}></input>
                <span>
                    <Post fetchData={fetchData}/>
                </span>
                {fData.map((book) => (
                    <Books key={book.id} props={book} fetchData={fetchData} />
                ))}
            </div>
        </>
    );
};

export default Home;
