(async () => {
  const database = require('../config/db')

  try {
      await database.sync()
      console.log("Database Ready!")
  } catch (error) {
      console.log(error)
  }
})();