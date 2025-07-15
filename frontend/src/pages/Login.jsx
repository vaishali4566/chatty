import { useState } from "react"
import {useNavigate} from "react-router-dom"
import {login} from "../api/auth"

const Login = () => {
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    const handleChange = (e) =>{
        const {name , value} =  e.target
        setFormData(prev => ({
            ...prev, 
            [name] : value
        }))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const res = await login(formData)
            console.log("Login successful",res);
            const token = res.data.token
            localStorage.setItem("token", token)
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}

            />
            <input type="password" 
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            />

            <button type="submit">Log in</button>
        </form>
    </div>
  )
}

export default Login