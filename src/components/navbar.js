import {Link, useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';


export const Navbar = () => {
    const [cookie, setCookie] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
    setCookie("access_token","");
    window.localStorage.removeItem("UserID");
    navigate('/auth');
}

    return <div className='navbar'>
        <Link to="/">Home</Link>
        <Link to="/create-recipie">Create Recipie</Link>
      
        {!cookie.access_token ? ( <Link to="/auth">Login/Register</Link>) : (<>   <Link to="/saved-recipies">Saved Recipies</Link> <button onClick={logout}> Logout </button>   </>)}
    </div>
}