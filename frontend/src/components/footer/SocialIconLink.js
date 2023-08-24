import React from 'react';

function SocialIconLink({ Icon, href }) {
    return (
        <li className="ms-3">
            <a className="text-muted" href={href} target="_blank" rel="noopener noreferrer">
                <Icon />
            </a>
        </li>
    );
}

export default SocialIconLink;