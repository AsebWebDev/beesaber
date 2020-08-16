function seedDB() {
    console.log("Seed triggered")
    const mongoose = require("mongoose");
    const User = require("../models/User");
    const bcrypt = require("bcrypt");
    const bcryptRounds = 10;

    require('../configs/database')

    let users = [
        {
          username: "admin",
          password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(bcryptRounds)),
          isAdmin: true
        },
        {
            username: "franzi",
            password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(bcryptRounds)),
            isAdmin: true
        },
        {
            username: "nina",
            password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(bcryptRounds)),
            isAdmin: true
        }
    ]

    Promise.all([User.deleteMany()])
    .then (() => User.create(users))
    .then (() => mongoose.disconnect())
    .catch(err => { mongoose.disconnect(); throw err; });
}

seedDB();

module.exports = {
    seedDB
}