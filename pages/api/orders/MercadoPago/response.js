import nc from "next-connect";

const handler = nc();

handler.post(async (req, res) => {
  console.log(req.body);
  res.status(200).send("Ok");
});
export default handler;
