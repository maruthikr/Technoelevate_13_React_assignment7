import { useState } from "react";
import { LoginProvider } from "./components/context/LoginContext";
import { routing } from "./router";

function App() {
  const [Login, setLogin ] = useState(false);

  const logout =()=>{
    setLogin(false)
  }
  const changeLogin =()=>{
    setLogin(true)
  }

const loginInfo ={
  Login:Login,
  logout:logout,
  changeLogin:changeLogin
}


  return (
    <LoginProvider value={loginInfo}>
{routing}    
</LoginProvider>

  );
}

export default App;
