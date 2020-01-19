import React from 'react';
import './Home.css';
import HomeCanvas from '../HomeCanvas';
import CanvasJump from '../../src/components/canvasJump';
import CanvasFly from '../../src/components/canvasFly';
import CanvasSwim from '../../src/components/canvasSwim';
import SideMenu from '../sideMenu';
import Welcome from '../welcome';
import { connect } from 'react-redux';
import {isMobileOnly} from 'react-device-detect';
class Home extends React.Component {

	constructor (props) {
		super(props);
		this.closeGame = this.closeGame.bind(this);
		this.changeState = this.changeState.bind(this);
		this.toggleAction = this.toggleAction.bind(this);
		this.state = {
			active: 'fly',
			action: true
		}
	}
	toggleAction () {
		this.setState({action: !this.state.action})
	}
	componentDidMount () {
		this.props.pageChange();
	}
	changeState (e) {
		e.preventDefault();
		this.setState({active: e.target.innerHTML})

		//destroy game instance
		
	}
	closeGame () {
		this.setState({active: undefined})
	}

	render () {

		let activeCanvas = "";
		if (this.state.active === 'home') {
			activeCanvas = <Welcome isMobileOnly={isMobileOnly}/>
		} else if(this.state.active === 'jump') {
			  activeCanvas = <CanvasJump closeGame={this.closeGame} action={this.state.action} />  
		} else if(this.state.active === 'fly') {
			  activeCanvas = <CanvasFly  closeGame={this.closeGame} action={this.state.action}  />
		} else if(this.state.active === 'swim') {
			  activeCanvas = <CanvasSwim  closeGame={this.closeGame} action={this.state.action} />
		} else if(this.state.active === 'all three') {
			  activeCanvas = <HomeCanvas  closeGame={this.closeGame} action={this.state.action} />
		}

		let sideMenuVar =  <SideMenu changeState={this.changeState} toggleAction={this.toggleAction}/>;

		return (
			<div className="homeCont">
				{ sideMenuVar }
				{ activeCanvas }
			</div>
		)
	
	}
	
}

export const mapStateToProps = state => ({
    page: state.themeReducer.page
});
export default connect(mapStateToProps)(Home);