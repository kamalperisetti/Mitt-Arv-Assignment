import {Link, useNavigate} from 'react-router-dom'
import './index.css'
import {useState} from 'react'
import Cookies from 'js-cookie'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState("")
    
    const navigate = useNavigate()

    const onCheckingUser = async(e) => {
        e.preventDefault()
        if(username === "" || password === ""){
            setErr("*Please Enter Username and Password")
        }
        else{
            const url = "https://mitt-arv-assignment-fnbl.onrender.com/login" 
            const options = {
                method:"POST",
                headers:{
                    "Content-type": "Application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
            try{
                const response = await fetch(url, options)
                const data = await response.json()
                if(response.ok){
                    Cookies.set('jwt_token', data.jwtToken)
                    navigate("/home")                
                }else{
                    console.log(data.error)
                    setErr(data.error)
                }
            }catch(e){
                console.log(e.message)
            }
        }
           
    }

    return(
    <div className = 'login'>
        
            <form className = "form" onSubmit={onCheckingUser}>
            <h1 className = 'register'>Login</h1>
                <div className='input-container'>
                <label className='label'>Username</label><br />
                <input placeholder='Username' className='input' type = 'text' onChange={(e) => {setUsername(e.target.value); setErr("")}} />
                </div>
                <div className='input-container'>
                <label className='label'>Password</label><br />
                <input placeholder='Password' value={password} className='input' type = 'password' onChange={(e) => {setPassword(e.target.value); setErr("")}}/>
                </div>
                <div>
                <button className='submit-button' type='submit'>Login</button>
                <Link to = '/register'><button className='submit-button' type='submit'>Register</button></Link>
                </div>
                <p className='err'>{err}</p>
            </form>
  
    </div>
    )
    
}

export default Login