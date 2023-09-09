import React from 'react';
import './NavLink.css';

function NavLink({ id, label, isLogo = false }) {

    const handleClick = () => {
        console.log(`${label} Clicked`);
    };

    return (
        <li className={`nav-item ${isLogo ? 'logo-item' : ''}`}>
            <button className={`nav-link ${isLogo ? 'logo-link' : ''}`} href="#" id={id} onClick={handleClick}>{label}</button>
        </li>
    );
}

export default NavLink;
