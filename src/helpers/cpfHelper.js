const cpfHelper = {
  normalizeCpf: function(cpf){
    return cpf.replace(/[^0-9]/g, '')
  }
}

module.exports = cpfHelper