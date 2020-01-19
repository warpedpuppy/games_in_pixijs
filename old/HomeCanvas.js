import React from 'react';
import './HomeCanvas.css';
import home_page from '../animations/allFour_animation';
import {isMobile, isMobileOnly} from 'react-device-detect';

export default class HomeCanvas extends React.Component {

	constructor (props) {
		super(props);
		this.home_page = {};
		this.testFilter = this.testFilter.bind(this);
		this.loggedInCheck = this.loggedInCheck.bind(this);
		this.state = {
			filterTest: "off",
			nightMode: "off",
			loggedIn: true,
			showStartScreen: true
		}
		
	}
	pauseGame (bool) {
		if (this.home_page.pause) {
			this.home_page.pause(bool)
		}

	}
	componentDidMount () {
		if (this.state.loggedIn) {
			this.home_page = home_page();
			this.home_page.init(isMobile, isMobileOnly);
		}
	}
	startGame = () => {
		this.setState({showStartScreen: false})
		this.home_page.startGame();
	}
	componentWillUnmount(){
		this.home_page.stop();
	}
	loggedInCheck () {
		this.setState({loggedIn:true})
		this.home_page = home_page();
		this.home_page.init(isMobile, isMobileOnly);
	}
	testFilter () {
		this.home_page.filterTest();
		if(this.state.filterTest === "off") {
			this.setState({filterTest: "on"})
		} else { 
			this.setState({filterTest: "off"})
		}
	}
	nightMode () {
		this.home_page.nightMode();
		if(this.state.nightMode === "off") {
			this.setState({nightMode: "on"})
		} else { 
			this.setState({nightMode: "off"})
		}
	}
	switchPlayer () {
		this.home_page.switchPlayer();
	}
	render () {
		this.pauseGame(this.props.action)
		let canvasClass = (isMobileOnly)?"canvasParent isMobileOnly":"canvasParent";
			return (
				<div className={canvasClass}>
					<div id='homeCanvas'></div>
				</div>

			)
	}
}