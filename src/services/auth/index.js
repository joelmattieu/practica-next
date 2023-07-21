import axios from "axios"

export const postRegister = async (data) => {

    const response = await axios.post('http://localhost:8000/auth/', data)

    return response.data

}

export const postLogin = async (loginParams) => {

    const params = new URLSearchParams(loginParams)

    return await axios.post('http://localhost:8000/auth/token', params)



}