import { setCurrentUser } from '@/store/currentUser';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import axios from 'axios';
import { useState } from 'react';

export default function useLogin() {

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
            console.log(response.data.token)   
            dispatch(setCurrentUser({ email: email, token: response.data.token })) 
        })
        .catch(function(err){
            console.log("def");
            setMessage(err.response.data.message)   
            setStatus(false)
        })
    }

    return {status, message, email, token, login}
}