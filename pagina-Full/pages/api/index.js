const version = "1.0.0";

export default async (request, response) => {
  return response
    .status(200)
    .json({ project_name: "Full Plans Landing Page", version });
};
