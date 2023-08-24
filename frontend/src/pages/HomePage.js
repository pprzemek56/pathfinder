import React from 'react';

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import './HomePage.css'

function HomePage(props) {
    return (
        <div className='homePage'>
            <NavBar />
            <div className="homePage-content">
                <div className="board">
                    <canvas id="game_canvas" width="1272" height="2500"></canvas>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;