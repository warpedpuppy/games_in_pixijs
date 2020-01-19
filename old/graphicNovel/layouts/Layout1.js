import React from 'react';
import './Layout1.css';
import Square from '../Square';
export default class Layout1 extends React.Component{
    render () {
        return (
            <div className='layout layout-1'>
                <div className="block-division">
                    <div>
                        <Square w={300} h={600}/>
                    </div>
                    <div>
                        <Square  w={300} h={300}/>
                        <Square  w={300} h={300}/>
                    </div>
                </div>
                <div className="block-division">
                    <Square  w={600} h={600}/>
                </div>
            </div>
        )
    }
}