import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  try {
    console.log(req.query["data.id"]);
  } catch (error) {
    console.log(req.query["data.id"]);

    console.log(error);
  }

  res.status(200).json({ Ok: true });
}
