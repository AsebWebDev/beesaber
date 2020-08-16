const express = require('express');
const router = express.Router();
const {isAdmin} = require('../middlewares')

router.get('/', (req, res, next) => {
    console.log("hit")
    // let a = { message: true }
    // console.log(a)
    // // console.log('res: ', res)
    res.send("franzi")
    next
});

module.exports = router;