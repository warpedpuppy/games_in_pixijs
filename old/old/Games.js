import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

export default class Home extends React.Component {
    render () {
        return (
            <div className="gamesPage general-page-layout">
                <h1>games</h1>
                <ul>
                <li><Link to='/jump-game'>jump game</Link></li>
                <li><Link to='/fly-game'>fly game</Link></li>
                <li><Link to='/swim-game'>swim game</Link></li>
                </ul>
            </div>
        )
    }
}