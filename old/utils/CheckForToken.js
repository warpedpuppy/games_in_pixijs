import React from 'react';
import { Redirect } from 'react-router-dom';
export default class CheckForToken extends React.Component {

	constructor(props){
		super(props);
		this.state = ({
			redirect:false
		})
	}
	componentDidMount () {
		if(!localStorage.getItem('token')) {
			this.setState({redirect:true})
		}
	}
	render () {
		let redirect = (this.state.redirect && window.location.pathname !== '/')?<Redirect to="/" />:'';
		return (<span>{redirect}</span>)
	}

}