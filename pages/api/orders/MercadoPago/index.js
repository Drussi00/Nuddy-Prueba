import mercadopago from "../../../../utils/mercadoPago";
import nc from "next-connect";
const handler = nc();

handler.post(async(req, res) => {
    let preference = {
        items: [
            {
                title: req.body.orderItems[0].name,
                unit_price: req.body.orderItems[0].quantity,
                quantity: 1,
                description: req.body.orderItems[0].size
            }
        ]
    };
    
    try {
      const response = await mercadopago.mercadopago.preferences.create(preference);
      console.log(response)
      res.status(201).json({
        global: response.body.id
        });
    } catch (error) {
      console.log(error);
      res.status(400).json({error:"error en la peticion"})
    }


  });

  
export default handler;