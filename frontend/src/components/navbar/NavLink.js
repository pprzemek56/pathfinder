import React from 'react';
import './NavLink.css'; // Make sure to import your CSS

function NavLink({ id, label }) {

    const handleClick = () => {
        console.log(`${label} Clicked`);
    };

    return (
        <li className="nav-item">
            <a className="nav-link" href="#" id={id} onClick={handleClick}>{label}</a>
        </li>
    );
}

export default NavLink;
