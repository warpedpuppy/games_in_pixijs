import React from 'react';
import './editMode.css';
import {connect} from 'react-redux';
import { SketchPicker } from 'react-color';
import { toggleEditMode, changeColor } from '../actions/themeActions';

class EditMode extends React.Component {
	constructor(props){
		super(props);
		this.editModeHandler = this.editModeHandler.bind(this);
		this.state = {
		    background: '#fff',
		    panelVisible: false
		  };
	}
	editModeHandler (e) {
		e.preventDefault();
		this.props.dispatch(toggleEditMode(!this.props.editMode));
	}
	handleChangeComplete = (color) => {
		this.props.dispatch(changeColor(color.hex))
	}

	render () {
		let panelClass = (this.props.editMode)?"editPanel show":"editPanel hide";
		//has to be logged in and on game page
		let isGame = (window.location.pathname === '/game')?true:false;
		let isLoggedIn = (this.props.token !== 'blank')?true:false;
		let seeEdit = (isGame && isLoggedIn)?"editModeShell show":"editModeShell hide";
		console.log(isGame +" "+ isLoggedIn)

		return (
			<div className={ seeEdit }>
    		<a 
    		className="button editModeButton" 
    		onClick={ e => this.editModeHandler(e) }>edit mode {this.props.editMode.toString()}</a>
	    		<div className={panelClass}>
	    			<select>
		    			<option>board</option>
		    			<option>background</option>
	    			</select>
		    		<SketchPicker 
		        		color={ this.state.background }
		        		onChangeComplete={ this.handleChangeComplete }
		        		/>
	        	</div>
    		</div>
		)
	}
	
}

export const mapStateToProps = state => ({
    editMode: state.themeReducer.editMode,
    page: state.themeReducer.page,
    token: state.tokenReducer.token
});

export default connect(mapStateToProps)(EditMode);
