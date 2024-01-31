import React, { useState } from 'react';

const Books = ({ props,fetchData }) => {

  const[editable,setEditable]=useState(false);
  const[title,setEditedTitle]=useState(props.title);
  const[author,setEditedAuthor]=useState(props.author);
  const[genre,setEditedGenre]=useState(props.genre);


  const deleteBook= async(id)=>{
    try{
      const response= await fetch(`http://localhost:8000/myapp/book/${id}/`,{
        method:'Delete',
      })
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      else{
        fetchData();
      }
    }
    catch(error){
      console.log('delete failed:',error);
    }
  }

  const handleUpdate=async(id)=>{
      console.log("editable value:",editable);
        try{
      const response = await fetch(`http://localhost:8000/myapp/book/${id}/`,{
          method:'PUT',
          headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            title:title,
            author:author,
            genre:genre,
          }),

      })
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      setEditable(false);
      console.log("data saveed succesfully");
      fetchData();
  }
  catch(error){
      console.log('error fetching data:',error);
  }
    
  }

  const handleEditCLick=()=>{
    console.log("entered handle click");
    setEditable(true);
  }

  return (
    <div className='book-container'>
      <div className='content-div'>
        <h1 contentEditable={editable} onBlur={(e) => setEditedTitle(e.target.textContent)}> {editable?('Title:',title):('Title:',props.title)}</h1>
      </div>
      <div className='content-div'>
        <h2 contentEditable={editable} onBlur={(e)=>setEditedAuthor(e.target.textContent)}> {editable?("Author:",author):("Author:",props.author)}</h2>
      </div>
      <div className='content-div'>
        <h2 contentEditable={editable} onBlur={(e)=>setEditedGenre(e.target.textContent)}>Genre: {editable?('Genre:',genre):('Genre:',props.genre)}</h2>
      </div>
      <button onClick={()=>{deleteBook(props.id)}} style={{backgroundColor:'red',color:'white'}}>delete</button>
      {editable?(<button onClick={()=>handleUpdate(props.id)}>save</button>):(<button onClick={handleEditCLick} style={{backgroundColor:'blue',color:'white'}}>Edit</button>)}
    </div>
    
  );
}

export default Books;
