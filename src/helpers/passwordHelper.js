const bcrypt = require('bcrypt')

const passwordSalt = {
  genSaltSync: function() {
    const saltRounds = 10
    return bcrypt.genSaltSync(saltRounds)
  }
}

const passwordHelper = {
  encrypt: function(password){
    return bcrypt.hashSync(password, passwordSalt.genSaltSync())
  },

  isValid: function(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword);
  }
}

module.exports = passwordHelper