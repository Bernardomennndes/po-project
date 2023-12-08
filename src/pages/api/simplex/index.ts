import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  solution: [];
  iterations: [];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  return res.status(200).json({ solution: [], iterations: [] });
}
