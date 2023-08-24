import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

import SocialIconLink from './SocialIconLink';

function Footer() {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <span className="mb-3 mb-md-0 text-muted">© 2023 Przemyslaw Pisaniak</span>
            </div>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <SocialIconLink Icon={FaEnvelope} href="mailto:przpisaniak@gmail.com" />
                <SocialIconLink Icon={FaGithub} href="https://github.com/pprzemek56" />
                <SocialIconLink Icon={FaLinkedin} href="https://www.linkedin.com/in/przemys%C5%82aw-pisaniak/" />
            </ul>
        </footer>
    );
}

export default Footer;
