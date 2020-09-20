function isLoggedIn(req, res, next) {
    // console.log("isLoggedIn ->  req.user",  req.user)
    // if (req.isAuthenticated()) next()
    // else next({ status: 403, message: 'Unauthorized' })
    //FIXME: protect routes 
    next()
  }
  
  function isAdmin(req, res, next) {  
    if (req.user.isAdmin) next()
    else next({ status: 403, message: 'Unauthorized. No Admin' })
  }
  
  module.exports = {
    isLoggedIn,
    isAdmin
  }