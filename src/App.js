import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import SiteContext from './SiteContext'
import Home from './pages/Home'
import Menu from './components/Menu'
import CanvasJump from './components/canvasJump'
import CanvasFly from './components/canvasFly'
import CanvasSwim from './components/canvasSwim'
import Admin from './pages/Admin'
import MazeService from './services/maze-service'
import TokenService from './services/token-service'
import NotFound from './pages/NotFound'
import LogoGraphic from './components/LogoGraphic'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: TokenService.hasAuthToken(),
      mazes: [],
      ids: [],
      game: '',
      activeMazeId: undefined,
      inGameMazeEdit: false,
      mazeGameAction: true
    }
  }

  componentDidMount () {
    MazeService.load_ids()
      .then((ids) => {
        const activeMazeId = (ids[0]) ? ids[0].id : 0
        this.setState({ ids, activeMazeId })
      })
      .catch(error => error)
  }

  setIdsAndActiveMazeId = (ids, activeMazeId) => {
    this.setState({ ids, activeMazeId })
  }

  addMazes = (mazes) => {
    if (Array.isArray(mazes)) {
      this.setState({ mazes })
    } else {
      const newMazes = [...this.state.mazes, mazes]

      this.setState({ mazes: newMazes })
    }
  }

  deleteMazes = (mazeID) => {
    this.setState({ mazes: this.state.mazes.filter((maze) => mazeID !== maze.id) })
  }

  deleteMazes = (mazeID) => {
    this.setState({ mazes: this.state.mazes.filter((maze) => mazeID !== maze.id) })
  }

  mazeGameHandler = (game) => {
    this.setState({ game })
  }

  setActiveMazeId = (activeMazeId) => {
    this.setState({ activeMazeId })
  }

  setInGameMazeEdit = (inGameMazeEdit) => {
    this.setState({ inGameMazeEdit })
  }

  setMazeGameAction = (mazeGameAction) => {
    this.setState({ mazeGameAction })
  }

  loginHandler = (loggedIn) => {
    this.setState({ loggedIn })

    if (!loggedIn) {
      TokenService.clearAuthToken()
    }
  }

  render () {
    const contextValue = {
      loggedIn: this.state.loggedIn,
      mazes: this.state.mazes,
      addMazes: this.addMazes,
      deleteMazes: this.deleteMazes,
      ids: this.state.ids,
      loginHandler: this.loginHandler,
      game: this.state.game,
      mazeGameHandler: this.mazeGameHandler,
      activeMazeId: this.state.activeMazeId,
      setActiveMazeId: this.setActiveMazeId,
      inGameMazeEdit: this.state.inGameMazeEdit,
      setInGameMazeEdit: this.setInGameMazeEdit,
      mazeGameAction: this.state.mazeGameAction,
      setMazeGameAction: this.setMazeGameAction,
      setIdsAndActiveMazeId: this.setIdsAndActiveMazeId
    }

    return (
      <SiteContext.Provider value={contextValue}>
        <React.Fragment>
          <LogoGraphic />
          <header><Menu /></header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/jump-game" component={CanvasJump} />
              <Route exact path="/fly-game" render={({ history }) => <CanvasFly history={history} />} />
              <Route exact path="/swim-game" render={({ history }) => <CanvasSwim history={history} />} />
              <Route exact path="/admin" component={Admin} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <footer />
        </React.Fragment>
      </SiteContext.Provider>
    )
  }
}
