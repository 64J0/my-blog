import type { NextApiRequest, NextApiResponse } from "next";

// They can be deployed as Serverless Functions (also known as Lambdas)
const apiTest =  (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: "Hello World" });
};

export default apiTest;