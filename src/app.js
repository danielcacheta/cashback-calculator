const express = require('express')
const routes = require('./routes')
const database = require('./database')
const app = express()
const port = 3000

app.use(express.json())
app.use(routes)

if (require.main === module) {
  app.listen(port)
  console.log('API is listening on port ' + port)
}

module.exports = app