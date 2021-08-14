const express = require('express');
const cashbackCalculator = require('./cashbackCalculator');
const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'Server UP' }));

app.get('/calculateCashback/:totalValue', (req, res) => {
  const totalValue = parseInt(req.params.totalValue);
  res.json(
    {
      cashbackValue: cashbackCalculator.calculateCashback(totalValue),
      cashbackPercentage: cashbackCalculator.getPercentage(totalValue)
    });
})

if (require.main === module) {
  app.listen(port);
  console.log('API is listening on port ' + port);
}

module.exports = app