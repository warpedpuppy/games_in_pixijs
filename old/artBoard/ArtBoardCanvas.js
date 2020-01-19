import React from 'react';
import './ArtBoardCanvas.css';
import * as PIXI from 'pixi.js'
import Utils from '../../animations/utils'
import {connect} from 'react-redux';
import art_board_js from '../../animations/art_board_canvas'
import { SketchPicker } from 'react-color';
class ArtBoardCanvas extends React.Component {
	
	constructor(props){
		super(props);
		this.art_board = {};
		this.state = {
		    background: '#fff',
		    panelVisible: false,
		    panelButtonText: "see panel"
		  };
	}
	componentDidMount () {
		this.art_board = art_board_js(Utils, PIXI);
		this.art_board.init();
	}
	componentWillUnmount () {
		this.art_board.stop();
	}
	
	render () {
		let panelClass = (this.state.panelVisible)?"show":"hide";
		return (	
			<div className="cont">
			<div 
			id="art_board_canvas" 
			></div>
			<SketchPicker 
				className={panelClass}
        		color={ this.state.background }
        		onChangeComplete={ this.handleChangeComplete }
        		/>
        		<button className="button" onClick={ e => this.seePanel() }>{this.state.panelButtonText}</button>
			</div>
		)
	}
	
}



export default connect()(ArtBoardCanvas);
