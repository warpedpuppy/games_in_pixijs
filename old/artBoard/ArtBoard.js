import React from 'react';
import './ArtBoard.css';

import {connect} from 'react-redux';
class ArtBoard extends React.Component {
	
	mouseEnterHander () {
		// console.log('mouse enter');
	}
	mouseLeaveHandler () {
		// console.log('mouse leave');
	}
	mouseMoveHandler (e) {
		 document.getElementById('results1').innerHTML = `${e.screenX} by ${e.screenY}`;
	}
	render () {
		return (
			<div className="cont"><h1>html dots</h1>
			<div 
			onMouseEnter={this.mouseEnterHander}
			onMouseLeave={this.mouseLeaveHandler}
			onMouseMove={ e => this.mouseMoveHandler(e) } 
			className="art_board"></div>
			<div id="results1"></div>
			</div>
		)
	}
	
}



export default connect()(ArtBoard);
