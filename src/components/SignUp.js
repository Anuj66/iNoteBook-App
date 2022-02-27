import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: "", confirmPassword: ""});
    const navigate = useNavigate()
    const url = 'http://localhost:8080/api/auth'

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${url}/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        // console.log(json)
        if(json.success){
            localStorage.setItem('jwt_token', json.jwt_token)
            navigate('/login')
            props.showAlert('Successfully Created Your Account', 'success')
        }else{
            props.showAlert('Invalid Values Provided', 'danger')
        }
    }

    return (
        <div className={"my-3"}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name={"name"} value={credentials.name} onChange={onChange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name={"email"} value={credentials.email} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name={"password"} value={credentials.password} onChange={onChange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name={"confirmPassword"} value={credentials.confirmPassword} onChange={onChange} minLength={3} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup