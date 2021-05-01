import type { NextApiRequest, NextApiResponse } from "next";

// They can be deployed as Serverless Functions (also known as Lambdas)
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: "Hello World" });
};
