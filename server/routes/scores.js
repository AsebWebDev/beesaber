const express = require('express');
const router = express.Router();
const {isAdmin} = require('../middlewares')

router.get('/', (req, res, next) => {
    console.log("route Scores hit!")
});

module.exports = router;