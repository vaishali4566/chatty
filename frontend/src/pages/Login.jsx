import { useState } from "react"
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    const handleChange = (e) =>{
        setFormData(prev => {
            
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()


    }
  return (
    <div>
        <form>
            <h1>Login</h1>
            <input type="text"
            placeholder="Email"
            value={formData.email}

            />
            <input type="password" 
            placeholder="Password"
            value={formData.password}
            />

            <button>Log in</button>
        </form>
    </div>
  )
}

export default Login