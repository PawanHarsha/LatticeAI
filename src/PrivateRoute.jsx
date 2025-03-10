import { Navigate } from "react-router-dom";


export const PrivateRoute = ({ children }) => {
 // const navigate = useNavigate()
  console.log("trying to private reroute")
  if (sessionStorage.getItem('loggedin')){
    return children
  }else {
    console.log("session logged out, signingin")
    return (<Navigate to='/signin'/>)
  };
};

export default PrivateRoute;

