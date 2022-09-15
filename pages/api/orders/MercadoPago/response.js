import nc from "next-connect";

const handler = nc();

import nc from "next-connect";

handler.post(async (req, res) => {
  console.log(req.body);
  res.status(200).send("Ok");
});
export default handler;
