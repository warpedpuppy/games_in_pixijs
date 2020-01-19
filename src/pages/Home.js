import React from 'react'
import './Home.css'
import HomeButtons from '../animations/homeAnimations/home_buttons'

export default class Home extends React.Component {


  componentDidMount () {
    this.home_buttons = HomeButtons(this.showButtons)
    this.home_buttons.init()
  }
  showButtons () {
    document.getElementById('home_page').style.display = "block";
  }

  componentWillUnmount () {
    this.home_buttons.stop()
  }

  gotoGame = (e, game) => {
    e.preventDefault();
    const { history } = this.props;
    history.push(game);
  }

  keyHitHandler = (e, game) => {
    if (e.key === 'Enter') {
      this.gotoGame(game)
    }
  }

  render () {
    return (
      <div className="general-page-layout" id="home_page">

        <div className="home-page-buttons">

          <div
            id="tab_1"
            tabIndex="0"
            role="button"
            aria-controls="tabpanel_1"
            className="home-button-cont"
            onKeyPress={(e) => this.keyHitHandler(e, 'fly-game')}
            onClick={(e) => this.gotoGame(e, 'fly-game')}
          >
            <div className="gameShell fly" id="fly-home" />
            <div className="screen" />
          </div>

          <div
            id="tab_2"
            tabIndex="0"
            role="button"
            aria-controls="tabpanel_2"
            className="home-button-cont"
            onKeyPress={(e) => this.keyHitHandler(e, 'jump-game')}
            onClick={(e) => this.gotoGame(e, 'jump-game')}
          >
            <div className="gameShell jump" id="jump-home" />
            <div className="screen" />
          </div>

          <div
            id="tab_3"
            tabIndex="0"
            role="button"
            aria-controls="tabpanel_3"
            className="home-button-cont"
            onKeyPress={(e) => this.keyHitHandler(e, 'swim-game')}
            onClick={(e) => this.gotoGame(e, 'swim-game')}
          >
            <div className="gameShell swim" id="swim-home" />
            <div className="screen" />
          </div>

        </div>
      </div>
    )
  }
}
