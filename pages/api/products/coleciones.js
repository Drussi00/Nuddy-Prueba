import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  const colecciones = ["The rise of nuddy", "segunda", "tercera"];
  res.send(colecciones);
});

export default handler;
