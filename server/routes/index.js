const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares')
const router = express.Router();
const mongoose = require('mongoose');

// EXAMPLE
// router.post('/checkheart', (req, res, next) => {
//   const GroupModel = mongoose.model(req.body.type)
//   GroupModel.findById(req.body.targetId)
//       .then(foundGroupModel => {
//         let likedSessions = foundGroupModel.likedSessions;      // array with sessionIDs that already did a like 
//         let indexOfId = likedSessions.indexOf(req.sessionID);   // get the Index of Session ID. -1 = not found
//         (indexOfId !== -1) ? res.json(true) : res.json(false)   // already liked = return true, not liked yet = return false
//       }).catch(err => next(err))
// });

module.exports = router;