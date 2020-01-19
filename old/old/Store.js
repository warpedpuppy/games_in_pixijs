import React from 'react';
import ItemModule from '../../components/store/itemModule.js';
import './Store.css';
import '../components/store/floatGrid.css';
import axios from 'axios';
import {API_BASE_URL} from '../../config';
import CheckForToken from '../../components/utils/CheckForToken.js';
import { connect } from 'react-redux';
import { addItem } from '../actions/avatarActions.js';

class Store extends React.Component {

	constructor (props) {
		super(props);
		this.onPurchase = this.onPurchase.bind(this);
		this.state = {
			freeProducts: [],
			paidProducts: [],
			disableButton: false
		}
	}

	componentWillMount () {
		let that = this;
		axios
		.get(`${API_BASE_URL}/store`)
		.then(function(response){
			console.log(response)
			that.setState({
				freeProducts: response.data.products.free,
				paidProducts: response.data.products.paid
			})
		})
		.catch((err) => {
			console.error(err);
		});  
	}
	onPurchase (price, name, url){

		//make button disabled until transaction is complete
		this.setState({
			disableButton: true
		})

		if(this.props.username === "Testy") {
			let obj = {
				url: url,
				name: name,
				active: false
			}
			console.log(obj)
			this.props.dispatch(addItem(obj));
			return;
		}

		let lsToken = localStorage.getItem('token');
		let obj = { name, url, username: this.props.username };
		let that = this;
		
		axios
		.post(`${API_BASE_URL}/store/buy_accessory`, 
			obj,
			{ headers: {"Authorization" : `Bearer ${lsToken}`} })
		.then(function(response){
			//console.log("on newRecord = ", response.data.newRecord);
			//console.log("on bitmaps = ", response.data.newRecord.bitmaps);
			//response.data.newRecord.bitmaps will be array of items
			if(response.data.newRecord){
	            //console.log('items array = ', response.data.newRecord.accessories)
	            that.props.dispatch(addItem(response.data.newRecord));
	          }
		})
		.catch((err) => {
			console.error(err);
		});  
	}

	createItemModules (array) {
		let itemsPerRow = 4;
		let products = [];
		let temp = [];
		for(let index = 0; index < array.length; index ++){
			let product = array[index];
			let testIfOwned = this.props.items.find(item => {return item.url === product.imgURL});
			let owned =(testIfOwned)?'true':'false';
			temp.push(<ItemModule index={index} disabled={this.state.disableButton} key={index} name={product.name} image={product.imgURL} price={product.price} purchase={this.onPurchase} owned={owned} />
			)
			let testItemsPerRow = itemsPerRow - 1;
			if(index  % itemsPerRow === testItemsPerRow || index === array.length - 1){
				products.push(
					<div className="row" key={index}>
					{temp}
					</div>
				)
				temp = [];
			}
		}
		return products;
	}

	render () {

		let products = this.createItemModules(this.state.freeProducts);
		let paidProducts = this.createItemModules(this.state.paidProducts);
	

		return (
			<div className="storeCont">
				<CheckForToken />
				<h1>store</h1>
				<fieldset><legend>free products</legend>
				{products}
				</fieldset>
				<fieldset><legend>paid products</legend>
				{paidProducts}
				</fieldset>
			</div>
		)

	}
	
}

export const mapStateToProps = state => ({
    items: state.avatarReducer.items,
    username: state.tokenReducer.username
});

export default connect(mapStateToProps)(Store);