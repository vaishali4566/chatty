import axiosInstance from "./axiosInstance.js"

export const login = (credentials) =>{
    return axiosInstance.post("/auth/login", credentials)
}

export const signup = (userData) =>{
    return axiosInstance.post("/auth/signup", userData)
}
