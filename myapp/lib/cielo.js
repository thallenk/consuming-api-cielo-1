const fetch = require('node-fetch');


class Cielo {
    static compra(params){ 
        return fetch('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
                method: 'post',
                body:    JSON.stringify(params),
                headers: { 
                    'Content-Type': 'application/json', 
                    'MerchantId': 'ab1d6d33-eb6d-421d-9913-fc5ece695df5',
                    'MerchantKey': 'HRUCJXXPZQYBAALQMRJFDBFVHVSBRSPPFHGWIEAC'},
            })
            //Dessa forma, ainda está retornando um promise, por isso precisamos tratá-la no arquivo de compras
            .then(res => res.json())
    }
    static captura(PaymentId){ 
        return fetch(`https://apisandbox.cieloecommerce.cielo.com.br/1/sales/${PaymentId}/capture`, {
                method: 'put',
                headers: { 
                    'Content-Type': 'application/json', 
                    'MerchantId': 'ab1d6d33-eb6d-421d-9913-fc5ece695df5',
                    'MerchantKey': 'HRUCJXXPZQYBAALQMRJFDBFVHVSBRSPPFHGWIEAC'},
            })
            //Dessa forma, ainda está retornando um promise, por isso precisamos tratá-la no arquivo de compras
            .then(res => res.json())
        }
}

module.exports = Cielo;