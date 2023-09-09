import React from 'react';

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Board from "../components/board/Board";
import './HomePage.css'

function HomePage(props) {
    return (
        <div className='homePage'>
            <NavBar />
            <div className="homePage-content">
                <div className="board">
                    <Board />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;