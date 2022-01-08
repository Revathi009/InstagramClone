import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../../App'

const Home = ()=>{
    const [data, setData] = useState([])
    const {state,dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch('/allpost', {
            headers:{
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: 'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            const newData = data.map(item=>{
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }


    const unlikePost = (id) => {
        fetch('/unlike', {
            method: 'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)        
        }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method: 'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)        
        }).catch(err=>{
            console.log(err)
        })
    }

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
                            
                            {item.likes.includes(state._id) 
                            ? 
                                <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                            :
                                <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
                            }
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return(
                                            <h6 key={record._id}><span style={{fontweight:"500"}}>{record.postedBy.name }</span>{record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder='add a comment'></input>
                                </form>
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