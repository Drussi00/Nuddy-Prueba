import NextCors from "nextjs-cors";
import axios from "axios";
i;
export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  try {
    const id = req.query["data.id"];
    const resMercadoPago = await axios.get(
      `https://api.mercadopago.com/v1/payments/${id}?access_token=${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
    );
    console.log(resMercadoPago);
  } catch (error) {
    console.log(req.query["data.id"]);

    console.log(error);
  }

  res.status(200).json({ Ok: true });
}
