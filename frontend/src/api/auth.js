import axiosInstance from "./axiosInstance"

export const login = (credentials) =>{
    return axiosInstance.post("/auth/login", credentials)
}

export const signup = (userData) =>{
    return axiosInstance("/auth/signup", userData)
}