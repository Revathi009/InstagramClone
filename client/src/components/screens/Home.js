import React, {useState, useEffect} from 'react'

const Home = ()=>{
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch('/allpost', {
            headers:{
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setData(result.posts)
        })
    }, [])


    return(
        <div className='home'>
            {
                data.map(item=>{
                    return(
                        <div className='card home-card' key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <div className='card-image'>
                                <img src= {item.photo}/>
                            </div>
                            <div className='card-content'>
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type="text" placeholder='add a comment'></input>
                            </div>
                        </div>

                    )
                })
            }
            
{/* 
            <div className='card home-card'>
                <h5>Shruti</h5>
                <div className='card-image'>
                    <img src='https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2FsbHBhcGVyfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60'/>
                </div>
                <div className='card-content'>
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is a post</p>
                    <input type="text" placeholder='add a comment'></input>
                </div>
            </div>

            <div className='card home-card'>
                <h5>Shruti</h5>
                <div className='card-image'>
                    <img src='https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2FsbHBhcGVyfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60'/>
                </div>
                <div className='card-content'>
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is a post</p>
                    <input type="text" placeholder='add a comment'></input>
                </div>
            </div> */}
        </div>
    );
}

export default Home