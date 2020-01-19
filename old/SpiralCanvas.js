import React from 'react';
//import * as THREE from 'three';
//import Utils from '../animations/utils/utils'
//import sprial_code from '../animations/utils/spiral'

export default class SpiralCanvas extends React.Component {
	constructor(props){
		super(props);
		this.spiral_anim = {};
	}
	componentDidMount(){
		//this.home_page = sprial_code(THREE, Utils);
		//this.home_page.init();
	}
	componentWillUnmount(){
		//this.home_page.Stop();
	}
	render () {
		return (
			<div>
			<div id='spiralContainer'></div>
			</div>
		)
	}
}