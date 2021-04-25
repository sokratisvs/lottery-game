import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import AvatarImage from '../../assets/avatar.png';
import "./NavBar.scss";

const NavBar = () => {

    const { appUser, logout } = useAuth();
    const history = useHistory();
    const [error, setError] = useState('')
    const [hover, setHover] = useState(false)

    if (!appUser) {
        history.push("/login")
        return null;
    }

    const handleLogout = async () => {
        try {
            await logout();
            history.push('/login');
        } catch {
            setError('Filed to logout');
        }
    }

    const onMouseEnterHandler = () => {
        setHover(true)
    };

    const onMouseLeaveHandler = () => {
        setHover(false)
    };

    return (
        <div className="navbar">
            <ul>
                <NavLink className="navbar__link" exact={true} activeClassName='navbar__link--active' to='/'>Home</NavLink>
                <NavLink className="navbar__link" activeClassName='navbar__link--active' to='/draw'>Draw Page</NavLink>
            </ul>
            <div className="navbar__profile">
                <img src={AvatarImage} alt="Avatar" className="profile__logo" />
                <button onClick={handleLogout}>
                    Log out
                </button>
            </div>

        </div>
    );

}

export default NavBar;