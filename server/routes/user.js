const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isLoggedIn } = require('../middlewares')
const User = require("../models/User")

router.post('/:id/', isLoggedIn, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(userDoc => {  
      if (!userDoc) {
        next(new Error("Could not find user."))
        return
      } 
      res.json(userDoc)
    })
    .catch(err => next(err))
});

router.get('/:id/', isLoggedIn, (req, res, next) => {
  console.log("Get user/:id hit")
  User.findById(req.params.id)
  .then(userDoc => {  
    if (!userDoc) {
      next(new Error("Could not find user."))
      return
    } 
    res.json(userDoc)
  })
  .catch(err => next(err))
});

router.post('/:id/bee/update', isLoggedIn, (req, res, next) => {
  console.log("'/:id/bee/update' -> SET")
  console.log("params", req.params.id)

  if (req.params.id !== undefined) {
    User.findByIdAndUpdate({
      "_id": req.params.id
    }, {$set: {bees: req.body}},{safe: true, new: true})
    .then(userDoc => {  
      if (!userDoc) {
        next(new Error("Could not find user."))
        return
      } 
      res.json(userDoc)
    }).catch(err => next(err))
  } else console.log("No ID in Params")
});

router.post('/:id/bee', isLoggedIn, (req, res, next) => {
  console.log("'/:id/bee' -> PUSH")
  User.findByIdAndUpdate(req.params.id, {$push: {"bees": req.body}},{safe: true, upsert: true, new: true})
  .then(userDoc => {  
    if (!userDoc) {
      next(new Error("Could not find user."))
      return
    } 
    res.json(userDoc)
  }).catch(err => next(err))
});

// router.get('/:id/settings', isLoggedIn, (req, res, next) => {
    // User.findById(req.params.id)
    // .then(userDoc => {
    //   if (!userDoc) {
    //     next(new Error("Could not find user settings."))
    //     return
    //   } 
    //   res.json(userDoc.settings)
    // })
    // .catch(err => next(err))
// });

// router.post('/:id/settings', isLoggedIn, (req, res, next) => {
    // User.findByIdAndUpdate(req.params.id, { settings: req.body }, { new: true })
    // .then(userDoc => {
    //   if (!userDoc) {
    //     next(new Error("Could not find user settings."))
    //     return
    //   } 
    //   console.log("TCL: userDoc.settings", userDoc.settings)
    //   res.json(userDoc.settings)
    // })
    // .catch(err => next(err))
// });

module.exports = router;
