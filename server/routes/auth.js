const express = require("express")
// const passport = require('passport')
const router = express.Router()
const User = require("../models/User")

router.post("/googlelogin", (req, res, next) => {
  const { googleId, username, profilePic } = req.body

  User.findOne({ googleId })
    .then(userDoc => {
      if (!userDoc) {
        console.log('No user in database')
        new User({ username, googleId, profilePic }).save()
        .then((newUser) => {
            req.logIn(userDoc, () => {
              res.json(newUser)
            })
        }).catch(err => console.log(err))
      }
      if (userDoc) {
        req.logIn(userDoc, () => {
          res.json(userDoc)
        })
      }
    })
    .catch(err => next(err))
})

router.get("/logout", (req, res) => {
  req.logout()
  res.json({ message: 'You are out!' })
})

module.exports = router

// Bcrypt to encrypt passwords
// const bcrypt = require("bcrypt")
// const bcryptSalt = 10

// router.post("/login", (req, res, next) => {
//   const { username, password } = req.body

//   User.findOne({ username })
//     .then(userDoc => {
//       if (!userDoc) {
//         next(new Error("Incorrect username "))
//         return
//       }

//       if (!bcrypt.compareSync(password, userDoc.password)) {
//         next(new Error("Password is wrong"))
//         return
//       }

//       req.logIn(userDoc, () => {
//         userDoc.password = undefined
//         res.json(userDoc)
//       })
//     })
//     .catch(err => next(err))
// })

// router.post('/login-with-passport-local-strategy', (req, res, next) => {
//   passport.authenticate('local', (err, theUser, failureDetails) => {
//     if (err) {
//       res.status(500).json({ message: 'Something went wrong' })
//       return
//     }

//     if (!theUser) {
//       res.status(401).json(failureDetails)
//       return
//     }

//     req.login(theUser, (err) => {
//       if (err) {
//         res.status(500).json({ message: 'Something went wrong' })
//         return
//       }

//       res.json(req.user)
//     })
//   })(req, res, next)
// })