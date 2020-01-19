import React from 'react';
import './AdminItemModule.css';

export default class ItemModule extends React.Component {

	constructor (props){
		super(props)
		this.state = {
			makeActiveDisabled: false,
			deleteItemDiabled: false
		}
	}

	makeActiveHandler(e){
		e.preventDefault();
		this.setState({makeActiveDisabled: true});
		this.props.toggleActive(this.props.index, this.props.name, this.props.active, this.props.image, this);
	}
	deleteHandler(e){
		e.preventDefault();
		this.setState({deleteItemDiabled: true});
		this.props.deleteItem(this.props.index, this.props.name);
	}
	changeToActive () {
		this.setState({makeActiveDisabled: false});
	}

	render () {
	let buttonText = (this.props.active === 'true')?'make inactive':'make active';
	let activeText = (this.props.active === 'true')?'This is currently being used.':'This is not being used currently.';
	return (
		<div className="adminItemModule">
		<h1>{this.props.name}</h1>
		<img src={this.props.image} alt={this.props.name}/>
		<div>{activeText}</div>
		<button 
		disabled={this.state.makeActiveDisabled} 
		onClick={(e) => this.makeActiveHandler(e)}>{buttonText}</button>
		<button 
		disabled={this.state.deleteItemDiabled} 
		onClick={(e) => this.deleteHandler(e)}>delete this item</button>
		</div>
		)
	}
}