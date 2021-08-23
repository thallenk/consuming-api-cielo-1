var express = require('express');
var router = express.Router();
var cielo = require('./../lib/cielo')

/* Post criação de compra */
router.post('/', function(req, res, next) {

  cielo.compra(req.body).then((result)=>{

    // res.send(result)
  cielo.captura(result.Payment.PaymentId).then((result)=>{
    if(result.Status == 2){
      res.status(201).send({
        "Status": "Sucesso",
        "Message": "Compra realizada com sucesso"
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
  res.send('Rodando status..');

});

module.exports = router;
