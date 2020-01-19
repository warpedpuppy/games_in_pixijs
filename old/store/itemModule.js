import React from 'react';
import './itemModule.css';

export default class ItemModule extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			disabled: false
		}
	}
	onClickHandler(e){
		e.preventDefault();
		this.setState({disabled: true})
		this.props.purchase(this.props.price, this.props.name, this.props.image)
	}
	
	render () {
		let purchased = (this.props.owned === 'true')?'this is owned':
		<button disabled={this.state.disabled} onClick={(e) => this.onClickHandler(e)}>buy product</button>;


		return (
			<div className="itemModule col-3">
			<h3>{this.props.name}</h3>
			<img src={this.props.image} alt={this.props.name}/>
			<div>price: {this.props.price}</div>
			<div>owned: {this.props.owned}</div>
			{purchased}
			</div>
			)
	}
}