import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./components/Register"
import Account from "./components/Account"
import Login from "./components/Login"
import { LoginConsumer } from "./components/context/LoginContext";
import home from "./home";

export const routing = (
  <BrowserRouter>
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <Link className="navbar-brand" to="/home">
        Student
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            {    
            <LoginConsumer>
                {(loginInfo)=>{
                    if(loginInfo.Login){
                        return(
                            <>
                     
          <li className="nav-item">
            <Link className="nav-link" to="/Register">
             Register
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link " to="/Account">
              Account
            </Link>
         
          </li>
                            
          <li className="nav-item active">
          <p
                          className="nav-link"
                          onClick={() => {
                            loginInfo.logout();
                            window.location.pathname="/login";
                          }}
                        >
                          Logout
                        </p>
          </li>                                       
                            </>

                        );
                    }else{
                        return(   
                            <li className="nav-item">
                    <Link className="nav-link " to="/LogIn">
                  Login
                 </Link>
                  </li>
                            
                        )
                    }
                }
                }
            </LoginConsumer>
         }
          
        </ul>
      </div>
    </nav>
    <Switch>
     
      <Route path="/Login" component={Login} />
      <Route path="/Register" component={Register}  />
      <Route path="/Account" component={Account} />
      <Route path="/Home" component={home} />

    </Switch>
   
  </BrowserRouter>
);
