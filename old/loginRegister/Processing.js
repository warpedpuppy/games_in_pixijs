import React from 'react';
import HeaderRing from '../../svgs/HeaderRing';
import './Processing.css';

export default function Processing(props) {
    if (props.processing) {
        return (
            <div className="processingDiv" id="processingDiv">
                <div>
                    <HeaderRing w={50} topOffset={175} rotate="clockwise_fast" />
                    <HeaderRing w={100} topOffset={150} rotate="counterClockwise_fast" />
                    <HeaderRing w={150} topOffset={125} rotate="clockwise_fast" />
                    <HeaderRing w={200} topOffset={100} rotate="counterClockwise_fast" />
                    <HeaderRing w={250} topOffset={75} rotate="clockwise_fast" />
                    <HeaderRing w={300} topOffset={50} rotate="counterClockwise_fast" />
                    <HeaderRing w={350} topOffset={25} rotate="clockwise_fast" />
                    <HeaderRing w={400} topOffset={0} rotate="counterClockwise_fast" />
                </div>
                <h3>processing. . . </h3>
            </div>
        );
    }
    return (
        <div />
    );
}
