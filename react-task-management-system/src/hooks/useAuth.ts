import { setCurrentUser } from '@/store/currentUser';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import axios from 'axios';
import { useState } from 'react';

export default function useAuth() {

    const {email, token} = useAppSelector(state => state.currentUser)
    const dispatch = useAppDispatch()    

    const [status, setStatus] = useState(false)
    const [message, setMessage] = useState("")

    const login = (email:string, password: string) => {
    
        axios.post("/auth/login", {
            email,
            password
        }, { 
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(function(response){    
            console.log(response.data)   
            dispatch(setCurrentUser({ id: response.data.id, email: email, token: response.data.token })) 
        })
        .catch(function(err){
            setMessage(err.response.data.message)   
            setStatus(false)
        })
    }

    const logout = () => {
        dispatch(setCurrentUser({ id: "", email: "", token: "" }))
    }

    return {message, email, token, login, logout}
}