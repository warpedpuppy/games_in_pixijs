import React from 'react';
import './sideMenu.css';

export default class SideMenu extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			open: false
		}
	}
	toggleMenu () {
		this.setState({open: !this.state.open})
		this.props.toggleAction();
	}
	buttonClickHandler (e) {
		this.toggleMenu();
		this.props.changeState(e)
	}
	render () {

		let className = (this.state.open)?"buttonDivCont":"buttonDivCont hideMenu";
		return (
			<div className="sideMenuFlexContainer">
				<div className={ className }>
					<button className="toggleSideMenu" onClick={ () => this.toggleMenu() }>
						<div className="arrow"></div>
					</button>
					<div className="homeMenuButtonDiv" >
						
						<button className="homeMenuButton">
							<div></div>
							<span onClick={ e => this.buttonClickHandler(e)}>fly</span>
						</button>
						<button className="homeMenuButton" onClick={ e => this.buttonClickHandler(e)}><div></div><span>swim</span></button>
						<button className="homeMenuButton" onClick={ e => this.buttonClickHandler(e)}><div></div><span>jump</span></button>
						{/* <button className="homeMenuButton" onClick={ e => this.buttonClickHandler(e)}><div></div><span>all three</span></button>*/}
					</div>
				</div>
			</div>
			)
	}
}