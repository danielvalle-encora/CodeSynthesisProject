import { useState } from "react"

export default function UseToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem("token")!
        const userToken = JSON.parse(tokenString)
     
        return userToken
    }
    
    const [token, setToken] = useState(getToken())

    const saveToken = (userToken:string) => {
        sessionStorage.setItem("token", JSON.stringify(userToken))
        setToken(userToken)
    }

    return {
        setToken: saveToken,
        token
    }
}