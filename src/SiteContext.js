import React from 'react'

const SiteContext = React.createContext({
  loggedIn: undefined,
  mazes: [],
  ids: [],
  game: '',
  activeMazeId: undefined,
  inGameMazeEdit: false,
  mazeGameAction: true
})

export default SiteContext
