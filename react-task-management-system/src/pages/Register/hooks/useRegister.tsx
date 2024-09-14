import axios from 'axios';

export default function useRegister() {

    const register = (email: string, password: string) => {
        axios.post("/api/signup", {
            email,
            password
        }, { 
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(function(response){   
            console.log(response.data) 
            window.location.href = '/';
        })
        .catch(function(err){
            console.log(err.response.data.message)
            // setMessage(err.response.data.message)   
            // setStatus(false)
        })
    }

    return {register}
}