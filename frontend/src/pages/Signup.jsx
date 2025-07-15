import { useState } from "react"
import { signup } from "../api/auth"

const Signup = () => {
    const [formData, setFormData] = useState({
        username : "",
        email : "",
        password : ""
    })

    const handleChange = (e)=>{
        const {name , value} = e.target 
        setFormData(prev => ({
            ...prev ,
            [name] : value
        }))
    }
    

    const handleSubmit = async(e)=> {
        e.preventDefault()
        try {
            const res = await signup(formData)
            console.log("signup successful", res);
            const token = res.data.token 
            localStorage.setItem("token",token)
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={handleChange} 
            />
            <input 
            type="text"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange} 
            />
            <input 
            type="text"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange} 
            />
            <button type="submit">Signup</button>
        </form>
    </div>
  )
}

export default Signup