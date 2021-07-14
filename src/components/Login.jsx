import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom'
import LoginContext from './context/LoginContext'

export default function Login() {
    
 const context = useContext(LoginContext);
 const history = useHistory();

 const Login =()=>{
     console.log(context);
     context.changeLogin(true);
     console.log(context.Login);
     localStorage.setItem("session" , true)
     history.push("/");
 }
    return (
        <div>
            <h1>Login here</h1>
            <button   className="btn btn-dark"  onClick={Login}  > Login </button>
        </div>
    );
    }