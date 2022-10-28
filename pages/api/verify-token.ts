import type { NextApiRequest, NextApiResponse } from "next";
import joi from "joi";
import { validateWithJoi, verifyToken } from "utils/serverUtils";

type Data = {
  status?: number;
  message: string;
  item?: object;
};
const schema = joi.object({
  access_token: joi.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    return await validateWithJoi(req, res, schema, () => {
      let access_token = req.body.access_token;
      if (verifyToken(access_token)) {
        res.status(200).json({
          status: 200,
          message: "Success",
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "Invalid token",
        });
      }
    });
  } else {
    res.status(405).json({
      message: "Method Not Allowed",
    });
  }
}
