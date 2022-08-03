const mercadopago = require("mercadopago");
// Crea un objeto de preferencia

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

module.exports = {
    mercadopago
} 