import React from 'react';
import './NavLink.css';

function NavLink({ id, label, isLogo = false, onClick, isRunning }) {

    const handleClick = () => {
        if (onClick) onClick();
    };

    return (
        <li className={`nav-item ${isLogo ? 'logo-item' : ''}`}>
            <button className={`nav-link ${isLogo ? 'logo-link' : ''}`} id={id} disabled={isRunning} onClick={handleClick}>{label} </button>
        </li>
    );
}

export default NavLink;
