(async () => {
  const database = require('../config/db')
  const Reseller = require('../models/Reseller')

  try {
      const resultado = await database.sync();
      console.log("Database Ready!");
  } catch (error) {
      console.log(error);
  }
})();