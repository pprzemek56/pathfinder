import React from 'react';
import './NavLink.css';

function NavLink({ id, label, isLogo = false }) {

    const handleClick = () => {
        console.log(`${label} Clicked`);
    };

    return (
        <li className={`nav-item ${isLogo ? 'logo-item' : ''}`}>
            <a className={`nav-link ${isLogo ? 'logo-link' : ''}`} href="#" id={id} onClick={handleClick}>{label}</a>
        </li>
    );
}

export default NavLink;
