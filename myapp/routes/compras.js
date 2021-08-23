var express = require('express');
var router = express.Router();
var cielo = require('./../lib/cielo')

/* Post criação de compra */
router.post('/', function(req, res, next) {

  cielo.compra(req.body).then((result)=>{

    const PaymentId = result.Payment.PaymentId

  cielo.captura(PaymentId).then((result)=>{
    
    if(result.Status == 2){
      res.status(201).send({
        "Status": "Sucesso",
        "Message": "Compra realizada com sucesso",
        // Eu preciso returnar meu paymentID para poder usar na requisição de status como compra_id
        "Compra_id":PaymentId
      })
    }
    else{
      res.status(402).send({
        "Status": "Falhou",
        "Message": "Compra não realizada. Problema na cobrança do cartão de crédito."
      })
    }
    
  })
  .catch((err)=>{
    console.error(err)
  })
  })

  
});

/* GET status de compra */
router.get('/:compra_id/status', function(req, res, next) {
  cielo.consulta(req.params.compra_id)
  .then((result) => {
    let message = {}
    switch(result.Payment.Status){
      case 1:
        message = {
          'Status': 'Pagamento autorizado'
        };
        break;
      case 2:
        message = {
          'Status': 'Pagamento realizado'
        };
        break;
      case 12:
        message = {
          'Status': 'Aguardando Status de instituição financeira'
        };
        break;
      default:
        message = {
          'Status': 'Falha no pagamento'
      };
    }

  res.send(message)
  })

});

module.exports = router;
