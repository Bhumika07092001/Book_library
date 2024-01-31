import React,{useEffect,useState} from 'react'

const Post=({fetchData})=>{
    const [data, setData]=useState({
        title:'',
        author:'',
        genre:''
    });

    const [render, setRender]=useState(false);

    
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:8000/myapp/books/',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data),

            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const formdata= await response.json();
            setData({
                title:formdata.title,
                author:formdata.author,
                genre:formdata.genre,

            })
            fetchData();
            setRender(false);
        }
        catch(error){
            console.log('error fetching data:',error);
        }

    }

    const handleChange=(e)=>{
        const{name, value}=e.target;
        setData(data=>({
            ...data,
            [name]:value,
        }));
    }

    const handldeAdd=()=>{
        setRender(true);
    }
    
    // useEffect(() => {
    //     console.log(data); // This will log the updated state after each render
    // }, [data]); 

    return(
        <>
        {!render?(<button onClick={handldeAdd} style={{backgroundColor:'#00AFCC',color:'white',blockSize:'5vh',}}>Add Book</button>):
        (
            <form>
            <div id='post-div'>
            <label >Enter Title</label>
            <input type='text' name='title' onChange={handleChange}></input>
            <label >Enter Author</label>
            <input type='text' name='author'onChange={handleChange}></input>
            <label >Enter Genre</label>
            <input type='text' name='genre' onChange={handleChange}></input>
            <button onClick={handleSubmit}>Submit</button>
            </div>
        </form>
        )}
        </>
    );

}

export default Post;