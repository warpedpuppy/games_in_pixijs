import React from 'react';
import { Redirect } from 'react-router-dom';
import GameCanvas from '../../components/GameCanvas';
import { connect } from 'react-redux';
import { closeMenu, changePage } from '../actions/themeActions.js';

class Game extends React.Component {

	componentWillMount () {
		console.log('game mounting');
		this.props.dispatch(changePage());

	}
	componentDidMount(){
		this.props.dispatch(closeMenu())
	}
	renderRedirect = () => {
	    if (this.props.token === 'blank') {
	      return <Redirect to='/' />
	    }
	  }
	render () {
		return (
			<div>
			   {this.renderRedirect()}
			   <GameCanvas />
			</div>
		)
	}
	
}

export const mapStateToProps = state => ({
    menuOpen: state.themeReducer.menuOpen,
    page: state.themeReducer.page,
    token: state.tokenReducer.token
});
export default connect(mapStateToProps)(Game);