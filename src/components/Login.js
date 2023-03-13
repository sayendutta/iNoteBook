import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentials,setCredentials]=useState({email: "",password: ""});
    let navigate=useNavigate()
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSubmit=async (e)=>{
        const host="http://localhost:5000"
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              
            },
            body:JSON.stringify({email: credentials.email,password: credentials.password})
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            localStorage.setItem('token',json.authtoken);
            console.log(localStorage.getItem('token'))
            navigate("/")
            props.showAlert("Successfully Logged In","success")
          }else{
            props.showAlert("Invalid credentials","danger")
          }
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password"  className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
