import {Link} from 'react-router-dom'
import './index.css'
import { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [success, setSuccess] = useState("")
    //const navigate = useNavigate()
    
    //const sendData = {username, phonenumber, password}



    const onSubmitForm = async(e) => {
        e.preventDefault()
        if(username === "" || password === ""){
            setErr("*Please Fill Username and Password")
        }else{
            const url = 'http://localhost:5001/register'
        const options = {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                  username,
                  password
            })
        }
        const sendData =await fetch(url, options)
        const data = await sendData.json()
        if(sendData.ok){
            setSuccess("*User Registerd Successfully Click on Login")
        }else{
            console.log(data)
            setErr(data)
        }
        
        }
        
    }


    return(
        <div className = 'login'>
            <form className = "form" onSubmit={onSubmitForm}>
                    <div>
                    <h1 className = 'register'>Register</h1>
                    <div className='input-container'>
                    <label className='label'>Username</label><br />
                    <input placeholder='Username' className='input' value={username} type = 'text' onChange = {(e) => {setUsername(e.target.value); setErr(""); setSuccess("")}}/>
                    </div>
                    <div className='input-container'>
                    <label className='label'>Password</label><br />
                    <input placeholder='Password' value={password} className='input' type = 'password' onChange={(e) => {setPassword(e.target.value); setErr(''); setSuccess("")}}/>
                    </div>
                    <div className='butttonaa'>
                    <button className='submit-button' type='submit'>Register</button>
                    <Link to = '/'><button className='submit-button' type='button'>Login</button></Link>
                    </div>
                    <p className='err'>{err}</p>
                    <p className='success'>{success}</p>
                    </div>   
            </form> 
        </div>
    )    
}

export default Register
