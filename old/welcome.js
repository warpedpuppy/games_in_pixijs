import React from 'react';
import './welcome.css';


export default function Welcome (props) {	
		let classAddOn = (props.isMobileOnly)? "welcomeDivOuter mobileOnlyWelcome" : "welcomeDivOuter";
		return (
		<div className={classAddOn}>
		<div className="welcomeDiv">
			<p>welcome.</p>
			<img src="/bmps/welcomeArrow.png" alt="left pointing arrow" />
		</div>
		</div>
		)
}

