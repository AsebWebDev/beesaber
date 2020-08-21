import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  // ===========
  // AUTH 
  // ===========

  isLoggedIn() {
    return localStorage.getItem('user') != null           // app will consider user as logged in, when User exists in local Storage
  },

  isAdmin() {
    const user = localStorage.getItem('user');
    return (user !== null && user !== "null" ) 
      ? JSON.parse(user).isAdmin  // if yes, check if admin
      : false                     // if not, return false
  },

  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  login(username, password) {
    return service
      .post('/login', { username, password })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  googleLogin(googleId, username, profilePic) {
    return service
      .post('/googlelogin', { googleId, username, profilePic })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  // ===========
  // USER 
  // ===========

  getUserSettings(userId) {
    return service
      .get('/user/' + userId + '/settings')
      .then(res => res.data)
      .catch(errHandler)
  },

  getUserData(userId) {
    return service
      .get('/user/' + userId)
      .then(res => res.data)
      .catch(errHandler)
  },

  saveUserData(userId, userdata) {
    return service
      .post('/user/' + userId, userdata)
      .then(res => res.data)
      .catch(errHandler)
  },

  saveUserSettings(userId, settings, settingType) {
    return service
      .post('/user/' + userId + '/settings', settings)
      .then(res => res.data)
      .catch(errHandler)
  },


  // ==========
  // Scores
  // ==========

  async getScores(currentID, sorting='recent') {
    let scores = []
    const fetchData = async () => {
      let count = 1;
      let noResult = false
      while (!noResult) {
        await axios('https://new.scoresaber.com/api/player/'+ currentID +'/scores/'+sorting+'/'+ count++, { validateStatus: false })
          .then(scoreReply => {
            if (scoreReply.status === 404 || scoreReply.status === 429 || scoreReply.status === 422)  {
              noResult = true;
              return scores
            }
            else scores.push(...scoreReply.data.scores)
          })
      }; 
    }

    await fetchData()
    return scores
  },

  async getlatestScore(currentID) {
    let score = null
    const fetchData = async () => {
        await axios('https://new.scoresaber.com/api/player/'+ currentID +'/scores/recent/1', { validateStatus: false })
          .then(scoreReply => {
            if (scoreReply.status === 404 || scoreReply.status === 429 || scoreReply.status === 422)  {
              return score
            }
            else score = scoreReply.data.scores[0]
          })
    }

    await fetchData()
    return score
  },

  async dataUpdateNeeded(currentData, currentID) {
    let latestFetchedScore = null

    const fetchData = async () => {
        await axios('https://new.scoresaber.com/api/player/'+ currentID +'/scores/recent/1', { validateStatus: false })
          .then(scoreReply => {
            if (scoreReply.status === 404 || scoreReply.status === 429 || scoreReply.status === 422)  {
              return null
            }
            else latestFetchedScore = scoreReply.data.scores[0]
          })
    }

    await fetchData()
    return (latestFetchedScore.timeSet !== currentData.timeSet)
  } 
}

