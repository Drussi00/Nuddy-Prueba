const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "dc47536b13520814b5e37cce2672827c-us20",
  server: "us20",
});

// function getRequestParams(email) {
//   // get env variables
//   const API_KEY = process.env.MAILCHIMP_API_KEY;
//   const LIST_ID = process.env.MAILCHIMP_LIST_ID;
//   // mailchimp datacenter - mailchimp api keys always look like this:
//   // fe4f064432e4684878063s83121e4971-us6
//   // We need the us6 part
//   const DATACENTER = process.env.MAILCHIMP_API_KEY.split("-")[1];

//   const url = `https://us20.api.mailchimp.com/3.0/lists/0731756f45`;

//   // Add aditional params here. See full list of available params:
//   // https://mailchimp.com/developer/reference/lists/list-members/
//   const data = {
//     email_address: email,
//     status: "subscribed",
//   };

//   // Api key needs to be encoded in base 64 format
//   // const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString("base64");
//   const headers = {
//     "Content-Type": "application/json",
//     auth: "dc47536b13520814b5e37cce2672827c-us20",
//   };

//   return {
//     url,
//     headers,
//     data,
//   };
// }

export default async (req, res) => {
  const { email } = req.body;

  if (!email || !email.length) {
    console.log("entro");
    return res.status(400).json({
      error: "Forgot to add your email?",
    });
  }

  try {
    const run = async () => {
      const response = await mailchimp.lists.batchListMembers("0731756f45", {
        members: [{ email_address: email, status: "subscribed" }],
      });
      console.log(response);
    };
    run();
    // console.log("se fue ");
    // const { url, data, headers } = getRequestParams(email);
    // const response = await axios.post(url, data, headers);
    // // Success
    // return res.status(201).json({ error: null });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: `Oops, something went wrong... Send me an email at uriklar@gmail.com and I'll add you to the list.`,
    });

    // Report error to Sentry or whatever
  }
};
