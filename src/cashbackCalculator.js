module.exports = {
  calculateCashback: function(totalValue){
    return totalValue * this.getPercentage(totalValue) / 100
  },

  getPercentage: function(totalValue){
    return(
      totalValue < 1000 ? 10 :
      totalValue < 1500 ? 15 :
      20
    )
  }
}