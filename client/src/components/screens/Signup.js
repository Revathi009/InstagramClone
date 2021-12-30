import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css'

const SignIn = ()=>{
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const PostData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email", classes:"#c62828 red darken-3"})
            return
        }
            fetch("/signup", {
            method:"post",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#b71c1c red darken-4"})
            }
            else{
                M.toast({html:data.message, classes: "#2e7d32 green darken-3"})
                navigate('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className='mycard'>
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder='email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #6a1b9a purple darken-3" onClick={()=>PostData()}>
                    SignUP
                </button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    );
}

export default SignIn