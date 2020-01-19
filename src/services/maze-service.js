import config from '../config'
import TokenService from './token-service'

const MazeService = {
  load_ids () {
    return fetch(`${config.API_ENDPOINT}/tugtug/get-grid-ids`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error)
  },
  getOneMaze (id) {
    return fetch(`${config.API_ENDPOINT}/tugtug/get-grid`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error)
  },
  loadAllMazes () {
    return fetch(`${config.API_ENDPOINT}/tugtug/all-mazes`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error)
  },
  saveMaze (data) {
    return fetch(`${config.API_ENDPOINT}/tugtug/new-maze`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ data })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          return res
        }
        return false
      })
      .catch((error) => error)
  },
  deleteMaze (id) {
    return fetch(`${config.API_ENDPOINT}/tugtug/delete-maze`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ id })
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error)
  }
}
export default MazeService
