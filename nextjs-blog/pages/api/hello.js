// They can be deployed as Serverless Functions (also known as Lambdas)

// req = request data, res = response data
export default (req, res) => {
  res.status(200).json({ text: "Hello World" });
};
