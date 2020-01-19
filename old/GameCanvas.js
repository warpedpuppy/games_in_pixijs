import React from 'react';
import './GameCanvas.css';
import game_code from '../animations/game_animation';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_BASE_URL} from '../src/config';
import faker from 'faker';

class GameCanvas extends React.Component {
	constructor(props){
		super(props);
		this.game = {};
		this.getUserData = this.getUserData.bind(this);
		this.state = {
		    background: '#fff',
		    panelVisible: false,
		    panelButtonText: "see panel",
		    filterTest: "off"
		  };
	}
	getUserName () {
		return faker.name.firstName();
	}
	getUserData () {
		let that = this;
		return axios.get(`${API_BASE_URL}/api/users`)
		  .then(function(response){
		  	that.startGame(response.data);
		  })
		  .catch((err) => {
		  	console.log(err)
		  });  
	}
	componentWillMount () {
		this.getUserData();
		console.log("GET USER DATA")
	}
	startGame(data){

		if(this.props.testMode){ 
			// change data to non database
			data = {users: [{
				username: this.props.username,
				firstName: this.props.firstName,
				lastName: this.props.lastName,
				email: this.props.email,
				items: this.props.items
			}]}
		}
		data.items = this.props.items;
		// console.log('data = ', data)
		this.game = game_code(data, this.getUserName, this.props.username);
		this.game.init();
		//this.game.update(this.props.items);
		this.editMode = this.props.editMode;
		
	}
	componentWillUnmount(){
		if(this.game.stop)this.game.stop();
	}
	componentDidUpdate(){
		this.game.changeColor(this.props.color);
		// console.log('this is the color'+this.props.color);
		//console.log('edit mode = '+this.props.editMode.toString())

		if(this.editMode !== this.props.editMode){
			this.game.editMode(this.props.editMode);
			this.editMode = this.props.editMode;
		}

		
	}
	switchPlayer () {
		this.game.switchPlayer();
	}
	testFilter () {
		this.game.filterTest();
		if(this.state.filterTest === "off") {
			this.setState({filterTest: "on"})
		} else { 
			this.setState({filterTest: "off"})
		}
	}
	render () {
		return (
			<div>
			<div id='game_canvas'></div>
			
			<div className="testPanel">
			<button onClick={() => this.switchPlayer()}>switch player</button>
			<button onClick={() => this.testFilter()}>filter test is {this.state.filterTest}</button>
			</div>
		
			</div>
		)
	}
	
}

export const mapStateToProps = state => ({
    items: state.avatarReducer.items,
    color: state.themeReducer.color,
    editMode: state.themeReducer.editMode,
    testMode: state.tokenReducer.testMode,
    username: state.tokenReducer.username,
    firstName: state.tokenReducer.firstName,
    lastName: state.tokenReducer.lastName,
    email: state.tokenReducer.email
});

export default connect(mapStateToProps)(GameCanvas);
