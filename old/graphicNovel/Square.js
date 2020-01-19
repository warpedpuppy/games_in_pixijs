import React from 'react';
import './Square.css';

export default function Square (props){
    var divStyle = {
        width: props.w,
        height: props.h
      };
    return (
        <div className="square" style={divStyle}>
            <div className="square-outer">
                <div className="square-inner"></div>
            </div>
        </div>
    )
}