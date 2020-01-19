import React from 'react';
import './HomeCanvas.css';
import testAnim from '../animations/three_of_a_kind_test';
import {isMobile, isMobileOnly} from 'react-device-detect';
import axios from 'axios';
import {API_BASE_URL} from '../src/config';
export default class HomeCanvas extends React.Component {

	constructor (props) {
		super(props)
	}
	componentDidMount () {
		let x = testAnim();
		//console.log(testAnim)
		x.init()
	}

	render () {
		return (
		<div>
		<div id='threeOfAKindCanvas'></div>
		</div>
		)
			
		
	}
}