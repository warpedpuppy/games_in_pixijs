import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer(props) {
    const arr = [['/', 'home'], ['/about', 'about'], ['/contact', 'contact']];
    const printVal = arr.map((item, index) => {
        if (item[0] !== props.page) {
            return (
                <Link key={index} to={item[0]}>
                    <span>{item[1]}</span>
                </Link>
            );
        }
        return <span key={index} />;
    });
    return (
        <footer>
            { printVal }
        </footer>
    );
}
