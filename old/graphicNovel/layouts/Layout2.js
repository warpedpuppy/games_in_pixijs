import React from 'react';
import './Layout2.css';
import Square from '../Square';
export default class Layout2 extends React.Component{
    render () {
        return (
            <div className='layout layout-2'>
                <div className="block-division">
                    <Square  w={600} h={300}/>
                    <Square  w={600} h={300}/>
                </div>
                <div className="block-division">
                    <div>
                        <div>
                            <Square  w={150} h={150}/>
                            <Square  w={150} h={150}/>
                            <Square  w={150} h={150}/>
                            <Square  w={150} h={150}/>
                            <Square  w={300} h={300}/>
                        </div>
                        <div>
                        <Square  w={300} h={600}/>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}