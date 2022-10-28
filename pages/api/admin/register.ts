import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "utils/mongodb";
import bcrypt from "bcrypt";
import { SALTROUNDS } from "utils/constants";
import joi from "joi";
import { validateWithJoi } from "utils/serverUtils";

type Data = {
  status?: number;
  user?: object;
  message: string;
};
const schema = joi.object({
  username: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await clientPromise;
  const db = client.db("glamznik");

  if (req.method == "POST") {
    await validateWithJoi(req, res, schema, async () => {
      let bodyObject = req.body;
      let password = bodyObject.password as string;
      let hash = await bcrypt.hash(password, SALTROUNDS);
      let user = await db.collection("admin").insertOne({
        username: bodyObject.username,
        name: bodyObject.name,
        hashed_password: hash,
      });
      res.status(201).json({
        status: 200,
        user: user,
        message: "success",
      });
    });
  } else {
    res.status(405).json({
      message: "Method Not Allowed",
    });
  }
}
